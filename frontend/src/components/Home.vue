<template> 
  <div>
    <Nav />
    <Recommend />
      <router-view></router-view>
  </div>
      
</template>

<script>
import Nav from './Nav.vue';
import Recommend from './Recommend.vue';
export default {
  components: {
    Recommend,
    Nav
  }
}
  
</script>

