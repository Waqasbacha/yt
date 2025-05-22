// DOM Elements
const chatBtn = document.getElementById('chat-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const minimizeBtn = document.getElementById('minimize-btn');
const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Toggle Chat Window
chatBtn.addEventListener('click', () => {
  const currentDisplay = window.getComputedStyle(chatbotContainer).display;
  chatbotContainer.style.display = (currentDisplay === 'none') ? 'flex' : 'none';
});

// Minimize Chat Window
minimizeBtn.addEventListener('click', () => {
  chatbotContainer.style.display = 'none';
});

// Send Message
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Keyword-Based Responses
const responses = [
  {
    pattern: /track.*order/i,
    response:
      'You can track your order by logging into your Joann account and visiting the "Order History" section. You’ll receive a tracking number via email once your order ships.',
  },
  {
    pattern: /cancel|modify.*order/i,
    response:
      'Orders can only be canceled or modified if they haven’t entered the shipping process. Please contact Joann Customer Service immediately for assistance.',
  },
  {
    pattern: /shipping.*(options|costs?)/i,
    response:
      'Joann offers standard, expedited, and in-store pickup options. Shipping costs vary based on order size and delivery speed. Free shipping may be available for qualifying orders.',
  },
  {
    pattern: /how long.*delivery|ship/i,
    response:
      'Standard shipping typically takes 3–7 business days. Expedited options may arrive sooner. Delivery times depend on your location and product availability.',
  },
  {
    pattern: /return.*policy/i,
    response:
      'Most unopened items can be returned within 90 days with a receipt. Final sale items (e.g., clearance) are non-returnable. Visit the <a href="https://www.joann.com/returns-exchanges/" target="_blank">Returns & Exchanges</a> page for details.',
  },
  {
    pattern: /hello|hi|hey/i,
    response: 'Hello! Welcome to Joann support. How can I help you today?',
  },
  {
    pattern: /bye|goodbye/i,
    response: 'Thank you for contacting Joann! Happy crafting!',
  },
  {
    pattern: /help/i,
    response:
      'I can help with order tracking, returns, product availability, coupons, store hours, and more! Ask me anything.',
  },
];

// Send Message Function
function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  // Display User Message
  chatArea.innerHTML += `<div class="message user">${userMessage}</div>`;

  // Display Bot Loading Message
  chatArea.innerHTML += `<div class="message bot">...typing...</div>`;

  // Find and Display Bot Response
  let botResponse = `I'm sorry, I don't have information on that. For more complex inquiries, please visit <a href="https://www.joann.com/help/" target="_blank">Joann Help Center</a> or contact customer support at 1-888-739-4120.`;

  for (const item of responses) {
    if (item.pattern.test(userMessage)) {
      botResponse = item.response;
      break;
    }
  }

  // Replace the loading message with the actual response
  const botMessages = chatArea.getElementsByClassName('message bot');
  botMessages[botMessages.length - 1].innerHTML = botResponse;

  // Clear Input and Scroll to Bottom
  userInput.value = '';
  chatArea.scrollTop = chatArea.scrollHeight;
}
