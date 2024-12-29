import ContextMenu from "/js/components/ContextMenu.js";
import AppManager from "/js/AppManager/AppManager.js";

let appManager = AppManager.getInstance();
globalThis.appManager = appManager;

const CharactersTree = {
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.characters#tree-characters", [
        appManager.storyModeView() ? null : m("li", {
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
                    appManager.baseCharacterAddDetail(newDetail);
                  }
                },
              },
              {
                label: "❌ Cancel",
                onClick: (_) => {},
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
            ...appManager.baseCharacterGetDetails().map((detail, detailIndex) =>
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
                          appManager.baseCharacterUpdateDetail(
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
                        const newValue = prompt(
                          "✏️ Edit detail property:",
                          value,
                        );
                        if (newValue) {
                          const newDetail = { [key]: newValue };
                          appManager.baseCharacterUpdateDetail(
                            detailIndex,
                            newDetail,
                          );
                        }
                      },
                    },
                    {
                      label: "🗑️ Delete",
                      onClick: (_) => {
                        appManager.baseCharacterRemoveDetail(detailIndex);
                      },
                    },
                    {
                      label: "❌ Cancel",
                      onClick: (_) => {},
                    },
                  ];
                  ContextMenu.show(e, actions);
                },
              }, [
                m(
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
                    appManager.baseCharacterAddDetail(newDetail);
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
            ...appManager.characterGetLatestChanges().map((characterHelper) => {
              return m("li", [
                m("div", {
                  class: appManager.characterGetSelectedIndex() ===
                      characterHelper.characterIndex
                    ? "active"
                    : "",
                  onclick: (e) => {
                    e.stopPropagation();
                    appManager.select(
                      "character",
                      characterHelper.characterIndex,
                      null,
                    );
                  },
                  oncontextmenu: (e) => {
                    const actions = [
                      {
                        label: `✏️ Edit Name`,
                        onClick: (_) => {
                          const value = appManager
                            .characterGetAll()[characterHelper.characterIndex]
                            .name;

                          const newValue = prompt(
                            "✏️ Edit character name:",
                            value,
                          );

                          appManager.characterRename(
                            characterHelper.characterIndex,
                            newValue,
                          );
                        },
                      },
                      {
                        label: "➕ Add Detail",
                        onClick: (_) => {
                          const key = prompt(
                            "Enter detail property (e.g., health, race):",
                          );
                          const value = prompt("Enter detail value:");
                          if (key && value) {
                            const newDetail = { [key]: value };
                            appManager.characterAddDetail(
                              characterHelper.characterIndex,
                              characterHelper.latestStateIndex,
                              newDetail,
                            );
                          }
                        },
                      },
                      {
                        label: "🛬 Bring to current map",
                        onClick: (_) => {
                          appManager.characterBringToMap(
                            characterHelper.characterIndex,
                            characterHelper.latestStateIndex,
                          );
                        },
                      },
                      {
                        label: "⬆️ Move Up",
                        onClick: (_) => {
                          appManager.characterMove(
                            characterHelper.characterIndex,
                            -1,
                          );
                        },
                      },
                      {
                        label: "⬇️ Move Down",
                        onClick: (_) => {
                          appManager.characterMove(
                            characterHelper.characterIndex,
                            1,
                          );
                        },
                      },
                      {
                        label: "🖨️ Clone",
                        onClick: (_) => {
                          appManager.characterClone(
                            characterHelper.characterIndex,
                            characterHelper.latestStateIndex,
                          );
                        },
                      },
                      {
                        label: "🗑️ Delete",
                        onClick: (_) => {
                          appManager.characterRemove(
                            characterHelper.characterIndex,
                          );
                        },
                      },
                      {
                        label: "❌ Cancel",
                        onClick: (_) => {},
                      },
                    ];
                    appManager.storyModeView()
                      ? null
                      : ContextMenu.show(e, actions, characterHelper);
                  },
                }, [
                  m("span.toggle", [
                    m("i.bi.bi-chevron-right"),
                  ]),
                  m(
                    "span",
                    `${
                      appManager
                        .characterGetAll()[characterHelper.characterIndex].name
                    } ${
                      appManager
                          .characterGetAll()[characterHelper.characterIndex]
                          .states[characterHelper.latestStateIndex].mapId ===
                          appManager.mapGetSelectedIndex()
                        ? "🌍📍"
                        : "🌍🚫"
                    }`,
                  ),
                ]),
                m("ul", [
                  ...appManager
                    .characterGetAll()[characterHelper.characterIndex]
                    .states[characterHelper.latestStateIndex].details.map(
                      (detail, detailIndex) => {
                        return m("li", {
                          class: appManager.characterCheckModifiedDetail(
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
                                    appManager.characterUpdateDetail(
                                      characterHelper.characterIndex,
                                      characterHelper.latestStateIndex,
                                      detailIndex,
                                      newDetail,
                                    );
                                  }
                                },
                              },
                              {
                                label: `✏️ Edit Value: ${
                                  detail[Object.keys(detail)[0]]
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
                                    appManager.characterUpdateDetail(
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
                                  appManager.characterRemoveDetail(
                                    characterHelper.characterIndex,
                                    characterHelper.latestStateIndex,
                                    detailIndex,
                                  );
                                },
                              },
                              {
                                label: "❌ Cancel",
                                onClick: (_) => {},
                              },
                            ];
                            appManager.storyModeView()
                              ? null
                              : ContextMenu.show(e, actions);
                          },
                          onclick: (e) => {
                            e.stopPropagation();
                            appManager.select(
                              "character",
                              characterHelper.characterIndex,
                              detailIndex,
                            );
                          },
                        }, [
                          m(
                            "span",
                            `${Object.keys(detail)[0]}: ${
                              detail[Object.keys(detail)[0]]
                            }`,
                          ),
                        ]);
                      },
                    ),
                  appManager.storyModeView() ? null : m("li", [
                    m("button.btn.btn-outline-primary.add-detail-btn", {
                      onclick: () => {
                        const key = prompt(
                          "Enter detail property (e.g., health, race):",
                        );
                        const value = prompt("Enter detail value:");
                        if (key && value) {
                          const newDetail = { [key]: value };
                          appManager.characterAddDetail(
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
            appManager.storyModeView() ? null : m("li", [
              m("button.btn.btn-outline-primary", {
                onclick: () => {
                  const newCharacterName = prompt("Enter new character name:");
                  if (newCharacterName) {
                    appManager.characterAdd(newCharacterName);
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
