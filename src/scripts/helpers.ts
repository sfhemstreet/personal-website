

/**
 * Query selector with null check.
 * Parent is optional, uses document if not given.
 * 
 * @param query 
 * @param parent
 */
export function getElement(query: string, parent?: Document | Element): Element {
  const el = (parent ? parent : document).querySelector(query);

  if (!el) {
    throw new Error(`Query '${query}' didn't find element`);
  }
  return el;
}

/**
 * Query selector all with null check.
 * Parent is optional, uses document if not given.
 * 
 * @param query 
 * @param parent
 */
export function getElements(query: string, parent?: Document | Element): NodeListOf<Element> {
  const elements = (parent ? parent : document).querySelectorAll(query);

  if (!elements) throw new Error(`No elements with query '${query}'`);

  return elements;
}

/**
 * Changes 'display' to 'none' on element.
 * @param element
 */
export function hideElement(element: Element) {
  element.classList.add("no-show");
}

/**
 * Fades out element.
 * @param element
 */
export function fadeElement(element: Element) {
  element.classList.add("fade-out");
}

/**
 * Fades out element with special effect.
 * @param element
 */
export function fadeSpecialElement(element: Element) {
  element.classList.add("trip-out");
}

/**
 * Removes all classes that could hide an element.
 *
 * @param element
 */
export function revealElement(element: Element) {
  element.classList.remove("trip-out");
  element.classList.remove("fade-out");
  element.classList.remove("no-show");
}

/**
 * Removes all classes that could hide an element, 
 * on all elements of given parent. 
 * If no parent is given uses 'document'.
 *
 * @param parent
 */
export function revealAllElements(parent?: Document | Element) {
  const elements = (parent ? parent : document).querySelectorAll(".no-show");

  elements.forEach((el) => {
    revealElement(el);
  });
}