import State from "/js/state.js";

const CharactersTree = {
  // Local state for managing edits
  localState: {
    baseCharacterDetails: [],
    characters: [],
    editingItem: null,
  },

  // Method to handle input updates for base_character
  handleBaseCharacterInput(detail, detailIndex) {
    return {
      oninput: (e) => {
        const updatedDetail = { ...detail };
        const oldKey = Object.keys(updatedDetail)[0];
        const newKey = e.target.value;
        const value = updatedDetail[oldKey];

        delete updatedDetail[oldKey];
        updatedDetail[newKey] = value;

        this.localState.baseCharacterDetails[detailIndex] = updatedDetail;
      },
      onkeydown: (e) => {
        if (e.key === "Enter") {
          State.updateDetailInBaseCharacter(
            detailIndex,
            this.localState.baseCharacterDetails[detailIndex],
          );
        }
      },
    };
  },

  // Method to handle value input for base_character
  handleBaseCharacterValueInput(detail, detailIndex) {
    return {
      oninput: (e) => {
        const updatedDetail = { ...detail };
        const key = Object.keys(updatedDetail)[0];
        updatedDetail[key] = e.target.value;

        this.localState.baseCharacterDetails[detailIndex] = updatedDetail;
      },
      onkeydown: (e) => {
        if (e.key === "Enter") {
          State.updateDetailInBaseCharacter(
            detailIndex,
            this.localState.baseCharacterDetails[detailIndex],
          );
        }
      },
    };
  },

  handleCharacterInput(characterHelper, detail, detailIndex) {
    return {
      oninput: (e) => {
        const updatedDetail = { ...detail };
        const oldKey = Object.keys(updatedDetail)[0];
        const newKey = e.target.value;
        const value = updatedDetail[oldKey];

        delete updatedDetail[oldKey];
        updatedDetail[newKey] = value;

        // Update local state for characters
        const characterIndex = characterHelper.characterIndex;
        const stateIndex = characterHelper.latestStateIndex;

        if (!this.localState.characters[characterIndex]) {
          this.localState.characters[characterIndex] = JSON.parse(
            JSON.stringify(State.characters[characterIndex]),
          );
        }

        this.localState.characters[characterIndex].states[stateIndex]
          .details[detailIndex] = updatedDetail;
      },
      onkeydown: (e) => {
        if (e.key === "Enter") {
          const characterIndex = characterHelper.characterIndex;
          const stateIndex = characterHelper.latestStateIndex;

          State.updateDetailInCharacter(
            characterIndex,
            stateIndex,
            detailIndex,
            this.localState.characters[characterIndex].states[stateIndex]
              .details[detailIndex],
          );
        }
      },
    };
  },

  // Method to handle value input for characters
  handleCharacterValueInput(characterHelper, detail, detailIndex) {
    return {
      oninput: (e) => {
        const updatedDetail = { ...detail };
        const key = Object.keys(updatedDetail)[0];
        updatedDetail[key] = e.target.value;

        // Update local state for characters
        const characterIndex = characterHelper.characterIndex;
        const stateIndex = characterHelper.latestStateIndex;

        if (!this.localState.characters[characterIndex]) {
          this.localState.characters[characterIndex] = JSON.parse(
            JSON.stringify(State.characters[characterIndex]),
          );
        }

        this.localState.characters[characterIndex].states[stateIndex]
          .details[detailIndex] = updatedDetail;
      },
      onkeydown: (e) => {
        if (e.key === "Enter") {
          const characterIndex = characterHelper.characterIndex;
          const stateIndex = characterHelper.latestStateIndex;

          State.updateDetailInCharacter(
            characterIndex,
            stateIndex,
            detailIndex,
            this.localState.characters[characterIndex].states[stateIndex]
              .details[detailIndex],
          );
        }
      },
    };
  },

  view() {
    // Initialize local state before rendering
    this.localState.baseCharacterDetails = structuredClone(
      State.base_character_details,
    );

    return m("div.card.mb-3", [
      m("ul.tree.characters#tree-characters", [
        m("li", {
          class: State.select.item === "base_character" &&
              State.select.index === 0 && State.select.nestedIndex === null
            ? "selected"
            : "",
          onclick: (e) => {
            e.stopPropagation();
            State.select("base_character", 0, null);
          },
        }, [
          m("span.toggle", [
            m("i.bi.bi-chevron-right"),
          ]),
          "Template Character",
          m("ul", [
            ...this.localState.baseCharacterDetails.map((detail, detailIndex) =>
              m("li", {
                class: State.select.item === "base_character" &&
                    State.select.nestedIndex === detailIndex
                  ? "selected"
                  : State.select.item === "base_character" &&
                      State.select.nestedIndex === detailIndex &&
                      State.select.type === "edit"
                  ? "inline-edit"
                  : "",
                onclick: (e) => {
                  e.stopPropagation();
                  State.select("base_character", 0, detailIndex);
                },
              }, [
                State.select.item === "base_character" &&
                  State.select.nestedIndex === detailIndex &&
                  State.select.type === "edit"
                  ? m("div.detail-edit", [
                    m("input[type='text']", {
                      value: Object.keys(detail)[0],
                      placeholder: "Key",
                      ...this.handleBaseCharacterInput(detail, detailIndex),
                    }),
                    m("input[type='text']", {
                      value: detail[Object.keys(detail)[0]],
                      placeholder: "Value",
                      ...this.handleBaseCharacterValueInput(
                        detail,
                        detailIndex,
                      ),
                    }),
                    m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                      onclick: (e) => {
                        e.stopPropagation();
                        State.removeDetailFromBaseCharacter(detailIndex);
                      },
                    }, "Delete"),
                  ])
                  : m(
                    "span",
                    `${Object.keys(detail)[0]}: ${
                      detail[Object.keys(detail)[0]]
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
          "Characters",
          m("ul", [
            ...State.getLatestCharacterChanges().map((characterHelper) => {
              // Local state for character name
              const localCharacterName = {
                value: State.characters[characterHelper.characterIndex].name,
              };

              return m("li", [
                m("div", {
                  class: State.select.item === "character" &&
                      State.select.index === characterHelper.characterIndex &&
                      State.select.nestedIndex === null
                    ? "selected-active"
                    : State.select.item === "character" &&
                        State.select.index === characterHelper.characterIndex &&
                        State.select.nestedIndex === null &&
                        State.select.type === "edit"
                    ? "inline-edit"
                    : State.selectedCharacterIndex ===
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
                }, [
                  m("span.toggle", [
                    m("i.bi.bi-chevron-right"),
                  ]),
                  // Inline edit for character name
                  State.select.item === "character" &&
                    State.select.index === characterHelper.characterIndex &&
                    State.select.nestedIndex === null &&
                    State.select.type === "edit"
                    ? m("input[type='text']", {
                      value: localCharacterName.value,
                      oninput: (e) => {
                        localCharacterName.value = e.target.value;
                      },
                      onblur: () => {
                        State.updateCharacterName(
                          characterHelper.characterIndex,
                          localCharacterName.value,
                        );
                      },
                      onkeydown: (e) => {
                        if (e.key === "Enter") {
                          State.updateCharacterName(
                            characterHelper.characterIndex,
                            localCharacterName.value,
                          );
                          e.target.blur();
                        }
                      },
                      onfocus: (e) => {
                        e.target.select();
                      },
                    })
                    : m("span", {
                      onclick: () => {
                        State.select(
                          "character",
                          characterHelper.characterIndex,
                          null,
                        );
                      },
                    }, State.characters[characterHelper.characterIndex].name),
                  // Show delete button in edit mode for character
                  State.select.item === "character" &&
                    State.select.index === characterHelper.characterIndex &&
                    State.select.nestedIndex === null &&
                    State.select.type === "edit"
                    ? m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                      onclick: (e) => {
                        e.stopPropagation();
                        State.removeCharacter(characterHelper.characterIndex);
                      },
                    }, "Delete Item")
                    : null,
                ]),
                m("ul", [
                  ...structuredClone(
                    State.characters[characterHelper.characterIndex]
                      .states[characterHelper.latestStateIndex].details,
                  ).map((
                    detail,
                    detailIndex,
                  ) => {
                    // Local state for detail key and value
                    const localDetailState = {
                      key: Object.keys(detail)[0],
                      value: detail[Object.keys(detail)[0]],
                    };

                    return m("li", {
                      class: State.select.item === "character" &&
                          State.select.index ===
                            characterHelper.characterIndex &&
                          State.select.nestedIndex === detailIndex
                        ? "selected"
                        : State.select.item === "character" &&
                            State.select.index ===
                              characterHelper.characterIndex &&
                            State.select.nestedIndex === detailIndex &&
                            State.select.type === "edit"
                        ? "inline-edit"
                        : "",
                      onclick: (e) => {
                        e.stopPropagation();
                        State.select(
                          "character",
                          characterHelper.characterIndex,
                          detailIndex,
                        );
                      },
                    }, [
                      State.select.item === "character" &&
                        State.select.index ===
                          characterHelper.characterIndex &&
                        State.select.nestedIndex === detailIndex &&
                        State.select.type === "edit"
                        ? m("div.detail-edit", [
                          m("input[type='text']", {
                            value: localDetailState.key,
                            placeholder: "Key",
                            ...this.handleCharacterInput(
                              characterHelper,
                              detail,
                              detailIndex,
                            ),
                          }),
                          m("input[type='text']", {
                            value: localDetailState.value,
                            placeholder: "Value",
                            ...this.handleCharacterValueInput(
                              characterHelper,
                              detail,
                              detailIndex,
                            ),
                          }),
                          m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                            onclick: (e) => {
                              e.stopPropagation();
                              State.removeDetailFromCharacter(
                                characterHelper.characterIndex,
                                characterHelper.latestStateIndex,
                                detailIndex,
                              );
                            },
                          }, "Delete"),
                        ])
                        : m(
                          "span",
                          `${Object.keys(detail)[0]}: ${
                            detail[Object.keys(detail)[0]]
                          }`,
                        ),
                    ]);
                  }),
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
