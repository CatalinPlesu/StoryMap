import StoryMapMediator from '/js/mediators/StoryMapMediator.js';
import Canvas from '/js/components/Canvas.js';
import Chapters from '/js/components/Chapters.js';
import Characters from '/js/components/Characters.js';
import Maps from '/js/components/Maps.js';


export function initializeStoryMap() {
  // Create components
  const maps = new Maps();
  const chapters = new Chapters();
  const characters = new Characters();
  const canvas = new Canvas();

  // Create mediator with components
  const mediator = new StoryMapMediator({
        maps,
        chapters,
        characters,
        canvas
  });

  // Assign mediator to components
  maps.mediator = mediator;
  chapters.mediator = mediator;
  characters.mediator = mediator;
  canvas.mediator = mediator;

  return {
    mediator,
    components: {
        maps,
        chapters,
        characters,
        canvas
    }
  };
}

const { mediator, components } = initializeStoryMap();
window.mediator = mediator;
window.components = components;
// components.map.select();
// components.imageComponent.reposition();
// components.characterCanvas.select();
// components.characterCanvas.moveCharacter({x: 100, y: 200});
// components.chapterSelector.selectChapter(myChapter);
// components.timeframeInput.addTimeframe('Summer of 100 BC');
