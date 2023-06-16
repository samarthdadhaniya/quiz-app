// Quiz data
const quizData = [
    {
        question: "Question 1: What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Question 2: Who painted the Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"],
        answer: "Leonardo da Vinci"
    },
    // Add more questions here...
];

// Initialize variables
let currentQuestion = 0;
let marks = 0;

// Display the current question and options
function displayQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const question = quizData[currentQuestion].question;
    const options = quizData[currentQuestion].options;

    let quizHTML = `<h3>${question}</h3>`;

    options.forEach((option, index) => {
        quizHTML += `<label><input type="radio" name="answer${currentQuestion}" value="${option}">${option}</label><br>`;
    });

    quizContainer.innerHTML = quizHTML;
}

// Calculate the quiz result
function calculateResult() {
    quizData.forEach((quiz, index) => {
        const answers = document.getElementsByName(`answer${index}`);
        const selectedOption = Array.from(answers).find(answer => answer.checked);

        if (selectedOption) {
            const selectedAnswer = selectedOption.value;
            if (selectedAnswer === quiz.answer) {
                marks++;
                selectedOption.parentElement.classList.add("correct");
            } else {
                selectedOption.parentElement.classList.add("wrong");
            }
        }
    });
}

// Display the quiz result
function displayResult() {
    const resultContainer = document.getElementById("result-container");
    const resultModal = document.getElementById("result-modal");
    const closeButton = document.getElementsByClassName("close")[0];
    const marksElement = document.getElementById("marks");
    const percentageElement = document.getElementById("percentage");
    const gradeElement = document.getElementById("grade");

    const totalQuestions = quizData.length;
    const percentage = (marks / totalQuestions) * 100;
    let grade;

    if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 60) {
        grade = "B";
    } else if (percentage >= 40) {
        grade = "C";
    } else {
        grade = "F";
    }

    marksElement.innerText = `Marks: ${marks}/${totalQuestions}`;
    percentageElement.innerText = `Percentage: ${percentage}%`;
    gradeElement.innerText = `Grade: ${grade}`;

    resultContainer.style.display = "block";
    resultModal.style.display = "block";

    closeButton.onclick = function() {
        resultContainer.style.display = "none";
        resultModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === resultModal) {
            resultContainer.style.display = "none";
            resultModal.style.display = "none";
        }
    };
}

// Load the quiz on page load
window.onload = function() {
    displayQuestion();
    const submitButton = document.getElementById("submit-button");
    submitButton.style.display = "block";
    submitButton.addEventListener("click", function() {
        calculateResult();
        submitButton.style.display = "none";
        displayResult();
    });
};
