import State from "/js/state.js";
const ButtonPanel = {
    view({ attrs }) {
        const currentUrl = window.location.href;

        return m("div.button-panel", [
            State.mode === "create" || State.mode === "edit" ?
                m("button.btn.btn-danger", {
                    onclick: () => {
                        window.location.href = "/Story/";
                    },
                    style: { marginRight: "10px", backgroundColor: "#f2c6ea", borderColor: "#f2c6ea", color: "black" }
                }, "Cancel") : m("button.btn.btn-success", {
                    style: { backgroundColor: "#cff1c5", borderColor: "#cff1c5", color: "black" },
                    onclick: () => {
                        window.location.href = "/Story/Edit";
                    },
                }, "Edit"),

            State.mode === "create" ?
                m("button.btn.btn-success", {
                    onclick: () => {
                        console.log("Create clicked");
                        // Add your create logic here
                    },
                    style: { marginRight: "10px", backgroundColor: "#cff1c5", borderColor: "#cff1c5", color: "black" }
                }, "Create") : null,

            State.mode === "edit" ?
                m("button.btn.btn-primary", {
                    onclick: () => {
                        console.log("Save clicked");
                        // Add your save logic here
                    },
                    style: { backgroundColor: "#c6eef0", borderColor: "#c6eef0", color: "black" }
                }, "Save") : null,
        ]);
    }
};

export default ButtonPanel;