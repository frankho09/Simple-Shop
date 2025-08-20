<template>
  <div id="app">
    <v-app>
      <v-main>
        <ul class="navBar">
          <li><router-link class="nav" :to="{name:'home'}">Home</router-link></li>
          <li><router-link class="nav"  :to="{name:'product'}">Product</router-link></li>
          <li><div class="nav2" @click="showCart=true">
                <v-icon color="white" v-if="cartItemNum == 0">mdi-cart-outline</v-icon>
                <v-icon color="white" v-else>mdi-cart</v-icon>
                {{' Cart (' + cartItemNum + ')'}}
              </div></li>
        </ul>
        <router-view :good="good" @homeCart="homeCart"/>
        <v-dialog
          v-model="showCart"
          width="100%"
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              <p>Cart</p>
              <v-spacer />
              <v-icon large @click="showCart = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text v-if="Object.keys(this.cart).length !== 0">
              <v-row class="mx-2">
                <v-col cols="4">Product</v-col>
                <v-col cols="2">Price</v-col>
                <v-col cols="2">Qty</v-col>
                <v-col cols="2">Total</v-col>
              </v-row>
              <v-row class="mx-2" v-for="(value,index) in this.cart" :key="index">
                <v-col cols="4">{{ index }}</v-col>
                <v-col cols="2">{{ good[value[0]].price }}</v-col>
                <v-col cols="2">{{ value[1] }}</v-col>
                <v-col cols="2">{{ '$' + (good[value[0]].price * value[1]).toFixed(2) }}</v-col>
                <v-col cols="2"><v-btn small class="mt-n2" color="grey lighten-2" @click="removeItem(index, value)"><v-icon>mdi-close</v-icon></v-btn></v-col>
              </v-row>
              <v-row class="mx-2">
                <v-col cols="8 d-flex justify-end">Total Price:</v-col>
                <v-col cols="4">{{ '$' + (total).toFixed(2) }}</v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <h3 class="d-flex justify-center mt-2">Your Shopping Cart is empty</h3>
              <v-icon class="d-flex justify-center" x-large>mdi-cart-outline</v-icon>
            </v-card-text>
            <v-divider class="mt-2"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey lighten-2"
                @click="checkout"
              >
                Checkout
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
      </v-main>
  </v-app>
  </div>
</template>

<script>
import gooditems from './good.json'
export default {
  data: () => ({
    cart: {},
    showCart: false,
    cartItemNum: 0,
    total: 0,
    good: gooditems
  }),
  methods: {
    homeCart (cart) {
      for (const [key, index] of Object.entries(cart)) {
        if (isNaN(index[1])) {
          break
        }
        if (index[1] === '') {
          // pass
        } else {
          if (index[1] !== 0 && !Object.hasOwn(this.cart, key)) {
            this.cart[key] = index
            this.total += this.good[index[0]].price * index[1]
            this.cartItemNum += index[1]
            break
          }
          if (index[1] !== 0) {
            this.cart[key][1] += index[1]
            this.total += this.good[index[0]].price * index[1]
            this.cartItemNum += index[1]
          }
        }
      }
    },
    removeItem (index, value) {
      this.total -= this.good[value[0]].price * value[1]
      this.cartItemNum -= value[1]
      delete this.cart[index]
      this.showCart = false
      this.showCart = true
    },
    checkout () {
      this.cart = {}
      this.showCart = false
      this.cartItemNum = 0
    }
  }
}
</script>
<style scoped>
.v-dialog__container {
  display: unset;
}
</style>
