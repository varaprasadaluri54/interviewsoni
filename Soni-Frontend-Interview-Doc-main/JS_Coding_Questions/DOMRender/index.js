// Question
// Asked in Meta
// Level ->> Medium

// How does the renderDom function create and append DOM elements
// based on the dom object structure

// const dom = {
//   type: 'section',
//   props: {
//       id: 'section-1',
//       class: 'main-section',
//       style: 'background-color: lightblue; padding: 20px; border-radius: 5px;'
//   },
//   children: [
//       {
//           type: 'header',
//           children: 'Welcome to Soni Frontend Doc',
//           props: {
//               style: 'font-size: 24px; color: darkblue; text-align: center;'
//           }
//       },
//       {
//           type: 'article',
//           children: [
//               {
//                   type: 'h2',
//                   children: 'Render DOM',
//                   props: { style: 'color: darkgreen;' }
//               },
//               {
//                   type: 'p',
//                   children: 'Try youself first then look for solution',
//                   props: { style: 'font-size: 16px; color: grey;' }
//               }
//           ]
//       },
//       {
//           type: 'footer',
//           children: 'Thanks you :)',
//           props: {
// 	          style: 'text-align: center; font-size: 14px; color: black;'
// 	        }
//       }
//   ]
// };

//Solution
const dom = {
    type: 'section',
    props: {
        id: 'section-1',
        class: 'main-section',
        style: 'background-color: lightblue; padding: 20px; border-radius: 5px;'
    },
    children: [
        {
            type: 'header',
            children: 'Welcome to Soni Frontend Doc',
            props: {
                style: 'font-size: 24px; color: darkblue; text-align: center;'
            }
        },
        {
            type: 'article',
            children: [
                {
                    type: 'h2',
                    children: 'Render DOM',
                    props: { style: 'color: darkgreen;' }
                },
                {
                    type: 'p',
                    children: 'Try youself first then look for solution',
                    props: { style: 'font-size: 16px; color: grey;' }
                }
            ]
        },
        {
            type: 'footer',
            children: 'Thanks you :)',
            props: {
                style: 'text-align: center; font-size: 14px; color: black;'
              }
        }
    ]
  };
const rootEle = document.getElementById("root");

const renderDom = ({ type, props, children }) => {
// Edge cases
if (!type) return null;
const ele = document.createElement(type);

// Set attributes and inline styles
if (props) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === "style") {
      ele.style.cssText = value;
    } else {
      ele.setAttribute(key, value);
    }
  });
}

// Render children
if (Array.isArray(children)) {
  children.forEach((child) => ele.appendChild(renderDom(child)));
} else if (typeof children === "string") {
  ele.textContent = children;
}

return ele;
};

if (rootEle) {
    rootEle.appendChild(renderDom(dom));
}
