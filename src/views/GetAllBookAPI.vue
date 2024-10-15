<template>
  <div class="container">
    <h1>All Books</h1>
    <div v-if="jsonData">

      <pre>{{ jsonData }}</pre>
    </div>
    <div v-else>
      <p>Loading books...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsonData: null, 
    };
  },
  mounted() {
    this.getAllBooks(); 
  },
  methods: {
    async getAllBooks() {
      try {

        const response = await axios.get('https://us-central1-week9-jiayin-39c5a.cloudfunctions.net/getAllBooks');
        this.jsonData = response.data; 
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
    padding: 20px;
    text-align: center;
  }

pre {
  text-align: left;
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
