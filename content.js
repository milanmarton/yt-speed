// Create speed display and add it to the video container
function initializeSpeedDisplay() {
  const videoContainer = document.querySelector(".html5-video-container");
  if (!videoContainer) return;

  let speedDisplay = document.getElementById("yt-speed-display");
  if (!speedDisplay) {
    speedDisplay = document.createElement("div");
    speedDisplay.id = "yt-speed-display";
    videoContainer.appendChild(speedDisplay);
  }
  return speedDisplay;
}

// Try to initialize on page load and whenever video player changes
let displayElement = null;
function ensureDisplay() {
  if (!displayElement || !document.body.contains(displayElement)) {
    displayElement = initializeSpeedDisplay();
  }
}
ensureDisplay();

// Watch for player changes
const observer = new MutationObserver(() => {
  ensureDisplay();
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function updateSpeedDisplay(speed) {
  ensureDisplay();
  if (displayElement) {
    displayElement.textContent = `${speed.toFixed(2)}x`;
    displayElement.style.opacity = "1";
    // Clear any existing timeout
    if (displayElement.fadeTimeout) {
      clearTimeout(displayElement.fadeTimeout);
    }
    // Set new timeout
    displayElement.fadeTimeout = setTimeout(() => {
      displayElement.style.opacity = "0.3";
    }, 2000);
  }
}

function changeSpeed(delta) {
  const video = document.querySelector("video");
  if (video) {
    const newSpeed = Math.max(0.25, Math.min(16, video.playbackRate + delta));
    video.playbackRate = newSpeed;
    updateSpeedDisplay(newSpeed);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && !event.shiftKey && !event.altKey) {
    if (event.key === "ArrowUp") {
      changeSpeed(0.05);
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      changeSpeed(-0.05);
      event.preventDefault();
    }
  }
});

// Initial speed display
const video = document.querySelector("video");
if (video) {
  updateSpeedDisplay(video.playbackRate);
}
