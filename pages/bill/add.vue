<template>
  <div>
    seller:<b-form-select v-model="seller_select" signle-line label="Filter">
      <b-form-select-option v-for="seller in sellers" :key="seller.seller_id" :value="seller.seller_id">{{seller.seller_name}}</b-form-select-option>
    </b-form-select>
    customer:<b-form-select v-model="customer_select" signle-line label="Filter">
      <b-form-select-option v-for="customer in customers" :key="customer.customer_id" :value="customer.customer_id">{{customer.customer_name}}</b-form-select-option>
    </b-form-select>
    ink:<b-form-select v-model="ink_select" signle-line label="Filter">
      <b-form-select-option v-for="ink in inks" :key="ink.ink_id" :value="ink.ink_id">{{ink.ink_name}}</b-form-select-option>
    </b-form-select>
    amount:<b-form-input v-model="ink_amount"></b-form-input>
    <b-button variant="outline-primary" @click="addbill()">Add bill</b-button>


  </div>
</template>

<script>
export default {
  data(){
    return {
      sellers:[],
      seller_select:'',
      customers:[],
      customer_select:'',
      inks:[],
      ink_select:'',
      ink_amount:''
    }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData() {

          let seller = await this.$http.get('/sellers')
          this.sellers = seller.data.data
          console.log("data sellers :" ,this.sellers)

          let ink = await this.$http.get('/inks')
          this.inks = ink.data.data
          console.log("data inks:" ,this.inks)

          let customer = await this.$http.get('/customers')
          this.customers = customer.data.data
          console.log("data customers:" ,this.customers)

      },
    async addbill(){
      let res = await this.$http.post('/bills/create', {
                customer_id:this.customer_select,
                seller_id:this.seller_select,
                ink_id:this.ink_select,
                amount:this.ink_amount,
            })
      this.$router.push({path:'/'})


    }
  }
}
</script>

<style>

</style>
