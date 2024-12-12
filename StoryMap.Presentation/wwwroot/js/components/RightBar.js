// import m from "/lib/mithril/mithril.js";
import State from "/js/state.js";

const RightBar = {
  view() {
    return m("div.rightbar", [
      m("div.card.mb-3", [
        m("ul.tree#tree-characters", [
          m("li", [
            m("span.toggle", [
              m("i.bi.bi-chevron-right")
            ]),
            "Characters",
            m("ul", [
              ...State.characters.map((character, characterIndex) => 
                m("li.editable", [
                  m("span.toggle", [
                    m("i.bi.bi-chevron-right")
                  ]),
                  m("span", character.name),
                  m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                    onclick: () => State.removeCharacter(characterIndex)
                  }, "X"),
                  m("ul", [
                    ...character.details.map((detail, detailIndex) => 
                      m("li.editable", `Detail ${detailIndex + 1}: ${detail}`)
                    ),
                    m("li", [
                      m("button.btn.btn-outline-primary", {
                        onclick: () => {
                          const newDetail = prompt("Enter new character detail:");
                          if (newDetail) {
                            State.characters[characterIndex].details.push(newDetail);
                            m.redraw();
                          }
                        }
                      }, m("i.bi.bi-plus"))
                    ])
                  ])
                ])
              ),
              m("li", [
                m("button.btn.btn-outline-primary", {
                  onclick: () => {
                    const newCharacterName = prompt("Enter new character name:");
                    if (newCharacterName) {
                      State.addCharacter({ name: newCharacterName, details: [] });
                    }
                  }
                }, m("i.bi.bi-plus"))
              ])
            ])
          ])
        ])
      ])
    ]);
  }
};

export default RightBar;
