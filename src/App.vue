<template>
  <div id="app">
    <v-app>
      <v-main>
        <ul class="navBar">
          <div class="nav-left">
            <li>
              <router-link class="nav" :to="{ name: 'home' }">Home</router-link>
            </li>
            <li>
              <router-link class="nav" :to="{ name: 'product' }"
                >Product</router-link
              >
            </li>
            <li>
              <router-link class="nav" :to="{ name: 'payment' }"
                >Payment</router-link
              >
            </li>
          </div>
          <div class="nav-right">
            <li>
              <div class="nav2 hidden-sm-and-down" @click="showCart = true">
                <v-icon color="white" v-if="cartItemNum == 0"
                  >mdi-cart-outline</v-icon
                >
                <v-icon color="white" v-else>mdi-cart</v-icon>
                {{ " Cart (" + cartItemNum + ")" }}
              </div>
              <div class="nav2 d-md-none" @click="showCart = true">
                <v-icon color="white" v-if="cartItemNum == 0"
                  >mdi-cart-outline</v-icon
                >
                <v-icon color="white" v-else>mdi-cart</v-icon>
              </div>
            </li>
          </div>
        </ul>
        <router-view
          :good="good"
          :cart="cart"
          @homeCart="homeCart"
          @paymentSuccess="handlePaymentSuccess"
        />
        <v-dialog v-model="showCart" width="100%">
          <v-card class="d-none d-sm-block">
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
              <v-row
                class="mx-2"
                v-for="(value, index) in this.cart"
                :key="index"
              >
                <v-col cols="4">{{ index }}</v-col>
                <v-col cols="2">{{ good[value[0]].price }}</v-col>
                <v-col cols="2">{{ value[1] }}</v-col>
                <v-col cols="2">{{
                  "$" + (good[value[0]].price * value[1]).toFixed(2)
                }}</v-col>
                <v-col cols="2"
                  ><v-btn
                    small
                    class="mt-n2"
                    color="grey lighten-2"
                    @click="removeItem(index, value)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  ></v-col
                >
              </v-row>
              <v-row class="mx-2">
                <v-col cols="8 d-flex justify-end">Total Price:</v-col>
                <v-col cols="4">{{ "$" + total.toFixed(2) }}</v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <h3 class="d-flex justify-center mt-2">
                Your Shopping Cart is empty
              </h3>
              <v-icon class="d-flex justify-center" x-large
                >mdi-cart-outline</v-icon
              >
            </v-card-text>
            <v-divider class="mt-2"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey lighten-2"
                @click="showCart = false"
                class="mr-2"
              >
                Continue Shopping
              </v-btn>
              <v-btn color="primary" @click="goToPayment">
                Proceed to Payment
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="d-sm-none">
            <v-card-title class="text-h5 grey lighten-2">
              <p>Cart</p>
              <v-spacer />
              <v-icon large @click="showCart = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text v-if="Object.keys(this.cart).length !== 0">
              <v-row>
                <v-col cols="3" class="pa-2"
                  ><p class="text-caption">Product</p></v-col
                >
                <v-col cols="2" class="pa-2"
                  ><p class="text-caption">Price</p></v-col
                >
                <v-col cols="2" class="pa-2"
                  ><p class="text-caption">Qty</p></v-col
                >
                <v-col cols="3" class="pa-2"
                  ><p class="text-caption">Total</p></v-col
                >
              </v-row>
              <v-row
                class="mx-2"
                v-for="(value, index) in this.cart"
                :key="index"
              >
                <v-col cols="3" class="pa-2"
                  ><p class="text-caption">{{ index }}</p></v-col
                >
                <v-col cols="2" class="pa-2"
                  ><p class="text-caption">{{ good[value[0]].price }}</p></v-col
                >
                <v-col cols="2" class="pa-2"
                  ><p class="text-caption">{{ value[1] }}</p></v-col
                >
                <v-col cols="3" class="pa-2"
                  ><p class="text-caption">
                    {{ "$" + (good[value[0]].price * value[1]).toFixed(2) }}
                  </p></v-col
                >
                <v-col cols="2"
                  ><v-btn
                    small
                    class="mt-n2"
                    color="grey lighten-2"
                    @click="removeItem(index, value)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  ></v-col
                >
              </v-row>
              <v-row class="mx-2">
                <v-col cols="8 d-flex justify-end">Total Price:</v-col>
                <v-col cols="4">{{ "$" + total.toFixed(2) }}</v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <h3 class="d-flex justify-center mt-2">
                Your Shopping Cart is empty
              </h3>
              <v-icon class="d-flex justify-center" x-large
                >mdi-cart-outline</v-icon
              >
            </v-card-text>
            <v-divider class="mt-2"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey lighten-2"
                @click="showCart = false"
                x-small
                class="mr-2"
              >
                Continue Shopping
              </v-btn>
              <v-btn color="primary" x-small @click="goToPayment">
                Proceed to Payment
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import gooditems from "./good.json";
export default {
  data: () => ({
    cart: {},
    showCart: false,
    cartItemNum: 0,
    total: 0,
    good: gooditems,
  }),
  methods: {
    homeCart(cart) {
      for (const [key, index] of Object.entries(cart)) {
        if (isNaN(index[1])) {
          break;
        }
        if (index[1] === "") {
          // pass
        } else {
          if (index[1] !== 0 && !Object.hasOwn(this.cart, key)) {
            this.cart[key] = index;
            this.total += this.good[index[0]].price * index[1];
            this.cartItemNum += index[1];
            break;
          }
          if (index[1] !== 0) {
            this.cart[key][1] += index[1];
            this.total += this.good[index[0]].price * index[1];
            this.cartItemNum += index[1];
          }
        }
      }
    },
    removeItem(index, value) {
      this.total -= this.good[value[0]].price * value[1];
      this.cartItemNum -= value[1];
      delete this.cart[index];
      this.showCart = this.cartItemNum > 0;
    },
    checkout() {
      this.cart = {};
      this.showCart = false;
      this.cartItemNum = 0;
    },
    goToPayment() {
      this.showCart = false;
      this.$router.push({ name: "payment" });
    },
    handlePaymentSuccess() {
      this.checkout();
    },
  },
};
</script>

<style scoped>
.v-dialog__container {
  display: unset;
}

.navBar {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}

.navBar li {
  float: left;
  list-style: none;
}

.navBar .nav {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.navBar .nav:hover {
  background-color: #555;
  color: #fff;
  text-decoration: none;
}

.navBar .nav2 {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.navBar .nav2:hover {
  background-color: #555;
}

.navBar .nav2 .v-icon {
  margin-right: 8px;
}
</style>
