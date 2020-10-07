<template>
  <div>
    page index
  </div>
</template>

<script>
export default {
  components: {

  },
  data(){
    return{
      sellers:[],
      customers:[],
      inks:[],
      bills:[],
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

          let customer = await this.$http.get('/customers')
          this.customers = customer.data.data
          console.log("data customers:" ,this.customers)

          let ink = await this.$http.get('/inks')
          this.inks = ink.data.data
          console.log("data inks:" ,this.ink)

          let bill = await this.$http.get('/bills')
          this.bills = bill.data.data
          console.log("data bills:" ,this.bill)

      },
  }
}
</script>

<style>

</style>
