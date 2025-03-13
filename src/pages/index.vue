<template>
  <v-card class="main-card" width="1300" height="700" elevation="5">
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
.customContainer{
  height:700px ;
  background-image: url("/src/assets/map/Level_0/_composite.png");
  background-position: center center;
  overflow: hidden;
}
.main-card{
margin: auto;
}
.custom-btn{
  background: none;
  background-image: url("/src/assets/start.gif");
  background-position: center center;
  background-size: 190px;
  background-repeat: no-repeat;

}

::v-deep(.v-btn--variant-elevated){
  box-shadow: none;
}

</style>
