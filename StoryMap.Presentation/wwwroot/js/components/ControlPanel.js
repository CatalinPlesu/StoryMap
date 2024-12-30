import AppManager from "/js/AppManager/AppManager.js";

const ControlPanel = {
    view() {
    const appManager = AppManager.getInstance();

    return appManager.storyModeView() ? m("div.control-panel", {
            style: {
                position: "absolute",
                bottom: "20px",
                right: "270px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }
        }, [
            m("div.speed-control", [
                m("label", "Speed (seconds): "), 
                m("input[type=text]", {
          value: appManager.storyGetSpeed() || 1,
                    oninput: (e) => {
                        const newSpeed = parseFloat(e.target.value);
                        if (!isNaN(newSpeed) && newSpeed > 0) {
              appManager.storySetSpeed(newSpeed);
                        }
                    },
                    style: {
                        width: "50px",
                        marginLeft: "5px",
                    }
                }),
            ]),
            m("button.btn.btn-control", {
                onclick: () => {
          appManager.navigateTimeframe(-1);
                }
            }, [
                m("i", { class: "bi bi-arrow-left" }) 
            ]),
            m("button.btn.btn-control", {
                onclick: () => {
          if (appManager.storyGetIsPlaying()) {
            appManager.storySetIsPlaying(false);
                    } else {
                        this.play(); 
            appManager.storySetIsPlaying(true);
                    }
                },
                style: {
          backgroundColor: appManager.storyGetIsPlaying() ? "green" : "grey",
                }
            }, [
        m("i", { class: appManager.storyGetIsPlaying() ? "bi bi-play" : "bi bi-pause" })
            ]),
            m("button.btn.btn-control", {
                onclick: () => {
          appManager.navigateTimeframe(1);
                }
            }, [
                m("i", { class: "bi bi-arrow-right" })
            ]),
        ]) : null;
    },

    play() {
    const appManager = AppManager.getInstance();
    const timePerFrame = (appManager.storyGetSpeed() || 1) * 1000;

        const intervalId = setInterval(() => {
      if (!appManager.storyGetIsPlaying()) {
                clearInterval(intervalId); 
                return; 
            }

      appManager.navigateTimeframe(1);

      if (appManager.storyIsLastTimeframe()) {
                clearInterval(intervalId); 
        appManager.storySetIsPlaying(false);
            }
        }, timePerFrame);
    },
};

export default ControlPanel; 