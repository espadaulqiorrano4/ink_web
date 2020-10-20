<template>
  <div>
    <caption>Invoice NO: {{IVN}}</caption>
    <div>
      <b-table-simple>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Seller</b-th>
            <b-th>Customer</b-th>
            <b-th>ink</b-th>
            <b-th>amount</b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-for="countTable in countTables" :key="countTable">
          <b-tr>
            <b-th>
              <b-form-select v-model="billlist.seller" signle-line label="Filter">
              <b-form-select-option value="">Please select a seller</b-form-select-option>
              <b-form-select-option v-for="seller in sellers" :key="seller.seller_id" :value="seller.seller_id">{{seller.seller_name}}</b-form-select-option>
              </b-form-select>
            </b-th>
            <b-th>
              <b-form-select v-model="billlist.customer" signle-line label="Filter">
              <b-form-select-option value="">Please select a customer</b-form-select-option>
              <b-form-select-option v-for="customer in customers" :key="customer.customer_id" :value="customer.customer_id">{{customer.customer_name}}</b-form-select-option>
              </b-form-select>
            </b-th>
            <b-th>
              <b-form-select v-model="billlist.ink" signle-line label="Filter">
              <b-form-select-option value="">Please select a ink</b-form-select-option>
              <b-form-select-option v-for="ink in inks" :key="ink.ink_id" :value="ink.ink_id">{{ink.ink_name}}</b-form-select-option>
              </b-form-select>
            </b-th>
            <b-th>
              <b-form-input  v-model="billlist.amount"></b-form-input>
            </b-th>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td colspan="7" variant="secondary" class="text-right">
              Total Rows: <b>5</b>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td>
              <b-button variant="outline-primary" @click="addtable()">+</b-button>
              <b-button variant="outline-primary" @click="distable()">-</b-button>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </div>
    {{billlist}}
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
      ink_amount:'',
      IVN:'',
      countTables:1,
      billlist:[{id:0,seller:'',customer:'',ink:'',amount:''},{id:1,seller:'',customer:'',ink:'',amount:''}],
    }
  },
  created(){
    this.getData()

  },
  methods:{
    async getData() {

          this.IVN = this.$route.query.IVN
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


    },
    addtable(){
      this.countTables++
      console.log('list:',this.billlist)
    },
    distable(){
      this.countTables--
    }
  }
}
</script>

<style>

</style>
