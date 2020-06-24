/**
 * ScrollerFx creates a scrolling trigger FX to given elements.
 *
 * It takes a NodeListOf Elements and applies the given hidden class
 * to them.  When the element is scrolled into view it
 * removes the hidden class from the element and applies the FX class
 * 
 * @param elements elements to apply scroll fx to
   * @param fxClassName css class that applies the desired scroll fx
   * @param hiddenClassName css class that is applied to elements before scrolling into view, usually "opacity: 0"
 */
export function ScrollerFx(
    elements: Element[],
    fxClassName: string,
    hiddenClassName: string
  ) {
    let windowHeight = window.innerHeight;

    hideAllElements();
    checkElementsPosition();
    window.addEventListener("scroll", checkElementsPosition, false);
    window.addEventListener("resize", resizeHeight, false);

    console.log(elements)
  

  function hideAllElements() {
    console.log("HIDE", elements)
    elements.forEach((el) => el.classList.add(hiddenClassName));
  }

  function checkElementsPosition() {
    console.log("CHECK", elements)
    elements.forEach((el) => {
      const positionFromTop = el.getBoundingClientRect().top;

      if (
        positionFromTop - windowHeight <= 0 &&
        el.classList.contains(hiddenClassName)
      ) {
        el.classList.replace(hiddenClassName, fxClassName);
      }
    });
  }

  function resizeHeight() {
    windowHeight = window.innerHeight;
  }
}