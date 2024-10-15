<template>
    <div class="container">
      <pre>{{ jsondata }}</pre>
    </div>
</template>
  
<script>
    import axios from 'axios';
  
    export default {
      data() {
        return {
          jsondata: null,
          error: null,
        };
      },
      mounted() {
        this.getBookCountAPI();
      },
      methods: {
        async getBookCountAPI() {
          try {
            const response = await axios.get('https://us-central1-week9-jiayin-39c5a.cloudfunctions.net/countBooks');
            this.jsondata = response.data;
            this.error = null;
          } catch (error) {
            console.error('Error fetching book count:', error);
            this.error = error;
            this.jsondata = null;
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

</style>