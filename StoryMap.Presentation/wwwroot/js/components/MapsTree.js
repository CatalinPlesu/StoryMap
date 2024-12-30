import AppManager from "/js/AppManager/AppManager.js";
import ContextMenu from "/js/components/ContextMenu.js";
import FileInput from "/js/components/FileInput.js";

const appManager = AppManager.getInstance();

const MapsTree = {
  // View function to render the component
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.maps#tree-map", [
        m("li", [
          m("span.toggle", [
            m("i.bi.bi-chevron-right"),
          ]),
          "🗺️ Maps",
          m("ul", [
            // Loop through each map in the AppManager's maps
            ...appManager.mapGetAll().map((map, mapIndex) =>
              m("li", [
                m("div", {
                  class: appManager.mapCheckActive(mapIndex) ? "active" : "", // Apply classes based on selection/edit state
                  onclick: (e) => {
                    e.stopPropagation(); // Prevent image selection when map is clicked
                    appManager.select("map", mapIndex, null); // Select the map only
                  },
                  oncontextmenu: (e) => {
                    e.preventDefault();
                    const actions = [
                      {
                        label: "📍 Center Map",
                        onClick: () => {
                          appManager.mapOffset(mapIndex, { x: 0, y: 0 });
                        },
                      },
                      {
                        label: "🔄 Reset Zoom",
                        onClick: () => {
                          appManager.mapZoom(mapIndex, 1);
                        },
                      },
                      {
                        label: "📍🔄 Center & Reset Zoom",
                        onClick: () => {
                          appManager.mapOffset(mapIndex, { x: 0, y: 0 });
                          appManager.mapZoom(mapIndex, 1);
                        },
                      },
                      {
                        label: "❌ Cancel",
                        onClick: () => { },
                      },
                    ];
                    ContextMenu.show(e, actions);
                  },
                }, [
                  ...(!appManager.storyModeView() ? [
                    m("span.toggle", [
                      m("i.bi.bi-chevron-right"),
                    ]),
                  ] : []),
                  m("span", map.name),
                ]),
                // Only display images if not in view mode
                ...(!appManager.storyModeView() ? [
                  m("ul", [
                    // Loop through images in each map
                    ...map.images.map((image, imageIndex) =>
                      m("li", {
                        class:
                          appManager.selected().item === "map" &&
                            appManager.selected().index === mapIndex &&
                            appManager.selected().nestedIndex == imageIndex
                            ? "active-image"
                            : "", // Apply classes based on selection/edit state
                        onclick: (e) => {
                          e.stopPropagation(); // Prevent map/image selection when image is clicked
                          appManager.select("map", mapIndex, imageIndex);
                        },
                        oncontextmenu: (e) => {
                          e.preventDefault();
                          appManager.select("map", mapIndex, imageIndex);
                          const actions = [
                            {
                              label: `✏️ Edit Image name (${image.src})`,
                              onClick: () => {
                                const newSrc = prompt(
                                  "Enter new image URL:",
                                  image.src,
                                );
                                if (newSrc) {
                                  appManager.mapUpdateImage(mapIndex, imageIndex, {
                                    src: newSrc,
                                  });
                                }
                              },
                            },
                            {
                              label: "🗑️ Delete Image",
                              onClick: () => {
                                appManager.mapRemoveImage(mapIndex, imageIndex);
                              },
                            },
                            {
                              label: "❌ Cancel",
                              onClick: () => { },
                            },
                          ];
                          ContextMenu.show(e, actions);
                        },
                      }, image.src)
                    ),
                    m("li", [
                      m("button.btn.btn-outline-primary.upload-btn", {
                        onclick: () => {
                          appManager.select("map", mapIndex, null);
                          document.getElementById("file-input").click(); // Trigger the file input
                        },
                      }, m("i.bi.bi-plus.upload-btn")),
                    ]),
                  ]),
                ] : []),
              ])
            ),
            // Only display the button to add a new map if not in view mode
            ...(!appManager.storyModeView() ? [
              m("li", [
                m("button.btn.btn-outline-primary", {
                  onclick: () => {
                    const newMapName = prompt("Enter new map name:");
                    if (newMapName) {
                      appManager.mapAdd(newMapName);
                    }
                  },
                }, m("i.bi.bi-plus")),
              ]),
            ] : []),
          ]),
        ]),
      ]),
      m(FileInput),
    ]);
  },
};

export default MapsTree;
