<template>
  <div class="main">
    <div class="Search">
      <p>Search Movie</p>
      <b-row>
        <b-col>
          <b-form-input v-model="searchTitle"></b-form-input>
        </b-col>
        <b-col>
          <!-- <ul>
            <li v-for="rate in rateList" :key="rate.rateId">
              {{rate.rateName}}
            </li>
          </ul> -->
          <b-form-select v-model="rate" signle-line label="Filter">
            <b-form-select-option v-for="rate in rateList" :key="rate.rateId" :value="rate.rateId">{{rate.rateName}}</b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col>
          <b-button variant="outline-primary" @click="searchMovie(rate,searchTitle)">Search Movie</b-button>
        </b-col>
      </b-row>
    </div>
    <br>
    <ul>
      <li v-for="movie in movies" :key="movie.movieId">
        <b-link @click="viewMovie(movie.movieId)">{{ movie.movieTitle }}</b-link>
        <b-button variant="outline-primary" @click="editMovie(movie.movieId)">Edit Movie</b-button>
        <b-button variant="outline-primary" @click="deleteMovie(movie.movieId , movie.movieTitle)">Delete Movie</b-button>
      </li>
    </ul>
    <b-button variant="outline-primary" @click="addMovie()">Add Movie</b-button>
  </div>
</template>

<script>
  export default {
    middleware:'auth',
    data() {
      return {
        movies: [],
        searchTitle:'',
        rate:'',
        rateList: [],
      }
    },
    computed: {
      searchMov(){
        console.log('Mov :',this.movies)
        return this.movies
      }
    },
    async created() {

      console.log('created')
      this.getMovie()
        this.rate = this.$route.query.rateId || ''
        this.searchTitle = this.$route.query.movieTitle || ''

    },
    methods: {
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
      addMovie(){
        this.$router.push({path:'movie/add'})
      },
      editMovie(id){
        this.$router.push({path:'movie/edit',query:{id:id}})
      },
      viewMovie(id){
        this.$router.push({path:'movie/view',query:{id:id}})
      },
      deleteMovie(id,movieTitle){
        this.$bvModal.msgBoxConfirm(`Please confirm that you want to delete ${movieTitle}`, {
          title: 'Please Confirm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value){
              this.$http.delete(`/movie/id/${id}`)
              location.reload()
            }else{

            }

          })
          .catch(err => {
            // An error occurred
          })
        // this.$http.delete(`/movie/id/${id}`)
        // location.reload()
      },
      async searchMovie(rate,searchTitle){
        ///api/movie?movieTitle=ri&&rateId=2
        this.$router.push({path:`/movie?movieTitle=${searchTitle}&&rateId=${rate}`})
        let res = await this.$http.get(`/movie?movieTitle=${searchTitle}&&rateId=${rate}`)
        console.log(res.data)
        this.movies = res.data.movie
      }
    }
  }
</script>
