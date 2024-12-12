import State from "/js/state.js";

const MapsTree = {
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.maps#tree-map", [
        m("li", [
          m("span.toggle", [
            m("i.bi.bi-chevron-right")
          ]),
          "Maps",
          m("ul", [
            ...State.maps.map((map, mapIndex) => 
              m("li.editable", [
                m("span.toggle", [
                  m("i.bi.bi-chevron-right")
                ]),
                m("span", map.name),
                m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                  onclick: () => State.removeMap(mapIndex)
                }, "X"),
                m("ul", [
                  ...map.images.map((image, imageIndex) => 
                    m("li.editable", `Image ${imageIndex + 1}: ${image.src}`)
                  ),
                  m("li", [
                    m("button.btn.btn-outline-primary.upload-btn", [
                      m("i.bi.bi-plus.upload-btn")
                    ])
                  ])
                ])
              ])
            ),
            m("li", [
              m("button.btn.btn-outline-primary", {
                onclick: () => {
                  const newMapName = prompt("Enter new map name:");
                  if (newMapName) {
                    State.addMap({ name: newMapName, images: [] });
                  }
                }
              }, m("i.bi.bi-plus"))
            ])
          ])
        ])
      ])
    ]);
  }
};

export default MapsTree;

