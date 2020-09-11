<template>
  <div class="main">
    <ul>
      <li v-for="ink in inks" :key="ink.id">
        <b-link @click="viewMovie(ink.name)">{{ ink.price }} {{ink.name}}</b-link>
        <b-button variant="outline-primary" @click="editMovie(movie.movieId)">Edit ink</b-button>
        <b-button variant="outline-primary" @click="deleteMovie(movie.movieId , movie.movieTitle)">Delete ink</b-button>
      </li>
    </ul>
    <b-button variant="outline-primary" @click="addMovie()">Add ink</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inks: [],
      }
    },
    async created() {
      console.log('created')
      this.getInks()

    },
    methods: {
      async getInks() {
          let res = await this.$http.get('/inks')
          this.inks = res.data.data
          console.log("data" ,this.inks)
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
