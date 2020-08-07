<template>
  <div>
      <b-form-input placeholder="actor name"
       v-model="actorName"></b-form-input>
      <b-form-input placeholder="bplace"
       v-model="bplace"></b-form-input>
       <b-form-datepicker id="movieReleaseDate" placeholder="movieReleaseDate" v-model="bdate" class="mb-2"></b-form-datepicker>
        <b-button variant="outline-primary" @click="add()">Add</b-button>
      <b-button variant="outline-primary" to="/movieActor">Back</b-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            actorName:'',
            bplace:'',
            bdate:'',
        }
    },
    methods:{
        async add() {
           let res = await this.$http.post('/movieActor/newActor', {
                actorName: this.actorName,
                actorBplace: this.bplace,
                actorBdate: this.bdate
            })

            this.$router.push({path:'/movieActor'})
        }
    }
}
</script>

<style>

</style>