import State from "/js/state.js";

const ChaptersTree = {
  view() {
    return m("div.card.mb-3", [
      m("ul.tree#tree-chapter", [
        m("li", [
          m("span.toggle", [
            m("i.bi.bi-chevron-right")
          ]),
          "Chapters",
          m("ul", [
            ...State.chapters.map((chapter, chapterIndex) => 
              m("li.editable", [
                m("span.toggle", [
                  m("i.bi.bi-chevron-right")
                ]),
                m("span", chapter.name),
                m("button.btn.btn-sm.btn-outline-danger.ml-2", {
                  onclick: () => State.removeChapter(chapterIndex)
                }, "X"),
                m("ul", [
                  ...chapter.timeframes.map((timeframe, timeIndex) => 
                    m("li.editable", `Timeframe ${timeIndex + 1}: ${timeframe}`)
                  ),
                  m("li", [
                    m("button.btn.btn-outline-primary", [
                      m("i.bi.bi-plus")
                    ])
                  ])
                ])
              ])
            ),
            m("li", [
              m("button.btn.btn-outline-primary", {
                onclick: () => {
                  const newChapterName = prompt("Enter new chapter name:");
                  if (newChapterName) {
                    State.addChapter({ name: newChapterName, timeframes: [] });
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

export default ChaptersTree;

