import AppManager from "/js/AppManager/AppManager.js";
import ContextMenu from "/js/components/ContextMenu.js";

let appManager = AppManager.getInstance();

const ChaptersTree = {
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.chapters#tree-chapter", [
        m("li", [
          m("span.toggle", [m("i.bi.bi-chevron-right")]),
          "📖 Chapters",
          m("ul", [
            ...appManager.chapterGetAll().map((chapter, chapterIndex) =>
              m("li", [
                m("div", {
                  oncontextmenu: (e) => {
                    e.preventDefault();
                    const actions = [
                      {
                        label: "📝 Edit Chapter Name",
                        onClick: () => {
                          const newChapterName = prompt(
                            "Enter new chapter name:",
                            chapter.name,
                          );
                          if (newChapterName) {
                            appManager.chapterRename(chapterIndex, newChapterName);
                          }
                        },
                      },
                      {
                        label: "🗑️ Delete Chapter",
                        onClick: () => {
                          appManager.chapterRemove(chapterIndex);
                        },
                      },
                      {
                        label: "❌ Cancel",
                        onClick: () => { },
                      },
                    ];
                    appManager.storyModeView() ? null : ContextMenu.show(e, actions);
                  },
                }, [
                  m("span.toggle", [m("i.bi.bi-chevron-right")]),
                  m("span", {
                    ondblclick: () => {
                      appManager.select("chapter", chapterIndex, null);
                    },
                  }, chapter.name),
                ]),
                m("ul", [
                  ...chapter.timeframes.map((timeframe, timeframeIndex) =>
                    m("li", {
                      class: appManager.chapterCheckActive(chapterIndex, timeframeIndex)
                        ? "active"
                        : "",
                      onclick: (e) => {
                        e.stopPropagation();
                        appManager.select("timeframe", chapterIndex, timeframeIndex);
                      },
                      oncontextmenu: (e) => {
                        e.preventDefault();
                        appManager.select("timeframe", chapterIndex, timeframeIndex);
                        const actions = [
                          {
                            label: "📝 Edit Timeframe Name",
                            onClick: () => {
                              const newTimeframeName = prompt(
                                "Enter new timeframe name:",
                                timeframe,
                              );
                              if (newTimeframeName) {
                                appManager.chapterUpdateTimeframe(
                                  chapterIndex,
                                  timeframeIndex,
                                  newTimeframeName,
                                );
                              }
                            },
                          },
                          {
                            label: "🗑️ Delete Timeframe",
                            onClick: () => {
                              appManager.chapterRemoveTimeframe(
                                chapterIndex,
                                timeframeIndex,
                              );
                            },
                          },
                          {
                            label: "❌ Cancel",
                            onClick: () => { },
                          },
                        ];
                        appManager.storyMode() === "view" ? null : ContextMenu.show(e, actions);
                      },
                    }, [
                      m("span", `${timeframe}`),
                    ])
                  ),
                  appManager.storyMode() === "view" ? null :
                    m("li", [
                      m("button.btn.btn-outline-primary.upload-btn", {
                        onclick: () => {
                          const newTimeframe = "Timeframe " +
                            appManager.chapterGetAll()[chapterIndex].timeframes.length;
                          appManager.chapterAddTimeframe(chapterIndex, newTimeframe);
                          appManager.select(
                            "timeframe",
                            chapterIndex,
                            chapter.timeframes.length - 1,
                          );
                        },
                      }, m("i.bi.bi-plus.upload-btn")),
                    ]),
                ]),
              ])
            ),
            appManager.storyModeView()? null :
              m("li", [
                m("button.btn.btn-outline-primary", {
                  onclick: () => {
                    const newChapterName = prompt("Enter new chapter name:");
                    if (newChapterName) {
                      appManager.chapterAdd(newChapterName);
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

export default ChaptersTree;
