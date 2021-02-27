const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductList {
  
    constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];
    this._cart;


    this._getProducts(`${API}/catalogData.json`).then((data)=>{
      this._goods = [...JSON.parse(data)];
      this._render();
      this._addEventList();
    })

   
  }

  _getProducts(url){
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject(err);
          }
        }
      }
      xhr.send();
    })
  }

   goodsTotalPrice() { 
     let sum = 0;
     this._goods.forEach((good) => {
       sum += good.price;
     });
  
      return sum;
   }
  
   getTotalWithDiscount(discount) {
     return this.goodsTotalPrice() * (1 - discount / 100);
   }

  _render() {
    const block = document.querySelector(this.container);

    this._goods.forEach((product) => {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
    //слушатель событий кнопок
  _addEventList(button = '.buy-btn'){
      const buttonsEl = document.querySelectorAll(button);

      buttonsEl.forEach(buttonEl => buttonEl.addEventListener('click', event => {
        if (!(this._cart instanceof CartList)){
          this._cart = new CartList();
      }
      let curId = +event.target.parentNode.parentNode.dataset.id;
      let pr = this._goods.find(good => good.id_product === curId);
      this._cart._requestAddItem(`${API}/addToBasket.json`).then(data => {
        if (JSON.parse(data).result === 1){
          let ret = this._cart._pushProd(pr);
          if (ret.res === 1){
            this._cart._addEventList();
            this._cart._allProducts[this._cart._allProducts.indexOf(ret.ind)]._renderQuantity(ret.el);
          }else if(ret === 0){
            this._cart._render();
          }
        }
      })
    }))
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

//Корзина
class CartList{

  constructor(container = '.productsInCart') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this.countGoods = 0;
    this.amount = 0;
    //this._addEventList();

    /*this._getProducts(`${API}/getBasket.json`).then((data)=>{
      this.amount = JSON.parse(data).amount;
      this.countGoods = JSON.parse(data).countGoods;
      this._goods = [...JSON.parse(data).contents];
      this._render();
      //
    })*/

   
  } 
  _render(del = 0){
    const block = document.querySelector(this.container);
    if (del === 0){
      block.insertAdjacentHTML('beforeend', this._allProducts[this._allProducts.length - 1].render());
    }
    if (del === -1){
      let str = ""; 
      this._allProducts.forEach((product) => str += product.render());
      block.innerHTML = str;
    }
  };

  //слушатель событий кнопок
  _addEventList(button = '.del-btn'){
    const buttonsEl = document.querySelectorAll(button);
//кнопка удалить
      buttonsEl[buttonsEl.length - 1].addEventListener('click', event => {
      let curId = +event.target.parentNode.parentNode.dataset.id;
      this._deleteProd(curId);
      this._render(-1);
    //и отправить на сервер
    })
  };

  //Можно удалить товар из корзины
  _deleteProd(id){
    let pr = this._allProducts.find(good => good.id === id);
    this._allProducts.splice(this._allProducts.indexOf(pr), 1)
    pr = this._goods.find(good => good.id_product === id);
    this._goods.splice(this._goods.indexOf(pr), 1)
  } 

  //и дообавить в корзину
  _pushProd(product){
    let resFind = this._allProducts.find(good => good.id === product.id_product);
    if (resFind !== undefined){
       this._allProducts[this._allProducts.indexOf(resFind)].changeQuantity();
       let inputEl = document.querySelector('.productsInCart').querySelector(`[data-id="${resFind.id}"]`).querySelector('.quantity');
        return {res: 1, el: inputEl, ind: resFind};
    }
    else {
      this._goods.push(product);
      const productObject = new ProdactInCart(product);
      this._allProducts.push(productObject);
      return 0;
    }
  }

  _requestAddItem(url){
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${API}/addToBasket.json`, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject(err);
          }
        }
      }
      xhr.send();
    })
  }

  //получить список товаров
  _getProducts(url){
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject(err);
          }
        }
      }
      xhr.send();
    })
  }

  //посчитать стоимость выбранных товаров(со скидкой, если есть)
  sumWithDiscount(discount = 0){
    let sum = 0;
    this._goods.forEach(prod => sum += prod.price * prod.quantity);
    return sum * (100 - discount / 100);
  }

  //посчитать стоимость доставки
  shippingCoast(whereShip){
    let coast = 0;
     //как-то считает доставку
    return coast;
  }

  //посчитать итоговую стоимость с доставкой
  TotalCoast(whereShip, discount = 0){
    return shippingCoast(whereShip) + sumWithDiscount(discount);
  }
}


//Товар в корзине
class ProdactInCart extends ProductItem{
  constructor(product, img='https://placehold.it/200x150', maxQuant = 100, quantity = 1) {
    super(product, img)  
    this.quantity = quantity; //будет равняться числу в input.quantity
    this.maxQuant = maxQuant;//количество товара в наличии
  }

  //изменить количество
  changeQuantity(howMach = 1){//howMach = 1 либо -1
    
    if (this.quantity > 1 && howMach === -1 || this.quantity < this.maxQuant && howMach === 1){
      return this.quantity += howMach;
    }
  }
 
  _renderQuantity(inputEl){
    inputEl.value = this.quantity;
  }

  render() {
    return `<div class="cart-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="cart-desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <input class='quantity' type="number" min="1" value="${this.quantity}">
                  <button class="del-btn">Удалить</button>
              </div>
          </div>`;
  }
}



const productList = new ProductList();

