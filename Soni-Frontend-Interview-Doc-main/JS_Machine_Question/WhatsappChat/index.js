const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-btn");
const messages = [
  "Received message 1",
  "Received message 2",
  "Received message 3",
  "Received message 4",
  "Received message 5",
  "Received message 6",
  "Received message 7",
  "Received message 8",
];

const getRandomMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const onSendMessage = () => {
  const messageText = messageInput.value.trim();
  if (messageText === "") return;

  appendMessage(messageText, "received");

  // Scroll to the bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  messageInput.value = "";
};

const appendMessage = (text, type) => {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  messagesContainer.appendChild(message);

  // Scroll to the bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

const fetchMessages = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: getRandomMessage(),
        createdAt: new Date().toISOString(),
      });
    }, 1000);
  });
};

const receiveMessages = () => {
  fetchMessages().then((response) => {
    appendMessage(response.message, "received");
  });
};

function init() {
  sendButton.addEventListener("click", onSendMessage);
  // receiving messages every 10 seconds
  setInterval(receiveMessages, 10000);
}
init();
