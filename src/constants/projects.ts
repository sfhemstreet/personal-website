const png = require("../../public/projectImages/*.png");
const jpg = require("../../public/projectImages/*.jpg");
const images = { ...png, ...jpg };

export type Image = {
  src: string;
  alt: string;
};

export type Project = {
  name: string;
  description: string;
  images: Image[];
  technologies: string[];
  difficulties: string;
  solution: string;
  features: string[];
  githubLink: string;
  liveLink?: string;
};

export const mockEcommerce: Project = {
  name: `Mock Ecommerce`,
  description: `Statically generated ecommerce site, 
                generated from content on a headless CMS 
                (right now its a sporting goods store).`,

  images: [
    // {
    //   src: images["mock-ecommerce-mobile"],
    //   alt: "Mobile screenshot of mock emcommerce application",
    // },
    {
      src: images["mock-ecommerce-desktop"],
      alt: "Desktop screenshot of mock emcommerce application",
    },
  ],

  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Styled-Components",
    "SWR",
    "Strapi",
    "PostgreSQL",
  ],

  difficulties: `Managing state and persistent storage. 
                When navigating between pages state is lost, such as number of items in the shopping cart. 
                A page needs to have the previous state to display components properly,
                failing to do so can create unwanted effects such as flickering.  
                <br>
                I initially planned to use Redux to manage state, and use storage (localStorage/sessionStorage) 
                to save it, so that when a new page is loaded, the previous state in storage is used to initialize the Redux store. 
                It was very complicated creating the store from storage because the way Next.js 
                handles routing on a static site is a mix between client side  
                Components connected to the store would often render with stale data, and it generally felt wrong.`,

  solution: `I researched and found the SWR package, which is a set of React hooks meant for remote data fetching, that 
            are also useful for local mutations.  With the useSWR hook, components get a constant stream of data updates automatically, 
            and render based on the state of the fetch - 'loading', 'error', or 'data'.  
            The useSWR hook takes any fetching function that accepts a key, so 
            I created my own to fetch pieces of state saved in storage.   
            <br>
            The wishlist is a good example of this in use.  
            Multiple components across the app need the wishlist's state to properly render. 
            The heart icon on the top navigation bar is connected to the state of the wishlist.
            and will change color if the user has products in the wishlist.
            The product cards also have the same heart icon on them, and change color if the product is in the wishlist. 
            Tapping on a product card's heart will either add or remove that product from the wishlist, 
            and everything connected to the wishlist's state will update.
            `,

  features: [
    "Decoupled frontend architecture",
    "Responsive layout",
    "Persistent state",
    "Static page generation",
  ],

  githubLink: "https://github.com/sfhemstreet/mock-ecommerce",
  liveLink: "https://mock-ecommerce.now.sh/",
};

export const mapAndWeather: Project = {
  name: "Map and Weather",
  description: `Responsive map and weather dashboard, used to get 5-day weather reports, 
                while visualizing wind, temperature, precipitation, and cloud data for any given coordinates over map.  
                The expandable sidebar displays a selectable list of saved coordinates, which can be filtered by type of data point, and by name. 
                The dashboard currently features a list of my favorite camping and rock climbing areas.`,
  images: [
    // {
    //   src: images["map-and-weather-small"],
    //   alt: "Screen shot of map and weather app",
    // },
    {
      src: images["map-and-weather-medium"],
      alt: "Screen shot of map and weather app with weather overlay",
    },
  ],
  technologies: ["Leaflet.js", "React.js", "TypeScript", "OpenWeatherMap API"],
  difficulties: `Integrating Leaflet.js into React.
                Note - this project can't be hosted live, as the weather API I am using costs money when put online.
                Check it out on GitHub, you can download, install and run it locally.`,
  solution: `Wrote a simple reusable component for rendering a leaflet map.`,
  features: [
    "Responsive layout",
    "Multiple map settings",
    "Weather imaging",
    "Search and filter list of points of interest",
  ],
  githubLink: "https://github.com/sfhemstreet/MapNWeather",
};

export const traderBot: Project = {
  name: "Trader Bot",
  description: `Python program to help automate cryptocurrency trading. 
                It uses real-time bitcoin inflow/outflow data from Token Analyst's 
                websocket feed to trigger trades on the BitMEX exchange. 
                Connecting to both the Token Analyst and BitMEX websockets, 
                users can get real-time bitcoin inflows and outflows to/from 
                exchanges and their BitMEX feed to monitor position, 
                margin, order, wallet, execution and trade data.`,
  images: [
    {
      src: images["traderbot-demo"],
      alt: "Screen shot of Trader Bot automated trades",
    },
  ],
  technologies: ["Python", "Websockets", "Asyncio"],

  difficulties: `Connecting to multiple websockets.  I had never programmed in Python before so I was unsure how to go about doing that.`,

  solution: `I went with an single threaded event loop approach because it seemed the simplest.  At a high level the 
            program waits for data, and reacts when it arrives, so I used asyncio to create an event loop, 
             gave it tasks that yield data, and told it to run forever. When a 
             task yields data from a websocket it calls a function that starts the trading process.`,

  features: ["Simple API", "OOP architecture", "Websockets", "asyncio"],
  githubLink: "https://github.com/sfhemstreet/TraderBot",
};

