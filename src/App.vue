<template>
  <v-app>
    <HeaderApp />
    <v-main class="main">
      <router-view />
    </v-main>
    <FooterApp />
  </v-app>
</template>

<script lang="ts" setup>
import FooterApp from './components/FooterApp.vue';


</script>
<style scoped lang="scss">
.main{
 background-color: #BDBDBD;
}
</style>
