<template>
  <div>
    <h3>Edit Movie</h3>
        <b-form-input v-model="movieId"></b-form-input>
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

      <b-button variant="outline-primary" @click="save()">Save</b-button>
      <b-button variant="outline-primary" to="/movie">Back</b-button>
   </div>
</template>
<script>
// http://localhost:7000/movie/edit?id=1
// http://localhost:7000/movie/edit/1
export default {
    data() {
        return {
            movieId:'',
            movieTitle: '',
            moviePlot: '',
            movieRuntime: '',
            movieReleaseDate: '',
            movieIncome: '',
            rateId: '',
        }
    },
    async created(){
      let res = await
      this.$http.get(`/movie/movieId/${this.$route.query.id}`)
      console.log(res.data);
      if(res.data.movie){
        this.movieId = res.data.movie.movieId || ''
        this.movieTitle = res.data.movie.movieTitle || ''
        this.moviePlot = res.data.movie.moviePlot || ''
        this.movieRuntime = res.data.movie.movieRuntime || ''
        this.movieReleaseDate = res.data.movie.movieReleaseDate || ''
        this.movieIncome = res.data.movie.movieIncome || ''
        this.rateId = res.data.movie.rateId || ''
      }
    },
    methods: {
        async save() {
           let res = await this.$http.post('/movie/save', {
                movieId: this.$route.query.id,
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
        }
    }
}
</script>

<style>

</style>