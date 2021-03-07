Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            showDummy: false,
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
  
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.$parent.$refs.search.filtered.push(el);
                }
            });
    },
    template: `
    <div>
        <div v-if="showDummy" class="dummy find-dummy"> Нет данных</div>
        <div v-else class="products">
            <product v-for="item of $parent.$refs.search.filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                      <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
});
