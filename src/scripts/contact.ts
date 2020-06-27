import {
  getElement,
  fadeSpecialElement,
  revealElement,
} from "./helpers";
import { checkSpecial, checkEmail } from "./checkInput";
import { sendEmail } from "./sendEmail";
import "regenerator-runtime/runtime";

type TextInput = HTMLInputElement & HTMLTextAreaElement;

// Wait time between email submissions
// Half a day
const EMAIL_MIN_WAIT = 60000 * 60 * 12;
// localStorage key
const EMAIL_KEY = "eezsdfsepw";

const NAME = "name";
const EMAIL = "email";
const SUBJECT = "subject";
const MESSAGE = "message";

type EmailInputs = typeof NAME | typeof EMAIL | typeof SUBJECT | typeof MESSAGE;
type EmailValidatorKeys =
  | "namePasses"
  | "emailPasses"
  | "subjectPasses"
  | "messagePasses";

const MIN_LENGTHS = {
  name: 2,
  email: 5,
  subject: 2,
  message: 10,
};

type SetFieldArgs = {
  name: EmailInputs;
  value: string;
};

window.addEventListener("load", contact, false);

function contact() {
  const canEmail = getCanEmail();

  if (!canEmail) {
    displayCannotEmail();
    return;
  }

  const emailState = {
    name: "",
    email: "",
    subject: "",
    message: "",
    namePasses: false,
    emailPasses: false,
    subjectPasses: false,
    messagePasses: false,
    listener({ name, value }: SetFieldArgs) {
      if (value.length < MIN_LENGTHS[name]) {
        this[`${name}Passes` as EmailValidatorKeys] = false;
        removeSubmitButton();
        return;
      }

      const isValid = name === EMAIL ? checkEmail(value) : checkSpecial(value);
      this[`${name}Passes` as EmailValidatorKeys] = isValid;

      isValid ? removeLabelColor(name) : makeLabelRed(name);

      if (
        this.namePasses &&
        this.messagePasses &&
        this.emailPasses &&
        this.messagePasses
      ) {
        showSubmitButton();
      } else {
        removeSubmitButton();
      }
    },
    set setField({ name, value }: SetFieldArgs) {
      const valueTrimmed = value.trim();
      this[name] = valueTrimmed;
      this.listener({ name, value: valueTrimmed });
    },
  };

  // Avoid spam by making the form dynamically after 1 sec.
  setTimeout(() => {
    createEmailForm();
  }, 1000);

  function sendEmailAndWait() {
    const main = getElement("main");
    const form = getElement("form", main);
    fadeSpecialElement(form);

    setTimeout(async function() {
      form.remove();
      createLoadingSpinner();

      const hasSent = await sendEmail({
        name: emailState.name,
        email: emailState.email,
        title: emailState.subject,
        body: emailState.message,
      });

      const spinner = getElement(".spinner");
      fadeSpecialElement(main);

      setTimeout(() => {
        spinner.remove();
        revealElement(main);
        displayEmailResult(hasSent);
      }, 650);
    }, 650);
  }

  function displayEmailResult(successful: boolean) {
    const main = getElement("main");
    const p = document.createElement("p");
    let textContent = "";
    if (!successful) {
      textContent = "Sorry, something went wrong. You can email me at spencerhemstreet@gmail.com";
    } else {
      textContent = `Thank you ${emailState.name} for messaging me!`
      setEmailTime();
    }
    p.textContent = textContent;
    main.appendChild(p);
  }

  function onSubmitForm(this: HTMLButtonElement, ev: MouseEvent) {
    ev.preventDefault();

    if (
      emailState.namePasses &&
      emailState.messagePasses &&
      emailState.emailPasses &&
      emailState.messagePasses
    ) {
      this.removeEventListener("click", onSubmitForm, false);
      sendEmailAndWait();
    }
  }

  function showSubmitButton() {
    const button = getElement("#email-submit-button") as HTMLButtonElement;
    button.disabled = false;
    revealElement(button);
    button.addEventListener("click", onSubmitForm, false);
  }

  function removeSubmitButton() {
    const button = getElement("#email-submit-button") as HTMLButtonElement;
    button.disabled = true;
    button.removeEventListener("click", onSubmitForm, false);
    fadeSpecialElement(button);
  }

  function saveFormInput(this: TextInput, ev: Event) {
    emailState.setField = { name: this.id as EmailInputs, value: this.value };
  }

  function createEmailForm() {
    const docFrag = document.createDocumentFragment();
    const form = getElement("form");

    const name = createInput(NAME);
    const email = createInput(EMAIL);
    const subject = createInput(SUBJECT);
    const message = createInput(MESSAGE);

    const button = document.createElement("button");
    button.type = "button";
    button.id = "email-submit-button";
    button.textContent = "Send Email";
    button.disabled = true;
    button.classList.add("no-show");

    [
      { el: name, id: NAME },
      { el: email, id: EMAIL },
      { el: subject, id: SUBJECT },
      { el: message, id: MESSAGE },
    ].forEach((formSection) => {
      const input = getElement(
        `#${formSection.id}`,
        formSection.el
      ) as TextInput;
      input.addEventListener("input", saveFormInput, false);

      docFrag.appendChild(formSection.el);
    });

    docFrag.appendChild(button);

    form.appendChild(docFrag);
  }
}

