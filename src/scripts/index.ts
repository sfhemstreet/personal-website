import { projects as PROJECTS, Project } from "../constants/projects";
import { TypeWriter } from "../components/TypeWriter";
import { ScrollerFx } from "../components/ScrollerFX";
import {
  getElement,
  revealElement,
  fadeElement,
  fadeSpecialElement,
  hideElement,
  getElements,
} from "./helpers";

// Time fom last intro view in ms
const INTRO_WAIT_TIME = 60000 * 3;
// Key used to check and set intro view time in storage
const INTRO_STORAGE_KEY = "aaepeeseec";

window.addEventListener("load", homePage, false);

/**
 * Controls homepage animations and mounting of content.
 */
function homePage() {
  const titleData = [
    "name: SPENCER_HEMSTREET",
    "skillSet: FULL_STACK_DEVELOPER",
  ];

  const showIntro: boolean = getHasViewedIntro();
  if (showIntro) {
    typeWriterEffectIntro(titleData, onIntroOver);
    setHasViewedIntro();
  } else {
    onIntroOver();
  }

  /**
   * Fades in Title, Project Button, and Address elements,
   * and attachs event listener to projects button.
   */
  function onIntroOver() {
    const projectsButton = getElement(".projects-button");
    const addressElement = getElement("address");
    const projectsButtonGradient = getElement(".projects-button-gradient");

    mountTitle(titleData);
    revealElement(projectsButton);
    revealElement(projectsButtonGradient);
    revealElement(addressElement);

    projectsButton.addEventListener("click", onClickProjectsButton, false);
  }

  /**
   * Fades out Title, Project Button, and Address elements, then
   * fades in Back Button and Projects.
   */
  function onClickProjectsButton() {
    const mainElement = getElement("main");
    const addressElement = getElement("address");
    const projectsButtonGradient = getElement(".projects-button-gradient");
    const projectsButton = getElement(".projects-button");
    const backButton = getElement(".back-button");

    projectsButton.removeEventListener("click", onClickProjectsButton, false);

    unmountTitle();
    fadeElement(addressElement);
    fadeSpecialElement(projectsButton);
    fadeElement(projectsButtonGradient);

    // Wait for elements to fade out before removing them.
    setTimeout(() => {
      hideElement(addressElement);
      hideElement(projectsButton);
      hideElement(projectsButtonGradient);

      // Append projects to document fragment, then append fragment to main element.
      const docFrag = document.createDocumentFragment();
      PROJECTS.forEach((proj) => {
        const projDoc = createProject(proj);
        docFrag.appendChild(projDoc);
      });
      mainElement.appendChild(docFrag);

      // Apply scroll FX to each div in each project.
      const projContainers = mainElement.querySelectorAll(".project");
      let projDivs: Element[] = [];
      projContainers.forEach((container) => {
        projDivs.push(...Array.from(container.querySelectorAll("div")));
      });
      ScrollerFx(projDivs, "scroll-fx", "see-thru");

      // Show back button and add event listener to remove projects
      revealElement(backButton);
      backButton.addEventListener("click", onClickBackButton, false);
    }, 1400);
  }

  /**
   * Fades out Projects and Back Button, and calls onIntroOver.
   */
  function onClickBackButton() {
    const backButton = getElement(".back-button");
    const projectElements = getElements(".project");

    backButton.removeEventListener("click", onClickBackButton, false);

    fadeElement(backButton);

    projectElements.forEach((el) => {
      fadeSpecialElement(el);

      setTimeout(() => {
        el.remove();
      }, 500);
    });

    setTimeout(() => {
      onIntroOver();
    }, 1000);
  }
}

/**
 * See if user has seen the intro recently.
 */
function getHasViewedIntro(): boolean {
  if (!window || !window.sessionStorage) return true;

  const viewTime = window.sessionStorage.getItem(INTRO_STORAGE_KEY);

  return viewTime
    ? Date.now() - parseInt(viewTime, 10) > INTRO_WAIT_TIME
    : true;
}

/**
 * Sets time that user has seen intro.
 */
function setHasViewedIntro() {
  if (!window || !window.sessionStorage) return;

  window.sessionStorage.setItem(INTRO_STORAGE_KEY, `${Date.now()}`);
}

/**
 * Creates Title and appends it to the title container.
 */
function mountTitle(titleData: string[]) {
  const titleFrag = createTitle(titleData);

  getElement(".title-container").appendChild(titleFrag);
}

/**
 * Fades and removes Title
 */
function unmountTitle() {
  const container = getElement(".title-container");
  const title = container.querySelector(".title");

  if (!title) throw new Error("No title to remove");

  fadeElement(title);

  setTimeout(() => {
    title.remove();
  }, 1500);
}

/**
 * Creates Title document fragment
 * @param string[]
 */
