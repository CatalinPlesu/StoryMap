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
    e.preventDefault();
    e.stopPropagation();
  
    ContextMenu.actions = actions;
    ContextMenu.data = data;
  
    // Temporarily render the menu to calculate its height
    const tempMenu = document.createElement("div");
    tempMenu.style.position = "absolute";
    tempMenu.style.visibility = "hidden";
    tempMenu.style.zIndex = "-1";
    tempMenu.style.minWidth = "150px";
    tempMenu.style.background = "#fff";
    tempMenu.style.border = "1px solid transparent"; // Optional styling similar to actual menu
  
    // Render actions to mimic actual menu height
    actions.forEach(action => {
      const menuItem = document.createElement("div");
      menuItem.style.padding = "8px 12px";
      menuItem.style.borderBottom = "1px solid #eee";
      menuItem.innerText = action.label;
      tempMenu.appendChild(menuItem);
    });
  
    document.body.appendChild(tempMenu);
    const menuWidth = tempMenu.offsetWidth;
    const menuHeight = tempMenu.offsetHeight;
    document.body.removeChild(tempMenu);
  
    // Check viewport boundaries
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    const drawToLeft = e.clientX + menuWidth > viewportWidth;
    const drawUpwards = e.clientY + menuHeight > viewportHeight;
  
    ContextMenu.visible = true;
    ContextMenu.x = drawToLeft ? e.clientX - menuWidth : e.clientX;
    ContextMenu.y = drawUpwards ? e.clientY - menuHeight : e.clientY;
  },  

  hide() {
    ContextMenu.visible = false;
    ContextMenu.actions = [];
    ContextMenu.data = null;
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
