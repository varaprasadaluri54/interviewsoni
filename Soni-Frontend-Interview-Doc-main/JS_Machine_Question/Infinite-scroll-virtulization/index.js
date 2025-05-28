const container = document.getElementById("container");
const itemContainer = document.getElementById("item-container");
const loading = document.getElementById("loading");

const itemHeight = 50;
const bufferItemsize = 3;
const pageSize = 20;
const items = [];
let isFetching = false;

function fetchData() {
  if (isFetching) return;
  isFetching = true;
  loading.style.display = "block";

  const updateItem = () => {
    const startIndex = items.length;
    for (let i = 0; i < pageSize; i++) {
      items.push(`Item ${startIndex + i + 1}`);
    }

    //Adjust total heigt
    itemContainer.style.height = `${items.length * itemHeight}px`;
    renderVisibleItems();
    isFetching = false;
    loading.style.display = "none";
  };

  setTimeout(updateItem, 1000);
}

function renderVisibleItems() {
  container.innerHTML = "";
  container.appendChild(itemContainer);

  const scrollTop = container.scrollTop;
  const startIdx = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - bufferItemsize
  );

  const endIdx = Math.min(
    items.length,
    startIdx + Math.ceil(container.clientHeight / itemHeight) + bufferItemsize
  );

  for (let i = startIdx; i < endIdx; i++) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = items[i];
    div.style.top = `${i * itemHeight}px`;
    container.appendChild(div);
  }
}

function handleScroll() {
  renderVisibleItems();
  if (
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - 50
  ) {
    fetchData();
  }
}

function init() {
  container.addEventListener("scroll", handleScroll);
  fetchData();
}

init();
