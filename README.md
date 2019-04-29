[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# Climbing Logbook

An SPA (Single Page Application) implementation of my climbing logbook, taken from [UKClimbing.com](https://www.ukclimbing.com/logbook/showlog.php?id=152526). A new and improved version of a [much more naive version](https://github.com/mr-bagglesworth/climbing-logbook), which I made in plain old HTML, CSS, and JavaScript.

## Setup
1. Clone the repo
2. `npm install`
3. `npm run dev` to run in development mode. View at [http://localhost:1234/](http://localhost:1234/)
4. `npm t` to run tests with jest and react testing library

### Stack
> Things I am, or are intending to use in this project

| **Category**           | **Technology**                                                                            |
|------------------------|-------------------------------------------------------------------------------------------|
| Languages              | JavaScript, HTML, CSS                                                                     |
| Frameworks & Libraries | React, React DOM, React Router DOM, Styled Components, D3                                 |
| Testing                | Jest, React Testing Library                                                               |
| Dev Tools / Other      | Parcel, Github                                                                            |
| Quality Assurance      | Es-lint, Prettier, Flow                                                                   |


### New Things I intend to use (That I haven't used before April 2019)
- React Hooks and Context
- A Redux - like single source state management implementation using Hooks and Context
- D3 - data visualisation library
- MongoDB (perhaps). Alternative to localStorage
- PropTypes - static types for props and state

### UI Mockups
> A draft of user flow through the app, and a rudimentary UI
![climbing logbook app](./logbook-stats-mockup.jpg "stats view mockup")

### Todo
1. Create Mockups:
    - UI Design - (see paper sketches)
        - Start with an overview of the user's stats - charts etc.
        - Next, draw out the logbook UI - list of climbs, and individual entries

2. Data flow chart
    - Do this before doing much more coding, but bear in mind that it will change as my understanding improves
    - What data is global, and can exist outside of state? *climbs data*
    - What state needs to be available for the whole application? *favourite and memorable routes*
    - What state can be local to a component, and does not need to be shared

3. D3 for data visualisation
    - This will be prevalent in the charts view
    - Suggestions for information to visualise include:
        - average grade, grade groups
        - most climbed at crags
        - ascents by year / month / day
        - max grades
        - ascents by discipline

4. A more efficient autocomplete (than previously implemented)
    - Avoid re-rendering loads of html every time the user performs a search
        - Perhaps implement a better searching algorith - *natural sort?*
        - Show suggestions only after x number of characters have been input
        - Perhaps a React Autocomplete module can do this better?
    - In terms of HTML, perhaps implement as a *datalist?*

5. Save information on logs
    - Favourite Routes :hearts:
    - Memorable Days :blue_book:
    - Make this information persist somehow

6. Routing:
    - Perhaps show a route (as in the type in the address bar, as opposed to a way up a piece of rock!) for a logbook entry
    - _Will this add to the experience?_ More than a date and route name are required here, as the same route can be climbed multiple times in a day. Could give a long or a meaningless url. It will make the application architecture more interesting / complex though

7. CI
    - Set up a CI Pipeline