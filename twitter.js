(() => {
  // Replace text in specific elements
  function replaceTextInElement(element) {
    if (
      element.getAttribute("aria-label") === "X" ||
      element.alt?.includes("X") ||
      element instanceof HTMLTitleElement
    ) {
      element.textContent = element.textContent.replace(/X/g, "Twitter");
    }
  }

  // Remove the "Who to follow" section
  function removeWhoToFollow() {
    const whoToFollowAside = document.querySelector(
      'aside[aria-label="Who to follow"]'
    );
    if (whoToFollowAside?.parentElement?.parentElement) {
      whoToFollowAside.parentElement.parentElement.remove();
      console.log('"Who to follow" section removed.');
    }
  }

  // Remove the footer
  function removeFooter() {
    const footer = document.querySelector('nav[aria-label="Footer"]');
    if (footer) {
      footer.remove();
      console.log("Footer removed.");
    }
  }

  // Remove the Grok button (or its container)
  function removeGrokButton() {
    const grokDrawer = document.querySelector('[data-testid="GrokDrawer"]');
    if (grokDrawer) {
      const grokContainer = grokDrawer.closest(
        'div[style*="position: absolute"][style*="bottom: 0px"]'
      );
      if (grokContainer) {
        grokContainer.remove();
        console.log("Grok button removed (container removed).");
      } else {
        grokDrawer.remove();
        console.log("Grok drawer removed.");
      }
    }
  }

  // Remove the messaging section
  function removeMessaging() {
    const messaging = document.querySelector('div[data-testid="DMDrawer"]');
    if (messaging) {
      messaging.remove();
      console.log("Messaging section removed.");
    }
  }

  // Remove navigation buttons on the left
  function removeNavButtons() {
    const navItemsToRemove = [
      "Search and explore",
      "Grok",
      "List",
      "Jobs",
      "Communities",
      "Premium",
      "Verified Orgs",
      "Direct Messages",
      "Post",
    ];
    for (const item of navItemsToRemove) {
      const navItems = document.querySelectorAll(`a[aria-label="${item}"]`);
      for (const navItem of navItems) {
        navItem.style.display = "none";
      }
    }
  }

  // Remove the trending ("What's happening") section
  function removeTrendingSection() {
    const trendingSection = document.querySelector(
      'section[aria-labelledby="accessible-list-0"]'
    );
    if (trendingSection) {
      trendingSection.remove();
      console.log("'What's happening' section removed.");
    }
  }

  // Remove border line elements with specific classes
  function removeBorderLine() {
    const borderDivs = document.querySelectorAll(
      "div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x"
    );
    for (const div of borderDivs) {
      div.remove();
    }
    if (borderDivs.length > 0) {
      console.log("Border line element(s) removed.");
    }
  }

  // Remove the account menu section
  function removeAccountMenu() {
    const accountMenu = document.querySelector("div.r-184id4b");
    if (accountMenu) {
      accountMenu.remove();
      console.log("Account menu section removed.");
    }
  }

  // Update t.co links inside each tweet
  function updateTcoLinks() {
    const articles = document.querySelectorAll('article[data-testid="tweet"]');
    for (const article of articles) {
      let replacementUrl = null;
      const tweetText = article.querySelector('[data-testid="tweetText"]');
      if (tweetText) {
        const nonTcoLink = tweetText.querySelector(
          'a[href^="http"]:not([href^="https://t.co/"])'
        );
        if (nonTcoLink) {
          replacementUrl = nonTcoLink.href;
        }
      }
      const tcoLinks = article.querySelectorAll('a[href^="https://t.co/"]');
      for (const link of tcoLinks) {
        const expanded =
          link.getAttribute("data-expanded-url") ||
          link.getAttribute("data-full-url");
        const newUrl = expanded || replacementUrl;
        if (newUrl) {
          console.log("Updating t.co link", link.href, "to", newUrl);
          link.href = newUrl;
          if (link.textContent.trim() === link.href) {
            link.textContent = newUrl;
          }
        }
      }
    }
  }

  // Apply global styles including removal of border radii and custom scrollbar styling
  function applySquareStyle() {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Remove all rounded corners and make everything square */
      * {
        border-radius: 0 !important;
        box-shadow: none !important;
      }

      /* Minimalist WebKit scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #000 !important;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #222 !important;
        border-radius: 0;
      }
      ::-webkit-scrollbar-thumb:hover {
        background-color: #333 !important;
      }

      div[data-testid="primaryColumn"] {
        border: none !important;
      }

      div[role="separator"] {
        border-color: #000 !important;
      }

      .r-gu4em3 {
        background-color: rgb(0, 0, 0) !important;
      }
    `;
    document.head.appendChild(style);
    console.log("Minimalist square style applied.");
  }

  // Main function to modify the page
  function modifyPage() {
    console.log("Modifying page...");
    document.title = document.title.replace(/X/g, "Twitter");

    const logoElements = document.querySelectorAll("img");
    for (const logo of logoElements) {
      if (logo.alt?.includes("X")) {
        logo.alt = logo.alt.replace(/X/g, "Twitter");
        logo.src = "https://abs.twimg.com/icons/apple-touch-icon-192x192.png";
      }
    }

    const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
    for (const link of faviconLinks) {
      link.href = "https://abs.twimg.com/favicons/favicon.ico";
    }

    const specificLogo = document.querySelector(
      'h1.css-175oi2r a[role="link"] div svg'
    );
    if (specificLogo) {
      specificLogo.outerHTML = `
        <img src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png" alt="Twitter" style="width: 32px; height: 32px;">
      `;
    }

    removeNavButtons();
    const postButton = document.querySelector(
      'a[data-testid="SideNav_NewTweet_Button"]'
    );
    if (postButton) {
      postButton.style.display = "none";
    }

    // Remove unwanted sections
    removeWhoToFollow();
    removeFooter();
    removeGrokButton();
    removeMessaging();
    removeTrendingSection();
    removeBorderLine();
    removeAccountMenu();

    updateTcoLinks();
    applySquareStyle();
  }

  // Observe title changes to update if necessary
  function observeTitle() {
    const titleElement = document.querySelector("title");
    if (titleElement) {
      const titleObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (document.title.includes("X")) {
            document.title = document.title.replace(/X/g, "Twitter");
            console.log("Title updated to replace 'X' with 'Twitter'.");
          }
        }
      });
      titleObserver.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  }

  // Wait for DOM to be fully loaded before modifying the page
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, modifying page...");
    modifyPage();
    observeTitle();

    // Use a MutationObserver to catch dynamically loaded content
    setTimeout(() => {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) {
              if (
                node.matches &&
                (node.matches('[aria-label="X"]') || node.matches("title"))
              ) {
                replaceTextInElement(node);
              }
              if (node.querySelectorAll) {
                const newLogos = node.querySelectorAll("img");
                for (const logo of newLogos) {
                  if (logo.alt?.includes("X")) {
                    logo.alt = logo.alt.replace(/X/g, "Twitter");
                    logo.src =
                      "https://abs.twimg.com/icons/apple-touch-icon-192x192.png";
                  }
                }
              }
            }
          }
          removeWhoToFollow();
          removeFooter();
          removeGrokButton();
          removeMessaging();
          removeNavButtons();
          removeTrendingSection();
          removeBorderLine();
          removeAccountMenu();
          updateTcoLinks();
        }
      });
      setTimeout(() => {
        modifyPage();
        observeTitle();
      }, 3500);
      observer.observe(document.body, { childList: true, subtree: true });
    }, 1500);
  });
})();
