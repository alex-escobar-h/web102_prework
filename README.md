# WEB102 Prework - _Sea Monster Crowdfunding_

Submitted by: **Alexnader**

**Sea Monster Crowdfunding** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **~5** hours spent in total (including coding + readings)

## Required Features

The following **required** functionality is completed:

- [x] The introduction section explains the background of the company and how many games remain unfunded.
- [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
- [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
- [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

- [x] Added a dynamic filtered game counter that updates when users view funded, unfunded, or all games
- [x] Refactored repeated DOM logic into reusable helper functions
- [x] Organized the JS file into clear sections for DOM elements, data, functions, event listeners, and initialization.
- [x] Highlighted key numbers in the description section for better visual emphasis.
- [x] Added active button styling so the selected filter is visually highlighted.
- [x] Add progress bar and funding percentage to each game card.

## Original index.js script

The original `index.js` was refactored to improve readability and add new features. The version I completed during the challenge is now in `challenge_index.js`, and the updated code lives in `index.js`.

```js
// challenge_index.js
// Boiler plate code for the web102 Prework challenge.

/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  games.forEach((game) => {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");
    // add the class game-card to the list
    gameCard.classList.add("game-card");
    // set the inner HTML using a template literal to display some info about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = `
        <img src="${game.img}" class="game-img" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Goal: ${game.goal.toLocaleString("en-US")}</p>
        <p>Pledged: ${game.pledged.toLocaleString("en-US")}</p>
        <p>Backers: ${game.backers.toLocaleString("en-US")}</p>
    `;
    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  });
}
// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfundedGame = GAMES_JSON.filter(
  (game) => game.pledged < game.goal,
).length;

// create a string that explains the number of unfunded games using the ternary operator
const remainingGameText =
  numOfUnfundedGame > 1 ? "games remain" : "game remain";

const displayStr = `A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} games. Currently, ${numOfUnfundedGame}
 ${remainingGameText} unfunded. We need your help to fund these amazing games!`;
// create a new DOM element containing the template string and append it to the description container
const displayElement = document.createElement("p");
displayElement.innerHTML = displayStr;
descriptionContainer.appendChild(displayElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const [firstGameName, secondGameName] = [firstGame.name, secondGame.name];

const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = firstGameName;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGameName;
secondGameContainer.appendChild(secondGameElement);
```

## Video Walkthrough

GIF created with [LICEcap](https://www.cockos.com/licecap/)

### App walkthrough

<img src='./assets/app.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

### Filtering games:

<img src='./assets/demonstrate_filter.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Notes

It had been awhile since I last worked with vanilla JavaScript and HTMl, as I mainly use React. I had to spend some time reviewing DOM-related documentations throughout working on this app.

## License

    Copyright 2026 Alexander Escobar

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
