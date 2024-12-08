export default function HomePage() {
  const stories = ['Story 1', 'Story 2', 'Story 3'];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md text-center cursor-pointer">
        + Create New Story
      </div>
      {stories.map((story, index) => (
        <div
          key={index}
          className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md text-center"
        >
          {story}
        </div>
      ))}
    </div>
  );
}
