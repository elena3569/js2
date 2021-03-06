const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        imgCatalog: 'https://placehold.it/200x150',
        products: [],
        searchLine: '',
        finedProducts: [],
        show: true,
        isVisibleCart: false,
        showDummy: false,
        productsInCart: [],
        showDummyCart: false,
        showDummyfind: false,
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = product.id_product;
                    let find = this.productsInCart.find(product => product.id_product === productId);
                    if(find){
                        find.quantity++;
                    } else {
                        let el = {
                            id_product: productId,
                            price: product.price,
                            quantity: 1, 
                            product_name: product.producshowF_name
                        }
                        this.productsInCart.push(el);
                    }
                    } else {
                    alert('Error');
                    }
                })
        },
        removeProdact(product){
            this.productsInCart.splice(product, 1);
        },
        filterGoods(){
            this.products.find(product => {
                if (product.product_name.toLowerCase().includes(this.searchLine))
                if (!this.finedProducts.includes(product)) {
                    this.finedProducts.push(product)
                }            
            });
            if (this.finedProducts.length == 0)
            this.showDummy = true;
        },
        showFinded(){
            if (this.searchLine !== ''){
                this.show = false;
                this.filterGoods();
            }else {
                this.show = true;
                this.showDummy = false;
                this.finedProducts = [];
            }
        },
        isVisible(){
            this.isVisibleCart=!this.isVisibleCart
            if (this.productsInCart.length == 0){
                this.showDummyCart = true;
            }else{
                this.showDummyCart = false;
            }
        }
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
        if (this.products.length == 0){
            this.showDummy = true;
        }else{
            this.showDummy = false;
        }
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('beforeDestroy');
    }
});
