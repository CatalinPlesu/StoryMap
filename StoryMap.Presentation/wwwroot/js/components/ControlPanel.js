import State from "/js/state.js";

const ControlPanel = {
    view() {
        return State.mode === 'view' ? m("div.control-panel", {
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
                    value: State.speed || 1,
                    oninput: (e) => {
                        const newSpeed = parseFloat(e.target.value);
                        if (!isNaN(newSpeed) && newSpeed > 0) {
                            State.speed = newSpeed; 
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
                    State.navigateTimeframe(-1); 
                }
            }, [
                m("i", { class: "bi bi-arrow-left" }) 
            ]),
            m("button.btn.btn-control", {
                onclick: () => {
                    
                    if (State.isPlaying) {
                        State.isPlaying = false; 
                    } else {
                        this.play(); 
                        State.isPlaying = true; 
                    }
                },
                style: {
                    backgroundColor: State.isPlaying ? "green" : "grey", 
                }
            }, [
                m("i", { class: State.isPlaying ? "bi bi-play" : "bi bi-pause" }) 
            ]),
            m("button.btn.btn-control", {
                onclick: () => {
                    State.navigateTimeframe(1);
                }
            }, [
                m("i", { class: "bi bi-arrow-right" })
            ]),
        ]) : null;
    },

    play() {
        const timePerFrame = (State.speed || 1) * 1000; 
        let currentChapterIndex = State.selectedChapterIndex;
        let currentTimeframeIndex = State.selectedTimeframeIndex;

        const intervalId = setInterval(() => {
            if (!State.isPlaying) {
                clearInterval(intervalId); 
                return; 
            }

            State.navigateTimeframe(1); 

            if (State.selectedChapterIndex >= State.chapters.length - 1
                && State.selectedTimeframeIndex >=
                State.chapters[State.selectedChapterIndex].timeframes.length - 1) {
                clearInterval(intervalId); 
                State.isPlaying = false; 
            }
        }, timePerFrame);
    },
};

export default ControlPanel; 