// Quiz data
var quizData = [
  {
      question: "What is the capital of France?",
      options: ["Paris", "Rome", "Madrid", "Berlin"],
      correctAnswer: "a"
  },
  {
      question: "What is the function of the CPU in a computer?",
      options: ["Processing data", "Storing data", "Displaying data", "Inputting data"],
      correctAnswer: "a"
    },
    {
      question: "What is the full form of RAM?",
      options: ["Random Access Memory", "Read And Modify", "Read And Multiply", "Random Authorization Mode"],
      correctAnswer: "a"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Management Language", "Hyperlinks and Text Markup Language", "Hyper Transfer Mode Language"],
      correctAnswer: "a"
    },
    {
      question: "What is the purpose of a compiler?",
      options: ["To translate code into machine language", "To execute code", "To debug code", "To store data"],
      correctAnswer: "a"
    }
];

var userAnswers = [];

$(document).ready(function () {
  var quizSection = $('#quiz');
  var feedbackSection = $('#feedback');
  var resultModal = $('#result-modal');

  // Initialize quiz
  function initQuiz() {
    for (var i = 0; i < quizData.length; i++) {
      var questionHTML = '<div class="question">' +
        '<h6 class="questionNumber">Question ' + (i + 1) + ' :</h6>' +
        '<p class="mainQuestion">' + quizData[i].question + '</p>' +
        '<div class="options">';

      for (var j = 0; j < quizData[i].options.length; j++) {
        questionHTML += '<label>' +
          '<input type="radio" name="q' + (i + 1) + '" value="' + String.fromCharCode(97 + j) + '"> ' +
          String.fromCharCode(97 + j) + ' ) ' + quizData[i].options[j] +
          '</label>';
      }

      questionHTML += '</div></div>';
      quizSection.append(questionHTML);
    }

    // Submit button click event
    $('#submit-btn').on('click', function () {
      if (validateQuiz()) {
        submitQuiz();
        $(this).hide();
      } else {
        alert('Please complete the quiz before submitting.');
      }
    });

    // Result button click event
    $('#result-btn').on('click', function () {
      displayResults();
    });
  }

  // Validate if all questions are answered
  function validateQuiz() {
    var allQuestionsAnswered = true;
    quizSection.find('.question').each(function () {
      var question = $(this);
      var isChecked = question.find('input[type="radio"]').is(':checked');
      if (!isChecked) {
        allQuestionsAnswered = false;
        return false; // Exit the loop early if a question is not answered
      }
    });
    return allQuestionsAnswered;
  }

  // Submit quiz
  function submitQuiz() {
    userAnswers = [];
    quizSection.find('.question').each(function (index) {
      var question = $(this);
      var questionNumber = index + 1;
      var selectedOption = question.find('input[type="radio"]:checked').val();

      if (selectedOption) {
        userAnswers.push({
          question: questionNumber,
          selectedOption: selectedOption
        });
      }
    });

    showFeedback();
  }

  // Show feedback
  function showFeedback() {
      quizSection.hide();
      feedbackSection.show();
    
      var quizResults = $('#quiz-results');
      quizResults.empty();
    
      for (var i = 0; i < quizData.length; i++) {
        var questionNumber = i + 1;
        var question = quizData[i];
        var userAnswer = getUserAnswer(questionNumber);
        var correctAnswer = question.correctAnswer;
    
        var questionFeedback = '<div class="question-feedback">' +
          '<h6 class="questionNumber">Question ' + questionNumber + ' :</h6>' +
          '<p class="mainQuestion">' + question.question + '</p>' +
          '<div class="options">';
    
        for (var j = 0; j < question.options.length; j++) {
          var option = question.options[j];
          var optionLetter = String.fromCharCode(97 + j);
          var optionHTML = '<div class="option">' +
            '<input type="radio" name="q' + questionNumber + '" value="' + optionLetter + '" disabled>';
    
          if (userAnswer === optionLetter && userAnswer === correctAnswer) {
            optionHTML += '<label class="selected correct">' + optionLetter + ') ' + option + '</label>';
          } else if (userAnswer === optionLetter) {
            optionHTML += '<label class="selected incorrect">' + optionLetter + ') ' + option + '</label>' +
              '<label class="feedback-label incorrect-label">&larr; Your Ans. </label>';
          } else if (correctAnswer === optionLetter) {
            optionHTML += '<label class="correct">' + optionLetter + ') ' + option + '</label>' +
              '<label class="feedback-label correct-label">&larr; Right Ans. </label>';
          } else {
            optionHTML += '<label>' + optionLetter + ') ' + option + '</label>';
          }
    
          optionHTML += '</div>';
          questionFeedback += optionHTML;
        }
    
        questionFeedback += '</div></div>';
        quizResults.append(questionFeedback);
      }
    }
    

  // Get user's answer for a specific question
  function getUserAnswer(questionNumber) {
    for (var i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i].question === questionNumber) {
        return userAnswers[i].selectedOption;
      }
    }
    return null;
  }

  // Display results in modal
  function displayResults() {
      var score = calculateScore();
      var totalQuestions = quizData.length;
      var percentage = (score / totalQuestions) * 100;
      var grade = getGrade(percentage);
      var resultText = percentage >= 45 ? 'Pass' : 'Fail'; // Check if the percentage is equal to or higher than 45%
      var resultColor = percentage >= 45 ? 'green' : 'red'; // Set result text color based on the percentage
    
      $('#score').text('Score: ' + score + '/' + totalQuestions);
      $('#grade').text('Grade: ' + grade);
      $('#percentage').text('Percentage: ' + percentage + '%');
      $('#result-modal-title').text('Quiz Results - ' + resultText); // Update modal title
    
      // Display result text with styling
      $('.result').html('<p style="color: ' + resultColor + '; font-size: 55px; font-weight: 500;">' + resultText + '</p>');
    
      resultModal.modal('show');
    }
    
    

  // Calculate the user's score
  function calculateScore() {
    var score = 0;
    for (var i = 0; i < quizData.length; i++) {
      var question = quizData[i];
      var userAnswer = getUserAnswer(i + 1);
      if (userAnswer && userAnswer === question.correctAnswer) {
        score++;
      }
    }
    return score;
  }

  // Get grade based on percentage
  function getGrade(percentage) {
    if (percentage >= 90) {
      return 'A';
    } else if (percentage >= 80) {
      return 'B';
    } else if (percentage >= 70) {
      return 'C';
    } else if (percentage >= 60) {
      return 'D';
    } else {
      return 'F';
    }
  }

  // Start the quiz
  initQuiz();
});