const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Madrid"],
        answer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        answer: 1
    }
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submitBtn");
const resultsContainer = document.getElementById("results");

function buildQuiz() {
    quizData.forEach((questionData, index) => {
      const questionElem = document.createElement("div");
      questionElem.classList.add("question");
      questionElem.innerHTML = `
        <h3>${index + 1}. ${questionData.question}</h3>
        <div class="options">
          ${questionData.options
            .map(
              (option, optionIndex) =>
                `<label>
                   <input type="radio" class="options" name="question${index}" value="${optionIndex}">
                   ${option}
                 </label>`
            )
            .join("")}
        </div>
      `;
      quizContainer.appendChild(questionElem);
    });
  }
  

// Inside the showResults() function, update the code as follows

function showResults() {
    const answerElems = quizContainer.querySelectorAll("input:checked");
    let score = 0;

    answerElems.forEach((answerElem, index) => {
        const questionData = quizData[index];
        const selectedOption = parseInt(answerElem.value);
        const questionElem = quizContainer.querySelector(`.question:nth-child(${index + 1})`);

        const optionLabels = questionElem.querySelectorAll("label");

        optionLabels.forEach((optionLabel, optionIndex) => {
            if (optionIndex === questionData.answer) {
                optionLabel.classList.add("correct");
            } else if (optionIndex === selectedOption) {
                optionLabel.classList.add("incorrect");
            }
        });

        if (selectedOption === questionData.answer) {
            score++;
        }
    });

    const totalQuestions = quizData.length;
    const percentage = (score / totalQuestions) * 100;

    resultsContainer.innerHTML = `
      <h2>Quiz Results</h2>
      <p>Score: ${score}/${totalQuestions}</p>
      <p>Grade: ${getGrade(percentage)}</p>
      <p>Percentage: ${percentage}%</p>
    `;

    resultsContainer.style.display = "block";
}




function getGrade(percentage) {
    if (percentage >= 90) {
        return "A";
    } else if (percentage >= 80) {
        return "B";
    } else if (percentage >= 70) {
        return "C";
    } else if (percentage >= 60) {
        return "D";
    } else {
        return "F";
    }
}

buildQuiz();

submitButton.addEventListener("click", showResults);