function createTitle(titleData: string[]): DocumentFragment {
  const docFrag = document.createDocumentFragment();
  const container = document.createElement("div");
  container.className = "title";

  for (let i = 0; i < titleData.length; i++) {
    const el = document.createElement(i === 0 ? "h1" : "h3");
    let textContent = titleData[i]
      .substring(titleData[i].indexOf(":") + 1)
      .replace(/_/g, " ");
    if (i > 0) {
      textContent = textContent.toLowerCase();
    }
    el.textContent = textContent;
    container.appendChild(el);
  }
  docFrag.appendChild(container);

  return docFrag;
}

/**
 * Creates project document fragment.
 * @param project
 */
function createProject(project: Project): DocumentFragment {
  // Makes project title section with links.
  const makeTitle = (name: string, gitURL?: string, liveURL?: string) => {
    const title = document.createElement("h1");
    title.textContent = name;

    // Creates "a" tag element.
    const makeLink = (url: string, text: string) => {
      const link = document.createElement("a");
      link.textContent = text;
      link.href = url;
      link.rel = "noreferrer";
      link.target = "_blank";
      return link;
    };

    // Not all projects have github links, check first.
    const githubLink = gitURL ? makeLink(gitURL, "Code") : null;
    if (githubLink) {
      githubLink.classList.add("project-github");
    }
    
    // Not all projects have live links, check first.
    const liveLink = liveURL ? makeLink(liveURL, "Live") : null;
    if (liveLink) {
      liveLink.classList.add("project-live");
    }

    const linkContainer = document.createElement("span");
    if (githubLink) linkContainer.appendChild(githubLink);
    if (liveLink) linkContainer.appendChild(liveLink);

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("project-title");
    titleContainer.appendChild(title);
    titleContainer.appendChild(linkContainer);

    return titleContainer;
  };

  // Creates a div with title and paragraph.
  const makeSection = (title: string, content: string) => {
    const section = document.createElement("div");
    section.classList.add("project-section");

    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = title;

    // use innerHTML to help format breaks in text
    const sectionContent = document.createElement("p");
    sectionContent.innerHTML = content;

    section.appendChild(sectionTitle);
    section.appendChild(sectionContent);

    return section;
  };

  // Creates a div with title and list
  const makeList = (title: string, items: string[]) => {
    const list = document.createElement("div");
    list.classList.add("project-list");

    const listTitle = document.createElement("h3");
    listTitle.textContent = title;

    list.appendChild(listTitle);

    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    list.appendChild(ul);

    return list;
  };

  // Document fragment and article container
  const docFrag = document.createDocumentFragment();
  const container = document.createElement("article");
  container.classList.add("project");

  const title = makeTitle(project.name, project.githubLink, project.liveLink);
  const description = makeSection("Description", project.description);
  const tech = makeList("Technologies", project.technologies);

  // Project based sections
  const difficulties = project.difficulties ? makeSection("Challenges", project.difficulties) : undefined;
  const solution = project.solution ? makeSection("Solution", project.solution) : undefined;
  const features = project.features ? makeList("Features", project.features) : undefined;
  // Work based section
  const overview = project.overview && makeSection("Overview", project.overview);

  // Typescript undefined filter
  const isHTMLDivElement = (item: HTMLDivElement | undefined): item is HTMLDivElement => {
    return !!item
  }

  const optionalSections = overview ? [overview] : [features, difficulties, solution].filter(isHTMLDivElement);

  // Image Div and fill with images
  const images = document.createElement("div");
  project.images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    images.appendChild(img);
  });
  images.classList.add("project-images");

  // Order of content in article container
  [
    title,
    images,
    description,
    tech,
    ...optionalSections,
  ].forEach((el) => container.appendChild(el));
  docFrag.appendChild(container);

  return docFrag;
}

/**
 * Creates a TyperWriter effect for home page saying name, skills, etc.
 * After typewriter effect is complete, calls onComplete()
 *
 * @param typeWriterText
 * @param onComplete
 */
function typeWriterEffectIntro(
  typeWriterText: string[],
  onComplete: () => void
) {
  const typewriterContainer = getElement(".typewriter-container");
  const typeWriterElement = getElement(".typewriter");

  /**
   * Runs when typewriter animation is over.
   *
   * Fades out the typewriter element and removes it from DOM.
   * calls onComplete.
   */
  const animationOver = () => {
    window.removeEventListener("click", killTypeWriter, false);

    typeWriterElement.classList.remove("typewriter--animation");
    fadeSpecialElement(typeWriterElement);

    setTimeout(() => {
      typeWriterElement.remove();
      typewriterContainer.remove();
      onComplete();
    }, 1200);
  };

  const killTypeWriter = () => {
    typer.cancel();
    animationOver();
  };

  const typer = new TypeWriter(typeWriterText, typeWriterElement, {
    onComplete: animationOver,
    lineTiming: 1200,
    letterTiming: 120,
    completeTiming: 1300,
  });

  // Start typeWriter effect
  setTimeout(() => {
    revealElement(typeWriterElement);
    typer.render();
    // Lets click end the animation.
    window.addEventListener("click", killTypeWriter, false);
  }, 300);
}
