document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the player's name from the URL parameter
    
    const questions = [
        {
            question: "What is the primary function of JavaScript?",
            answers: ["Interactivity", "Styling", "Database", "Graphics"],
            correctAnswer: "Interactivity"
        },
        {
            question: "What is the JavaScript framework developed by Facebook?",
            answers: ["Angular", "React", "Vue", "Ember"],
            correctAnswer: "React"
        },
        {
            question: "Which keyword is used to declare a variable in JavaScript?",
            answers: ["var", "let", "const", "variable"],
            correctAnswer: "var"
        },
        {
            question: "What is the process of executing a function within itself called in JavaScript?",
            answers: ["Looping", "Recursion", "Conditioning", "Iteration"],
            correctAnswer: "Recursion"
        },
       { question: "What does 'DOM' stand for in JavaScript?",
        answers: ["Document Object Model", "Data Object Model", "Digital Object Model", "Document Of Models"],
        correctAnswer: "Document Object Model"
        },
    {
        question: "What is the JavaScript event triggered when an HTML element is clicked?",
        answers: ["Click", "MouseClick", "Select", "Choose"],
        correctAnswer: "Click"
    }
    ];
    

    let currentQuestion = 0;
    let score = 0;

    const questionElement = document.getElementById("question");
    const quesText = document.getElementById("ques");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById("next-button");
    const resultElement = document.getElementById("result");

    function displayQuestion() {
        const question = questions[currentQuestion];
        questionElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        quesText.textContent = `${question.question}`;

        answersElement.innerHTML = "";
        question.answers.forEach(answer => {
            const li = document.createElement("li");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `q${currentQuestion}`;
            radio.value = answer;
            li.appendChild(radio);
            li.appendChild(document.createTextNode(answer));
            answersElement.appendChild(li);
        });

        if (currentQuestion === questions.length - 1) {
            // Change the button text to "Submit" for the last question
            nextButton.textContent = "Submit";
        }
    }

    function checkAnswer() {
        const selectedAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
        if (!selectedAnswer) {
            return; // No answer selected
        }

        if (selectedAnswer.value === questions[currentQuestion].correctAnswer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        clearInterval(timerInterval); // Stop the timer
        questionElement.style.display = "none";
        quesText.style.display = "none";
        answersElement.style.display = "none";
        nextButton.style.display = "none";
        resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
    }

    nextButton.addEventListener("click", checkAnswer);
    displayQuestion();


    // Set the quiz timer (in seconds)
    let timerSeconds = 100; // 

    // Display the initial timer value
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        timerElement.textContent = formatTime(timerSeconds);
    }

    // Update the timer every second
    const timerInterval = setInterval(function () {
        timerSeconds--;

        if (timerElement) {
            timerElement.textContent = formatTime(timerSeconds);
        }

        if (timerSeconds < 10) {
            timerElement.style.color = "red";
        }

        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            showResult();
            alert("Time's up! Your quiz is complete.");
            
        }
    }, 1000);

    // Helper function to format time as "M:SS"
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
});