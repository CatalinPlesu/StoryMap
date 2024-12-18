import State from "/js/state.js";
import ContextMenu from "/js/components/ContextMenu.js";
import FileInput from "/js/components/FileInput.js";

const MapsTree = {
  // View function to render the component
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.maps#tree-map", [
        m("li", [
          m("span.toggle", [
            m("i.bi.bi-chevron-right"),
          ]),
          "Maps",
          m("ul", [
            // Loop through each map in the State
            ...State.maps.map((map, mapIndex) =>
              m("li", [
                m("div", {
                  class: State.selectedMapIndex === mapIndex ? "active" : "", // Apply classes based on selection/edit state
                  onclick: (e) => {
                    e.stopPropagation(); // Prevent image selection when map is clicked
                    State.select("map", mapIndex, null); // Select the map only
                  },
                  oncontextmenu: (e) => {
                    e.preventDefault();
                    const actions = [
                      {
                        label: "Edit Map Name",
                        onClick: () => {
                          const newMapName = prompt(
                            "Enter new map name:",
                            map.name,
                          );
                          if (newMapName) {
                            State.updateMapName(mapIndex, newMapName);
                          }
                        },
                      },
                      {
                        label: "Delete Map",
                        onClick: () => {
                          State.removeMap(mapIndex);
                        },
                      },
                      {
                        label: "Cancel",
                        onClick: () => {},
                      },
                    ];
                    ContextMenu.show(e, actions, 111);
                  },
                }, [
                  m("span.toggle", [
                    m("i.bi.bi-chevron-right"),
                  ]),
                  m("span", map.name),
                ]),
                m("ul", [
                  // Loop through images in each map
                  ...map.images.map((image, imageIndex) =>
                    m("li", {
                      class:
                        State.selected.item === "map" &&
                        State.selected.index === mapIndex &&
                          State.selected.nestedIndex == imageIndex
                          ? "active-image"
                          : "", // Apply classes based on selection/edit state
                      onclick: (e) => {
                        e.stopPropagation(); // Prevent map/image selection when image is clicked
                        State.select("map", mapIndex, imageIndex); 
                      },
                      oncontextmenu: (e) => {
                        e.preventDefault();
                        State.select("map", mapIndex, imageIndex);
                        const actions = [
                          {
                            label: `Edit Image name (${image.src})`,
                            onClick: () => {
                              const newSrc = prompt(
                                "Enter new image URL:",
                                image.src,
                              );
                              if (newSrc) {
                                State.updateImageInMap(mapIndex, imageIndex, {
                                  src: newSrc,
                                });
                              }
                            },
                          },
                          {
                            label: `Move image up ⬆️`,
                            onClick: () => {
                                State.moveImageUp(mapIndex, imageIndex);
                              },
                          },
                          {
                            label: `Move image down ⬇️`,
                            onClick: () => {
                                State.moveImageDown(mapIndex, imageIndex);
                              },
                          },
                          {
                            label: `Edit X Position (${image.x})`,
                            onClick: () => {
                              const newX = prompt(
                                "Enter new X position:",
                                image.x,
                              );
                              if (newX) {
                                State.updateImageInMap(mapIndex, imageIndex, {
                                  x: parseFloat(newX),
                                });
                              }
                            },
                          },
                          {
                            label: `Edit Y Position (${image.y})`,
                            onClick: () => {
                              const newY = prompt(
                                "Enter new Y position:",
                                image.y,
                              );
                              if (newY) {
                                State.updateImageInMap(mapIndex, imageIndex, {
                                  y: parseFloat(newY),
                                });
                              }
                            },
                          },
                          {
                            label: `Edit Scale (${image.scale})`,
                            onClick: () => {
                              const newScale = prompt(
                                "Enter new scale value:",
                                image.scale,
                              );
                              if (newScale) {
                                State.updateImageInMap(mapIndex, imageIndex, {
                                  scale: parseFloat(newScale),
                                });
                              }
                            },
                          },
                          {
                            label: `Edit Rotation (${image.rotation})`,
                            onClick: () => {
                              const newRotation = prompt(
                                "Enter new rotation value:",
                                image.rotation,
                              );
                              if (newRotation) {
                                State.updateImageInMap(mapIndex, imageIndex, {
                                  rotation: parseFloat(newRotation),
                                });
                              }
                            },
                          },
                          {
                            label: "Delete Image",
                            onClick: () => {
                              State.removeImageFromMap(mapIndex, imageIndex);
                            },
                          },
                          {
                            label: "Cancel",
                            onClick: () => {},
                          },
                        ];
                        ContextMenu.show(e, actions, 111);
                      },
                    }, image.src)
                  ),
                  m("li", [
                    m("button.btn.btn-outline-primary.upload-btn", {
                      onclick: () => {
                        State.select("map", mapIndex, null); // Select the image
                        document.getElementById("file-input").click(); // Trigger the file input
                      },
                    }, m("i.bi.bi-plus.upload-btn")),
                  ]),
                ]),
              ])
            ),
            m("li", [
              m("button.btn.btn-outline-primary", {
                onclick: () => {
                  const newMapName = prompt("Enter new map name:");
                  if (newMapName) {
                    State.addMap(newMapName);
                  }
                },
              }, m("i.bi.bi-plus")),
            ]),
          ]),
        ]),
      ]),
      m(FileInput),
    ]);
  },
};

export default MapsTree;
