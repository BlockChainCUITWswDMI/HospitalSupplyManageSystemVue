<template>
    <div>
      <h1>Error</h1>
      <p>{{ errorMessage }}</p>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        errorMessage: ''
      };
    },
    created() {
      this.errorMessage = this.$route.params.message + ' 抱歉，请联系管理员 ' || 'Unknown error';
    }
  };
  </script>