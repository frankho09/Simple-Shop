<template>
  <v-container class="mainTheme fill-height" fluid>
    <v-card class="mainTheme fill-height">
      <v-img class="rounded-lg" height="300px" src="../assets/cover.png"/>
      <v-row class="pt-4">
        <v-col cols="3">
          <v-card class="fullWidth cardTheme" height="100%" v-if="!showBox">
              <v-card-title class="justify-center white--text">Today's Lucky Item</v-card-title>
              <v-card-actions class="justify-center mt-12">
                <v-btn  @click="luckyBtn" v-if="!showBox" x-large>CLICK ME!</v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-else>
              <v-card-title class="justify-center white--text cardTheme">Lucky Item</v-card-title>
              <v-container>
                <v-row class="cardTheme">
                  <v-col cols="6">
                    <div class="white--text boldText ml-5">{{good[random].name}}</div>
                    <v-icon size="150">{{ good[random].src }}</v-icon>
                  </v-col>
                  <v-col cols="6">
                    <p class="white--text boldText">Price:$ {{(good[random].price).toFixed(2)}}</p>
                    <v-text-field label="Quantity" class="labelStyle" dark v-model="quantity.random"></v-text-field>
                    <v-btn large color="error" @click="clickRandom">ADD TO CART</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
        </v-col>
        <v-col cols="9">
            <v-card>
              <v-card-title class="justify-center white--text boldText cardTheme">Recommend Goods</v-card-title>
              <v-container>
                <v-row class="cardTheme">
                  <v-col cols="2">
                    <div class="white--text boldText ml-5">{{good[0].name}}</div>
                    <v-icon size="150">{{ good[0].src }}</v-icon>
                  </v-col>
                  <v-col cols="2">
                    <p class="white--text boldText">Price:$ {{(good[0].price).toFixed(2)}}</p>
                    <v-text-field label="Quantity" class="labelStyle" dark v-model="quantity.goodOne"></v-text-field>
                    <v-btn large color="error" @click="clickOne">ADD TO CART</v-btn>
                  </v-col>
                  <v-col cols="2">
                    <div class="white--text boldText ml-5">{{good[1].name}}</div>
                    <v-icon size="150">{{ good[1].src }}</v-icon>
                  </v-col>
                  <v-col cols="2">
                    <p class="white--text boldText">Price:$ {{(good[1].price).toFixed(2)}}</p>
                    <v-text-field label="Quantity" class="labelStyle" dark v-model="quantity.goodTwo"></v-text-field>
                    <v-btn large color="error" @click="clickTwo">ADD TO CART</v-btn>
                  </v-col>                  <v-col cols="2">
                    <div class="white--text boldText ml-5">{{good[2].name}}</div>
                    <v-icon size="150">{{ good[2].src }}</v-icon>
                  </v-col>
                  <v-col cols="2">
                    <p class="white--text boldText">Price:$ {{(good[2].price).toFixed(2)}}</p>
                    <v-text-field label="Quantity" class="labelStyle" dark v-model="quantity.goodThree"></v-text-field>
                    <v-btn large color="error" @click="clickThree">ADD TO CART</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    good: Array
  },
  data: () => ({
    showBox: false,
    random: 0,
    quantity: {
      random: '',
      goodOne: '',
      goodTwo: '',
      goodThree: ''
    },
    cart: {
      Pen: [0, 0],
      Pineapple: [1, 0],
      Apple: [2, 0]
    }
  }),
  methods: {
    luckyBtn () {
      this.showBox = true
      this.random = 3 + Math.floor(Math.random() * (this.good.length - 3))
      this.cart[this.good[this.random].name] = [this.random, 0]
    },
    clickRandom () {
      this.cart[this.good[this.random].name] = [this.random, parseInt(this.quantity.random)]
      this.$emit('homeCart', this.cart)
      this.quantity.random = ''
      this.cart[this.good[this.random].name] = [this.random, 0]
    },
    clickOne () {
      this.cart.Pen = [0, parseInt(this.quantity.goodOne)]
      this.$emit('homeCart', this.cart)
      this.quantity.goodOne = ''
      this.cart.Pen = [0, 0]
    },
    clickTwo () {
      this.cart.Pineapple = [1, parseInt(this.quantity.goodTwo)]
      this.$emit('homeCart', this.cart)
      this.quantity.goodTwo = ''
      this.cart.Pineapple = [1, 0]
    },
    clickThree () {
      this.cart.Apple = [2, parseInt(this.quantity.goodThree)]
      this.$emit('homeCart', this.cart)
      this.quantity.goodThree = ''
      this.cart.Apple = [2, 0]
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
