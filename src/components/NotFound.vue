<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
    export default {
        name: "NotFound",
        data() {
          return {
            msg: null,
          };
        },
        created() {
          this.msg = "404 Not Found"
      }
    }
</script>

<style scoped>

</style>
