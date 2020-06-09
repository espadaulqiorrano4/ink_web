<template>
  <div>
    <h4>View Movie Data</h4>
      
    <p>{{movieTitle}}</p>
    <p>{{moviePlot}}</p>
    <p>Runtime : {{movieRuntime}} min.</p>
    <p>ReleaseDate : {{movieReleaseDate}}</p>
    <p>Income : {{movieIncome}}</p>
    <p>Rate : {{rateName}}</p>
      
    <hr>

    <h4>Actor</h4>
    <ul>
      <li v-for="actor in actors" :key="actor.actorId">
        <p>{{actor.actorFirstname}} {{actor.actorLastname}}</p>
      </li>
    </ul>

    <b-button variant="outline-primary" to="/movie">Back</b-button>
   </div>
</template>
<script>
// http://localhost:7000/movie/view?id=1
// http://localhost:7000/movie/view/1
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
            rateName:'',
            actors:[],
        }
    },
    async created(){
      let res = await
      //get mm_movie data
      this.$http.get(`/movie/movieId/${this.$route.query.id}`)
      console.log(res.data);
      //set data
      if(res.data.movie){
        this.movieId = res.data.movie.movieId || ''
        this.movieTitle = res.data.movie.movieTitle || ''
        this.moviePlot = res.data.movie.moviePlot || ''
        this.movieRuntime = res.data.movie.movieRuntime || ''
        this.movieReleaseDate = res.data.movie.movieReleaseDate|| ''
        this.movieIncome = res.data.movie.movieIncome || ''
        this.rateId = res.data.movie.rateId || ''
        this.rateName = res.data.movie.rateName || ''
      }
      this.getActor()
    },
    methods: {
        async getActor() {
        let ress = await this.$http.get(`/movie_actor/actorId/${this.$route.query.id}`)
        this.actors = ress.data.actor
        console.log('test actor',ress.data)
      },
        
    }
}
</script>

<style>

</style>