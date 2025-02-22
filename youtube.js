(() => {
  // Function to add styles once
  function applySquareStyle() {
    if (document.getElementById("square-style")) return;
    const style = document.createElement("style");
    style.id = "square-style";
    const rules = [
      "*, *::before, *::after { border-radius: 0 !important; }",
      "ytd-app { background-color: black !important; }",
      "ytd-page-manager { background-color: black !important; }",
      "#content { background-color: black !important; }",
      "#columns { background-color: black !important; }",
      "ytd-watch-flexy { background-color: black !important; }",
      "ytd-browse { background-color: black !important; }",
      "#primary { background-color: black !important; }",
      "#secondary { background-color: black !important; }",
    ];
    style.textContent = rules.join("\n");
    document.head.appendChild(style);
  }

  // Function to remove the mic button (voice-search-button)
  function removeMicButton() {
    const micButton = document.getElementById("voice-search-button");
    if (micButton) {
      micButton.remove();
    }
  }

  // Function to remove Shorts section and button
  function removeShorts() {
    // Remove Shorts button from sidebar
    const shortsButton = document.querySelector('a[title="Shorts"]');
    if (shortsButton?.parentElement) {
      shortsButton.parentElement.remove();
    }

    // Remove Shorts section from main feed
    const shortsSection = document.querySelector("ytd-rich-section-renderer");
    if (shortsSection) {
      shortsSection.remove();
    }

    // Remove Shorts shelf/carousel
    const shortsShelf = document.querySelector("ytd-reel-shelf-renderer");
    if (shortsShelf) {
      shortsShelf.remove();
    }
  }

  // Main function
  function modifyPage() {
    applySquareStyle();
    removeMicButton();
    removeChipsWrapper();
    removeShorts();
  }

  // Initial delayed injection
  setTimeout(modifyPage, 2500);

  // Observer for dynamic changes (minimal callback)
  const observer = new MutationObserver(() => {
    modifyPage();
  });

  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }, 3000);
})();
