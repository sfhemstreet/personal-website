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
  githubLink?: string;
  liveLink?: string;
};

export const pridePlaces: Project = {
  name: `PridePlaces`,
  description: `PridePlaces is a LGBTQ+ directory, 
                focused on highlighting LGBTQ-owned and friendly businesses.`,

  images: [
    {
      src: images["prideplaces"],
      alt: "Screen shot of PridePlaces",
    },
  ],

  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Styled-Components",
    "SWR",
    "Directus",
    "MySQL",
    "Auth0",
    "AWS S3",
  ],

  features: [
    "Server-side rendered listing and search pages",
    "Over 200 pre-rendered pages with rehydration",
    "Auth0 user authentication",
    "Simple database management via Directus CMS",
    "Business and User dashboards",
  ],

  difficulties: `The MVP version of PridePlaces was built using a Wordpress theme and a pile of plugins, and was incredibly slow. 
                When I started I was tasked with re-vamping the site's performance.  
                I quickly found that the WP theme was poorly built, the server was shared, and that it had been accessed by a third unknown party multiple times.`,

  solution: `After talking to the CEO about possible solutions and the future of the company, it was clear the site would need to be moved from Wordpress. 
            I built a plan to move the site from Wordpress to Next.js with Directus as our Headless CMS.  
            First, I moved the Wordpress site to a dedicated server to decrease load time for the active Wordpress site. 
            Then, an intern and I created our own component library using Styled-Components, working along side our design team. 
            While building components, I built the Directus CMS server, and built all the necessary API routes to control user actions and fetching data in Next.js.
            I choose to build the API routes in Next.js as an RESTful API gateway, so that moving from a CMS server to a serverless DB, like AWS DynamoDB or Fauna, would be relatively simple.
            Once all the components were complete, we created the pages in Next.js, taking a hybrid rendering approach. 
            All the main pages, Home, About, Contact, etc, are pre-rendered at build time and rehydrate on the client.
            Listing pages, and the search page are rendered on the server. 
            Dashboard pages, which do not require SEO, are all rendered on the client.
            Global state, such as who is logged in, their favorite listings, etc, is handled using the React Context API.`,

  liveLink: `https://prideplaces.com`,
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
  difficulties: `Integrating Leaflet.js into React and finding the various map tiles and weather APIs needed. 
                I was able to find excellent map tiles and layers to show wind, precipitation, etc, but the 5 day weather 
                data is only free over HTTP, not HTTPS.`,
  solution: `I wrote a reusable component for rendering a Leaflet map, with an simple API 
            to only add what was needed for the project.  I am not going to pay for the weather data for this side project
            so this project is not live. If you'd like to view it in a demo you can click the 'code' link above 
            and follow the directions.`,
  features: [
    "Responsive layout",
    "Multiple map settings",
    "Weather imaging",
    "Search and filter list",
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

  features: [
    "Simple API",
    "Object Oriented Programming",
    "Websockets",
    "asyncio",
  ],
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

  difficulties: `Cross-Origin Resource Sharing (CORS) and tracking user sessions, especially on mobile devices. 
                I was torn between using session-cookies/JSON web tokens (JWT) to track user sessions,  
                and ending up going with session-cookies.
                It worked well till I tested the app on a real mobile device, and found that my servers httpOnly cookies
                were being thrown away by my phones browser. 
                `,
  solution: `I switched to use JWTs to track user sessions.  
            In the future I would architecture the app much differently 
            (right now its really a distributed system, not an app), and take advantage of advances in cloud platforms.
            `,
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
  description: `Cross platform mobile app (iOS/Android) to track daily caloric intake and body weight. 
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
  difficulties: `Learning and working in a rapidly changing framework (Flutter). 
                 Flutter has excellent documentation and Dart is an awesome language so it was enjoyable.
                 Finding a state management solution for my use case took some research.`,
  solution: `Reading documentation and experimenting. I ended up using a state management package called Provider.
            Its lets you 'provide' multiple streams of immutable data down the 'widget' tree, 
            so any widget can listen in and automatically update.`,
  features: [
    "Cross-platform mobile application",
    "iOS themed components",
    "Simple UI",
    "Light and Dark themes, based on device setting",
  ],
  githubLink: "https://github.com/sfhemstreet/simple_weight",
};

export const rockPaperScissors: Project = {
  name: "Rock Paper Scissors",
  description: `I made this Rock, Paper, Scissors game after I saw it as a coding challenge on FrontendMentor.com.
                It has 2 game modes, the classic Rock, Paper, Scissors and the bonus version
                Rock, Paper, Scissors, Lizard, Spock. It follows the exact designs given by Frontend Mentor.`,

  images: [
    {
      src: images["rock-paper-scissors-small"],
      alt: "Rock Paper Scissors game screen shot",
    },
  ],
  technologies: ["React", "Next.js", "TypeScript", "Styled-Components"],
  difficulties: `Structuring how stages of each round are executed. On a fast machine re-rendering a 
                  game component can be undetectable but on mobile devices there is a flicker.`,
  solution: `Keeping the app layout simple, and not re-rendering game pieces once they are on screen.`,
  features: ["Responsive layout", "Followed design to the pixel"],
  githubLink: "https://github.com/sfhemstreet/rock_paper_scissors",
  liveLink: "https://rock-paper-scissors-six.now.sh/",
};

export const alienInvasion: Project = {
  name: "Alien Invasion",
  description: `Save humanity from aliens by destroying them before they land. HTML5 canvas vanilla javascript game.`,
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
  features: [
    "Old school hard game play",
    "Explosions and secret lasers",
    "60fps",
    "Incredible graphics",
  ],
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
