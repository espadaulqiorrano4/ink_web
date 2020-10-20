<template>
  <div>
    view detail
    <ul>
      <li v-for="billlist in billlists" :key="billlist.invoicenumber_id">
        <b-link @click="viewList(billlist.invoiceNo)">{{ billlist.invoiceNo }}</b-link>
      </li>
    </ul>

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
      billlists:[],
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

          let billlist = await this.$http.get('/invoice')
          this.billlists = billlist.data.data
          console.log("data billlist:" ,this.bills)

      },

      addbill(){
        this.$router.push({path:'bill/addoldver'})
      },

      viewList(id){
        this.$router.push({path:'billdetail',query:{id:id}})
      }

  }
}
</script>

<style>

</style>
