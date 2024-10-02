class Question {
    constructor(question, correct, answer1, answer2, answer3, answer4){
        this.question = question,
        this.correct = correct, 
        this.answers = [correct, answer1, answer2, answer3, answer4]
    }
}

// Генерация случайного целого числа от 0 до максимального
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  

// Генерация нового вопроса
function addQuestion() {
    const a = getRandomInt(100);
    const b = getRandomInt(100);

    const question = new Question(
        `${a}+${b}`,
        a+b,
        getRandomInt(100),
        getRandomInt(100),
        getRandomInt(100),
        getRandomInt(100)
    );

    return question;
}

// Надпись с вопросом и кнопки ответов
const LABEL = document.querySelector('.question');
const BUTTONS = document.querySelectorAll('.answer');

// Вывод вопроса на экран
function showQuestion(question) {
    LABEL.innerHTML = question.question;

    for (let i = 0; i < BUTTONS.length; i++) {
        BUTTONS[i].innerHTML = question.answers[i];
    }
}

// Генерация и вывод первого вопроса
let current = addQuestion();
showQuestion(current);

// Счетчик верных ответов
let score = 0;

// Обработка нажатия на кнопку ответа
BUTTONS.forEach(button => {
    button.addEventListener('click', () => {

        // При верном ответе увеличивается счетчик
        if (Number(button.innerHTML) === current.correct) {
            score++ ;
            button.classList.add('correct');
            setTimeout(() => {
                button.classList.remove('correct');
            }, 200);
        }
        else {
            button.classList.add('wrong');
            setTimeout(() => {
                button.classList.remove('wrong');
            }, 200);
        }

        // Генерация и вывод нового вопроса
        current = addQuestion();
        showQuestion(current);
    })
})


const TIMER = document.querySelector('.timer');

function startTimer(time) {
    let counter = time;
    TIMER.innerHTML = `${counter}с`;

    const timerInterval = setInterval(() => {
        if (counter <= 0) {
            alert(`Время вышло! Верных ответов - ${score}`);
            clearInterval(timerInterval);
        }
        else {
            counter--
            TIMER.innerHTML = `${counter}с`;
        }
    }, 1000)
}

startTimer(10);

const SCREENS = 
