<template>
  <div>
    <h1>Student Edit</h1>
      <b-form-input placeholder="First Name"
       v-model="fName"></b-form-input>
      <b-form-input placeholder="Laast Name"
       v-model="lName"></b-form-input>
      <b-button variant="outline-primary" @click="save()">Save</b-button>
      <b-button variant="outline-primary" to="/student">Back</b-button>
   </div>
</template>
<script>
// http://localhost:7000/student/edit?id=1
// http://localhost:7000/student/edit/1
export default {
    data() {
        return {
            fName: '',
            lName: ''
        }
    },
    async created(){
      let res = await
      this.$http.get(`/student/id/${this.$route.query.id}`)
      console.log(res.data);
      if(res.data.student){
        this.fName = res.data.student.fname || ''
        this.lName = res.data.student.lname || ''
      }
    },
    methods: {
        async save() {
           let res = await this.$http.post('/student/save', {
                id: this.$route.query.id,
                fname: this.fName,
                lname: this.lName
            })
            if(!res.data.ok){
                // TODO: Show error
            } else {
                // TODO: Show message ok
            }
        }
    }
}
</script>

<style>

</style>