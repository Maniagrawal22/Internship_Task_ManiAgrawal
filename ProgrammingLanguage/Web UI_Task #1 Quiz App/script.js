const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const quizData = [
  {
    question:
      "When interpreter encounters an empty statements, what it will do:",
    options: [
      "Shows a warning",
      "Prompts to complete the statement",
      "Throws an error",
      "Ignores the statements",
    ],
    answer: "Ignores the statements",
  },
  {
    question:
      "In the JavaScript, which one of the following is not considered as an error:",
    options: [
      "Syntax error",
      "Missing of semicolons",
      "Division by zero",
      "Missing of Bracket",
    ],
    answer: "Division by zero",
  },
  {
    question:
      "Which of the following one is the property of the primary expression:",
    options: [
      "Contains only keywords",
      "basic expressions containing all necessary functions",
      "contains variable references alone",
      "stand-alone expressions",
    ],
    answer: "stand-alone expressions",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  quizContainer.innerHTML = `
    <h4>${currentQuestion.question}</h4>
    ${currentQuestion.options
      .map(
        (option, index) =>
          `<div>
            <input type="radio" name="option" id="option${index}" value="${option}">
            <label for="option${index}">${option}</label>
          </div>`
      )
      .join("")}
  `;
}

function handleNext() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }
  if (selectedOption.value === quizData[currentQuestionIndex].answer) {
    score++;
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    nextBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
  }
}

function handleSubmit() {
  quizContainer.innerHTML = `<h4>Your score is ${score}/${quizData.length}</h4>`;
  nextBtn.classList.add("d-none");
  submitBtn.classList.add("d-none");
  resetBtn.classList.remove("d-none");
}

function handleReset() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  nextBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
  resetBtn.classList.add("d-none");
}

nextBtn.addEventListener("click", handleNext);
submitBtn.addEventListener("click", handleSubmit);
resetBtn.addEventListener("click", handleReset);

loadQuestion();
