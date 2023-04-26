import { questions } from './data.js'

const progressValueEl = document.querySelector('.progress .value')
const numberEl = document.querySelector('.number')
const questionEl = document.querySelector('.question')
const choice1El = document.querySelector('.choice1')
const choice2El = document.querySelector('.choice2')

let currentNumber = 0
let mbti = ''

/**
 * 질문을 출력하는 함수
 */
function renderQuestion() {
    const question = questions[currentNumber]
    numberEl.innerHTML = question.number
    questionEl.innerHTML = question.question
    choice1El.innerHTML = question.choices[0].text
    choice2El.innerHTML = question.choices[1].text
    progressValueEl.style.width = (currentNumber + 1) * 10 + '%'

}

/**
 * 버튼을 눌렀을 때 다음 페이지로 이동하는 함수
 * @param {number} choiceNumber 사용자가 클릭한 번호
 */
function nextQuestion(choiceNumber) {
    // 마지막 페이지에서 결과 페이지로 이동
    if(currentNumber == questions.length - 1) {
        showResultPage()
        return
    }
    const question = questions[currentNumber]
    mbti = mbti + question.choices[choiceNumber].value // mbti = 'infj'
    currentNumber = currentNumber + 1
    renderQuestion()
}

/**
 * 결과 페이지를 보여주는 함수
 */
function showResultPage() {
    location.href = '/results.html?mbti=' + mbti // Query String
}

choice1El.addEventListener('click', function() {
    nextQuestion(0)
})
choice2El.addEventListener('click', function() {
    nextQuestion(1)
})

renderQuestion()