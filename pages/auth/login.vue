<template>
<div class="container">
  <div class="col-md-6 offset-md-3">
    <div class="card mt-4">
      <div class="card-header">
        <p>login</p>
      </div>
      <div class="card-body">
        <form>
          <div class="from-group">
            <label>Email</label>
            <input v-model="form.email" type="text" class="form-control" placeholder="Email">
            <label>Password</label>
            <input v-model="form.password" type="text" class="form-control" placeholder="Password">
          </div>
          <div class="form-group">
            <b-button @click="login" variant="outline-primary">login</b-button>
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
        email:'',
        password:'',
      }
    }
  },
  methods:{
    async login(){
      try {
        const res = await this.$auth.loginWith('local', {data:this.form})
        console.log(res)


      } catch(e) {
          return;
      }

      this.$router.push({path:'/'})




    }
  }
}
</script>

<style>

</style>