export const choreApp: Project = {
  name: "Chore App",
  description: `Chore is an application to help keep track of household chores.
                Users can create private chore groups, invite their roommates 
                to join, and select what chores need to be done.  Group creators 
                can set restrictions on who can add new chores to the group, 
                and add/remove members at any time. Chores can be assigned 
                randomly or can be manually assigned, include notes in chores 
                to make sure they are done correctly and set dates for when 
                they must be done by. Group members are notified when they 
                receive new chores via email, and receive points for every chore completed.`,
  images: [
    {
      src: images["chore-home"],
      alt: "Screen shot of chore app home page",
    },
    // { src: images["chore-group"], alt: "Screen shot of chore app group" },
  ],

  technologies: [
    "React",
    "Redux",
    "tachyons",
    "PostgreSQL",
    "Node.js",
    "Express",
    "Json Web Tokens",
    "Knex",
    "Bcrypt",
    "SendGrid",
  ],

  difficulties: `Session problems when interacting with the backend on mobile devices. 
                I researched a lot before going with a session-cookie approach to track user sessions. 
                It worked well till the first deployment and testing on a real mobile device.`,
  solution: `I quickly changed to a Json Web Token approach, which worked well.`,
  features: [
    "Single Page Application",
    "User authentication",
    "Json Web Token",
    "Responsive layout",
  ],
  githubLink: "https://github.com/sfhemstreet/chore-app",
  liveLink: "https://chore-app-frontend.herokuapp.com/",
};

export const simpleWeight: Project = {
  name: "Simple Weight",
  description: `Simple app to track daily caloric intake and body weight. 
                View weight/calorie data on a chart, see information such 
                as how much weight is lost on average per week, and 
                average calorie intake is like on weekdays vs weekend.`,
  images: [
    {
      src: images["simple-weight-small"],
      alt: "Screen shot of simple weight app in use",
    },
  ],
  technologies: [
    "Flutter",
    "Dart",
    "Provider",
    "SQLite",
    "Shared Preferences",
    "charts_flutter",
  ],
  difficulties: `Finding a good solution for state management.`,
  solution: `I went with the one the folks at Google apparently like, Provider.
            I used its multi-provider to 'provide' multiple streams of immutable data.`,
  features: [
    "Cross-platform mobile application",
    "iOS themed components",
    "Simple UI",
  ],
  githubLink: "https://github.com/sfhemstreet/simple_weight",
};

export const rockPaperScissors: Project = {
  name: "Rock Paper Scissors",
  description: `Rock, Paper, Scissors coding challenge from Frontend Mentor 
                (https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH),
                with 2 game modes, classic Rock, Paper, Scissors or the bonus 
                Rock, Paper, Scissors, Lizard, Spock. I chose to add subtle animations 
                to make the game play feel more organic, and added an option to change game play modes. 
                You can [play it here](https://rock-paper-scissors.spencerhemstreet.now.sh/).`,

  images: [
    {
      src: images["rock-paper-scissors-small"],
      alt: "Rock Paper Scissors game screen shot",
    },
  ],
  technologies: ["React", "Next.js", "TypeScript", "Styled-Components"],
  difficulties: `Animating pieces between game play states.`,
  solution: `Keep app layout simple, don't re-render game pieces once on screen.`,
  features: ["Clean UI", "Followed design to the pixel"],
  githubLink: "https://github.com/sfhemstreet/rock_paper_scissors",
  liveLink: "https://rock-paper-scissors-six.now.sh/",
};

export const alienInvasion: Project = {
  name: "Alien Invasion",
  description: `Save humanity from aliens by destroying them before they land. HTML5 canvas vanilla JS game.`,
  images: [
    {
      src: images["alien-invasion-small"],
      alt: "Screen shot of Alien Invasion game play",
    },
  ],
  technologies: ["HTML5", "Canvas", "JavaScript"],
  difficulties: "Making the game hard, but not impossible.",
  solution: `Tweak level difficultly after testing. 
            Add easter egg magic blue box that replaces your ship's 
            rockets with a proton-7 laser temporarily.`,
  features: ["Old school hard game play", "60fps", "Incredible graphics"],
  githubLink: "https://github.com/sfhemstreet/alien-invasion-js",
  liveLink: "https://sfhemstreet.github.io/alien-invasion-js/",
};

export const projects = [
  mockEcommerce,
  mapAndWeather,
  simpleWeight,
  rockPaperScissors,
  choreApp,
  traderBot,
  alienInvasion,
];
