<template>
  <div>
    <h1>view detail</h1>
    <p>seller:{{seller_name}}</p>
    <p>customer:{{customer_name}}</p>
    <p>invoice number:{{invoiceNo}}</p>
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
  </div>
</template>

<script>
export default {
  components: {

  },
  data(){
    return{
      bills:[],
      seller:[],
      customer:[],
      billlist:[],
      seller_name:'',
      customer_name:'',
      invoiceNo:'',
      fields:['ink_name','ink_price','amount',{ key: 'sumprice', label: 'sum' }]
    }
  },
  created() {
      console.log('created')
      this.getData()



    },
  methods:{
    async getData() {

      let billlist = await this.$http.get(`/invoice?invoiceNo=${this.$route.query.id}`)
      this.billlist = billlist.data.data
      this.seller_name = billlist.data.data[0].seller_name
      this.customer_name = billlist.data.data[0].customer_name
      this.invoiceNo = billlist.data.data[0].invoiceNo
      console.log("data billlist:" ,this.billlist)

      let res = await this.$http.get(`/bills?invoiceNo=${this.$route.query.id}`)
      this.bills = res.data.data
      console.log('new data:',this.bills)

      },

      addbill(){
        this.$router.push({path:'bill/addoldver'})
      },
  },
  mounted(){
    console.log('mounted')

  }
}
</script>

<style>

</style>
