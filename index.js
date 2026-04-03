import GAMES_DATA from "./games.js";

// DOM ELEMENTS
const gamesContainer = document.getElementById("games-container");
const descriptionContainer = document.getElementById("description-container");
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const filteredCount = document.querySelector(".filtered-count");

const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Data
const GAMES_JSON = JSON.parse(GAMES_DATA);

const totalContributions = GAMES_JSON.reduce(
  (acc, game) => acc + game.backers,
  0,
);
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

const totalGames = GAMES_JSON.length;
const numOfUnfundedGames = unfundedGames.length;

const [firstGame, secondGame] = [...GAMES_JSON].sort(
  (a, b) => b.pledged - a.pledged,
);

// ===================================================================== //

// Functions
const addGamesToPage = (games) => {
  // loop over each item in the data
  games.forEach((game) => {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");
    const fundingProgress =
      game.pledged / game.goal > 1 ? 100 : (game.pledged / game.goal) * 100;
    // add the class game-card to the list
    gameCard.classList.add("game-card");
    // set the inner HTML using a template literal to display some info about each game
    gameCard.innerHTML = `
        <img src="${game.img}" class="game-img" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Goal: $${game.goal.toLocaleString("en-US")}</p>
        <p>Pledged: $${game.pledged.toLocaleString("en-US")}</p>
        <p>Backers: ${game.backers.toLocaleString("en-US")}</p>
        <div class="progress-wrapper">
        <div class="progress-bar">
            <div class="progress" style="width: ${fundingProgress}%"></div>
        </div>
        <span class="progress-text">${fundingProgress == 100 ? fundingProgress : fundingProgress.toFixed(2)}% Funded</span>
        </div>
      `;
    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  });
};

const deleteChildElements = (parent) => {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
};

const displayStats = () => {
  contributionsCard.textContent = totalContributions.toLocaleString("en-US");
  raisedCard.textContent = `$${totalRaised.toLocaleString("en-US")}`;
  gamesCard.textContent = totalGames.toLocaleString("en-US");
};

const renderFilteredGamesCount = (count) => {
  filteredCount.textContent = `Displaying ${count} ${count === 1 ? "game" : "games"} out of ${totalGames}.`;
};

const renderFilteredGames = (games) => {
  deleteChildElements(gamesContainer);
  addGamesToPage(games);
  renderFilteredGamesCount(games.length);
};

const appendGameElement = (container, gameTitle) => {
  const el = document.createElement("p");
  el.textContent = gameTitle;
  container.appendChild(el);
};

const displayTopGames = () => {
  appendGameElement(firstGameContainer, firstGame.name);
  appendGameElement(secondGameContainer, secondGame.name);
};

const displayDescription = () => {
  const description = `
    A total of <span class="highlight">${totalContributions.toLocaleString("en-US")}</span> contributions have been made for a total of 
    <span class="highlight">$${totalRaised.toLocaleString("en-US")}</span> 
    raised for ${totalGames} games. Currently, 
    <span class="highlight">${numOfUnfundedGames}</span> 
    ${numOfUnfundedGames === 1 ? "game remains" : "games remain"}.
    We need your help to fund these amazing games!
  `;

  const p = document.createElement("p");
  p.innerHTML = description;
  descriptionContainer.appendChild(p);
};

const setActiveBtn = (activeBtn) => {
  [unfundedBtn, fundedBtn, allBtn].forEach((btn) => {
    btn.classList.remove("active-btn");
  });
  activeBtn.classList.add("active-btn");
};

const init = () => {
  addGamesToPage(GAMES_JSON);
  displayStats();
  displayTopGames();
  displayDescription();
  renderFilteredGamesCount(totalGames);
  setActiveBtn(allBtn);
};

// ===================================================================== //

// Event Listeners
unfundedBtn.addEventListener("click", () => {
  renderFilteredGames(unfundedGames);
  setActiveBtn(unfundedBtn);
});

fundedBtn.addEventListener("click", () => {
  renderFilteredGames(fundedGames);
  setActiveBtn(fundedBtn);
});

allBtn.addEventListener("click", () => {
  renderFilteredGames(GAMES_JSON);
  setActiveBtn(allBtn);
});

// ===================================================================== //

init();
