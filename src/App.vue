<template>
  <v-app>
    <HeaderApp />
    <v-main>
      <router-view />
    </v-main>
    <FooterApp />
  </v-app>
</template>

<script lang="ts" setup>
import FooterApp from './components/FooterApp.vue';


</script>
