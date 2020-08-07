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
            <b-button variant="outline-primary" @click="addActor()">add Actor</b-button>
            </b-col>
        </b-row>
        </div>
      <div>
        <ul>
            <li v-for="actor in actors" :key="actor.actorId">
                
                <p v-if="check !== actor.actorId">
                    Actor Name:{{actor.actorName}}
                    bplace : {{actor.actorBplace}}
                    bdate: {{actor.actorBdate}}
                    <b-button variant="outline-primary" @click="edit(actor.actorId)">edit</b-button>
                    <b-button variant="outline-primary" @click="deleteActor(actor.actorId , actor.actorName)">delete actor</b-button>
                </p>

                <p v-else>
                    Actor Name : <b-form-input v-model="actor.actorName" placeholder="Enter name"></b-form-input>
                    bplace: <b-form-input v-model="actor.actorBplace" placeholder="Enter bplace"></b-form-input>
                    actorBdate: <b-form-datepicker id="movieReleaseDate" placeholder="movieReleaseDate" v-model="actor.actorBdate" class="mb-2"></b-form-datepicker>
                    <b-button variant="outline-primary" @click="save(actor.actorId,actor.actorBplace,actor.actorBdate)">save</b-button>
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
      edit(id){
          this.check = id
      },
      cancel(){
          this.check = false
      },
       save(actorId,bplace,bdate){
              this.$http.post(`/movie_actor/editActor`,{
                actorId: `${actorId}`,
                actorBplace: bplace,
                actorBdate:bdate
            }).then(value =>{
                if(value){
                    this.check = false
                }
            })
          },

          addActor(){
            this.$router.push({path:'movieActor/add'})
          }
    }
  }
</script>