<template>
  <div>
    <div>
      <b-form-select v-model="seller_select" signle-line label="Filter">
        <b-form-select-option value="">Please select a seller</b-form-select-option>
        <b-form-select-option v-for="seller in sellers" :key="seller.seller_id" :value="seller.seller_id">{{seller.seller_name}}</b-form-select-option>
      </b-form-select>
      <b-form-select v-model="customer_select" signle-line label="Filter">
        <b-form-select-option value="">Please select a customer</b-form-select-option>
        <b-form-select-option v-for="customer in customers" :key="customer.customer_id" :value="customer.customer_id">{{customer.customer_name}}</b-form-select-option>
      </b-form-select>
      <b-button variant="outline-primary" @click="search(seller_select,customer_select)">Search</b-button>
    </div>

    <div>
      <b-table striped hover :items="bills" :fields="fields" >
        <template v-slot:cell(sumprice)="data">
          {{ data.item.amount*data.item.ink_price }}
        </template>
        <!-- <template v-slot:cell(action)="data">
          <b-button variant="outline-primary" @click="delete(data.item.id)">delete {{data.item.id}}</b-button>
        </template> -->
      </b-table>
    </div>

    <div>
      <b-button variant="outline-primary" @click="addbill()">Add Bill</b-button>
    </div>

  </div>
</template>

<script>
export default {
  components: {

  },
  data(){
    return{
      sellers:[],
      seller_select:'',
      customers:[],
      customer_select:'',
      inks:[],
      bills:[],
      fields:['invoiceNo','seller_name','customer_name','ink_name','ink_price','amount',{ key: 'sumprice', label: 'sum' },{ key: 'action', label: 'Action' }]
    }
  },
  created() {
      console.log('created')
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

          let bill = await this.$http.get('/bills')
          this.bills = bill.data.data
          console.log("data bills:" ,this.bills)

      },
      async search(seller_id,customer_id){
        if(seller_id!==null||customer_id!==null){
          console.log('search :',seller_id,'and ',customer_id)
          let res = await this.$http.get(`/bills?seller_id=${seller_id}&&customer_id=${customer_id}`)
          this.bills = res.data.data
          console.log('new data:',this.bills)
        }

      },
      addbill(){
        this.$router.push({path:'bill/addoldver'})
      },

  }
}
</script>

<style>

</style>
