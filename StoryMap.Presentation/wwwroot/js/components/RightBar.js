import State from "/js/state.js";
import ContextMenu from "/js/components/ContextMenu.js";

const CharactersTree = {
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.characters#tree-characters", [
        State.mode === "view" ? null :
          m("li", {
            oncontextmenu: (e) => {
              const actions = [
                {
                  label: "➕ Add details",
                  onClick: (_) => {
                    const key = prompt(
                      "Enter detail property (e.g., health, race):",
                    );
                    const value = prompt("Enter detail value:");
                    if (key && value) {
                      const newDetail = { [key]: value };
                      State.addDetailToBaseCharacter(newDetail);
                    }
                  },
                },
                {
                  label: "❌ Cancel",
                  onClick: (_) => { },
                },
              ];
              ContextMenu.show(e, actions);
            },
          }, [
            m("span.toggle", [
              m("i.bi.bi-chevron-right"),
            ]),
            "📋 Template Character",
            m("ul", [
              ...State.base_character_details.map((detail, detailIndex) =>
                m("li", {
                  oncontextmenu: (e) => {
                    const actions = [
                      {
                        label: `✏️ Edit Key: ${Object.keys(detail)[0]}`,
                        onClick: (_) => {
                          const oldDetail = { ...detail };
                          const key = Object.keys(oldDetail)[0];
                          const value = oldDetail[key];

                          const newKey = prompt("✏️ Edit detail property:", key);

                          if (newKey) {
                            const newDetail = { [newKey]: value };
                            State.updateDetailInBaseCharacter(
                              detailIndex,
                              newDetail,
                            );
                          }
                        },
                      },
                      {
                        label: `✏️ Edit Value: ${detail[Object.keys(detail)[0]]}`,
                        onClick: (_) => {
                          const oldDetail = detail;
                          const key = Object.keys(oldDetail)[0];
                          const value = oldDetail[key];
                          const newValue = prompt("✏️ Edit detail property:", value);
                          if (newValue) {
                            const newDetail = { [key]: newValue };
                            State.updateDetailInBaseCharacter(
                              detailIndex,
                              newDetail,
                            );
                          }
                        },
                      },
                      {
                        label: "🗑️ Delete",
                        onClick: (_) => {
                          State.removeDetailFromBaseCharacter(detailIndex);
                        },
                      },
                      {
                        label: "❌ Cancel",
                        onClick: (_) => { },
                      },
                    ];
                    ContextMenu.show(e, actions);
                  },
                }, [
                  m(
                    "span",
                    `${Object.keys(detail)[0]}: ${detail[Object.keys(detail)[0]]
                    }`,
                  ),
                ])
              ),
              m("li", [
                m("button.btn.btn-outline-primary.add-detail-btn", {
                  onclick: () => {
                    const key = prompt(
                      "Enter detail property (e.g., health, race):",
                    );
                    const value = prompt("Enter detail value:");
                    if (key && value) {
                      const newDetail = { [key]: value };
                      State.addDetailToBaseCharacter(newDetail);
                    }
                  },
                }, m("i.bi.bi-plus.add-detail-btn")),
              ]),
            ]),
          ]),

        m("li", [
          m("span.toggle", [
            m("i.bi.bi-chevron-right"),
          ]),
          "🧑 Characters",
          m("ul", [
            ...State.getLatestCharacterChanges().map((characterHelper) => {
              return m("li", [
                m("div", {
                  class: State.selectedCharacterIndex ===
                    characterHelper.characterIndex
                    ? "active"
                    : "",
                  onclick: (e) => {
                    e.stopPropagation();
                    State.select(
                      "character",
                      characterHelper.characterIndex,
                      null,
                    );
                  },
                  oncontextmenu: (e) => {
                    const actions = [
                      {
                        label: `✏️ Edit Name`,
                        onClick: (characterHelper) => {
                          const value =
                            State.characters[characterHelper.characterIndex]
                              .name;

                          const newValue = prompt(
                            "✏️ Edit character name:",
                            value,
                          );

                          State.updateCharacterName(
                            characterHelper.characterIndex,
                            newValue,
                          );
                        },
                      },
                      {
                        label: "➕ Add Detail",
                        onClick: (characterHelper) => {
                          const key = prompt(
                            "Enter detail property (e.g., health, race):",
                          );
                          const value = prompt("Enter detail value:");
                          if (key && value) {
                            const newDetail = { [key]: value };
                            State.addDetailToCharacter(
                              characterHelper.characterIndex,
                              characterHelper.latestStateIndex,
                              newDetail,
                            );
                          }
                        },
                      },
                      {
                        label: "🛬 Bring to current map",
                        onClick: (characterHelper) => {
                          State.bringCharacterToMap(characterHelper.characterIndex, characterHelper.latestStateIndex);
                        },
                      },
                      {
                        label: "⬆️ Move Up",
                        onClick: (characterHelper) => {
                          State.moveCharacter(characterHelper.characterIndex, -1);
                        },
                      },
                      {
                        label: "⬇️ Move Down",
                        onClick: (characterHelper) => {
                          State.moveCharacter(characterHelper.characterIndex, 1);
                        },
                      },
                      {
                        label: "🗑️ Delete",
                        onClick: (characterHelper) => {
                          State.removeCharacter(characterHelper.characterIndex);
                        },
                      },
                      {
                        label: "❌ Cancel",
                        onClick: (_) => { },
                      },
                    ];
                    State.mode === "view" ? null : ContextMenu.show(e, actions, characterHelper);
                  },
                }, [
                  m("span.toggle", [
                    m("i.bi.bi-chevron-right"),
                  ]),
                  m(
                    "span",
                    `${State.characters[characterHelper.characterIndex].name} ${State.characters[characterHelper.characterIndex].states[characterHelper.latestStateIndex].mapId === State.selectedMapIndex ? "🌍📍" : "🌍🚫"}`,
                  ),
                ]),
                m("ul", [
                  ...State.characters[characterHelper.characterIndex]
                    .states[characterHelper.latestStateIndex].details.map(
                      (detail, detailIndex) => {
                        return m("li", {
                          class:
                            State.checkModifiedDetailFromCharacter(
                              characterHelper.characterIndex,
                              characterHelper.latestStateIndex,
                              detailIndex,
                            )
                              ? "modified"
                              : "",
                          oncontextmenu: (e) => {
                            const actions = [
                              {
                                label: `✏️ Edit Key: ${Object.keys(detail)[0]}`,
                                onClick: (_) => {
                                  const oldDetail = { ...detail };
                                  const key = Object.keys(oldDetail)[0];
                                  const value = oldDetail[key];

                                  const newKey = prompt(
                                    "✏️ Edit detail property:",
                                    key,
                                  );

                                  if (newKey) {
                                    const newDetail = { [newKey]: value };
                                    State.updateDetailInCharacter(
                                      characterHelper.characterIndex,
                                      characterHelper.latestStateIndex,
                                      detailIndex,
                                      newDetail,
                                    );
                                  }
                                },
                              },
                              {
                                label: `✏️ Edit Value: ${detail[Object.keys(detail)[0]]
                                  }`,
                                onClick: (_) => {
                                  const oldDetail = detail;
                                  const key = Object.keys(oldDetail)[0];
                                  const value = oldDetail[key];
                                  const newValue = prompt(
                                    "✏️ Edit detail property:",
                                    value,
                                  );
                                  if (newValue) {
                                    const newDetail = { [key]: newValue };
                                    State.updateDetailInCharacter(
                                      characterHelper.characterIndex,
                                      characterHelper.latestStateIndex,
                                      detailIndex,
                                      newDetail,
                                    );
                                  }
                                },
                              },
                              {
                                label: "🗑️ Delete",
                                onClick: (_) => {
                                  State.removeDetailFromCharacter(
                                    characterHelper.characterIndex,
                                    characterHelper.latestStateIndex,
                                    detailIndex,
                                  );
                                },
                              },
                              {
                                label: "❌ Cancel",
                                onClick: (_) => { },
                              },
                            ];
                            State.mode === "view" ? null : ContextMenu.show(e, actions);
                          },
                          onclick: (e) => {
                            e.stopPropagation();
                            State.select(
                              "character",
                              characterHelper.characterIndex,
                              detailIndex,
                            );
                          },
                        }, [
                          m(
                            "span",
                            `${Object.keys(detail)[0]}: ${detail[Object.keys(detail)[0]]
                            }`,
                          ),
                        ]);
                      },
                    ),
                  State.mode === "view" ? null :
                    m("li", [
                      m("button.btn.btn-outline-primary.add-detail-btn", {
                        onclick: () => {
                          const key = prompt(
                            "Enter detail property (e.g., health, race):",
                          );
                          const value = prompt("Enter detail value:");
                          if (key && value) {
                            const newDetail = { [key]: value };
                            State.addDetailToCharacter(
                              characterHelper.characterIndex,
                              characterHelper.latestStateIndex,
                              newDetail,
                            );
                          }
                        },
                      }, m("i.bi.bi-plus.add-detail-btn")),
                    ]),
                ]),
              ]);
            }),
            State.mode === "view" ? null :
              m("li", [
                m("button.btn.btn-outline-primary", {
                  onclick: () => {
                    const newCharacterName = prompt("Enter new character name:");
                    if (newCharacterName) {
                      State.addCharacter(newCharacterName);
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

const RightBar = {
  view() {
    return m("div.rightbar", [
      m(CharactersTree),
    ]);
  },
};

export default RightBar;
