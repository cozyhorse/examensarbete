<template>
  <v-card class="main-card" elevation="5">
    <v-container class="customContainer d-flex justify-center align-center" fluid>
        <v-row justify="center" no-gutters>
            <v-btn class="custom-btn" width="300" height="55" @click="onClick"></v-btn>
        </v-row>
    </v-container>

  </v-card>
</template>

<script lang="ts" setup>
import router from '@/router';

const onClick = () => {
  router.push('/game')
}
</script>

<style scoped lang="scss">
.customContainer {
  height: 86vh;
  width: 100%;
  background-image: url("/src/assets/map/Level_0/_composite.png");
  background-position: center center;
  background-size: 4000px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}



.main-card {
  width: 100%;
  height: 86vh;
  max-width: 1650px;
  max-height: 900px;
  aspect-ratio: 16 / 9;
  margin: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    max-width: 900px; // Shrinks more for smaller laptops
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
}

.custom-btn{
  background: none;
  background-image: url("/src/assets/start.gif");
  background-position: center center;
  background-size: 190px;
  background-repeat: no-repeat;

}

::v-deep(.v-btn--variant-elevated){
  box-shadow: none !important;
}

</style>
