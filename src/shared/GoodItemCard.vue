<template>
  <v-col
    :cols="
      $vuetify.breakpoint.mdAndDown || isProductPage || isLuckyItem ? 12 : 6
    "
  >
    <v-row>
      <v-col
        :cols="isLuckyItem ? 12 : 6"
        class="d-flex justify-center flex-column"
      >
        <!-- First element in a nested v-col -->
        <div class="white--text boldText text-center">
          {{ item.name }}
        </div>
        <v-icon size="150">{{ item.src }}</v-icon>
      </v-col>
      <v-col
        :cols="isLuckyItem ? 12 : 6"
        class="d-flex justify-center flex-column"
      >
        <!-- Second element in a nested v-col -->
        <p class="white--text boldText">Price:$ {{ item.price.toFixed(2) }}</p>
        <v-text-field
          label="Quantity"
          class="labelStyle text-center"
          dark
          :value="value"
          @input="$emit('input', $event)"
        ></v-text-field>
        <v-btn large color="error" @click="clickFunction"> ADD TO CART </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    item: Object,
    value: String,
    isProductPage: {
      type: Boolean,
      default: false,
    },
    isLuckyItem: {
      type: Boolean,
      default: false,
    },
    clickFunction: Function,
  },
};
</script>

<style scoped>
.boldText {
  font-weight: bold;
  font-size: 20px;
}
</style>
