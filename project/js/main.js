const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.$refs.modal.isModalVisible = true;
                    this.$refs.products.showDummy = true;
                })
        },
    },
    mounted() {
        console.log(this);
    }
});


