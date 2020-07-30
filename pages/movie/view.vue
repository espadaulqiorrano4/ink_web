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

    <h4>Genre</h4>
      <ul>
        <li v-for="movie_genre in movie_genres" :key="movie_genre.genresId">
          <p>{{movie_genre.genresTitle}}</p>
        </li>
      </ul>

    <hr>
    <h4>Director</h4>
    <ul>
      <li v-for="movie_director in movie_directors" :key="movie_director.director_id">
        <p>{{movie_director.directorName}}</p>
      </li>
    </ul>

    <hr>
    <h4>Writer</h4>
    <ul>
      <li v-for="movie_writer in movie_writers" :key="movie_writer.writers_id">
        <p>{{movie_writer.writerName}}</p>
      </li>
    </ul>

    <hr>

    <h4>Production</h4>
    <ul>
      <li v-for="movie_production in movie_productions" :key="movie_production.pco_id">
        <p>{{movie_production.pcoTitle}}</p>
      </li>
    </ul>

    <hr>

    <h4>Actor</h4>
    <ul>
      <li v-for="actor in actors" :key="actor.actorId">
        <p>{{actor.actorName}} Role: {{actor.movieActorRole}}</p>
      </li>
    </ul>

    <hr>
    <h4>Also like</h4>
    <ul>
      <li v-for="movie_like in movie_likes" :key="movie_like.movieId">
        <p v-if="movie_like.movieId == movie_like.movieId">{{movie_like.movieTitle}}</p>
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
            movie_genres:[],
            movie_productions:[],
            movie_directors:[],
            movie_writers:[],
            movie_likes:[]
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
      this.getGenres()
      this.getProduction()
      this.getDirector()
      this.getWriter() 
      this.getmovieLike()
    },
    methods: {
      async getActor() {
        let res = await this.$http.get(`/movie_actor/actorId/${this.$route.query.id}`)
        this.actors = res.data.actor
      },
      async getGenres() {
        let res = await this.$http.get(`/movie_genres/mgenres/${this.$route.query.id}`)
        this.movie_genres = res.data.movie_genre
      },
      async getProduction() {
        let res = await this.$http.get(`/movie_production/production/${this.$route.query.id}`)
        this.movie_productions = res.data.movie_production
      },
      async getDirector() {
        let res = await this.$http.get(`/movie_director/director/${this.$route.query.id}`)
        this.movie_directors = res.data.movie_director
      },
      async getWriter() {
        let res = await this.$http.get(`/movie_writer/writer/${this.$route.query.id}`)
        this.movie_writers = res.data.movie_writer
      },
      async getmovieLike(){
        let res = await this.$http.get(`/movie_genres/movielike`)
        console.log('ml :',this.movie_genres[0])
        this.movie_likes = res.data.movie_like
      }
        
    }
}
</script>

<style>

</style>