const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');

let previousResponse = []

const adjectives = [
    "happy", "sad", "angry", "excited", "nervous",
    "brave", "curious", "lazy", "friendly", "polite",
    "quick", "slow", "bright", "dark", "heavy",
    "light", "strong", "weak", "rich", "poor",
    "fancy", "plain", "gentle", "harsh", "fierce",
    "calm", "quiet", "loud", "proud", "humble",
    "wise", "foolish", "funny", "serious", "unique",
    "common", "delicate", "rough", "smooth", "shiny",
    "dull", "warm", "cold", "hot", "cool",
    "young", "old", "fresh", "stale", "new",
    "ancient", "modern", "beautiful", "ugly", "handsome",
    "tall", "short", "big", "small", "large",
    "tiny", "massive", "minuscule", "bitter", "sweet",
    "salty", "sour", "spicy", "bland", "tasty",
    "tired", "energetic", "lively", "bold", "timid",
    "helpful", "useless", "harmful", "safe", "dangerous", "mad", "sad", "happy", "great", "fun", "angry", "horrible"
  ];

let verbs = [
    "run", "jump", "swim", "read", "write",
    "speak", "listen", "cook", "eat", "drink",
    "sleep", "wake", "drive", "walk", "fly",
    "play", "sing", "dance", "laugh", "cry",
    "build", "destroy", "create", "think", "imagine",
    "work", "rest", "study", "learn", "teach",
    "watch", "hear", "see", "feel", "touch",
    "carry", "throw", "catch", "push", "pull",
    "climb", "fall", "lift", "drop", "hold",
    "smile", "frown", "choose", "decide", "act",
    "love", "hate", "dislike", "prefer",
    "paint", "draw", "clean", "fix", "repair",
    "gather", "search", "find", "lose", "win",
    "explore", "discover", "travel", "arrive", "leave",
    "promise", "break", "fight", "forgive", "forget",
    "remember", "give", "receive", "send", "receive", "make", "swim"
  ];

let apology = [
    "I'm sorry", "I apologize", "My apologies", "I beg your pardon", "Excuse me",
    "Please forgive me", "I didn't mean to", "I'm sorry for the mistake", "Forgive me",
    "I was wrong", "I take full responsibility", "I owe you an apology", "I regret that",
    "Pardon me", "I'm truly sorry", "I didn't intend to", "I hope you can forgive me",
    "It won't happen again", "I made a mistake", "I feel terrible about it", "I'm sorry if I hurt you", "sorry", "apologize"
  ];
  
  
  // Add -ing form of each verb
  const verbsWithIng = verbs.map(verb => {
    if (verb === "eat" || verb === "run" || verb === "drive" || verb === "swim") {
      // Handle irregular verbs if needed
      if (verb === "eat") return "eating";
      if (verb === "run") return "running";
      if (verb === "drive") return "driving";
      if (verb === "swim") return "swimming";
    }
    // For regular verbs, simply add "ing"
    return verb + "ing";
  });
  
  // Combine the original verbs array with the new -ing forms
  verbs = verbs.concat(verbsWithIng);
    

const questionWords = [
    "who", "what", "when", "where", "why", "how",
    "which", "whom", "whose", "can", "could", 
    "would", "should"
  ];
  

let peopleAndAnimals = [
    "man", "woman", "child", "teacher", "doctor",
    "nurse", "student", "engineer", "artist", "friend",
    "parent", "sibling", "partner", "stranger", "hero",
    "cat", "dog", "horse", "elephant", "lion",
    "tiger", "bear", "rabbit", "fish", "bird",
    "mouse", "monkey", "deer", "frog", "whale",
    "dolphin", "kangaroo", "zebra", "penguin", "sheep"
  ];
  
  // Function to generate plural forms
  const pluralize = (word) => {
    if (word === "man") return "men";
    if (word === "woman") return "women";
    if (word === "child") return "children";
    if (word === "mouse") return "mice";
    if (word === "fish") return "fish"; // Fish can be both singular and plural
    if (word === "deer") return "deer"; // Deer can be both singular and plural
    if (word === "sheep") return "sheep"; // Sheep can be both singular and plural
    // Regular pluralization
    return word.endsWith("y") ? word.slice(0, -1) + "ies" : word + "s";
  };

  const continuingPromptPhrases = [
    "Tell me more", "Go on", "Please continue", "What happened next?", 
    "I’m listening", "Could you elaborate?", "Keep going", "And then?", 
    "What else?", "I’d like to hear more", "Can you explain that further?", 
    "That’s interesting, tell me more", "What do you mean by that?", 
    "Tell me more about that", "Please share more", "I’m curious, go on", 
    "Can you expand on that?", "That’s fascinating, continue", 
    "I’d love to know more", "What did you do next?"
  ];
  
  
  // Create an array of plural forms
  peopleAndAnimals = peopleAndAnimals.map(pluralize);
  
  // Combine the singular and plural arrays
  peopleAndAnimals = peopleAndAnimals.concat(peopleAndAnimals);  
  

