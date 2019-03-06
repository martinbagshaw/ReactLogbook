[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# Climbing Logbook

An SPA (Single Page Application) implementation of my climbing logbook, taken from [UKClimbing.com](https://www.ukclimbing.com/logbook/showlog.php?id=152526). A new and improved version of a [much more naive version](https://github.com/mr-bagglesworth/climbing-logbook), which I made in plain old HTML, CSS, and JavaScript.

## Setup
1. Clone the repo
2. `npm install`
3. `npm run dev` to run in development mode. View at [http://localhost:1234/](http://localhost:1234/)
4. `npm t` to run tests with jest and react testing library
5. `npm run flow` to check for static types. Files with `// @flow` at the top use static types

### Stack

| **Category**           | **Technology**                                                                            |
|------------------------|-------------------------------------------------------------------------------------------|
| Languages              | JavaScript, HTML, CSS                                                                     |
| Frameworks & Libraries | React, React DOM, React Router DOM, Styled Components, Flow                               |
| Testing                | Jest, React Testing Library                                                               |
| Dev Tools / Other      | Parcel, Github, Netlify                                                                   |
| Quality Assurance      | Es-lint, Prettier                                                                         |


### Todo
- change a load of the code over before testing further, this will make proper testing achieveable


- Tests
  - routes
  - button click behavior
  - rendering
- React Hooks
- Styled components
- Persisting state (how best to do this?)
- A more efficient autocomplete (than currently implemented)
- Use Flow for static typing

### New Things I used
- Flow for static types
- Styled Components
- Proper Integration tests with Jest and React Testing Library