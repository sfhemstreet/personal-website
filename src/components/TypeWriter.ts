/**
 * Creates typewriter effect that loops over given string array.
 */
export class TypeWriter {
  textData: string[];
  element: Element;
  letterTiming: number;
  lineTiming: number;
  completeTiming: number;
  onComplete: () => void;
  timeoutId: number;

  /**
   *
   * @param textData array of strings to display in loop.
   * @param element reference to element to diplay in.
   *
   * `options`
   * @param lineTiming how long a line of text is left on screen.
   * @param letterTiming how long it takes each letter to be displayed.
   * @param completeTiming how long to wait before starting loop again for calling onComplete.
   * @param onComplete function to call when full loop of textData is done, if omitted, loops over textData forever.
   */
  constructor(
    textData: string[],
    element: Element,
    options?: {
      onComplete?: () => void;
      lineTiming?: number;
      letterTiming?: number;
      completeTiming?: number;
    }
  ) {
    this.textData = textData;
    this.element = element;
    this.lineTiming = options?.lineTiming || 1000;
    this.letterTiming = options?.letterTiming || 100;
    this.completeTiming = options?.completeTiming || 2000;
    this.onComplete = options?.onComplete || (() => this.render());
    this.timeoutId = 0;
  }

  private typeWords(word: string, letterIndex: number, fnCallback: () => void) {
    if (letterIndex < word.length) {
      this.element.innerHTML =
        word.substring(0, letterIndex + 1) + '<span aria-hidden="true"></span>';

      this.timeoutId = setTimeout(() => {
        this.typeWords(word, letterIndex + 1, fnCallback);
      }, this.letterTiming);
    } else {
      this.timeoutId = setTimeout(fnCallback, this.lineTiming);
    }
  }

  private animate = (wordIndex = 0) => {
    // Done iterating over textData
    if (!this.textData[wordIndex]) {
      this.timeoutId = setTimeout(() => {
        this.onComplete();
      }, this.completeTiming);
    }

    if (
      this.textData[wordIndex] &&
      wordIndex < this.textData[wordIndex].length
    ) {
      this.typeWords(this.textData[wordIndex], 0, () => {
        this.animate(wordIndex + 1);
      });
    }
  };

  cancel() {
    clearTimeout(this.timeoutId);
  }

  render() {
    this.animate();
  }
}
