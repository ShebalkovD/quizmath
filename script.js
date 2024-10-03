class Question {
    constructor(question, correct, answer1, answer2, answer3, answer4){
        this.question = question,
        this.correct = correct, 
        this.answers = [correct, answer1, answer2, answer3, answer4]
    }

    shuffle() {
        // Создаем копию исходного массива и пустой массив для перемешанных значений
        let startArr = this.answers.slice()
        let arr = []
        
        // Передаем случайный элемент в новый массив и удаляем его из старого
        for (let i = 0; i <= 4; i++) {
            let randNum = getRandomInt(startArr.length - 1)
            arr.push(startArr[randNum])
            startArr.splice(randNum, 1)
        }
        
        // Переносим перемешанные значения в свойство
        for (let i = 0; i <= this.answers.length - 1; i++) {
            this.answers[i] = arr[i]
        }
    }
}

// Генерация случайного целого числа от 0 до максимального
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
} 


function getSign() {
    let counter = getRandomInt(4)
    let sign = ''
    
    switch (counter) {
        case 0:
            sign = '+'
            break;
        case 1:
            sign = '-'
            break;
        case 2:
            sign = '/'
            break;
        case 3:
            sign = '*'
            break;
    }

    return sign
}

// Генерация нового вопроса
function addQuestion() {
    let sign = getSign()
    let question = 0
    
    if (sign === '+') {
        let a = getRandomInt(100)
        let b = getRandomInt(100)

        question = new Question(
            `${a}+${b}`,
            a+b,
            a+b+getRandomInt(10),
            a+b-getRandomInt(10),
            getRandomInt(100),
            getRandomInt(100)
        )
    }

    if (sign === '-') {
        let a = getRandomInt(100)
        let b = getRandomInt(100)

        question = new Question(
            `${a}-${b}`,
            a-b,
            a-b+getRandomInt(10),
            a+b-getRandomInt(10),
            getRandomInt(50),
            getRandomInt(100)
        )
    }

    if (sign === '*') {
        let a = getRandomInt(10)
        let b = getRandomInt(10)

        question = new Question(
            `${a}*${b}`,
            a*b,
            a*b+getRandomInt(10),
            a*b-getRandomInt(10),
            getRandomInt(100),
            getRandomInt(100)
        )
    }

    if (sign === '/') {
        let a = getRandomInt(100)
        let b = getRandomInt(10)

        while (a % b != 0) {
            a = getRandomInt(100)
            b = getRandomInt(10)
        }

        question = new Question(
            `${a}/${b}`,
            a/b,
            a/b+getRandomInt(10),
            a/b-getRandomInt(10),
            getRandomInt(10),
            getRandomInt(10)
        )
    }

    

    // Перемешивание значений
    question.shuffle()

    return question
}

// Надпись с вопросом и кнопки ответов
const LABEL = document.querySelector('.question')
const BUTTONS = document.querySelectorAll('.answer')

// Вывод вопроса на экран
function showQuestion(question) {
    LABEL.innerHTML = question.question

    for (let i = 0; i < BUTTONS.length; i++) {
        BUTTONS[i].innerHTML = question.answers[i]
    }
}

// Генерация и вывод первого вопроса
let current = addQuestion()
showQuestion(current)

// Счетчик верных ответов
let score = 0

// Обработка нажатия на кнопку ответа
BUTTONS.forEach(button => {
    button.addEventListener('click', () => {

        // При верном ответе увеличивается счетчик
        if (Number(button.innerHTML) === current.correct) {
            score++ 
            button.classList.add('correct')
            setTimeout(() => {
                button.classList.remove('correct')
            }, 200)
        }
        else {
            button.classList.add('wrong')
            setTimeout(() => {
                button.classList.remove('wrong')
            }, 200)
        }

        // Генерация и вывод нового вопроса
        current = addQuestion()
        showQuestion(current)
    })
})

function reset() {
    score = 0
}

// Элемент таймера
const TIMER = document.querySelector('.timer')

// Запуск таймера на указанное время
function startTimer(time) {
    let counter = time
    TIMER.innerHTML = `${counter}с`

    const timerInterval = setInterval(() => {
        if (counter <= 0) {
            clearInterval(timerInterval)

            SCORE_RESULT.innerHTML = score
            changeScreen(RESULT_SCREEN)

            reset()
        }
        else {
            counter--
            TIMER.innerHTML = `${counter}с`
        }
    }, 1000)
}

// Экраны
const START_SCREEN = document.getElementById('start_screen')
const MAIN_SCREEN = document.getElementById('main_screen')
const RESULT_SCREEN = document.getElementById('result_screen')

// Элемент для вывода очков на последнем экране
const SCORE_RESULT = document.getElementById('score')

// Смена экрана на выбранный
function changeScreen(screenToGo) {
    const screens = document.querySelectorAll('.screen')

    screens.forEach(screen => {
        screen.classList.remove('active')
    })

    screenToGo.classList.add('active')
}

// Кнопки "старт" и "рестарт"
const START_BUTTON = document.getElementById('start_button')
const RESTART_BUTTON = document.getElementById('restart_button')

START_BUTTON.addEventListener('click', () => {
    changeScreen(MAIN_SCREEN)
    startTimer(10)
})

RESTART_BUTTON.addEventListener('click', () => {
    changeScreen(MAIN_SCREEN)
    startTimer(10)
})

// Запуск первого экрана
changeScreen(START_SCREEN)

