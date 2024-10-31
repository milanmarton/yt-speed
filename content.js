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

// Watch for player changes and URL changes
const observer = new MutationObserver(() => {
  ensureDisplay();
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Watch for navigation between videos
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    resetSpeed();
  }
}).observe(document, { subtree: true, childList: true });

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

function resetSpeed() {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = 1.0;
    updateSpeedDisplay(1.0);
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

// Track pressed keys for reset combination
let pressedKeys = new Set();

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && !event.shiftKey && !event.altKey) {
    pressedKeys.add(event.key);

    if (event.key === "ArrowUp") {
      if (pressedKeys.has("ArrowDown")) {
        resetSpeed();
      } else {
        changeSpeed(0.05);
      }
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      if (pressedKeys.has("ArrowUp")) {
        resetSpeed();
      } else {
        changeSpeed(-0.05);
      }
      event.preventDefault();
    }
  }
});

document.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key);
});

// Reset speed and show display when navigating to new video
function onNewVideo() {
  const video = document.querySelector("video");
  if (video) {
    resetSpeed();
    // Add listener for video changes
    video.addEventListener("loadedmetadata", () => {
      resetSpeed();
    });
  }
}

// Watch for video player initialization
const videoObserver = new MutationObserver(() => {
  if (document.querySelector("video")) {
    onNewVideo();
    videoObserver.disconnect();
  }
});

videoObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
