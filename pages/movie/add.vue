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

       <hr>

    <h3>Genre</h3>
    <b-form-group label="Insert genres">
      <b-form-checkbox
        v-for="optionGenre in optionGenres"
        v-model="selectedGenres"
        :key="optionGenre.genresId"
        :value={genresId:optionGenre.genresId}
      >
        {{ optionGenre.genresTitle }}
      </b-form-checkbox>
    </b-form-group>
        {{selectedGenres}}

      <b-button variant="outline-primary" @click="add()">Add</b-button>
      <b-button variant="outline-primary" to="/movie">Back</b-button>
   </div>
</template>
<script>

export default {
  middleware:'auth',
    data() {
        return {
            movieId:'',
            movieTitle: '',
            moviePlot: '',
            movieRuntime: '',
            movieReleaseDate: '',
            movieIncome: '',
            rateId: '',
            optionGenres:[],
            selectedGenres:[],
            i:0,
            movieList:[],
        }
    },
    
    async created() {
      console.log('created add')
      let res = await this.$http.get('/movie_genres')
      this.optionGenres = res.data.genres
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
                let getlast = await this.$http.get('/movie')
                this.movieList = getlast.data.movie
                for(this.i=0;this.i<this.selectedGenres.length;this.i++){
                    let ress = await this.$http.post('/movie_genres/mgenres/new/',{
                        movieId:this.movieList[this.movieList.length-1].movieId,
                        genresId:this.selectedGenres[this.i].genresId
                    })
                }
                this.$router.push({path:'/movie'})
            }
        },
        
    }
}
</script>

<style>

</style>