const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
    {id: 5, title: 'SmartPhone'},
];

const renderProduct = ({title, price = 'Цена не определена'}) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
}

const renderProducts = (list, whereInsert) => {
    let markUp='';
    list.forEach(element => {
        markUp += renderProduct(element)
    });
    whereInsert.insertAdjacentHTML('beforeEnd', markUp);
}

renderProducts(products, document.querySelector('.products'));
