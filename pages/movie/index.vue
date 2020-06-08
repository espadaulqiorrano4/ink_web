<template>
  <div class="main">
    <div class="Search">
      <p>Search Movie</p>
      <b-row>
        <b-col>
          <b-form-input v-model="searchTitle"></b-form-input>
        </b-col>
        <b-col>
          <b-form-select
            :options="rateList"
            v-model="rate"
            signle-line
            label="Filter"></b-form-select>
        </b-col>
        <b-col>
          <b-button variant="outline-primary" @click="searchMovie(rate,searchTitle)">Search Movie</b-button>
        </b-col>
      </b-row>
    </div>
    <br>
    <ul>
      <li v-for="movie in movies" :key="movie.movieId">
        {{ movie.movieId }} - {{ movie.movieTitle }} 
        <b-button variant="outline-primary" @click="editMovie(movie.movieId)">Edit Movie</b-button>
        <b-button variant="outline-primary" @click="deleteMovie(movie.movieId , movie.movieTitle)">Delete Movie</b-button>
      </li>
    </ul>
    <b-button variant="outline-primary" @click="addMovie()">Add Movie</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        movies: [],
        searchTitle:'',
        rate:'',
        rateList: [
            { value: '1', text: 'PG' },
            { value: '2', text: 'PG-13' },
            { value: '3', text: 'R' },
        ]
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
          console.log('have value' +this.$route.query.movieTitle)
          this.movies = res.data.movie
        }else{
          let res = await this.$http.get('/movie')
          this.movies = res.data.movie
        }
        console.log(res.data)
        
        
      },
      addMovie(){
        this.$router.push({path:'movie/add'})
      },
      editMovie(id){
        this.$router.push({path:'movie/edit',query:{id:id}})
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