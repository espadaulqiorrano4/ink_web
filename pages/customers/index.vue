<template>
  <div class="main">
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        <p v-if="check !== customer.id">
          {{customer.customer_name}} phone:{{customer.customer_phone}} address:{{customer.customer_address}}
          <b-button variant="outline-primary" @click="edit(customer.id)">Edit ink</b-button>
          <b-button variant="outline-primary" @click="deletecustomers(customer.id , customer.customer_name)">Delete customer</b-button>
        </p>
        <p v-else>
          name:<b-form-input v-model="customer.customer_name" placeholder="name"></b-form-input>
          phone:<b-form-input v-model="customer.customer_phone" placeholder="phone"></b-form-input>
          email:<b-form-input v-model="customer.customer_address" placeholder="email"></b-form-input>
          <b-button variant="outline-primary" @click="save(customer.id,customer.customer_name,customer.customer_phone,customer.customer_address)">save</b-button>
          <b-button variant="outline-primary" @click="cancelEdit()">cancel</b-button>
        </p>

      </li>
    </ul>
    <b-button variant="outline-primary" @click="addCustomer()">Add Customer</b-button>
    <div v-if="checkAdd !== false">
      name:<b-form-input v-model="customerName" placeholder="name"></b-form-input>
      phone:<b-form-input v-model="customerPhone" placeholder="phone"></b-form-input>
      address:<b-form-input v-model="customerAddress" placeholder="address"></b-form-input>
      <b-button variant="outline-primary" @click="add(customerName,customerPhone,customerAddress)">add</b-button>
      <b-button variant="outline-primary" @click="cancel()">cancel</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customers: [],
        customerName:"",
        customerPhone:"",
        customerAddress:"",
        check:0,
        checkAdd:false,
      }
    },
    async created() {
      console.log('created')
      this.getcustomers()

    },
    methods: {
      async getcustomers() {
          let res = await this.$http.get('/customers')
          this.customers = res.data.data
          console.log("data" ,this.customers)
      },
      addCustomer(){
        this.checkAdd=1
      },
      deletecustomer(id,name){
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
              this.$http.delete(`customers/${id}/delete`)
              this.getcustomers()
            }else{

            }

          })
          .catch(err => {
            // An error occurred
          })
      },
      async add(name,phone,address){
        let res = await this.$http.post('/customers/create', {
                name:name,
                address:address,
                phone:phone,
            })
        this.checkAdd = false
        this.getcustomers()
      },
      cancel(){
        this.checkAdd = false
      },
      cancelEdit(){
        this.check = 0
      },
      edit(id){
          this.check = id
      },
      save(id,name,phone,address){
        this.$http.put(`/customers/update/${id}`,{
                id: `${id}`,
                customer_name:name,
                customer_phone:phone,
                customer_address:address,
            }).then(value =>{
                if(value){
                    this.check = false
                }
            })
      },
    }
  }
</script>
