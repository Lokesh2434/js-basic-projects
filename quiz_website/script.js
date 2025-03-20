const registrationForm = document.getElementById('registrationForm');
const quizContainer = document.getElementById('quizContainer');
const quizElement = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// Quiz questions organized by difficulty
const allQuestions = {
    easy: [
        {
            question: "What is 2 + 2?",
            answers: {
                a: "3",
                b: "4",
                c: "5",
                d: "22"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the capital of France?",
            answers: {
                a: "Berlin",
                b: "Madrid",
                c: "Paris",
                d: "Rome"
            },
            correctAnswer: "c"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: {
                a: "Earth",
                b: "Mars",
                c: "Jupiter",
                d: "Venus"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the largest mammal in the world?",
            answers: {
                a: "Elephant",
                b: "Giraffe",
                c: "Blue Whale",
                d: "Polar Bear"
            },
            correctAnswer: "c"
        },
        {
            question: "Which language runs in a web browser?",
            answers: {
                a: "Java",
                b: "C",
                c: "Python",
                d: "JavaScript"
            },
            correctAnswer: "d"
        },
        {
            question: "What color is a banana?",
            answers: {
                a: "Red",
                b: "Green",
                c: "Yellow",
                d: "Blue"
            },
            correctAnswer: "c"
        },
        {
            question: "How many days are in a week?",
            answers: {
                a: "5",
                b: "6",
                c: "7",
                d: "8"
            },
            correctAnswer: "c"
        }
    ],
    medium: [
        {
            question: "What is the chemical symbol for gold?",
            answers: {
                a: "Go",
                b: "Gd",
                c: "Au",
                d: "Ag"
            },
            correctAnswer: "c"
        },
        {
            question: "Which famous scientist developed the theory of relativity?",
            answers: {
                a: "Isaac Newton",
                b: "Albert Einstein",
                c: "Galileo Galilei",
                d: "Stephen Hawking"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the capital of Australia?",
            answers: {
                a: "Sydney",
                b: "Melbourne",
                c: "Canberra",
                d: "Perth"
            },
            correctAnswer: "c"
        },
        {
            question: "Which ocean is the largest?",
            answers: {
                a: "Atlantic",
                b: "Indian",
                c: "Arctic",
                d: "Pacific"
            },
            correctAnswer: "d"
        },
        {
            question: "What is the square root of 144?",
            answers: {
                a: "12",
                b: "14",
                c: "16",
                d: "18"
            },
            correctAnswer: "a"
        },
        {
            question: "Which planet has the most moons?",
            answers: {
                a: "Jupiter",
                b: "Saturn",
                c: "Uranus",
                d: "Neptune"
            },
            correctAnswer: "b"
        },
        {
            question: "What year did the Titanic sink?",
            answers: {
                a: "1905",
                b: "1912",
                c: "1920",
                d: "1931"
            },
            correctAnswer: "b"
        }
    ],
    hard: [
        {
            question: "What is the most abundant element in the universe?",
            answers: {
                a: "Oxygen",
                b: "Carbon",
                c: "Hydrogen",
                d: "Helium"
            },
            correctAnswer: "c"
        },
        {
            question: "Which of these is NOT a programming paradigm?",
            answers: {
                a: "Object-Oriented",
                b: "Functional",
                c: "Procedural",
                d: "Systematic"
            },
            correctAnswer: "d"
        },
        {
            question: "What is the smallest prime number greater than 100?",
            answers: {
                a: "101",
                b: "103",
                c: "107",
                d: "109"
            },
            correctAnswer: "a"
        },
        {
            question: "Which of these scientists won Nobel Prizes in two different fields?",
            answers: {
                a: "Albert Einstein",
                b: "Marie Curie",
                c: "Niels Bohr",
                d: "Richard Feynman"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the half-life of Carbon-14?",
            answers: {
                a: "1,460 years",
                b: "5,730 years",
                c: "10,730 years",
                d: "14,500 years"
            },
            correctAnswer: "b"
        },
        {
            question: "Which algorithm has the worst time complexity?",
            answers: {
                a: "Quick Sort",
                b: "Merge Sort",
                c: "Bubble Sort",
                d: "Heap Sort"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the Fibonacci number after 89?",
            answers: {
                a: "134",
                b: "144",
                c: "155",
                d: "177"
            },
            correctAnswer: "b"
        }
    ]
};

// Variables to track quiz state
let timer;
let timeLeft;
let userName = "";
let selectedQuestions = [];
let currentDifficulty = "easy";

// Set time limits based on difficulty
const timeLimits = {
    easy: 60,
    medium: 90,
    hard: 120
};

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to select questions based on difficulty
function selectQuestions(difficulty) {
    // Get questions for the selected difficulty
    const questionsPool = [...allQuestions[difficulty]];

    // Shuffle the questions
    const shuffled = shuffleArray(questionsPool);

    // Select 5 questions (or all if less than 5)
    return shuffled.slice(0, 5);
}

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    userName = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Get selected difficulty
    const difficultyOptions = document.getElementsByName('difficulty');
    for (const option of difficultyOptions) {
        if (option.checked) {
            currentDifficulty = option.value;
            break;
        }
    }

    // Set time based on difficulty
    timeLeft = timeLimits[currentDifficulty];

    // Select and randomize questions
    selectedQuestions = selectQuestions(currentDifficulty);

    console.log(`Starting quiz with ${currentDifficulty} difficulty. Time limit: ${timeLeft} seconds`);
    console.log('Selected questions:', selectedQuestions);
    console.log('Number of questions:', selectedQuestions.length);

    if (userName && email) {
        // Hide registration
        document.getElementById('registration').style.display = 'none';

        // Show quiz container using both inline style and class
        quizContainer.style.display = 'block';
        quizContainer.classList.add('active');

        // Update quiz title to show difficulty
        const quizTitle = quizContainer.querySelector('h1');
        quizTitle.textContent = `Knowledge Challenge - ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level`;

        // Build quiz and start timer
        buildQuiz();
        startTimer();

        console.log('Quiz container should now be visible');
        console.log('Quiz container display style:', quizContainer.style.display);
        console.log('Quiz container classes:', quizContainer.className);
    }
});

function startTimer() {
    // Create timer element if it doesn't exist
    if (!document.getElementById('timer')) {
        const timerDiv = document.createElement('div');
        timerDiv.id = 'timer';
        timerDiv.style.marginBottom = '20px';
        timerDiv.style.fontSize = '18px';
        timerDiv.style.fontWeight = 'bold';
        quizContainer.insertBefore(timerDiv, quizElement);
    }

    // Create difficulty indicator
    if (!document.getElementById('difficulty-indicator')) {
        const difficultyDiv = document.createElement('div');
        difficultyDiv.id = 'difficulty-indicator';
        difficultyDiv.className = `difficulty-indicator ${currentDifficulty}`;
        difficultyDiv.textContent = `Difficulty: ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}`;
        difficultyDiv.style.marginBottom = '10px';
        difficultyDiv.style.padding = '5px 10px';
        difficultyDiv.style.borderRadius = '4px';
        difficultyDiv.style.display = 'inline-block';
        difficultyDiv.style.fontWeight = 'bold';

        // Set colors based on difficulty
        if (currentDifficulty === 'easy') {
            difficultyDiv.style.backgroundColor = '#e7f7e7';
            difficultyDiv.style.color = '#2e7d32';
        } else if (currentDifficulty === 'medium') {
            difficultyDiv.style.backgroundColor = '#fff9c4';
            difficultyDiv.style.color = '#f57f17';
        } else {
            difficultyDiv.style.backgroundColor = '#ffebee';
            difficultyDiv.style.color = '#c62828';
        }

        quizContainer.insertBefore(difficultyDiv, document.getElementById('timer'));
    }

    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');

    if (timeLeft <= 0) {
        clearInterval(timer);
        timerElement.textContent = "Time's up!";
        timerElement.style.color = 'red';
        showResults();
        submitButton.disabled = true;
    } else {
        timerElement.textContent = `Time remaining: ${timeLeft} seconds`;

        // Warning colors based on percentage of time left
        const totalTime = timeLimits[currentDifficulty];
        const percentLeft = (timeLeft / totalTime) * 100;

        if (percentLeft <= 15) {
            timerElement.style.color = 'red';
        } else if (percentLeft <= 30) {
            timerElement.style.color = 'orange';
        } else {
            timerElement.style.color = 'green';
        }

        timeLeft--;
    }
}

function buildQuiz() {
    const output = [];

    selectedQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        // Use Object.keys to ensure consistent order of answer options
        const answerLetters = Object.keys(currentQuestion.answers);

        // Randomize answer order
        const shuffledAnswerLetters = shuffleArray([...answerLetters]);

        shuffledAnswerLetters.forEach(letter => {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter.toUpperCase()} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        });

        // Add a clear question number
        const questionNum = questionNumber + 1;

        // Add difficulty-specific styling
        let difficultyClass = '';
        if (currentDifficulty === 'medium') {
            difficultyClass = 'medium-question';
        } else if (currentDifficulty === 'hard') {
            difficultyClass = 'hard-question';
        }

        output.push(
            `<div class="question-container ${difficultyClass}" id="question-${questionNum}">
                <div class="question-number">${questionNum}</div>
                <div class="question">${currentQuestion.question}</div>
                <div class="answers" data-question="${questionNum}">${answers.join('')}</div>
            </div>`
        );
    });

    quizElement.innerHTML = output.join('');

    // Add difficulty-specific styling to question numbers
    const questionNumbers = document.querySelectorAll('.question-number');
    questionNumbers.forEach(num => {
        if (currentDifficulty === 'medium') {
            num.style.backgroundColor = '#FFA000';
        } else if (currentDifficulty === 'hard') {
            num.style.backgroundColor = '#F44336';
        }
    });
}

