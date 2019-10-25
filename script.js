(() => {
  const alphabetElement = document.getElementsByClassName("js-alphabet")[0];
  const wordElement = document.getElementsByClassName("js-word")[0];
  const loadingElement = document.getElementsByClassName("js-loading")[0];
  const livesElement = document.getElementsByClassName("js-lives")[0];
  const finalScreen = document.getElementsByClassName("js-final-screen")[0];
  const finalScreenHeader = finalScreen.getElementsByClassName(
    "js-final-screen__header"
  )[0];
  const finalScreenButton = finalScreen.getElementsByClassName(
    "js-final-screen__button"
  )[0];
  const canvasElement = document.getElementsByClassName("js-canvas")[0];

  const allLetters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

  const initialState = {
    lives: 9,
    word: undefined,
    used: []
  };

  let state;

  const renderView = () => {
    const renderAlphabet = () => {
      alphabetElement.innerHTML = allLetters
        .map(
          letter =>
            `<button class="js-alphabet-letter alphabet__letter"${
              state.used.includes(letter) ? " disabled" : ""
            }>
                    ${letter}
                </button>`
        )
        .join("");
    };

    const renderWord = () => {
      if (state.word === undefined) {
        return "";
      }

      wordElement.innerHTML = state.word
        .split("")
        .map((letter, index, allLetters) => {
          if (index === 0 || index === allLetters.length - 1) {
            return `<div class="word__letter">${letter}</div>`;
          }

          if (state.used.includes(letter)) {
            return `<div class="word__letter">${letter}</div>`;
          }

          return `<div class="word__letter">_</div>`;
        })
        .join("");
    };

    const renderLoading = () => {
      const hiddenClassName = "loading--hidden";

      if (state.word === undefined) {
        loadingElement.classList.remove(hiddenClassName);
      } else {
        loadingElement.classList.add(hiddenClassName);
      }
    };

    const renderLives = () => {
      livesElement.innerHTML = `You have <span class="lives__number">${state.lives}</span> lives left`;
    };

    const renderFinalScreen = () => {
      const hiddenClassName = "final-screen--hidden";

      if (state.lives === 0) {
        finalScreen.classList.remove(hiddenClassName);
        finalScreenHeader.innerText = "GAME OVER!";
        return;
      }

      if (state.word === undefined) {
        finalScreen.classList.add(hiddenClassName);
        return;
      }

      const wordWithoutFirstAndLastLetter = state.word.slice(1, -1);

      if (
        wordWithoutFirstAndLastLetter
          .split("")
          .every(letter => state.used.includes(letter))
      ) {
        finalScreen.classList.remove(hiddenClassName);
        finalScreenHeader.innerText = "YOU WON THE GAME!";
        return;
      }

      finalScreen.classList.add(hiddenClassName);
    };

    const renderHangman = () => {
      const canvasContext = canvasElement.getContext("2d");

      const drawLine = (fromX, fromY, toX, toY) => {
        canvasContext.moveTo(fromX, fromY);
        canvasContext.lineTo(toX, toY);
        canvasContext.stroke();
      };

      canvasContext.beginPath();
      canvasContext.strokeStyle = "black";
      canvasContext.lineWidth = 30;

      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

      drawLine(0, 1500, 1500, 1500);

      if (state.lives < 9) {
        drawLine(100, 0, 100, 6000);
      }

      if (state.lives < 8) {
        drawLine(0, 50, 700, 50);
      }

      if (state.lives < 7) {
        drawLine(600, 50, 600, 150);
      }

      if (state.lives < 6) {
        canvasContext.beginPath();
        canvasContext.arc(600, 250, 100, 0, Math.PI * 2, true);
        canvasContext.stroke();
      }

      if (state.lives < 5) {
        drawLine(600, 360, 600, 700);
      }

      if (state.lives < 4) {
        drawLine(600, 460, 200, 500);
      }

      if (state.lives < 3) {
        drawLine(600, 460, 1000, 500);
      }

      if (state.lives < 2) {
        drawLine(600, 700, 200, 1000);
      }

      if (state.lives < 1) {
        drawLine(600, 700, 1000, 1000);
      }
    };

    renderLives();
    renderAlphabet();
    renderWord();
    renderLoading();
    renderFinalScreen();
    renderHangman();
  };

  const fetchNewWord = async () => {
    try {
      const response = await fetch(
        "http://hangman.career.wecode.stage.wecode.agency/api/v1/word/random"
      );
      const json = await response.json();

      return json.word;
    } catch {
      alert("Something went wrong!");
    }
  };

  const newGame = async () => {
    state = { ...initialState };

    renderView();

    const newWord = await fetchNewWord();

    state.word = newWord.toUpperCase();
    renderView();
  };

  const guess = letter => {
    state.used = [...state.used, letter];
    const wordWithoutFirstAndLastLetter = state.word.slice(1, -1);

    if (!wordWithoutFirstAndLastLetter.includes(letter)) {
      state.lives--;
    }

    renderView();
  };

  alphabetElement.addEventListener("click", event => {
    if (!event.target.classList.contains("js-alphabet-letter")) {
      return;
    }

    guess(event.target.innerText);
  });

  finalScreenButton.addEventListener("click", newGame);

  newGame();
})();
