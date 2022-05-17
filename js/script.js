function getRandomNumber(){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let buttonStatisticShow = document.querySelector('.statistics-show');
let buttonStatisticReset = document.querySelector('.statistics-reset');
let statisticsBox = document.querySelector('.statistics-box');
let statisticsBoxContent =  document.querySelector('.statistics-box__content');
let difficultyGame = document.querySelector('#difficulty');
let min = 1;
let max = 10;
let testButtonsAll = document.querySelectorAll('.test-box > button');
let testBox = document.querySelector('.test-box');
let testBoxContent = document.querySelector('.test-box__content');
let submitButton = document.querySelector('.submit');
let testExample = document.querySelector('.test-example');
let input = document.querySelector('input');
let correctAnswer;
let resultText = document.querySelector('.result-text');
let audio = document.createElement('audio');
let trueResult = 0;
let falseResult = 0;
let spanTrueResult = document.querySelector('.statistics-box__true');
let spanFalseResult = document.querySelector('.statistics-box__false');
let statisticsTitle = document.querySelector('h2');

for (let buttonNumber = 0; buttonNumber < 4;  buttonNumber ++){
    testButtonsAll[buttonNumber].onclick = function(){
        let numberA = getRandomNumber();
        let numberB = getRandomNumber();
        console.log(numberA,numberB);
        if( testButtonsAll[buttonNumber].classList.contains('plus')){
            correctAnswer =  numberA + numberB;
            testExample.innerHTML = numberA + '+' + numberB + '=';
        }
        if( testButtonsAll[buttonNumber].classList.contains('minus')){
            correctAnswer =  numberA - numberB;
            testExample.innerHTML = numberA + '-' + numberB + '=';
        } 
        if( testButtonsAll[buttonNumber].classList.contains('multiply')){
            correctAnswer =  numberA * numberB;
            testExample.innerHTML = numberA + '*' + numberB + '=';
        }
        if( testButtonsAll[buttonNumber].classList.contains('divide')){
            correctAnswer = Math.round(numberA / numberB);
            testExample.innerHTML = numberA + '/' + numberB + '= !округли!';
        }
        testBox.classList.add('_decrease');
        
        setTimeout(() => {
            testBoxContent.classList.add('_active');
            testBox.classList.remove('_decrease');
        }, 500);
        audio.setAttribute('src', 'audio/zvukovoy-effekt-multiashnogo-nagatiya.mp3');
        audio.play();
    }
}

buttonStatisticShow.onclick = function(){ //функция для просмотра статистики
    statisticsBox.classList.add('_decrease');
    statisticsTitle.innerHTML = 'Статистика';
    spanTrueResult.innerHTML = trueResult;
    spanFalseResult.innerHTML = falseResult;
    setTimeout(() => {
        statisticsBoxContent.classList.add('_active');
        statisticsBox.classList.remove('_decrease');
    }, 500);
}
statisticsBoxContent.onclick = function(){ //функция для сворачивания бокс-контент
    statisticsBox.classList.add('_decrease');
    setTimeout(() => {
        statisticsBoxContent.classList.remove('_active');
        statisticsBox.classList.remove('_decrease');
    }, 500);
}
buttonStatisticReset.onclick = function(){ //функция для сброса статистики 
    statisticsBox.classList.add('_decrease');
    statisticsTitle.innerHTML = 'Статистика сброшена';
    trueResult = 0;
    falseResult = 0
    spanTrueResult.innerHTML = trueResult;
    spanFalseResult.innerHTML = falseResult;
    setTimeout(() => {
        statisticsBoxContent.classList.add('_active');
        statisticsBox.classList.remove('_decrease'); 
    }, 500);
}

difficultyGame.onchange = function(){ //функция для измнения сложности//
    let difficultyGameValue = difficultyGame.value;
    if (difficultyGameValue == 'easy'){
        min = 1;
        max = 10;
    }else if (difficultyGameValue == 'middle'){
        min = 11;
        max = 100;
    }else{
        min = 101;
        max = 1000;
    }
    audio.setAttribute('src', 'audio/zvukovoy-effekt-multiashnogo-nagatiya.mp3');
    audio.play();
}

submitButton.onclick = function(){
    let userAnswer = input.value;
    if (userAnswer != ''){
        submitButton.classList.add('_inactive');
        testExample.classList.add('_inactive');
        input.classList.add('_inactive');
        if (userAnswer == correctAnswer){
            resultText.innerHTML = 'Молодец! Всё верно!'
            testBoxContent.classList.add('true');
            audio.setAttribute('src', 'audio/eb9781a2655a30f (1).mp3');
            audio.play();
            trueResult ++;
            console.log (trueResult)
        }else{
            resultText.innerHTML = 'Хорошая попытка, но правильный ответ: ' + correctAnswer;
            testBoxContent.classList.add('false');
            audio.setAttribute('src', 'audio/aee4c074e106b76.mp3');
            audio.play();
            falseResult ++;
        }
        resultText.classList.add('_active');
        setTimeout(() => {
            testBox.classList.add('_decrease');
            setTimeout(() => {
                testBoxContent.classList.remove('_active');
                testBox.classList.remove('_decrease');
                resultText.classList.remove('_active');
                submitButton.classList.remove('_inactive');
                testExample.classList.remove('_inactive');
                input.classList.remove('_inactive');
                testBoxContent.classList.remove('true');
                testBoxContent.classList.remove('false');
                input.value = '';
                testExample.innerHTML = '';
            }, 500);
        }, 1500);
    }else{
        alert('Введите ответ');
    }
}
