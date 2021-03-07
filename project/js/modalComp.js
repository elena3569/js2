Vue.component('modal',{
    data(){
        return{
            isModalVisible: false,
        }
    },
    methods:{
        close() {
            this.isModalVisible = false;
          },
    },
    template: `    <div v-show="isModalVisible" class="modal-backdrop ">
    <div class="modal md-effect"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <header
        class="modal-header"
        id="modalTitle"
      >
        <slot name="header">
          This is the default tile!
        </slot>

          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
      </header>
      <section
        class="modal-body"
        id="modalDescription"
      >
        <slot name="body">
          I'm the default body!
        </slot>
      </section>
    </div>
  </div>`

})