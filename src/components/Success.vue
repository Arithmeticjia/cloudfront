<template>
  <div>
    <h1>Welcome!{{msg}}</h1>
  </div>
</template>

<script>
    export default {
        name: "Success",
        data() {
          return {
            msg: this.$route.query.data
          };
        },
    }
</script>

<style scoped>

</style>
