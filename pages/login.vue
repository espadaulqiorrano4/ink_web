<template>
  <div>
      <b-form-input v-model="email" placeholder="Enter your email"></b-form-input>
      <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
      <b-button @click="handleLoginClicked" variant="outline-primary">login</b-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        async handleLoginClicked(){
            try {
                let response = await this.$auth.loginWith('local', { data:{email:this.email,password:this.password} })
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>
