<template>
  <div>
    <h1>Add Movie</h1>
    
      <b-form-input placeholder="movie name"
       v-model="movieTitle"></b-form-input>
      <b-form-input placeholder="movie plot"
       v-model="moviePlot"></b-form-input>
       <b-form-input placeholder="movie runtime"
       v-model="movieRuntime"></b-form-input>
       <b-form-datepicker id="movieReleaseDate" placeholder="movieReleaseDate" v-model="movieReleaseDate" class="mb-2"></b-form-datepicker>
       <b-form-input placeholder="movieIncome"
       v-model="movieIncome"></b-form-input>
       <b-form-input placeholder="rateId"
       v-model="rateId"></b-form-input>

      <b-button variant="outline-primary" @click="add()">Add</b-button>
      <b-button variant="outline-primary" to="/movie">Back</b-button>
   </div>
</template>
<script>

export default {
    data() {
        return {
            movieTitle: '',
            moviePlot: '',
            movieRuntime: '',
            movieReleaseDate: '',
            movieIncome: '',
            rateId: '',
        }
    },
    
    methods: {
        async add() {
           let res = await this.$http.post('/movie/new', {
                movieTitle: this.movieTitle,
                moviePlot: this.moviePlot,
                movieRuntime: this.movieRuntime,
                movieReleaseDate: this.movieReleaseDate,
                movieIncome: this.movieIncome,
                rateId: this.rateId
            })
            if(!res.data.ok){
                // TODO: Show error
            } else {
                // TODO: Show message ok
                this.$router.push({path:'/movie'})
            }
        },
        
    }
}
</script>

<style>

</style>