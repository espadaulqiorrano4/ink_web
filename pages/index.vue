<template>
  <div>
    <b-container class="bv-example-row mb-3">
      <b-row cols="3">
        <b-col v-for="movie in movies" :key="movie.movieId">
          <b-card
            :title="movie.movieTitle"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
            
          >
            <b-card-text>
              {{movie.moviePlot}}
            </b-card-text>

            <b-button href="#" variant="primary">View Detail</b-button>
          </b-card>
        </b-col>
        
      </b-row>
      
    </b-container>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  data(){
    return{
      movies:[],
      rateList:[]
    }
  },
  created(){
    this.getMovie()
  },
  methods:{
    async getMovie() {
          let res = await this.$http.get('/movie')
          let ress = await this.$http.get('/movie/rate')
          this.movies = res.data.movie
          this.rateList = ress.data.rate
          console.log("movie :",this.movies)
      },
  }
}
</script>

<style>

</style>
