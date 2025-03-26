let currentData = {
  id: 0,
  name: "Root",
  isFolder: true,
  isExpanded: true,
  children: [
    {
      id: 1,
      name: "File1.txt",
      isFolder: false,
    },
    {
      id: 2,
      name: "Folder1",
      isFolder: true,
      isExpanded: false,
      children: [
        {
          id: 3,
          name: "File2.txt",
          isFolder: false,
        },
        {
          id: 4,
          name: "SubFolder1",
          isFolder: true,
          isExpanded: false,
          children: [
            {
              id: 5,
              name: "File3.txt",
              isFolder: false,
            },
          ],
        },
      ],
    },
  ],
};

const app = document.getElementById("app");

function createTree(data) {
  const ul = document.createElement("ul");
  ul.className = "tree";

  data.children.forEach((item) => {
    const li = document.createElement("li");
    li.className = item.isFolder ? "folder" : "file";

    if (item.isFolder && !item.isExpanded) {
      li.classList.add("collapsed");
    }

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    const nameBox = document.createElement("div");
    nameBox.className = "wrapper";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;
    nameSpan.style.cursor = "pointer";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = item.name;
    input.style.display = "none";

    nameSpan.onclick = () => onNameClick(nameSpan, nameInput, item);
    input.onblur = () => onNameBlur(nameInput, nameSpan, item);

    nameBox.append(nameSpan, input);

    if (item.isFolder) {
      const icon = document.createElement("span");
      icon.textContent = item.isExpanded ? "▼" : "▶";
      icon.style.marginRight = "5px";
      icon.style.cursor = "pointer";
      icon.onclick = (e) => {
        e.stopPropagation();
        item.isExpanded = !item.isExpanded;
        renderTree();
      };
      nameBox.prepend(icon);
    }

    wrapper.appendChild(nameBox);

    const actions = document.createElement("div");
    actions.className = "actions";

    const createFolderButton = document.createElement("button");
    createFolderButton.innerHTML = "📁 ";
    createFolderButton.onclick = (e) => {
      e.stopPropagation();
      createNode(item, true);
      renderTree();
    };

    const createFileButton = document.createElement("button");
    createFileButton.innerHTML = "📄 ";
    createFileButton.onclick = (e) => {
      e.stopPropagation();
      createNode(item, false);
      renderTree();
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️ ";
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      deleteNode(currentData, item.id);
      renderTree();
    };

    if (item.isFolder) {
      actions.append(createFolderButton, createFileButton);
    }
    actions.append(deleteButton);
    wrapper.appendChild(actions);

    li.appendChild(wrapper);

    if (item.isFolder && item.children && item.children.length > 0) {
      const childUl = createTree(item);
      li.appendChild(childUl);
    }

    ul.appendChild(li);
  });

  return ul;
}

function onNameClick(nameSpan, nameInput, item) {
  nameSpan.style.display = "none";
  nameInput.style.display = "inline-block";
  nameInput.focus();
}

function onNameBlur(nameInput, nameSpan, item) {
  const newName = nameInput.value.trim();
  if (newName) {
    item.name = newName;
  }
  nameSpan.textContent = item.name;
  nameSpan.style.display = "inline";
  nameInput.style.display = "none";
  renderTree();
}

function createNode(parent, isFolder) {
  if (!parent.isFolder) return;
  if (!parent.children) parent.children = [];
  parent.children.push({
    id: Date.now(),
    name: isFolder ? "New Folder" : "New File",
    isFolder,
    isExpanded: false,
    children: isFolder ? [] : undefined,
  });
  parent.isExpanded = true;
}

function deleteNode(data, id) {
  if (!data.children) return;
  data.children = data.children.filter((child) => {
    if (child.id === id) return false;
    deleteNode(child, id);
    return true;
  });
}

function renderTree() {
  app.innerHTML = "";
  app.appendChild(createTree(currentData));
}

function init() {
  renderTree();
}
init();
