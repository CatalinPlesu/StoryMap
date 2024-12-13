import State from "/js/state.js";

const CharactersTree = {
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.characters#tree-characters", [

        m("li", [
          m("span.toggle", [
            m("i.bi.bi-chevron-right")
          ]),
          "Template Character",
            m("ul", [
              ...State.base_character_details.map((detail, detailIndex) => 
                m("li", {
                  class: State.select.item === 'base_character' && State.select.nestedIndex === detailIndex ? 'selected' :
                         State.select.item === 'base_character' && State.select.nestedIndex === detailIndex && State.select.type === 'edit' ? 'inline-edit' : '',
                  onclick: (e) => {
                    e.stopPropagation();  
                    State.select('base_character', 0, detailIndex); 
                  }
                }, [
                  State.select.item === 'base_character' && State.select.nestedIndex === detailIndex && State.select.type === 'edit' ?
                    m("div.detail-edit", [
                      m("input[type='text']", {
                        value: Object.keys(detail)[0],
                        placeholder: "Key",
                        oninput: (e) => {
                          const oldKey = Object.keys(detail)[0];
                          const newKey = e.target.value;
                          const value = detail[oldKey];
                          delete detail[oldKey];
                          detail[newKey] = value;
                        },
                        onkeydown: (e) => {
                          if (e.key === "Enter") {
                            State.updateDetailInBaseCharacter(detailIndex, detail);
                          }
                        }
                      }),
                      m("input[type='text']", {
                        value: detail[Object.keys(detail)[0]],
                        placeholder: "Value",
                        oninput: (e) => {
                          const key = Object.keys(detail)[0];
                          detail[key] = e.target.value;
                        },
                        onkeydown: (e) => {
                          if (e.key === "Enter") {
                            State.updateDetailInBaseCharacter(detailIndex, detail);
                          }
                        }
                      }),
                      m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                        onclick: (e) => {
                          e.stopPropagation();
                          State.removeDetailFromBaseCharacter(detailIndex);
                        }
                      }, "Delete")
                    ]) :
                    m("span", 
                      `${Object.keys(detail)[0]}: ${detail[Object.keys(detail)[0]]}`
                    )
                ])
              ),
              m("li", [
                m("button.btn.btn-outline-primary.add-detail-btn", {
                  onclick: () => {
                    const key = prompt("Enter detail property (e.g., health, race):");
                    const value = prompt("Enter detail value:");
                    if (key && value) {
                      const newDetail = { [key]: value };
                      State.addDetailToBaseCharacter(newDetail);
                    }
                  }
                }, m("i.bi.bi-plus.add-detail-btn"))
              ])
            ])
        ]),

        m("li", [
          m("span.toggle", [
            m("i.bi.bi-chevron-right")
          ]),
          "Characters",
          m("ul", [
            // Loop through each character in the State
            ...State.characters.map((character, characterIndex) => 
              m("li", [
                // Apply 'selected' or 'inline-edit' class depending on state
                m("div", {
                  class: State.select.item === 'character' && State.select.index === characterIndex && State.select.nestedIndex === null ? 'selected' :
                         State.select.item === 'character' && State.select.index === characterIndex && State.select.nestedIndex === null && State.select.type === 'edit' ? 'inline-edit' : '', // Apply classes based on selection/edit state
                  onclick: (e) => {
                    e.stopPropagation();  // Prevent detail selection when character is clicked
                    State.select('character', characterIndex, null); // Select the character only
                  },
                }, [
                  m("span.toggle", [
                    m("i.bi.bi-chevron-right")
                  ]),
                  // Inline edit for character name
                  State.select.item === 'character' && State.select.index === characterIndex && State.select.nestedIndex === null && State.select.type === 'edit' ?
                    m("input[type='text']", {
                      value: character.name,
                      oninput: (e) => {
                        character.name = e.target.value; // Update name in character
                      },
                      onblur: () => {
                        State.updateCharacter(characterIndex, { name: character.name }); // Save updated name when input loses focus
                      },
                      onkeydown: (e) => {
                        if (e.key === "Enter") {
                          State.updateCharacter(characterIndex, { name: character.name }); // Save updated name on Enter
                          e.target.blur(); // Remove focus to trigger blur event
                        }
                      },
                      onfocus: (e) => {
                        e.target.select(); // Automatically select the text when entering edit mode
                      }
                    }) :
                    m("span", {
                      ondblclick: () => {
                        State.select('character', characterIndex, null); // Switch to edit mode on double-click
                      }
                    }, character.name),
                    // Show delete button in edit mode for character
                    State.select.item === 'character' && State.select.index === characterIndex && State.select.nestedIndex === null && State.select.type === 'edit' ?
                      m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                        onclick: (e) => {
                          e.stopPropagation();  // Prevent character selection when removing
                          State.removeCharacter(characterIndex); // Remove the character
                        }
                      }, "Delete Item") : null
                ]),
                m("ul", [
                  // Loop through details in each character
                  ...character.details.map((detail, detailIndex) => 
                    m("li", {
                      class: State.select.item === 'character' && State.select.index === characterIndex && State.select.nestedIndex === detailIndex ? 'selected' :
                             State.select.item === 'character' && State.select.index === characterIndex && State.select.nestedIndex === detailIndex && State.select.type === 'edit' ? 'inline-edit' : '', // Apply 'selected' or 'inline-edit' classes
                      onclick: (e) => {
                        e.stopPropagation();  // Prevent character selection when detail is clicked
                        State.select('character', characterIndex, detailIndex); // Select the detail
                      }
                    }, [
                      // Default display or edit mode for details
                      State.select.item === 'character' && State.select.index === characterIndex && State.select.nestedIndex === detailIndex && State.select.type === 'edit' ?
                        m("div.detail-edit", [
                          m("input[type='text']", {
                            value: Object.keys(detail)[0],
                            placeholder: "Key",
                            oninput: (e) => {
                              const oldKey = Object.keys(detail)[0];
                              const newKey = e.target.value;
                              const value = detail[oldKey];
                              delete detail[oldKey];
                              detail[newKey] = value;
                            },
                            onkeydown: (e) => {
                              if (e.key === "Enter") {
                                State.updateDetailInCharacter(characterIndex, detailIndex, detail);
                              }
                            }
                          }),
                          m("input[type='text']", {
                            value: detail[Object.keys(detail)[0]],
                            placeholder: "Value",
                            oninput: (e) => {
                              const key = Object.keys(detail)[0];
                              detail[key] = e.target.value;
                            },
                            onkeydown: (e) => {
                              if (e.key === "Enter") {
                                State.updateDetailInCharacter(characterIndex, detailIndex, detail);
                              }
                            }
                          }),
                          m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                            onclick: (e) => {
                              e.stopPropagation();
                              State.removeDetailFromCharacter(characterIndex, detailIndex);
                            }
                          }, "Delete")
                        ]) :
                        m("span", 
                          `${Object.keys(detail)[0]}: ${detail[Object.keys(detail)[0]]}`
                        )
                    ])
                  ),
                  m("li", [
                    m("button.btn.btn-outline-primary.add-detail-btn", {
                      onclick: () => {
                        const key = prompt("Enter detail property (e.g., health, race):");
                        const value = prompt("Enter detail value:");
                        if (key && value) {
                          const newDetail = { [key]: value };
                          State.addDetailToCharacter(characterIndex, newDetail);
                        }
                      }
                    }, m("i.bi.bi-plus.add-detail-btn"))
                  ])
                ])
              ])
            ),
            m("li", [
              m("button.btn.btn-outline-primary", {
                onclick: () => {
                  const newCharacterName = prompt("Enter new character name:");
                  if (newCharacterName) {
                    State.addCharacter(newCharacterName);
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

const RightBar = {
  view() {
    return m("div.rightbar", [
      m(CharactersTree)
    ]);
  }
};

export default RightBar;
