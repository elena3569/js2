class ProductList {
    constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();

   
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

  _fetchGoods() {
    this._goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ];
  }

  _render() {
    const block = document.querySelector(this.container);

    this._goods.forEach((product) => {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    });
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
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
    this._selectedProd = [];
    this._allProducts = [];
  } 
  _render(){};

  //Можно удалить товар из корзины
  deleteProd(product){

  } 

  //и дообавить в корзину
  pushProd(product){
    this._selectedProd.push(product);
  }

  //изменить количество. Возможно метод больше подходит для ProdactInCart?
  changeQuantity(product, howMach){//howMach = 1 либо -1
   // return product.quantity += howMach; -для соответствующего элемента в массиве
  }

  //посчитать стоимость выбранных товаров(со скидкой, если есть)
  sumWithDiscount(discount = 0){
    let sum = 0;
    this._selectedProd.forEach(prod => sum += prod.price * prod.quantity);
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
//Насколько я поняла, аналогично ProductItem, но с другой разметкой
//и стилизацией
class ProdactInCart{
  constructor(product, img='https://placehold.it/200x150', quantity = 1) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
    this.quantity = quantity; //будет равняться числу в input.quantity
  }

  render() {
    return `<div class="cart-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <input class='quantity' type="number" min="1" placeholder="1">
                  <button class="del-btn">Удалить</button>
              </div>
          </div>`;
  }
}



const productList = new ProductList();

let buttonsEl = document.querySelectorAll('.buy-btn');

buttonsEl.forEach(button => button.addEventListener('click', function(event){
  curId = event.target.parentNode.parentNode.dataset.id;
  //создание экземпляра класса товара в корзине c id = curId, другими соответствующими атрибутами и количеством
  //и корзины 
}))