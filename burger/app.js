'use strict';

let totalSum = 0;
let totalKKal = 0;


class Burger{
    constructor(){
        this.isSmall = true;
        this.isBig = false;
        
        this.withChees = false;
        this.withSalat = false;
        this.withPotato = false;
        
        this.withSeasoning = false;
        this.withMayonnaise = false;
    }

    total(){
        return {sum: this.sum(), kkal: this.kkal()}
    }

    sum(){
        let sum = 0;

        if (this.isBig) {
            sum = +document.getElementById('big').dataset.price
        }
        if (this.isSmall) {
            sum = +document.getElementById('small').dataset.price
        }

        if (this.withChees) {
            sum += +document.getElementById('chees').dataset.price
        }
        if (this.withSalat) {
            sum += +document.getElementById('salat').dataset.price
        }
        if (this.withPotato) {
            sum += +document.getElementById('potato').dataset.price
        }
        
        if (this.withSeasoning) {
            sum += +document.getElementById('seasoning').dataset.price
        }
        if (this.withMayonnaise) {
            sum += +document.getElementById('mayonnaise').dataset.price
        }
        return sum;
    }
   
    kkal(){
        let sum_kkal = 0;

        if (this.isBig) {
            sum_kkal = +document.getElementById('big').dataset.kkal
        }
        if (this.isSmall) {
            sum_kkal = +document.getElementById('small').dataset.kkal
        }

        if (this.withChees) {
            sum_kkal += +document.getElementById('chees').dataset.kkal
        }
        if (this.withSalat) {
            sum_kkal += +document.getElementById('salat').dataset.kkal
        }
        if (this.withPotato) {
            sum_kkal += +document.getElementById('potato').dataset.kkal
        }
        
        if (this.withSeasoning) {
            sum_kkal += +document.getElementById('seasoning').dataset.kkal
        }
        if (this.withMayonnaise) {
            sum_kkal += +document.getElementById('mayonnaise').dataset.kkal
        }

        return sum_kkal;
        
    }

    size(id){
        if (id =='small'){
            this.isSmall = true;
            this.isBig = false;
        }
        else if (id =='big'){
            this.isBig = true;
            this.isSmall = false;
        }
    }

    options(id){
        switch(id){
            case 'chees':
                this.withChees = !this.withChees;
                break;
            case 'salat':
                this.withSalat = !this.withSalat;
                break;
            case 'potato':
                this.withPotato = !this.withPotato;
                break;
            case 'seasoning':
                this.withSeasoning = !this.withSeasoning;
                break;
            case 'mayonnaise':
                this.withMayonnaise = !this.withMayonnaise;
                break;
        }
    }
}

let burger = new Burger();
let totalEl = document.querySelector('.total');

let size = document.querySelector('.size');
size.addEventListener('click', function(event){
    burger.size(event.target.id);
    totalEl.innerHTML = `${burger.total().sum} рублей ${burger.total().kkal} Ккал`;
});

let fills = document.querySelector('.fill');
fills.addEventListener('click', function(event){
    burger.options(event.target.id);
    totalEl.innerHTML = `${burger.total().sum} рублей ${burger.total().kkal} Ккал`;
})