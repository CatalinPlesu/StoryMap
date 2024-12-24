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
                    // Logic for previous timeframe
                    if (State.selectedTimeframeIndex > 0) {
                        State.selectedTimeframeIndex--; // Move to the previous timeframe
                    } else if (State.selectedChapterIndex > 0) {
                        State.selectedChapterIndex--; // Move to the previous chapter
                        State.selectedTimeframeIndex = State.chapters[State.selectedChapterIndex].timeframes.length - 1; // Go to the last timeframe of the previous chapter
                    }
                    State.select("timeframe", State.selectedChapterIndex, State.selectedTimeframeIndex); // Update selection
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
                    // Logic for next timeframe
                    if (State.selectedTimeframeIndex < State.chapters[State.selectedChapterIndex].timeframes.length - 1) {
                        State.selectedTimeframeIndex++; // Move to the next timeframe
                    } else if (State.selectedChapterIndex < State.chapters.length - 1) {
                        State.selectedChapterIndex++; // Move to the next chapter
                        State.selectedTimeframeIndex = 0; // Go to the first timeframe of the next chapter
                    }
                    State.select("timeframe", State.selectedChapterIndex, State.selectedTimeframeIndex); // Update selection
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
            // Select the current chapter and timeframe
            State.select("timeframe", currentChapterIndex, currentTimeframeIndex);

            // Move to the next timeframe
            currentTimeframeIndex++;

            // Check if we need to move to the next chapter
            if (currentTimeframeIndex >= State.chapters[currentChapterIndex].timeframes.length) {
                currentTimeframeIndex = 0; // Reset to the first timeframe
                currentChapterIndex++; // Move to the next chapter
            }

            // Stop if we have gone through all chapters
            if (currentChapterIndex >= State.chapters.length) {
                clearInterval(intervalId); // Stop the interval
                State.isPlaying = false; // Update play state
            }
        }, timePerFrame);
    }
};

export default ControlPanel; 