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
                m("label", "Speed (seconds): "), // Label for speed input
                m("input[type=text]", {
                    value: State.speed || 1,
                    oninput: (e) => {
                        const newSpeed = parseFloat(e.target.value);
                        if (!isNaN(newSpeed) && newSpeed > 0) {
                            State.speed = newSpeed; // Update speed in State
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
                    State.navigateTimeframe(-1); // Navigate to the previous timeframe
                }
            }, [
                m("i", { class: "bi bi-arrow-left" }) // Use Bootstrap icon for back
            ]),
            m("button.btn.btn-control", {
                onclick: () => {
                    // Logic for play/pause
                    if (State.isPlaying) {
                        State.isPlaying = false; // Stop playing
                    } else {
                        this.play(); // Start playing
                        State.isPlaying = true; // Update play state
                    }
                },
                style: {
                    backgroundColor: State.isPlaying ? "green" : "grey", // Change color based on play/pause state
                }
            }, [
                m("i", { class: State.isPlaying ? "bi bi-play" : "bi bi-pause" }) // Use Bootstrap icons for play/pause
            ]),
            m("button.btn.btn-control", {
                onclick: () => {
                    State.navigateTimeframe(1); // Navigate to the next timeframe
                }
            }, [
                m("i", { class: "bi bi-arrow-right" }) // Use Bootstrap icon for next
            ]),
        ]) : null;
    },

    play() {
        const timePerFrame = (State.speed || 1) * 1000; // Ensure speed is used correctly, default to 1 second
        let currentChapterIndex = State.selectedChapterIndex;
        let currentTimeframeIndex = State.selectedTimeframeIndex;

        const intervalId = setInterval(() => {
            // Check if isPlaying is false and clear the interval if so
            if (!State.isPlaying) {
                clearInterval(intervalId); // Stop the interval
                return; // Exit the function
            }

            // Move to the next timeframe using the new function
            State.navigateTimeframe(1); // Move to the next timeframe

            if (State.selectedChapterIndex >= State.chapters.length - 1
                && State.selectedTimeframeIndex >=
                State.chapters[State.selectedChapterIndex].timeframes.length - 1) {
                clearInterval(intervalId); // Stop the interval
                State.isPlaying = false; // Update play state
            }
        }, timePerFrame);
    },
};

export default ControlPanel; 