import AppManager from "/js/AppManager/AppManager.js";
import ContextMenu from "/js/components/ContextMenu.js";

const StoryNameDisplay = {
    view() {
        const appManager = AppManager.getInstance();
        const storyName = appManager.storyGetStoryName() ?? "Default Story Name"; // Default string if story name is empty

        // Function to handle updating the story name
        const updateStoryName = () => {
            const newStoryName = prompt("Enter new story name:", storyName);
            if (newStoryName) {
                appManager.storySetStoryName(newStoryName);
                appManager.storyUpdate(); // Mark story as updated
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
                appManager.storyModeView() ? null : ContextMenu.show(e, actions);
            },
            onclick: appManager.storyModeView() ? null : updateStoryName
        }, storyName); // Ensure storyName is the text of the button
    }
};

export default StoryNameDisplay; 