// Add event listener for Enter key press
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
        sendMessage(); // Call function
        event.preventDefault(); // Prevent default Enter behavior (optional)
    }
    });

// Function to add a message to the chat window
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.textContent = text;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to handle sending a message
function sendMessage() {
  const text = userInput.value.trim();
  if (text) {
    addMessage(text, 'user');
    userInput.value = '';
    getElizaResponse(text);
  }
}

// Function to generate a basic Eliza response
function getElizaResponse(userText) {
  let response = "I'm here to listen. Tell me more.";
  userText = userText.toLowerCase()
  adjective = checkAdjective(userText)
  verb = checkVerb(userText)
  noun = checkNoun(userText)
  
  // Basic keywords and responses

  try {
    if (userText.toLowerCase().includes("hi") || userText.toLowerCase().includes("hello")){
        response = "Hi!"
    } else if(checkQuestion(userText)){
        response = replacePronouns(userText)
    } else if (adjective != null){
        response = "Why do you think you feel " + adjective + "?"
    } else if (verb != null){
        if (verb.includes("ing")) {
            response = "Tell me more about " + verb + "."
        } else {
            response = "Tell me more about " + verb + "ing."
        }
    } else if (noun != null){
        response = "Tell me more about " + noun + ". What do you think of them?" 
    } else if (apology(userText)) {
        response = "Apologies are not necessary. Let's start again."
    } else if (userText.includes("talk")) {
        response = "I'm talking to you. Tell me more." 
    }
  } catch {
    response = "Interesting. Tell me more."
  }

  if (response.includes("TEMP_1") || response.includes("TEMP_2") || response.includes("undefined")){
    response = getRandomPrompt()
  }
  if (previousResponse.includes(response)) {
    response = getRandomPrompt()
  }
  // Add Eliza's response
  previousResponse.push(response)
  if (previousResponse.length > 5) {
    previousResponse = []
  }
  setTimeout(() => addMessage(response, 'bot'), 500);
}

// Function to randomly select a phrase
function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * continuingPromptPhrases.length);
    return continuingPromptPhrases[randomIndex];
  }

function checkQuestion(userText){
    for (let word of userText.split(" ")){
        if (questionWords.includes(word)){
            return true;
        }
    }
    return false
}

function checkAdjective(userText){
    for (let word of userText.split(" ")){
        if (adjectives.includes(word)) {
            return word;
        }
    }
    return null
}

function checkVerb(userText){
    let previousWord = " "
    for (let word of userText.split(" ")) {
        if (verbs.includes(word)) {
            return word
        }
        previousWord = word
    }
    return null
}

function checkNoun(userText){
    for (let word of userText.split(" ")) {
        if (peopleAndAnimals.includes(word)) {
            return word
        }
    }
    return null
}

function checkApologies(userText){
    for (let word of userText.split(" ")) {
        if (apology.includes(word)) {
            return true
        }
    }
    return false
}

function replacePronounsChecks(userText) {
    if (userText.includes("you") && userText.includes("me")) {
        const result = swapPronouns(userText, "I");
    } else if (userText.includes("you")){
        const result = swapPronouns(userText, "me")
    } else if (userText.includes("me")){
        const result = swapPronouns(userText, "me")
    }
    return result;
}
function replacePronouns(userText, youORme) {
    return userText
      .replace(/\byou\b/gi, "TEMP_1")
      .replace(/\bme\b/gi, "TEMP_2")
      .replace(/\bi\b/gi, "TEMP_2")
      .replace("TEMP_1", youORme)
      .replace("TEMP_2", "you");
  }
  
