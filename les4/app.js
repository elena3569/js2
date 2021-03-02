'use strict';
const text = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

//task 1
const regex1 = /'/g;
console.log(text.replace(regex1, '"'));

//task 2
const regex2 = /'\B| '/g;
console.log(text.replace(regex2, '"'));

//task 3
const buttonEl = document.querySelector('#send')
const inputs = document.querySelectorAll('input');

const regExpName = /[a-zа-яё]+/i;
const regExpPhone = /^\+7\(\d{3}\)\d{3}-\d{4}/;
const regExpText = /^$/g;
const regExpEmail = /^[a-z]+[.-]?[a-z]+@[a-z]+\.[a-z]{2,5}/;

function valid(){
    inputs.forEach(function(input){
        switch (input.id){
            case 'name':
                if (!regExpName.test(input.value)){
                    input.classList.add('warning');
                } 
                break;
            case 'phone': 
                if (!regExpPhone.test(input.value)){
                    input.classList.add('warning');
                } 
                break;
            case 'e-mail': 
                if (!regExpEmail.test(input.value)){
                    input.classList.add('warning');
                } 
                break;
            case 'text': 
                if (regExpText.test(input.value)){
                    input.classList.add('warning');
                } 
                break;
        }
    })
    //не сохраняются добавленные классы. Почему - не разобралась
}

buttonEl.addEventListener('click', valid)
