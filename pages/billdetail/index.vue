<template>
  <div>
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
      fields:['invoiceNo','seller_name','customer_name','ink_name','ink_price','amount',{ key: 'sumprice', label: 'sum' }]
    }
  },
  created() {
      console.log('created')
      this.getData()

    },
  methods:{
    async getData() {

      let res = await this.$http.get(`/bills?invoiceNo=${this.$route.query.id}`)
      this.bills = res.data.data
      console.log('new data:',this.bills)

      },

      addbill(){
        this.$router.push({path:'bill/addoldver'})
      },

  }
}
</script>

<style>

</style>
