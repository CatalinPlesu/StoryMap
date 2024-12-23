import State from "/js/state.js";
import ContextMenu from "/js/components/ContextMenu.js";

const StoryNameDisplay = {
    view() {
        const mapName = State.storyName ?? "Default Story Name"; // Default string if map name is empty

        // Function to handle updating the story name
        const updateStoryName = () => {
            const newStoryName = prompt("Enter new story name:", mapName);
            if (newStoryName) {
                State.updateStoryName(newStoryName);
            }
        };

        return m("button.btn.btn-light", {
            oncontextmenu: (e) => {
                e.preventDefault();
                const actions = [
                    {
                        label: "✏️ Update Story Name",
                        onClick: updateStoryName,
                    },
                    {
                        label: "❌ Cancel",
                        onClick: (_) => { },
                    },
                ];
                State.mode === "view" ? null : ContextMenu.show(e, actions);
            },
            onclick: State.mode === "view" ? null : updateStoryName
        }, mapName); // Ensure mapName is the text of the button
    }
};

export default StoryNameDisplay; 