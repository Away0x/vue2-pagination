<template>
  <div id="app">
    <News></News>
  </div>
</template>

<script>
import News from './components/News'

export default {
  name: 'app',
  components: {
    News
  }
}
</script>

<style>
li {list-style: none;}
#app {
  width: 500px;
  margin: 0 auto;
}
</style>
