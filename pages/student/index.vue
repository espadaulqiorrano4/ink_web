<template>
  <div>
    <h1>Student List</h1>
    <b-form-select
          :options="clsList"
          v-model="cls"
          signle-line
          label="Filter"
    ></b-form-select>
    <ul>
      <li v-for="st in filteredStudent" :key="st.id">
        {{ st.code }} - {{ st.fname }} - {{ st.lname }} - {{ st.class }}
        <b-button variant="outline-primary" @click="editStudent(st.id)">Edit</b-button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cls: '1',
        students: [],
        clsList: [
            { value: '1', text: 'ชั้นปีที่ 1' },
            { value: '2', text: 'ชั้นปีที่ 2' },
            { value: '3', text: 'ชั้นปีที่ 3' },
        ]
      }
    },
    computed: {
      filteredStudent() {
        return this.students.filter(x  => '' + x.class === this.cls)
      }
    },
    async created() {
      console.log('created')
      this.getStudent()
    },
    methods: {
      async getStudent() {
        // let res = await this.$http.get(`/student?class=${this.cls}`)
        let res = await this.$http.get('/student')
        console.log(res.data)
        this.students = res.data.student
      },
      editStudent(id){
        this.$router.push({path:'student/edit',query:{id:id}})
      }
    }
  }
</script>