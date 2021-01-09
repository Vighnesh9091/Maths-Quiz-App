const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Rakeshs age is less than Sanias age by 5 years. The sum of their ages is 27 years. How old are they.(respectively) ?',
    answers: [
      { text: '16 years,11 years', correct: true },
      { text: '17 years, 10 years', correct: false }
     
    ]
  },
  {
    question: 'What is (-24+30) - 17x7',
    answers: [
      { text: '113', correct: true },
      { text: '75', correct: false },
      { text: '90', correct: false },
      { text: '120', correct: false }
    ]
  },
  {
    question: 'IF the lenght of a rectangle is 1 cm more than twice its breath. If perimeter of the rectangle is 50, find its length ?',
    answers: [
      { text: '101cm', correct: false },
      { text: '17cm', correct: true },
      { text: '50m', correct: false },
      { text: '8cm', correct: false }
    ]
  },
  {
    question: 'Virat made twice as many runs as Rohit. The total of their scores is 2 less than a double century. How many runs did each of them made (respectively)',
    answers: [
      { text: '132,66', correct: true },
      { text: '66,132', correct: false }
    ]
  }
]