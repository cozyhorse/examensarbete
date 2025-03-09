<template>
  <v-app>
      <v-col cols="1" align-self="center">Hello</v-col>
      <v-main>
        <router-view />
      </v-main>
      <v-col cols="1" align-self="center">Footer</v-col>
      <Workdialog></Workdialog>
  </v-app>
</template>

<script lang="ts" setup>
import Workdialog from './components/Workdialog.vue';

  //
</script>
