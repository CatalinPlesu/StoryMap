import AppManager from "/js/AppManager/AppManager.js";

const ButtonPanel = {
    view({ attrs }) {
        const appManager = AppManager.getInstance();
        const currentUrl = window.location.href;

        return m("div.button-panel", [
            appManager.storyModeCreate() || appManager.storyModeEdit()
                ? m("button.btn.btn-danger", {
                    onclick: () => {
                        window.location.href = appManager.storyModeCreate()
                            ? "/"
                            : "/Story/";
                    },
                    style: {
                        marginRight: "10px",
                        backgroundColor: "#f2c6ea",
                        borderColor: "#f2c6ea",
                        color: "black",
                    },
                }, "Cancel")
                : m("button.btn.btn-success", {
                    style: {
                        backgroundColor: "#cff1c5",
                        borderColor: "#cff1c5",
                        color: "black",
                    },
                    onclick: () => {
                        window.location.href = "/Story/Edit";
                    },
                }, "Edit"),
            appManager.storyModeCreate()
                ? m("button.btn.btn-success", {
                    onclick: () => {
                        console.log("Create clicked");
                        window.location.href = "/Story/";
                        appManager.save();
                        // Add your create logic here
                    },
                    style: {
                        marginRight: "10px",
                        backgroundColor: "#cff1c5",
                        borderColor: "#cff1c5",
                        color: "black",
                    },
                }, "Create")
                : null,
            appManager.storyModeEdit()
                ? m("button.btn.btn-primary", {
                    onclick: () => {
                        console.log("Save clicked");
                        window.location.href = "/Story/";
                        appManager.save();
                        // Add your save logic here
                    },
                    style: {
                        backgroundColor: "#c6eef0",
                        borderColor: "#c6eef0",
                        color: "black",
                    },
                }, "Save")
                : null,
        ]);
    },
};

export default ButtonPanel;