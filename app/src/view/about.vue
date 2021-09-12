<template>
  <div>
    <div>关于</div>
    <div>counter:{{ $store.state.counter }}</div>
  </div>
</template>

<script>
export default {
  mounted() {
    setInterval(()=>{
       this.$store.commit('add')
    },1000)
  },
};
</script>

<style>
</style>