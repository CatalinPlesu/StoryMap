import AppManager from "./AppManager/AppManager.js";
import AppMagerHomePageDecorator from "./AppManager/Decorator/AppMagerHomePageDecorator.js";

// Initialize AppManager
globalThis.appManager = AppManager.getInstance();
let appManager = new AppMagerHomePageDecorator(AppManager.getInstance());
appManager.init();

// HomePage component
const HomePage = {
  view() {
    // Fetch all stories from appManager
    const stories = appManager.wrapee.storiesGetAll();

    return m("div.container.mt-3", [
      m("div.row.mt-5.pt-5", [
        // Create New Item Card
        m(
          "div.col-md-4.mb-4",
          m(
            "a",
            { href: "/Story/Create", class: "text-decoration-none" },
            m("div.card.text-center.card-limited-height", [
              m("div.position-relative", [
                m("img.card-img-top.rounded-top.faded-image", {
                  src: "https://static3.depositphotos.com/1000941/160/i/450/depositphotos_1602106-stock-photo-sign-plus-on-white-background.jpg",
                  alt: "Create Story",
                }),
                m("div.overlay", m("h5.text-white", "Create Story")),
              ]),
            ])
          )
        ),
        // Story Items
        stories.map((story, index) =>
          m(
            "div.col-md-4.mb-4",
            m(
              "div.card.text-center.card-limited-height",
              {
                onclick: () => {
                  // Save story ID to localStorage and navigate
                  localStorage.setItem("storyId", story.id);
                  window.location.href = `/Story/`;
                },
                style: "cursor: pointer",
              },
              m("div.position-relative", [
                m("img.card-img-top.rounded-top.faded-image", {
                  src: story?.cover?.file ? URL.createObjectURL(story.cover.file) : "https://atlasoficeandfireblog.wordpress.com/wp-content/uploads/2019/03/arrakis-latitude.png",
                  alt: `Story ${index}`,
                }),
                m("div.overlay", m("h5.text-white", story.name ? story.name : `Story ${index}`)),
              ])
            )
          )
        ),
      ]),
    ]);
  },
};

// Mount the HomePage component
m.mount(document.getElementById("home-app"), HomePage);
