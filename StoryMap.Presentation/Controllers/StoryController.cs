using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using StoryMap.Domain.Entities;
using StoryMap.Presentation.Models.StoryModels;
using StoryMap.Services.Interfaces;

namespace StoryMap.Presentation.Controllers;

public class StoryController : Controller
{
    private readonly IStoryService _storyService;
    private readonly IMapper _mapper;
    private readonly IValidator<StoryCreateModel> _createModelValidator;
    private readonly IValidator<StoryEditModel> _editModelValidator;

    public StoryController(
        IStoryService storyService,
        IMapper mapper,
        IValidator<StoryCreateModel> createModelValidator,
        IValidator<StoryEditModel> editModelValidator)
    {
        _storyService = storyService;
        _mapper = mapper;
        _createModelValidator = createModelValidator;
        _editModelValidator = editModelValidator;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StoryCreateModel createModel)
    {
        // Check if the model is null
        if (createModel == null)
        {
            return BadRequest("Model cannot be null.");
        }

        // Validate the incoming model
        var validationResult = await _createModelValidator.ValidateAsync(createModel);

        if (!validationResult.IsValid)
        {
            // If validation fails, return errors as JSON
            var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }).ToArray();
            return Json(new { success = false, errors });
        }

        // If validation passes, map the model to the entity and create the story
        var storyEntity = _mapper.Map<StoryCreateModel, StoryEntity>(createModel);
        await _storyService.Create(storyEntity);

        // Return success and the created story model as JSON
        var createdStory = _mapper.Map<StoryEntity, StoryCreateModel>(storyEntity);
        return Json(new { success = true, story = createdStory });
    }

    public IActionResult Edit()
    {
        return View();
    }

    [HttpGet]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var story = await _storyService.GetById(id);
            if (story == null)
                return NotFound();

            var model = _mapper.Map<StoryEntity, StoryDetailsModel>(story);
            return Json(new { success = true, story = model });
        }
        catch (Exception e)
        {
            return Json(new { success = false, errors = e.ToString()});
        }
    }

    [HttpGet]
    public async Task<IActionResult> List()
    {
        var stories = await _storyService.GetAll();
        var models = _mapper.Map<IEnumerable<StoryEntity>, IEnumerable<StoryModel>>(stories);
        return Json(new { success = true, stories = models });
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] StoryEditModel editModel)
    {
        if (editModel == null)
            return BadRequest("Model cannot be null.");

        var validationResult = await _editModelValidator.ValidateAsync(editModel);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage });
            return Json(new { success = false, errors });
        }

        var story = await _storyService.GetById(editModel.Id);
        if (story == null)
            return NotFound();

        // Map editModel to story
        _mapper.Map(editModel, story);

        // Now, update the story with the preserved CreatedOnUtc
        await _storyService.Update(story);

        var updated = _mapper.Map<StoryEntity, StoryEditModel>(story);
        return Json(new { success = true, story = updated });
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var story = await _storyService.GetById(id);
        if (story == null)
            return NotFound();

        await _storyService.Delete(id);
        return Json(new { success = true });
    }

}
