const NavigationState = {
  selected: { item: "map", index: 0, nestedIndex: null },

  navigateTimeframe(direction) {
    if (direction === 1) {
      if (this.selectedTimeframeIndex < this.chapters[this.selectedChapterIndex].timeframes.length - 1) {
        this.selectedTimeframeIndex++;
      } else if (this.selectedChapterIndex < this.chapters.length - 1) {
        this.selectedChapterIndex++;
        this.selectedTimeframeIndex = 0;
      }
    } else if (direction === -1) {
      if (this.selectedTimeframeIndex > 0) {
        this.selectedTimeframeIndex--;
      } else if (this.selectedChapterIndex > 0) {
        this.selectedChapterIndex--;
        this.selectedTimeframeIndex = this.chapters[this.selectedChapterIndex].timeframes.length - 1;
      }
    }
    this.select("timeframe", this.selectedChapterIndex, this.selectedTimeframeIndex);
  },
};

export default NavigationState;

