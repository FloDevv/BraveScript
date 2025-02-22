// I'm note using this script because it's sucks

(() => {
  // Function to apply global square style and black backgrounds
  function applySquareStyle() {
    if (document.getElementById("square-style-twitch")) return;
    const style = document.createElement("style");
    style.id = "square-style-twitch";
    const rules = [
      "*, *::before, *::after { border-radius: 0 !important; }",
      "body { background-color: black !important; }",
    ];
    style.textContent = rules.join("\n");
    document.head.appendChild(style);
  }

  // Modified function to target Twitch left navbar using proper setProperty calls.
  function modifyNav() {
    const nav = document.querySelector(
      ".simplebar-content.side-nav__scrollable_content"
    );
    if (nav) {
      // Add styles to the style element instead of inline
      const navStyles = `
        .simplebar-content.side-nav__scrollable_content {
          background-color: black !important;
          border-radius: 0 !important;
        }
        .side-nav-card {
          background-color: black !important;
        }
        .side-nav__scrollable_content > div {
          background-color: black !important;
        }
      `;
      const styleEl = document.createElement("style");
      styleEl.textContent = navStyles;
      document.head.appendChild(styleEl);
    }
  }

  // Main function to modify the page
  function modifyPage() {
    applySquareStyle();
    modifyNav();
  }

  // Initial injection after slight delay for page load
  setTimeout(modifyPage, 2000);

  // Observer to catch dynamic content updates
  const observer = new MutationObserver(() => {
    modifyPage();
  });
  setTimeout(() => {
    observer.observe(document.body, { childList: true, subtree: true });
  }, 2500);
})();
