import State from "/js/state.js";

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
                // Apply 'selected' or 'inline-edit' class depending on state
                m("div", {
                  class:
                    State.select.item === "map" &&
                      State.select.index === mapIndex &&
                      State.select.nestedIndex === null
                      ? "selected-active"
                      : State.select.item === "map" &&
                          State.select.index === mapIndex &&
                          State.select.nestedIndex === null &&
                          State.select.type === "edit"
                      ? "inline-edit"
                      : State.selectedMapIndex === mapIndex
                      ? "active"
                      : "", // Apply classes based on selection/edit state
                  onclick: (e) => {
                    e.stopPropagation(); // Prevent image selection when map is clicked
                    State.select("map", mapIndex, null); // Select the map only
                  },
                }, [
                  m("span.toggle", [
                    m("i.bi.bi-chevron-right"),
                  ]),
                  // Inline edit for map name
                  State.select.item === "map" &&
                    State.select.index === mapIndex &&
                    State.select.nestedIndex === null &&
                    State.select.type === "edit"
                    ? m("input[type='text']", {
                      value: map.name,
                      oninput: (e) => {
                        map.name = e.target.value; // Update name in map
                      },
                      onblur: () => {
                        State.updateMapName(mapIndex, map.name); // Save updated name when input loses focus
                      },
                      onkeydown: (e) => {
                        if (e.key === "Enter") {
                          State.updateMapName(mapIndex, map.name); // Save updated name on Enter
                          e.target.blur(); // Remove focus to trigger blur event
                        }
                      },
                      onfocus: (e) => {
                        e.target.select(); // Automatically select the text when entering edit mode
                      },
                    })
                    : m("span", {
                      ondblclick: () => {
                        State.select("map", mapIndex, null); // Switch to edit mode on double-click
                      },
                    }, map.name),
                  // Show delete button in edit mode for map
                  State.select.item === "map" &&
                    State.select.index === mapIndex &&
                    State.select.nestedIndex === null &&
                    State.select.type === "edit"
                    ? m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                      onclick: (e) => {
                        e.stopPropagation(); // Prevent map selection when removing
                        State.removeMap(mapIndex); // Remove the map
                      },
                    }, "Delete Item")
                    : null,
                ]),
                m("ul", [
                  // Loop through images in each map
                  ...map.images.map((image, imageIndex) =>
                    m("li", {
                      class:
                        State.select.item === "map" &&
                          State.select.index === mapIndex &&
                          State.select.nestedIndex === imageIndex
                          ? "selected"
                          : State.select.item === "map" &&
                              State.select.index === mapIndex &&
                              State.select.nestedIndex === imageIndex &&
                              State.select.type === "edit"
                          ? "inline-edit"
                          : "", // Apply 'selected' or 'inline-edit' classes
                      onclick: (e) => {
                        e.stopPropagation(); // Prevent map selection when image is clicked
                        State.select("map", mapIndex, imageIndex); // Select the image
                      },
                    }, [
                      // Only show the input for editing image title when in edit mode
                      State.select.item === "map" &&
                        State.select.type === "edit" &&
                        State.select.index === mapIndex &&
                        State.select.nestedIndex === imageIndex
                        ? m("input[type='text']", {
                          value: image.src,
                          oninput: (e) => {
                            State.updateImageInMap(mapIndex, imageIndex, {
                              src: e.target.value,
                            }); // Update the image source in the state
                          },
                          onfocus: (e) => {
                            e.target.select(); // Automatically select the text when entering edit mode
                          },
                          onkeydown: (e) => {
                            if (e.key === "Enter") {
                              State.updateImageInMap(mapIndex, imageIndex, {
                                src: e.target.value,
                              }); // Save updated image src on Enter
                              e.target.blur(); // Remove focus to trigger blur event
                            }
                          },
                        })
                        : m("span", [
                          image.src,
                        ]),
                      // Show delete button in edit mode for image
                      State.select.item === "map" &&
                        State.select.index === mapIndex &&
                        State.select.nestedIndex === imageIndex &&
                        State.select.type === "edit"
                        ? m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                          onclick: (e) => {
                            e.stopPropagation(); // Prevent map/image selection when removing
                            State.removeImageFromMap(mapIndex, imageIndex); // Remove the image from the map
                          },
                        }, "Delete Item")
                        : null,
                      // Show image properties in a table when selected
                      State.select.item === "map" &&
                        State.select.index === mapIndex &&
                        State.select.nestedIndex === imageIndex
                        ? m("table.table.table-bordered.mt-2", [
                          m("thead", [
                            m("tr", [
                              m("th", "Property"),
                              m("th", "Value"),
                            ]),
                          ]),
                          m("tbody", [
                            m("tr", [
                              m("td", "X"),
                              m("td", [
                                m("input[type='number']", {
                                  value: image.x,
                                  oninput: (e) => {
                                    image.x = parseFloat(e.target.value); // Update image x
                                  },
                                  onkeydown: (e) => {
                                    if (e.key === "Enter") {
                                      State.updateImageInMap(
                                        mapIndex,
                                        imageIndex,
                                        { x: image.x },
                                      );
                                    }
                                  },
                                }),
                              ]),
                            ]),
                            m("tr", [
                              m("td", "Y"),
                              m("td", [
                                m("input[type='number']", {
                                  value: image.y,
                                  oninput: (e) => {
                                    image.y = parseFloat(e.target.value); // Update image y
                                  },
                                  onkeydown: (e) => {
                                    if (e.key === "Enter") {
                                      State.updateImageInMap(
                                        mapIndex,
                                        imageIndex,
                                        { y: image.y },
                                      );
                                    }
                                  },
                                }),
                              ]),
                            ]),
                            m("tr", [
                              m("td", "Scale"),
                              m("td", [
                                m("input[type='number']", {
                                  value: image.scale,
                                  oninput: (e) => {
                                    image.scale = parseFloat(e.target.value); // Update image scale
                                  },
                                  onkeydown: (e) => {
                                    if (e.key === "Enter") {
                                      State.updateImageInMap(
                                        mapIndex,
                                        imageIndex,
                                        { scale: image.scale },
                                      );
                                    }
                                  },
                                }),
                              ]),
                            ]),
                            m("tr", [
                              m("td", "Rotation"),
                              m("td", [
                                m("input[type='number']", {
                                  value: image.rotation,
                                  oninput: (e) => {
                                    image.rotation = parseFloat(e.target.value); // Update image rotation
                                  },
                                  onkeydown: (e) => {
                                    if (e.key === "Enter") {
                                      State.updateImageInMap(
                                        mapIndex,
                                        imageIndex,
                                        { rotation: image.rotation },
                                      );
                                    }
                                  },
                                }),
                              ]),
                            ]),
                          ]),
                        ])
                        : null,
                    ])
                  ),
                  m("li", [
                    m("button.btn.btn-outline-primary.upload-btn", {
                      onclick: () => {
                        const newImage = {
                          src: "new_image.jpg",
                          x: 0,
                          y: 0,
                          scale: 1,
                          rotation: 0,
                        }; // New image structure
                        State.addImageToMap(mapIndex, newImage); // Add new image to map
                        // Select the newly added image and enter edit mode
                        State.select("map", mapIndex, map.images.length - 1);
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
    ]);
  },
};

export default MapsTree;
