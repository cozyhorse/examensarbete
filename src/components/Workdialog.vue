<template>
  <div>
    <v-card
      class="custom-card pa-2"
      height="auto"
      width="600"
      color="grey-darken-1"
    >
      <v-row>
        <v-col>
          <v-card-title class="d-flex ma-2 text-h6">
            Work - {{ work }}
          </v-card-title>
          <v-divider class="ma-2" />
          <v-card-item class="ml-2 text-subtitle-1">
            Title: {{ title }}
          </v-card-item>
          <v-divider class="ma-2" />
          <v-card-item class="ml-2 text-subtitle-1">
            Year: {{ year }}
          </v-card-item>
          <v-divider class="ma-2 " />
          <v-card-item class="d-flex ml-2 mb-2 text-body-1">
            <p>{{ description }}</p>
          </v-card-item>
          <v-divider class="ma-2" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>


<script setup lang="ts">
defineProps<{
  work?: string;
  title?: string;
  year?: string;
  description?: string;
}>()

</script>

<style scoped>
.custom-card{
  opacity: 0.9;

  @media (max-width: 1350px) {
    max-width: 80%;
    padding: 10px;
    scale: 0.75;
  }

  @media (max-width: 600px) {
    max-width: 90%;
    scale: 0.6;
    padding: 8px;
  }

}

</style>
