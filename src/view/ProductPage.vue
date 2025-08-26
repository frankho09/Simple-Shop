<template>
  <v-container class="mainTheme fill-height" fluid>
    <v-row class="mainTheme fill-height">
      <v-col v-for="(item, i) in good" :key="i" cols="12" md="6">
        <v-card>
          <v-container>
            <v-row class="cardTheme rounded">
              <GoodItemCard
                :item="item"
                v-model="quantity[item.name]"
                isProductPage
                :clickFunction="() => addToCart(i, item)"
              />
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GoodItemCard from "../shared/GoodItemCard.vue";
export default {
  components: {
    GoodItemCard,
  },
  props: {
    good: Array,
  },
  data: () => ({
    quantity: {
      Pen: "",
      Pineapple: "",
      Apple: "",
      Lie: "",
      "Magic Bean": "",
      "Lucky Clover": "",
    },
    cart: {
      Pen: [0, 0],
      Pineapple: [1, 0],
      Apple: [2, 0],
      Lie: [3, 0],
      "Magic Bean": [4, 0],
      "Lucky Clover": [5, 0],
    },
  }),
  methods: {
    addToCart(index, item) {
      this.cart[this.good[index].name] = [
        index,
        parseInt(this.quantity[item.name]),
      ];
      this.$emit("homeCart", this.cart);
      this.quantity[item.name] = "";
      this.cart[this.good[index].name] = [index, 0];
    },
  },
};
</script>

<style scoped>
.mainTheme {
  background-color: rgb(80, 75, 75);
}
.cardTheme {
  background-color: #ffa726;
  height: 100%;
}
.fullWidth {
  width: 100%;
}
.boldText {
  font-weight: bold;
  font-size: 20px;
}
.labelStyle {
  font-weight: bold !important;
}

.not-for-sale-text {
  color: #d32f2f; /* sharp red */
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 10px;
  border: 2px solid #d32f2f;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(211, 47, 47, 0.15);
  padding: 6px 12px;
}
</style>
