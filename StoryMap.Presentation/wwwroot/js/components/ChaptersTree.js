import State from "/js/state.js";
import ContextMenu from "/js/components/ContextMenu.js";

const ChaptersTree = {
  // View function to render the component
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.chapters#tree-chapter", [
        m("li", [
          m("span.toggle", [m("i.bi.bi-chevron-right")]),
          "📖 Chapters",
          m("ul", [
            ...State.chapters.map((chapter, chapterIndex) =>
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
                            State.updateChapterName(
                              chapterIndex,
                              newChapterName,
                            );
                          }
                        },
                      },
                      {
                        label: "🗑️ Delete Chapter",
                        onClick: () => {
                          State.removeChapter(chapterIndex);
                        },
                      },
                      {
                        label: "❌ Cancel",
                        onClick: () => {},
                      },
                    ];
                    ContextMenu.show(e, actions, 111);
                  },
                }, [
                  m("span.toggle", [m("i.bi.bi-chevron-right")]),
                  m("span", {
                    ondblclick: () => {
                      State.select("chapter", chapterIndex, null);
                    },
                  }, chapter.name),
                ]),
                m("ul", [
                  ...chapter.timeframes.map((timeframe, timeframeIndex) =>
                    m("li", {
                      class: State.selectedChapterIndex === chapterIndex &&
                          State.selectedTimeframeIndex === timeframeIndex
                        ? "active"
                        : "",
                      onclick: (e) => {
                        e.stopPropagation();
                        State.select("timeframe", chapterIndex, timeframeIndex);
                      },
                      oncontextmenu: (e) => {
                        e.preventDefault();
                        State.select("timeframe", chapterIndex, timeframeIndex);
                        const actions = [
                          {
                            label: "📝 Edit Timeframe Name",
                            onClick: () => {
                              const newTimeframeName = prompt(
                                "Enter new timeframe name:",
                                timeframe,
                              );
                              if (newTimeframeName) {
                                State.updateTimeframeInChapter(
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
                              State.removeTimeframeFromChapter(
                                chapterIndex,
                                timeframeIndex,
                              );
                            },
                          },
                          {
                            label: "❌ Cancel",
                            onClick: () => {},
                          },
                        ];
                        ContextMenu.show(e, actions, 111);
                      },
                    }, [
                      m("span", `${timeframe}`),
                    ])
                  ),
                  m("li", [
                    m("button.btn.btn-outline-primary.upload-btn", {
                      onclick: () => {
                        const newTimeframe = "Timeframe " +
                          State.chapters[chapterIndex].timeframes.length;
                        State.addTimeframeToChapter(chapterIndex, newTimeframe);
                        State.select(
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
            m("li", [
              m("button.btn.btn-outline-primary", {
                onclick: () => {
                  const newChapterName = prompt("Enter new chapter name:");
                  if (newChapterName) {
                    State.addChapter(newChapterName);
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
