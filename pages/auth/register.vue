<template>
<div class="container">
  <div class="col-md-6 offset-md-3">
    <div class="card mt-4">
      <div class="card-header">
        <p>Register</p>
      </div>
      <div class="card-body">

        <form>
          <div class="from-group">
            <label>Email</label>
            <input v-model="form.email" type="text" class="form-control" placeholder="Email">
            <label>Name</label>
            <input v-model="form.name" type="text" class="form-control" placeholder="Name">
            <label>Password</label>
            <input v-model="form.password" type="text" class="form-control" placeholder="Password">
            <label>Password confirmation</label>
            <input v-model="form.password_confirmation" type="text" class="form-control" placeholder="Password confirmation">
          </div>
          <div class="form-group">
            <b-button @click="register" variant="outline-primary">register</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  middleware:'guest',
  data(){
    return {
      form:{
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        seller_id:'0'
      }
    }
  },
  methods:{
    async register(){
      try {
        await this.$axios.post('/auth/register',this.form)

        this.$auth.login({data:this.form})
      } catch(e) {
          return;
      }


      this.$router.push({path:'/auth/me'})
    }
  }
}
</script>

<style>

</style>
