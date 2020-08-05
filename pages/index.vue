<template>
  <div>
    <div class="Search">
      <p>Search Movie</p>
      <b-row>
        <b-col>
          <b-input v-model="searchTitle" placeholder="movie name"></b-input>
        </b-col>
        <b-col>
          <!-- <ul>
            <li v-for="rate in rateList" :key="rate.rateId">
              {{rate.rateName}}
            </li>
          </ul> -->
          <b-form-select v-model="rate" signle-line label="Filter">
            <b-form-select-option value=''>select rate</b-form-select-option>
            <b-form-select-option v-for="rate in rateList" :key="rate.rateId" :value="rate.rateId">{{rate.rateName}}</b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col>
          <b-button variant="outline-primary" @click="searchMovie(rate,searchTitle)">Search Movie</b-button>
        </b-col>
      </b-row>
    </div>
    <div class="show-movie">
      <b-container class="bv-example-row mb-3">
      <b-row cols="4">
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

            <b-button href="#" variant="primary" @click="viewMovie(movie.movieId)">View Detail</b-button>
          </b-card>
        </b-col>
        
      </b-row>
      
    </b-container>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  data(){
    return{
        movies: [],
        searchTitle:'',
        rate:'',
        rateList: [],
    }
  },
  created(){
    this.getMovie()
  },
  methods:{
    async getMovie() {
        // let res = await this.$http.get(`/movie?movieTitle=$${this.$route.query.movieTitle}&&rateId=${this.$route.query.rateId}`)
        // let res = await this.$http.get('/movie')
        // this.movies = res.data.movie
        if(this.$route.query.movieTitle !=undefined || this.$route.query.rateId !=undefined){
          let res = await this.$http.get(`/movie?movieTitle=${this.$route.query.movieTitle}&&rateId=${this.$route.query.rateId}`)
          let ress = await this.$http.get('/movie/rate')
          console.log('have value' +this.$route.query.movieTitle)
          this.rateList = ress.data.rate
          this.movies = res.data.movie
        }else{
          let res = await this.$http.get('/movie')
          let ress = await this.$http.get('/movie/rate')
          this.movies = res.data.movie
          this.rateList = ress.data.rate
        }
        //get last Id
        console.log("this last Id :",this.movies[this.movies.length-1].movieId)
        
        
      },
      viewMovie(id){
        this.$router.push({path:'movie/view',query:{id:id}})
      },  
      async searchMovie(rate,searchTitle){
        ///api/movie?movieTitle=ri&&rateId=2
        this.$router.push({path:`/`,query:{movieTitle:this.searchTitle ,rateId:this.rate}})
        let res = await this.$http.get(`/movie?movieTitle=${searchTitle}&&rateId=${rate}`)
        console.log(res.data)
        this.movies = res.data.movie
      }
    }
}
</script>

<style>

</style>
