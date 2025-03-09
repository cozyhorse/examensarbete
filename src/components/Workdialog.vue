<template>
  <div>
    <v-card height="auto" width="600" color="grey-lighten-1">
      <v-row>
        <v-col>
          <v-card-title class="d-flex ma-4">
            Title - {{ title }}
          </v-card-title>
          <v-divider class="ma-4" />
          <v-card-item class="ml-4" >Year: {{ year }}</v-card-item>
          <v-divider class="ma-4"/>
          <v-card-item class="d-flex ml-4 mt-5">
            <p>{{ description }}</p>
          </v-card-item>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">


const year: string = "year";
const title: string = "Diskare till Köksansvarig, Restaurang Icha Icha"
const description: string = "Jag arbetade som köksansvarig på en lunchrestaurang i Stockholm, där vi dagligen tog emot 400-500 gäster under lunchtid. I denna roll var jag ansvarig för den dagliga driften av köket. Det innebar att jag såg till att allt var förberett inför dagens arbete, inklusive att kontrollera lager, hantera beställningar och säkerställa att köksutrustningen var i gott skick. Jag hade även ansvar för att hålla köket rent och ordnat, och att alla hygienkrav efterlevdes noggrant.\n\nFör att säkerställa en effektiv arbetsdag fördelade jag arbetsuppgifter bland kökspersonalen och såg till att arbetsflödet fungerade smidigt under hela lunchtidens hektiska period."

</script>

<style scoped></style>
