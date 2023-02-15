<template>
  <v-container class="mainTheme fill-height" fluid>
    <v-row class="mainTheme fill-height">
      <v-col v-for="(item, i) in good"
            :key="i"
            cols="12"
            md="6">
        <v-card>
          <v-container>
                    <v-row class="cardTheme rounded">
                      <v-col cols="6">
                        <div class="white--text boldText ml-5">{{item.name}}</div>
                        <v-icon size="200">{{ item.src }}</v-icon>
                      </v-col>
                      <v-col cols="6" class="mt-12">
                        <p class="white--text boldText">Price:$ {{(item.price).toFixed(2)}}</p>
                        <v-text-field label="Quantity" class="labelStyle" dark v-model="quantity[item.name]"></v-text-field>
                        <v-btn large color="error" @click="addToCart(i, item)">ADD TO CART</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    good: Array
  },
  data: () => ({
    // quantity: ['', '', '', '', '', ''],
    quantity: {
      Pen: '',
      Pineapple: '',
      Apple: '',
      Lie: '',
      'Magic Bean': '',
      'Lucky Clover': ''
    },
    cart: {
      Pen: [0, 0],
      Pineapple: [1, 0],
      Apple: [2, 0],
      Lie: [3, 0],
      'Magic Bean': [4, 0],
      'Lucky Clover': [5, 0]
    }
  }),
  methods: {
    addToCart (index, item) {
      this.cart[this.good[index].name] = [index, parseInt(this.quantity[item.name])]
      this.$emit('homeCart', this.cart)
      this.quantity[item.name] = ''
      this.cart[this.good[index].name] = [index, 0]
    }
  }
}
</script>

<style scoped>
.mainTheme{
  background-color: rgb(80, 75, 75);
}
.cardTheme{
  background-color: #FFA726;
}
.fullWidth{
  width: 100%;
}
.boldText{
  font-weight: bold;
  font-size: 20px;
}
.labelStyle{
  font-weight: bold !important;
}
</style>
