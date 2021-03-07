Vue.component('search', {
    data(){
        return {
            finedProducts: [],
            searchLine: '',
            filtered: [],
        }
      },
    methods:{
        filter(){
            this.filtered = this.$parent.$refs.products.products.filter(el => el.product_name.toLowerCase().includes(this.$root.userSearch));
        },
        
        showFinded(){
            this.filter();
            if (this.filtered.length == 0){
                this.$parent.$refs.products.showDummy = true;
            }
            else {
                this.$parent.$refs.products.showDummy = false;
            }
        },
    },
    template: `<form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="$root.userSearch" v-on:keyup="showFinded">
                    <button @click="showFinded" class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
})