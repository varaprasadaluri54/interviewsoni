const checklistData = {
  label: "Root",
  value: null,
  children: [
    {
      label: "Child 1 of Root",
      value: null,
      children: [
        {
          label: "Nested Child 1-1",
          value: true,
          children: [
            {
              label: "Nested Child 1-1-1",
              value: true,
              children: [
                {
                  label: "Deeply Nested Child 1-1-1-1",
                  value: true,
                },
                {
                  label: "Deeply Nested Child 1-1-1-2",
                  value: true,
                },
              ],
            },
            {
              label: "Nested Child 1-1-2",
              value: false,
            },
          ],
        },
        {
          label: "Nested Child 1-2",
          value: true,
        },
      ],
    },
    {
      label: "Child 2 of Root",
      value: true,
      children: [
        {
          label: "Nested Child 2-1-1",
          value: false,
        },
      ],
    },
    {
      label: "Child 3 of Root",
      value: false,
    },
    {
      label: "Child 4 of Root",
      value: false,
    },
  ],
};

const container = document.getElementById("app");
const CheckboxState = {
  UNCHECKED: "UNCHECKED",
  CHECKED: "CHECKED",
  INDETERMINATE: "INDETERMINATE",
};

const { UNCHECKED, CHECKED, INDETERMINATE } = CheckboxState;

// Recursively update child checkboxes when a parent checkbox is clicked
const updateChildren = (children = [], newValue) => {
  for (let child of children) {
    child.value = newValue;
    if (child.children) {
      updateChildren(child.children, newValue);
    }
  }
};

const handleCheckboxChange = (node, event) => {
  const newValue = event.target.checked;
  node.value = newValue;
  updateChildren(node.children, newValue);
  buildCheckbox();
};

const getStateForNode = (node) => {
  if (!node.children || node.children.length === 0) {
    return node.value ? CHECKED : UNCHECKED;
  }

  let hasChecked = false;
  let hasUnchecked = false;
  let isIndeterminate = false;

  // Iterate through the children to determine the state
  for (const child of node.children) {
    const childState = getStateForNode(child);

    if (childState === INDETERMINATE) {
      isIndeterminate = true;
    } else if (childState === CHECKED) {
      hasChecked = true;
    } else if (childState === UNCHECKED) {
      hasUnchecked = true;
    }
  }

  if (isIndeterminate || (hasChecked && hasUnchecked)) {
    return INDETERMINATE;
  } else if (hasChecked) {
    return CHECKED;
  }

  return UNCHECKED;
};

const createCheckbox = (listItem, label, node) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = handleCheckboxChange.bind(null, node);
  listItem.appendChild(checkbox);
  listItem.appendChild(document.createTextNode(label));

  return checkbox;
};

// Create a checklist item for each node
const createChecklistItem = (node) => {
  const { label, children } = node;
  const listItem = document.createElement("li");
  const checkbox = createCheckbox(listItem, label, node);
  const currentState = getStateForNode(node);

  if (currentState === INDETERMINATE) {
    checkbox.indeterminate = true;
  } else if (currentState === CHECKED) {
    checkbox.checked = true;
  }

  if (children) {
    const sublist = document.createElement("ul");
    children.forEach((child) => {
      const [, item] = createChecklistItem(child);
      sublist.appendChild(item);
    });
    listItem.appendChild(sublist);
  }

  return [currentState, listItem];
};

const buildCheckbox = () => {
  container.innerHTML = "";
  const checklist = document.createElement("ul");
  const [_, rootListItem] = createChecklistItem(checklistData);
  checklist.appendChild(rootListItem);
  container.appendChild(checklist);
};

function init() {
  buildCheckbox();
}
init();
