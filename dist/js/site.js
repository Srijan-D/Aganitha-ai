let quizQuestions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    answer: "Hypertext Markup Language",
    options: [
      "Hypertext Markup Language",
      "Hyper Transfer Modern Language",
      "High Tech Markup Language",
      "Hypertext Modern Language",
      "Hyperlink and Text Markup Language",
    ],
  },
  {
    id: 2,
    question:
      "In CSS, what property is used to change the text color of an element?",
    answer: "color",
    options: ["text-color", "font-color", "color", "text-style", "font-style"],
  },
  {
    id: 3,
    question:
      "What is the correct CSS syntax for making all the elements bold?",
    answer: "p { font-weight: bold; }",
    options: [
      "p { text-style: bold; }",
      "p { bold: true; }",
      "p { font-weight: bold; }",
      "p { style: bold; }",
      "p { text-weight: bold; }",
    ],
  },
  {
    id: 4,
    question:
      "Which CSS property is used to control the space between the elements' border and content?",
    answer: "padding",
    options: ["margin", "border", "spacing", "padding", "indent"],
  },
  {
    id: 5,
    question: "What is the CSS property used to make text bold?",
    answer: "font-weight",
    options: [
      "text-style",
      "font-bold",
      "bold-text",
      "font-weight",
      "text-bold",
    ],
  },
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
quizQuestions = shuffle(quizQuestions);

let question_count = 0;
let points = 0;

window.onload = function () {
  show(question_count, true);
};

function next() {
  if (question_count == quizQuestions.length - 1) {
    setTimeout(() => {
      sessionStorage.setItem("time", time);
      clearInterval(mytime);
      location.href = "end.html";
    }, 1000);
  }

  let user_answer = document.querySelector("li.option.active").innerHTML;

  if (user_answer == quizQuestions[question_count].answer) {
    points += 1;
    Toastify({
      text: "Your Anwer is Correct",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      gravity: "bottom",
    }).showToast();
    sessionStorage.setItem("points", points);
  } else {
    Toastify({
      text: "Your Anwer is Wrong",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
      gravity: "bottom",
    }).showToast();
  }

  question_count++;
  show(question_count, false);
}

function show(count, isFirst) {
  let btnNext = document.getElementById("next-btn");
  btnNext.classList.add("btn-disabled");
  let question = document.getElementById("questions");
  let [first, second, third, fourth, fifth] = quizQuestions[count].options;
  question.innerHTML = !isFirst
    ? `
  <div class="loading-txt">Loading Next Question</div>
  <div class="spinner-border center" role="status">
  <span class="sr-only"></span>
</div>`
    : `<div class="loading-txt">Loading Your Quiz</div>
<div class="spinner-border center" role="status">
<span class="sr-only"></span>
</div>`;
  setTimeout(function () {
    question.innerHTML = `
  <h2>Q${count + 1}. ${quizQuestions[count].question}</h2>
   <ul class="option_group">
  <li class="option">${first}</li>
  <li class="option">${second}</li>
  <li class="option">${third}</li>
  <li class="option">${fourth}</li>
  <li class="option">${fifth}</li>
</ul>`;
    toggleActive();
    btnNext.classList.remove("btn-disabled");
  }, 2000);
}

function toggleActive() {
  let option = document.querySelectorAll("li.option");
  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function () {
      for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
          option[i].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}
