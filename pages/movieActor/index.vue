<template>
  <div class="main">
    <ul>
      <li v-for="actor in actors" :key="actor.actorId">
        <p>{{actor.actorName}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        actors: [],
      }
    },
    computed: {
      
    },
    async created() {
      console.log('created')
      this.getActor()
      
    },
    methods: {
      async getActor() {
        let res = await this.$http.get('/movie_actor')
        this.actors = res.data.actor
        console.log(res.data)
        
      }
    }
  }
</script>