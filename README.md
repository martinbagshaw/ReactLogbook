# Climbing Logbook

An SPA (Single Page Application) implementation of my climbing logbook, taken from [UKClimbing.com](https://www.ukclimbing.com/logbook/showlog.php?id=152526). A new and improved version of a [much more naive version](https://github.com/mr-bagglesworth/climbing-logbook), which I made in plain old HTML, CSS, and JavaScript.

## Setup
1. Clone the repo
2. `npm install`
3. `npm run dev` to run in development mode. View at [http://localhost:1234/](http://localhost:1234/)
4. `npm t` to run tests with jest and react testing library

### Stack :books:
> Things I am intending to use in this project

| **Category**           | **Technology**                                                                            |
|------------------------|-------------------------------------------------------------------------------------------|
| Languages              | JavaScript, HTML, CSS                                                                     |
| Frameworks & Libraries | React, React DOM, React Router DOM, Styled Components, D3                                 |
| Testing                | Jest, React Testing Library                                                               |
| Bundler                | Parcel                                                                                    |
| Quality Assurance      | Es-lint, Prettier, PropTypes, Travis                                                      |


### New things (that I haven't used before April 2019) :hatching_chick:
- React Hooks and Context
- A Redux - like single source state management implementation using Hooks and Context
- D3 - data visualisation library
- MongoDB (perhaps). Alternative to localStorage
- PropTypes - static types for props and state
- A more advanced CI Pipeline: More controlled linting / formatting, and pre-commit hooks

### UI Mockups
> Drafts of the UI - something resembling how the finished product may look

![climbing logbook app](./logbook-stats-mockup.jpg "stats view mockup")
...Add a figma mockup as well

### Data Flow
> Flow of data through the app - how data and state interact

...Will add this when I have a better idea

### Todo List :heavy_check_mark:
> A non- exhaustive, and regularly iterated on todo list can be [found here on HackMD](https://hackmd.io/Y3lQWBxjRQio8KjlLFEZaw)
> Will include trials and tribulations, and notes to help me along the way