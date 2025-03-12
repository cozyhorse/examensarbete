<template>
  <div>
    <v-btn @click="onClick">
      Start
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';


const onClick = ()=>{
  router.push('/game')
}

</script>

<style scoped>

</style>
