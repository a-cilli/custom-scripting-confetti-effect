// Define the function
function createConfetti(autoStartConfetti, colors, confettiScale, confettiInterval) {
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    throw new Error("You must provide an array of colors.");
  }

  let runConfetti = autoStartConfetti;

  // Create the container element
  const containerEl = document.createElement("div");
  containerEl.classList.add("js-container", "main-container");
  containerEl.style.opacity = runConfetti ? "1" : "0";
  document.body.appendChild(containerEl); // Append the container to the body

  // Add CSS styles dynamically
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes confetti-slow {
      0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
      100% { transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg); }
    }

    @keyframes confetti-medium {
      0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
      100% { transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg); }
    }

    @keyframes confetti-fast {
      0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
      100% { transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg); }
    }

    .main-container {
      width: 100vw;
      height: 100vh;
      position: relative;
      pointer-events: none;
      transition: opacity 0.3s;
    }

    .confetti-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      perspective: 700px;
    }

    .confetti {
      position: absolute;
      z-index: 1;
      top: -10px;
      border-radius: 0%;
    }

    .confetti--animation-slow {
      animation: confetti-slow 2.25s linear 1 forwards;
    }

    .confetti--animation-medium {
      animation: confetti-medium 1.75s linear 1 forwards;
    }

    .confetti--animation-fast {
      animation: confetti-fast 1.25s linear 1 forwards;
    }

    #toggle-button {
      position: fixed;
      bottom: 20px;
      right: 75px;
      background: none;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Create the confetti container
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");
  containerEl.appendChild(confettiContainer);

  if (!runConfetti) {
    const button = document.createElement("button");
    button.id = "toggle-button";
    const img = document.createElement("img");
    img.src = "https://viewer.ipaper.io/ViewFile1960199.png";
    img.style.width = "90px";
    button.appendChild(img);
    document.body.appendChild(button);
  }

  const confettiAnimations = ["slow", "medium", "fast"];

  function renderConfetti() {
    const confettiEl = document.createElement("div");
    const confettiSize =
      (Math.floor(Math.random() * 3) + 7) * 1.5 * confettiScale + "px";
    const confettiBackground =
      colors[Math.floor(Math.random() * colors.length)];
    const confettiLeft =
      Math.floor(Math.random() * containerEl.offsetWidth) + "px";
    const confettiAnimation =
      confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)];

    confettiEl.classList.add(
      "confetti",
      `confetti--animation-${confettiAnimation}`
    );
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;

    confettiEl.removeTimeout = setTimeout(function () {
      confettiEl.parentNode.removeChild(confettiEl);
    }, 3000);

    confettiContainer.appendChild(confettiEl);
  }

  setInterval(renderConfetti, confettiInterval);

  // Event listener for toggle button
  document.addEventListener("click", function (e) {
    if (
      e.target.id === "toggle-button" ||
      e.target.parentElement.id === "toggle-button"
    ) {
      runConfetti = !runConfetti;
      const buttonImage = document.querySelector("#toggle-button img");
      if (buttonImage) {
        buttonImage.src = runConfetti
          ? "https://viewer.ipaper.io/ViewFile1960200.png"
          : "https://viewer.ipaper.io/ViewFile1960199.png";
      }
      const mainContainer = document.querySelector(".main-container");
      if (mainContainer) {
        mainContainer.style.opacity = runConfetti ? "1" : "0";
      }
    }
  });
}
