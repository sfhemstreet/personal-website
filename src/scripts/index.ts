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

const TITLE_DATA = {
  name: "SPENCER_HEMSTREET",
  skillSet: "FRONT_END",
  jobStatus: "OPEN_TO_OPPORTUNITIES",
};

// Time fom last intro view in ms
const INTRO_WAIT_TIME = 60000 * 3;
// Key used to check and set intro view time in storage
const INTRO_STORAGE_KEY = "aaepeeseec";

export type TitleData = typeof TITLE_DATA;

window.addEventListener("load", homePage, false);

/**
 * Controls homepage animations and mounting of content.
 */
function homePage() {
  const showIntro: boolean = getHasViewedIntro();

  if (showIntro) {
    const typewriterText = Object.keys(TITLE_DATA).map(
      (key) => `${key}: ${TITLE_DATA[key as keyof TitleData]}`
    );
    typeWriterEffectIntro(typewriterText, onIntroOver);
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

    mountTitle(TITLE_DATA);
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

    setTimeout(() => {
      hideElement(addressElement);
      hideElement(projectsButton);
      hideElement(projectsButtonGradient);

      PROJECTS.forEach((proj) => {
        const projDoc = createProject(proj);
        mainElement.appendChild(projDoc);
      });

      // Apply scoll FX to each project
      const projContainers = Array.from(mainElement.getElementsByClassName("project"));
      let projDivs: Element[] = [];
      projContainers.forEach(container => {
        projDivs.push(...Array.from(container.querySelectorAll("div")))
      });

      ScrollerFx(projDivs, "scroll-fx", "see-thru");

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
function mountTitle(titleData: TitleData) {
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
 * @param titleData
 */
function createTitle(titleData: TitleData): DocumentFragment {
  const docFrag = document.createDocumentFragment();
  const container = document.createElement("div");
  container.className = "title";

  // Title
  const title = document.createElement("h1");
  const titleText = document.createTextNode(titleData.name.replace(/_/g, " "));
  title.appendChild(titleText);

  // SubTitle
  const subTitle = document.createElement("h3");
  const subText = document.createTextNode(
    titleData.skillSet.toLowerCase().replace(/_/g, " ")
  );
  subTitle.appendChild(subText);

  // Job
  const jobTitle = document.createElement("h3");
  const jobText = document.createTextNode(
    titleData.jobStatus.toLowerCase().replace(/_/g, " ")
  );
  jobTitle.appendChild(jobText);
  jobTitle.addEventListener("mouseover", replaceTextWithPlants, false);

  // Append all
  container.appendChild(title);
  container.appendChild(subTitle);
  container.appendChild(jobTitle);
  docFrag.appendChild(container);

  return docFrag;
}

/**
 * Creates project document fragment.
 * @param project
 */
function createProject(project: Project): DocumentFragment {
  // makes project title section with links
  const makeTitle = (name: string, gitURL: string, liveURL?: string) => {
    const title = document.createElement("h1");
    title.textContent = name;

    const makeLink = (url: string, text: string) => {
      const link = document.createElement("a");

      link.textContent = text;
      link.href = url;
      link.rel = "noreferrer";
      link.target = "_blank";

      return link;
    };

    const githubLink = makeLink(gitURL, "Code");
    githubLink.classList.add("project-github");

    const liveLink = liveURL ? makeLink(liveURL, "Live") : null;
    if (liveURL && liveLink) {
      liveLink.classList.add("project-live");
    }

    const linkContainer = document.createElement("span");
    linkContainer.appendChild(githubLink);
    if (liveLink) linkContainer.appendChild(liveLink);

    // container for the title and links
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("project-title");
    titleContainer.appendChild(title);
    titleContainer.appendChild(linkContainer);

    return titleContainer;
  };

  // Creates a div with title and paragraph
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
  const difficulties = makeSection("Difficulties", project.difficulties);
  const solution = makeSection("Solution", project.solution);
  const features = makeList("Features", project.features);

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
    features,
    difficulties,
    solution,
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
export function typeWriterEffectIntro(
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

/**
 * Very crudely changes text to plant emoji,
 * symbolizing my desire for a job that will help me grow.
 *
 * @param this
 * @param ev
 */
function replaceTextWithPlants(this: Element, ev: Event) {
  if (!ev.currentTarget) return;

  let text = "";
  for (let i = 0; i < Math.ceil((this.textContent?.length || 18) / 2); i++) {
    text += "&#127793;";
  }

  this.innerHTML = text;

  ev.target?.removeEventListener("mouseover", replaceTextWithPlants, false);
}
