<template>
  <div class="main">
      <div class="Search">
        <p>Search Actor</p>
        <b-row>
            <b-col>
            <b-form-input v-model="searchActor"></b-form-input>
            </b-col>
            <b-col>
            <b-button variant="outline-primary" @click="searchAct(searchActor)">Search Actor</b-button>
            </b-col>
        </b-row>
        </div>
      <div>
        <ul>
            <li v-for="actor in actors" :key="actor.actorId">
                
                <p v-if="check !== actor.actorId">
                    {{actor.actorName}}
                    <b-button variant="outline-primary" @click="add(actor.actorId)">add</b-button>
                    <b-button variant="outline-primary" @click="deleteActor(actor.actorId , actor.movieTitle, actor.actorName)">delete actor</b-button>
                </p>

                <p v-else>
                    {{actor.actorName}} 
                    Role: <b-form-input v-model="movieActorRole" placeholder="Enter role"></b-form-input>
                    <b-button variant="outline-primary" @click="saveRole(actor.actorId,movieActorRole)">save</b-button>
                    <b-button variant="outline-primary" @click="cancel()">cancel</b-button>
                </p>
            </li>
        </ul>
      </div>
    
  </div>
</template>

<script>
  export default {
    middleware:'auth',
    data() {
      return {
        actors: [],
        searchActor:'',
        check:0,
        movieActorRole:'',
        qid:''
      }
    },
    computed: {
      
    },
    async created() {
      console.log('created')
      this.getActor()
      this.qid = this.$route.query.id
      console.log('qid :',this.qid)
    },
    methods: {
      async getActor() {
        let res = await this.$http.get('/movie_actor')
        this.actors = res.data.actor
        console.log(res.data)
      },
      async searchAct(searchActor){
        let res = await this.$http.get(`/movie_actor?actor=${searchActor}`)
        console.log(res.data)
        this.actors = res.data.actor
      },
      add(id){
          this.check = id
      },
      cancel(){
          this.check = false
      },
       saveRole(actorId,movieActorRole){
              this.$http.post(`/movie_actor/addMovieActor`,{
                movieId: this.$route.query.id,
                actorId: actorId,
                movieActorRole: movieActorRole
            }).then(value =>{
                if(value){
                    this.$router.push({path:'/movie/edit',query:{id:this.qid}})
                }
            })
          },
    }
  }
</script>