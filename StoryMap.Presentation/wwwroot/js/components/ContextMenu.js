const ContextMenu = {
  visible: false,
  x: 0,
  y: 0,
  actions: [],
  data: null,

  constructor() {

    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  },

  show(e, actions, data) {
    console.group("[ContextMenu] Show Method");

    e.preventDefault();
    e.stopPropagation();

    ContextMenu.visible = true;
    ContextMenu.x = e.clientX;
    ContextMenu.y = e.clientY;
    ContextMenu.actions = actions;
    ContextMenu.data = data;

    console.groupEnd();

  },

  hide() {
    console.group("[ContextMenu] Hide Method");

    ContextMenu.visible = false;
    ContextMenu.actions = [];
    ContextMenu.data = null;

    console.groupEnd();
  },

  view() {
    if (!ContextMenu.visible) return null;

    return m(
      "div.context-menu",
      {
        style: {
          position: "absolute",
          top: `${ContextMenu.y}px`,
          left: `${ContextMenu.x}px`,
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          zIndex: 9999,
          borderRadius: "5px",
          minWidth: "150px",
        },
      },
      ContextMenu.actions.map((action) =>
        m(
          "div.context-menu-item",
          {
            style: {
              padding: "8px 12px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            },
            onclick: (e) => {
              e.stopPropagation();
              const result = action.onClick(ContextMenu.data);

              if (result?.then) {
                result.then(() => ContextMenu.hide());
              } else {
                ContextMenu.hide();
              }
            },
          },
          action.label
        )
      )
    );
  },
};

ContextMenu.constructor();

export default ContextMenu;
