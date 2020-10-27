<template>
  <div class="main">
    <ul>
      <li v-for="ink in inks" :key="ink.ink_id">
        <p v-if="check !== ink.ink_id">
          {{ink.ink_name}} price:{{ ink.ink_price }}
          <b-button variant="outline-primary" @click="edit(ink.ink_id)">Edit ink</b-button>
          <b-button variant="outline-primary" @click="deleteInk(ink.ink_id , ink.ink_name)">Delete ink</b-button>
        </p>
        <p v-else>
          name:<b-form-input v-model="ink.ink_name" placeholder="name"></b-form-input>
          price:<b-form-input v-model="ink.ink_price" placeholder="price"></b-form-input>
          <b-button variant="outline-primary" @click="save(ink.ink_id,ink.ink_name,ink.ink_price)">save</b-button>
          <b-button variant="outline-primary" @click="cancelEdit()">cancel</b-button>
        </p>

      </li>
    </ul>
    <b-button variant="outline-primary" @click="addInk()">Add ink</b-button>
    <div v-if="checkAddInk !== false">
      <b-form-input placeholder="ink name"
       v-model="inkName"></b-form-input>
       <b-form-input placeholder="price"
       v-model="price"></b-form-input>
       <b-button variant="outline-primary" @click="add(inkName,price)">add</b-button>
       <b-button variant="outline-primary" @click="cancel()">cancel</b-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        inks: [],
        inkName:"",
        price:'',
        check:0,
        checkAddInk:false,
      }
    },
    async created() {
      console.log('created')
      this.getInks()

    },
    methods: {
      async getInks() {
          let res = await this.$http.get('/inks')
          this.inks = res.data.data
          console.log("data" ,this.inks)
      },
      addInk(){
        this.checkAddInk=1
      },
      deleteInk(id,name){
        this.$bvModal.msgBoxConfirm(`Please confirm that you want to delete ${name}`, {
          title: 'Please Confirm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value){
              this.$http.delete(`inks/${id}/delete`)
              this.getInks()
            }else{

            }

          })
          .catch(err => {
            // An error occurred
          })
      },
      async add(name,price){
        console.log('name:',name," price: ",price)
        let res = await this.$http.post('/inks/create', {
                name: name,
                price: price,
            })
        this.checkAddInk = false
        this.getInks()
        this.inkName=""
        this.price=''
      },
      cancel(){
        this.checkAddInk = false
      },
      cancelEdit(){
        this.check = 0
      },
      edit(id){
          this.check = id
      },
      save(id,name,price){
        this.$http.put(`/inks/update/${id}`,{
                ink_id: `${id}`,
                ink_name: name,
                ink_price:price
            }).then(value =>{
                if(value){
                    this.check = false
                }
            })
      },
    }
  }
</script>