function showResults() {
    // Stop the timer if it's running
    clearInterval(timer);

    // Remove any existing results
    const existingResults = document.querySelectorAll('.correct-answer, .result-indicator');
    existingResults.forEach(el => el.remove());

    let numCorrect = 0;
    let unanswered = 0;

    // Debug information
    console.log('Total questions:', selectedQuestions.length);
    console.log('Difficulty:', currentDifficulty);

    // Process each question
    selectedQuestions.forEach((currentQuestion, questionNumber) => {
        // Get the question container and answer container
        const questionNum = questionNumber + 1;
        const questionContainer = document.getElementById(`question-${questionNum}`);
        const answerContainer = questionContainer.querySelector('.answers');

        // Find the selected answer
        const selector = `input[name=question${questionNumber}]:checked`;
        const selectedElement = answerContainer.querySelector(selector);
        const userAnswer = selectedElement ? selectedElement.value : null;

        // Debug information
        console.log(`Question ${questionNum}:`);
        console.log('- User answer:', userAnswer);
        console.log('- Correct answer:', currentQuestion.correctAnswer);

        // Create result indicator
        const resultIndicator = document.createElement('div');
        resultIndicator.className = 'result-indicator';

        // Process the answer
        if (!userAnswer) {
            unanswered++;
            answerContainer.style.color = '#999';
            answerContainer.style.fontStyle = 'italic';
            resultIndicator.textContent = 'Not answered';
            resultIndicator.style.color = '#999';
            console.log('- Result: Unanswered');
        } else if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainer.style.color = 'green';
            resultIndicator.textContent = 'Correct!';
            resultIndicator.style.color = 'green';
            console.log('- Result: Correct');
        } else {
            answerContainer.style.color = 'red';
            resultIndicator.textContent = 'Incorrect';
            resultIndicator.style.color = 'red';
            console.log('- Result: Incorrect');
        }

        // Add the result indicator to the question container
        questionContainer.appendChild(resultIndicator);

        // Show correct answer
        const correctLetter = currentQuestion.correctAnswer;
        const correctAnswerText = currentQuestion.answers[correctLetter];

        // Add correct answer indicator
        const correctAnswerElement = document.createElement('div');
        correctAnswerElement.className = 'correct-answer';
        correctAnswerElement.innerHTML = `<strong>Correct answer:</strong> ${correctLetter.toUpperCase()} - ${correctAnswerText}`;
        correctAnswerElement.style.marginTop = '5px';
        correctAnswerElement.style.color = 'green';
        questionContainer.appendChild(correctAnswerElement);
    });

    // Final debug information
    console.log('Summary:');
    console.log('- Correct answers:', numCorrect);
    console.log('- Unanswered questions:', unanswered);

    // Calculate percentage
    const percentage = Math.round((numCorrect / selectedQuestions.length) * 100);
    let resultMessage = '';

    // Adjust feedback based on difficulty
    if (currentDifficulty === 'easy') {
        if (percentage >= 80) {
            resultMessage = 'Excellent job! Try a harder difficulty next time!';
        } else if (percentage >= 60) {
            resultMessage = 'Good work!';
        } else {
            resultMessage = 'Keep practicing!';
        }
    } else if (currentDifficulty === 'medium') {
        if (percentage >= 80) {
            resultMessage = 'Impressive! You\'re ready for hard difficulty!';
        } else if (percentage >= 60) {
            resultMessage = 'Good job on medium difficulty!';
        } else {
            resultMessage = 'Medium difficulty is challenging. Keep trying!';
        }
    } else { // hard
        if (percentage >= 80) {
            resultMessage = 'Outstanding! You\'ve mastered the hardest questions!';
        } else if (percentage >= 60) {
            resultMessage = 'Great work on hard difficulty!';
        } else {
            resultMessage = 'Hard difficulty is very challenging. Don\'t give up!';
        }
    }

    // Log final results for debugging
    console.log(`Final score: ${numCorrect}/${selectedQuestions.length} (${percentage}%)`);

    // Scroll to results - with smooth behavior
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Display results summary
    resultsContainer.innerHTML = `
        <div class="result-summary">
            <h2>Quiz Results - ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level</h2>
            <p>Hi ${userName}, you got ${numCorrect} out of ${selectedQuestions.length} questions correct (${percentage}%).</p>
            <p>${resultMessage}</p>
            ${unanswered > 0 ? `<p>You left ${unanswered} question(s) unanswered.</p>` : ''}
            <p>Time remaining: ${timeLeft > 0 ? timeLeft + ' seconds' : 'Time\'s up!'}</p>
        </div>
    `;

    // Set background color based on difficulty and score
    let bgColor = '#ffebee'; // default red-ish for low scores

    if (percentage >= 60) {
        if (currentDifficulty === 'easy') {
            bgColor = '#e7f7e7'; // green for easy
        } else if (currentDifficulty === 'medium') {
            bgColor = '#fff9c4'; // yellow for medium
        } else {
            bgColor = '#e3f2fd'; // blue for hard
        }
    }

    resultsContainer.style.backgroundColor = bgColor;
    resultsContainer.style.padding = '15px';
    resultsContainer.style.borderRadius = '8px';
    resultsContainer.style.marginTop = '30px';
    resultsContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';

    // Disable the submit button
    submitButton.disabled = true;

    // Add buttons for restart and changing difficulty
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.marginTop = '20px';

    // Restart button with same difficulty
    const restartButton = document.createElement('button');
    restartButton.textContent = `Restart (${currentDifficulty})`;
    restartButton.addEventListener('click', restartQuiz);
    buttonContainer.appendChild(restartButton);

    // Change difficulty button
    const changeDifficultyButton = document.createElement('button');
    changeDifficultyButton.textContent = 'Change Difficulty';
    changeDifficultyButton.style.backgroundColor = '#607D8B';
    changeDifficultyButton.addEventListener('click', () => {
        // Stop the timer
        clearInterval(timer);

        // Reset quiz elements
        quizElement.innerHTML = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.backgroundColor = 'transparent';
        resultsContainer.style.boxShadow = 'none';

        // Remove timer and difficulty indicator
        const timerElement = document.getElementById('timer');
        const difficultyIndicator = document.getElementById('difficulty-indicator');
        if (timerElement) timerElement.remove();
        if (difficultyIndicator) difficultyIndicator.remove();

        // Hide quiz container and show registration
        quizContainer.style.display = 'none';
        quizContainer.classList.remove('active');
        document.getElementById('registration').style.display = 'block';

        console.log('Returned to registration screen');
    });
    buttonContainer.appendChild(changeDifficultyButton);

    resultsContainer.appendChild(buttonContainer);
}

function restartQuiz() {
    // Reset timer based on current difficulty
    timeLeft = timeLimits[currentDifficulty];
    clearInterval(timer);

    // Clear results
    resultsContainer.innerHTML = '';
    resultsContainer.style.backgroundColor = 'transparent';
    resultsContainer.style.boxShadow = 'none';

    // Enable submit button
    submitButton.disabled = false;

    // Remove any result indicators and correct answer displays
    const existingElements = document.querySelectorAll('.correct-answer, .result-indicator, #difficulty-indicator');
    existingElements.forEach(el => el.remove());

    // Select new randomized questions for the same difficulty
    selectedQuestions = selectQuestions(currentDifficulty);
    console.log(`Restarting quiz with ${currentDifficulty} difficulty. New set of ${selectedQuestions.length} questions.`);

    // Rebuild quiz with new questions
    buildQuiz();

    // Start timer again
    startTimer();

    // Scroll back to top of quiz container
    quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    console.log('Quiz restarted');
}

submitButton.addEventListener('click', showResults);