/**
 * Creates an Email Input Element wrapped in container with label.
 *
 * @param name
 * @param value
 */
function createInput(name: EmailInputs, value = ""): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("email-input-container");

  const label = document.createElement("label");
  label.htmlFor = name;
  label.textContent = name[0].toUpperCase() + name.slice(1);

  if (name === MESSAGE) {
    const textarea = document.createElement("textarea");
    textarea.id = name;
    textarea.name = name;
    textarea.required = true;
    textarea.minLength = 10;
    textarea.spellcheck = true;
    textarea.placeholder = " ";
    textarea.classList.add("email-input");

    container.appendChild(textarea);
    container.appendChild(label);
  } else {
    const input = document.createElement("input");
    input.value = value;
    input.type = name === EMAIL ? "email" : "text";
    input.name = name;
    input.id = name;
    input.required = true;
    input.minLength = name === EMAIL ? 5 : 2;
    input.maxLength = 70;
    input.placeholder = " ";
    input.classList.add("email-input");

    container.appendChild(input);
    container.appendChild(label);
  }

  return container;
}

function createLoadingSpinner() {
  const mainEl = getElement("main");
  const docFrag = document.createDocumentFragment();
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");

  [1,2,3,4].forEach(_ => {
    const spinlet = document.createElement("div");
    spinlet.classList.add("spinlet");
    spinner.appendChild(spinlet);
  });

  docFrag.appendChild(spinner);
  mainEl.appendChild(docFrag);
}

function makeLabelRed(labelName: EmailInputs) {
  const label = getElement(`label[for="${labelName}"]`);
  label.classList.remove("green", "red");
  label.classList.add("red");
}

function makeLabelGreen(labelName: EmailInputs) {
  const label = getElement(`label[for="${labelName}"]`);
  label.classList.remove("red", "green");
  label.classList.add("green");
}

function removeLabelColor(labelName: EmailInputs) {
  const label = getElement(`label[for="${labelName}"]`);
  label.classList.remove("red", "green");
}

/**
 * Gets last email time from localStorage and returns it as a number.
 * If no email was ever sent this will return null.
 */
function getLastEmailTime(): number | null {
  // Sorry but if you don't user a browser
  // that supports localStorage I don't wanna talk...
  if (!window.localStorage)
    throw new Error("Browser does not support localStorage");

  const time = window.localStorage.getItem(EMAIL_KEY);

  return time ? parseInt(time, 10) : null;
}

/**
 * Checks localStorage to see the last time this person
 * has emailed me and if enough time has elapsed.
 */
function getCanEmail(): boolean {
  const lastEmailTime = getLastEmailTime();

  return lastEmailTime ? Date.now() - lastEmailTime > EMAIL_MIN_WAIT : true;
}

/**
 * Sets time of email sent in localStorage,
 * used to keep people from hitting the API.
 */
function setEmailTime() {
  if (!window.localStorage) return;

  window.localStorage.setItem(EMAIL_KEY, `${Date.now()}`);
}

function displayCannotEmail() {
  const lastTime = getLastEmailTime();
  const mainEl = getElement("main");
  const form = getElement("form", mainEl);
  form.remove();

  const p = document.createElement("p");
  let textContent = "";

  if (!lastTime) {
    textContent = "Says here you can't email me. Sorry.";
  } else {
    const date = new Date(lastTime);
    let time = "";
    if (date.toDateString() === new Date().toDateString()) {
      time = `at ${date.toLocaleTimeString()}`;
    } else {
      time = `on ${date.toDateString()}`;
    }
    
    textContent = `You emailed me ${time}. I will get back to you soon.`;
  }
  p.textContent = textContent;
  mainEl.appendChild(p);
}