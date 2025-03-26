const contents = [];
const tabsContainer = document.getElementById("tabs");
const contentContainer = document.getElementById("tab-content");
let activeTab = null;
const tabs = [
  { id: 1, title: "Tab 1", content: "Tab 1" },
  { id: 2, title: "Tab 2", content: "Tab 2" },
  { id: 3, title: "Tab 3", content: "Tab 3" },
];

const buildTabs = (activeTabNum = 1) => {
  tabs.forEach(({ id, title, content }) => {
    const tabButton = document.createElement("button");
    tabButton.textContent = title;
    tabButton.setAttribute("class", id === activeTabNum ? "tab active" : "tab");
    tabButton.setAttribute("data-tab", id);
    tabsContainer.appendChild(tabButton);

    const contentDiv = document.createElement("div");
    contentDiv.textContent = content;
    contentDiv.setAttribute(
      "class",
      id === activeTabNum ? "content active" : "content"
    );
    contentDiv.setAttribute("data-tab", id);
    contentContainer.appendChild(contentDiv);

    contents.push(contentDiv);
  });

  // Set initial active tab
  activeTab = tabsContainer.querySelector(`[data-tab="${activeTabNum}"]`);
};

const onTabClick = (event) => {
  const clickedTab = event.target;

  if (clickedTab.classList.contains("tab") && clickedTab !== activeTab) {
    const tabId = clickedTab.getAttribute("data-tab");

    if (activeTab) activeTab.classList.remove("active");
    clickedTab.classList.add("active");
    activeTab = clickedTab;

    // Show tab specific content
    contents.forEach((content) => {
      const contentTabId = content.getAttribute("data-tab");
      content.classList.toggle("active", contentTabId === tabId);
    });
  }
};

function init() {
  buildTabs(1);
  tabsContainer.addEventListener("click", onTabClick);
}
init();
