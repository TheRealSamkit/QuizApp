import { categories } from "./assets/quiz-ques.js";

let selectQuestions = Array(10).fill(null);

const categoryBtn = document.querySelectorAll(".category-btn");
const quizTitle = document.querySelector(".quizTitle");
const categoryCon = document.querySelector(".categories");
const QuizBox = document.querySelector(".quizbox");
const quizCon = document.querySelector(".quiz-container");
const submitBtn = document.querySelector(".submit");
const resultCon = document.querySelector("#resultContainer");
const resPara = document.querySelector(".result");
document.addEventListener("DOMContentLoaded", () => {
	categoryBtn.forEach((element) => {
		element.addEventListener("click", () => {
			getQuestions(
				element.getAttribute("data-category"),
				element.textContent
			);
		});
	});
	submitBtn.addEventListener("click", endQuiz);
});

function getQuestions(category, str) {
	categoryCon.classList.add("d-none");
	QuizBox.classList.remove("d-none");
	quizTitle.textContent = str;
	quizCon.innerHTML = "";
	selectQuestions = [];

	for (let i = 0; i < 10; i++) {
		if (categories[category].length === 0) break;
		let index = rand(0, categories[category].length - 1);
		let question = categories[category].splice(index, 1)[0];
		selectQuestions.push(question);
	}

	console.log(selectQuestions);
	loadQuestions();
}

function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadQuestions() {
	let count = 1;
	selectQuestions.forEach((q) => {
		let optionHTML = q.options
			.map((option, index) => {
				const opId = `q${count}_option${index}`;
				return `<input class='form-check-input' type="radio" name="q${count}" id="${opId}" value="${option}"/>
					<label for="${opId}" class='form-check-label'>${option}</label>
					<br />`;
			})
			.join("");
		quizCon.innerHTML += `<p class="h5">Q${count}. ${q.question}</p>
				<div class="options ms-4 mb-3">
					${optionHTML}
				</div>`;
		count++;
	});
}

function endQuiz() {
	const selectedOptions = document.querySelectorAll(
		"input[type='radio']:checked"
	);

	let userAnswers = [];
	let correctAns = 0;
	selectedOptions.forEach((input) => {
		userAnswers.push(input.value);
	});

	for (let i = 0; i < selectQuestions.length; i++) {
		if (userAnswers[i] === selectQuestions[i].answer) correctAns++;
	}

	resPara.textContent = `You Scored ${correctAns}/${selectQuestions.length}`;

	resultCon.classList.toggle("d-none");
	QuizBox.classList.toggle("d-none");
}
