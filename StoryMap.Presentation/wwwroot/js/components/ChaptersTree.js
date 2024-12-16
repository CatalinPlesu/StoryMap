import State from "/js/state.js";

const ChaptersTree = {
  // View function to render the component
  view() {
    return m("div.card.mb-3", [
      m("ul.tree.chapters#tree-chapter", [
        m("li", [
          m("span.toggle", [m("i.bi.bi-chevron-right")]),
          "Chapters",
          m("ul", [
            ...State.chapters.map((chapter, chapterIndex) =>
              m("li", [
                m("div", {
                  class: State.select.item === "chapter" &&
                      State.select.index === chapterIndex &&
                      State.select.nestedIndex === null
                    ? "selected"
                    : State.select.item === "chapter" &&
                        State.select.index === chapterIndex &&
                        State.select.type === "edit"
                    ? "inline-edit"
                    : "",
                  onclick: (e) => {
                    e.stopPropagation();
                    // Only select the chapter if not in edit mode
                    if (
                      !(
                        State.select.type === "edit" &&
                        State.select.index === chapterIndex
                      )
                    ) {
                      State.select("chapter", chapterIndex, null);
                    }
                  },
                }, [
                  m("span.toggle", [m("i.bi.bi-chevron-right")]),
                  State.select.item === "chapter" &&
                    State.select.index === chapterIndex &&
                    State.select.type === "edit"
                    ? m("input[type='text']", {
                      value: chapter.name,
                      oninput: (e) => {
                        chapter.name = e.target.value;
                      },
                      onblur: () => {
                        State.updateChapterName(chapterIndex, chapter.name);
                      },
                      onkeydown: (e) => {
                        if (e.key === "Enter") {
                          State.updateChapterName(
                            chapterIndex,
                            chapter.name,
                          );
                          e.target.blur();
                        }
                      },
                      onfocus: (e) => {
                        e.target.select();
                      },
                    })
                    : m(
                      "span",
                      {
                        ondblclick: () => {
                          State.select("chapter", chapterIndex, null);
                        },
                      },
                      chapter.name,
                    ),
                  State.select.item === "chapter" &&
                    State.select.index === chapterIndex &&
                    State.select.type === "edit"
                    ? m(
                      "button.btn.btn-sm.btn-outline-danger.ml-2",
                      {
                        onclick: (e) => {
                          e.stopPropagation();
                          State.removeChapter(chapterIndex);
                        },
                      },
                      "Delete Item",
                    )
                    : null,
                ]),
                m("ul", [
                  ...chapter.timeframes.map((timeframe, timeframeIndex) =>
                    m("li", {
                      class: State.select.item === "timeframe" &&
                          State.select.index === chapterIndex &&
                          State.select.nestedIndex === timeframeIndex
                        ? "selected-active"
                        : State.select.item === "timeframe" &&
                            State.select.index === chapterIndex &&
                            State.select.nestedIndex === timeframeIndex &&
                            State.select.type === "edit"
                        ? "inline-edit"
                        : State.selectedChapterIndex === chapterIndex &&
                            State.selectedTimeframeIndex === timeframeIndex
                        ? "active"
                        : "",
                      onclick: (e) => {
                        e.stopPropagation();
                        State.select("timeframe", chapterIndex, timeframeIndex);
                      },
                    }, [
                      State.select.item === "timeframe" &&
                        State.select.index === chapterIndex &&
                        State.select.nestedIndex === timeframeIndex &&
                        State.select.type === "edit"
                        ? m("input[type='text']", {
                          value: timeframe,
                          oninput: (e) => {
                            State.updateTimeframeInChapter(
                              chapterIndex,
                              timeframeIndex,
                              e.target.value,
                            );
                          },
                          onfocus: (e) => {
                            e.target.select();
                          },
                          onkeydown: (e) => {
                            if (e.key === "Enter") {
                              State.updateTimeframeInChapter(
                                chapterIndex,
                                timeframeIndex,
                                e.target.value,
                              );
                              e.target.blur();
                            }
                          },
                        })
                        : m("span", `${timeframe}`),
                      State.select.item === "timeframe" &&
                        State.select.index === chapterIndex &&
                        State.select.nestedIndex === timeframeIndex &&
                        State.select.type === "edit"
                        ? m(
                          "button.btn.btn-sm.btn-outline-danger.ml-2",
                          {
                            onclick: (e) => {
                              e.stopPropagation();
                              State.removeTimeframeFromChapter(
                                chapterIndex,
                                timeframeIndex,
                              );
                            },
                          },
                          "Delete Item",
                        )
                        : null,
                    ])
                  ),
                  m("li", [
                    m(
                      "button.btn.btn-outline-primary.upload-btn",
                      {
                        onclick: () => {
                          const newTimeframe = "New Timeframe";
                          State.addTimeframeToChapter(
                            chapterIndex,
                            newTimeframe,
                          );
                          State.select(
                            "timeframe",
                            chapterIndex,
                            chapter.timeframes.length - 1,
                          );
                        },
                      },
                      m("i.bi.bi-plus.upload-btn"),
                    ),
                  ]),
                ]),
              ])
            ),
            m("li", [
              m(
                "button.btn.btn-outline-primary",
                {
                  onclick: () => {
                    const newChapterName = prompt("Enter new chapter name:");
                    if (newChapterName) {
                      State.addChapter(newChapterName);
                    }
                  },
                },
                m("i.bi.bi-plus"),
              ),
            ]),
          ]),
        ]),
      ]),
    ]);
  },
};

export default ChaptersTree;
