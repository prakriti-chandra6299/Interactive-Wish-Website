
let buddy = "🐰";
let currentQuestion = 0;

let receiver = "";
let sender = "";
let personalNote = "";
let sharedWish = false;


const questions = [
  {
    title: "Be honest! 👀",
    text: "If you were a potato, what would you be?",
    answers: [
      "🍟 French fries",
      "🥔 A fancy potato",
      "😂 A potato with problems"
    ],
    reactions: [
      "Crunchy and iconic! 😂",
      "Fancy taste, I see! ✨",
      "We need to talk, buddy! 🤣"
    ]
  },
  {
    title: "Breaking news! 🚨",
    text: "What would your life movie be called?",
    answers: [
      "🤡 How Did I Get Here?",
      "💅 Too Glam to Care",
      "😴 Sleep Now, Panic Later"
    ],
    reactions: [
      "An award-winning drama! 🎬",
      "Main character energy! 💅",
      "Honestly, relatable! 😂"
    ]
  },
  {
    title: "Choose wisely! 💖",
    text: "Your buddy becomes real. What now?",
    answers: [
      "🫂 Give it a huge hug",
      "🍕 Take it out for food",
      "🏡 Keep it forever"
    ],
    reactions: [
      "Awww, hug attack! 🥹",
      "Best foodie duo ever! 🍕",
      "Your buddy approves! 💗"
    ]
  },
  {
    title: "Final silly question! 🎉",
    text: "What is your secret superpower?",
    answers: [
      "🛌 Sleeping anywhere",
      "🍰 Finding snacks",
      "😂 Making everyone laugh"
    ],
    reactions: [
      "Sleep legend unlocked! 😴",
      "Snack detective! 🕵️",
      "Never lose that smile! 💕"
    ]
  }
];

function start() {
  document.getElementById("welcome").hidden = true;

  if (sharedWish) {
    document.getElementById("choose").hidden = false;
  } else {
    document.getElementById("personalize").hidden = false;
  }
}




function chooseBuddy(animal) {
  buddy = animal;
  document.getElementById("buddy").innerText = animal;
  document.getElementById("selected").innerText =
    "Yay! " + animal + " is your new buddy! 💖";
}

function continueAdventure() {
  document.getElementById("choose").hidden = true;
  document.getElementById("questions").hidden = false;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("progress").innerText =
    "Question " + (currentQuestion + 1) +
    " of " + questions.length;

  document.getElementById("questionTitle").innerText = q.title;
  document.getElementById("questionText").innerText = q.text;
  document.getElementById("reaction").innerText =
    buddy + " is curious about your answer!";

  document.getElementById("nextBtn").hidden = true;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.answers.forEach(function(answer, index) {
    const button = document.createElement("button");
    button.innerText = answer;

    button.onclick = function() {
      chooseAnswer(index);
    };

    answers.appendChild(button);
  });
}

function chooseAnswer(index) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach(function(button) {
    button.disabled = true;
  });

  document.getElementById("reaction").innerText =
    buddy + " says: " + q.reactions[index];

  document.getElementById("nextBtn").hidden = false;

  if (currentQuestion === questions.length - 1) {
    document.getElementById("nextBtn").innerText =
      "Reveal My Surprise 💌";
  } else {
    document.getElementById("nextBtn").innerText =
      "Next Question ➜";
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion === questions.length) {
    document.getElementById("questions").hidden = true;
    document.getElementById("finalWish").hidden = false;
    document.getElementById("finalBuddy").innerText = buddy;

    document.getElementById("personalGreeting").innerText =
      "Dear " + receiver + ", 💖";

    document.getElementById("personalNote").innerText = personalNote;
    document.getElementById("buddy").hidden = true;
    document.getElementById("senderGreeting").innerText =
      sender ? "With love, " + sender + " 💌" : "Sending you a big hug! 🫂";

    return;
  }

  showQuestion();
}


function restartWishes() {
  currentQuestion = 0;
  buddy = "🐰";

  document.getElementById("finalWish").hidden = true;
  document.getElementById("welcome").hidden = false;

  document.getElementById("buddy").innerText = buddy;
  document.getElementById("selected").innerText =
    "Pick your favourite! 💕";
  document.getElementById("buddy").hidden = false;

  document.getElementById("nextBtn").innerText =
    "Next Question ➜";
}


function saveMessage() {
  receiver = document.getElementById("receiverName").value.trim();
  sender = document.getElementById("senderName").value.trim();
  personalNote = document.getElementById("personalMessage").value.trim();

  if (!receiver || !personalNote) {
    alert("Enter the receiver's name and your message! 💕");
    return;
  }

  const data = { receiver, sender, personalNote };
  const encoded = encodeURIComponent(JSON.stringify(data));
  const link = location.href.split("#")[0] + "#wish=" + encoded;

  document.getElementById("personalize").hidden = true;
  document.getElementById("shareWish").hidden = false;
  document.getElementById("wishLink").value = link;
}

function copyWishLink() {
  const field = document.getElementById("wishLink");

  field.select();

  navigator.clipboard.writeText(field.value)
    .then(function() {
      document.getElementById("copyStatus").innerText =
        "Link copied! Send it to your friend 💖";
    })
    .catch(function() {
      document.getElementById("copyStatus").innerText =
        "Press Ctrl+C to copy the selected link.";
    });
}

function loadSharedWish() {
  if (!location.hash.startsWith("#wish=")) return;

  try {
    const data = JSON.parse(
      decodeURIComponent(location.hash.slice(6))
    );

    receiver = data.receiver || "";
    sender = data.sender || "";
    personalNote = data.personalNote || "";
    sharedWish = true;
  } catch (error) {
    alert("This wish link is invalid. 💌");
  }
}

loadSharedWish();


