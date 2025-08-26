<template>
  <v-container class="mainTheme fill-height" fluid>
    <v-card class="mainTheme fill-height">
      <v-img
        class="rounded-lg"
        :height="imageHeight"
        src="../assets/cover.png"
      />
      <v-row class="pt-4 ml-1 mr-1 hidden-sm-and-down">
        <v-col cols="3">
          <v-card class="fullWidth cardTheme" height="270px" v-if="!showBox">
            <v-card-title class="justify-center white--text"
              >Try Your Luck</v-card-title
            >
            <v-card-actions class="justify-center mt-12">
              <v-btn
                @click="luckyBtn"
                v-if="!showBox && !showFirework"
                x-large
                class="GreenColor"
                >CLICK ME!</v-btn
              >
              <div v-if="showFirework" class="firework-animation"></div>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title class="justify-center white--text cardTheme"
              >Lucky Item</v-card-title
            >
            <v-container>
              <v-row class="cardTheme luckyCardColumnTheme">
                <GoodItemCard
                  :item="good[random]"
                  v-model="quantity.random"
                  :clickFunction="clickRandom"
                  isLuckyItem
                />
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card class="fullWidth cardTheme sideTheme" height="270px">
            <v-card-title class="justify-center white--text boldText cardTheme"
              >Recommend Goods</v-card-title
            >
            <v-container>
              <v-row class="cardColumnTheme">
                <GoodItemCard
                  :item="good[0]"
                  v-model="quantity.goodOne"
                  :clickFunction="clickOne"
                />
                <GoodItemCard
                  :item="good[1]"
                  v-model="quantity.goodTwo"
                  :clickFunction="clickTwo"
                />
                <GoodItemCard
                  :item="good[2]"
                  v-model="quantity.goodThree"
                  :clickFunction="clickThree"
                />
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="pt-4 ml-1 mr-1 d-md-none">
        <v-col cols="12">
          <v-card class="fullWidth cardTheme" height="270px" v-if="!showBox">
            <v-card-title class="justify-center white--text"
              >Try Your Luck</v-card-title
            >
            <v-card-actions class="justify-center mt-12">
              <v-btn
                @click="luckyBtn"
                v-if="!showBox && !showFirework"
                x-large
                class="GreenColor"
                >CLICK ME!</v-btn
              >
              <div v-if="showFirework" class="firework-animation"></div>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title class="justify-center white--text cardTheme"
              >Lucky Item</v-card-title
            >
            <v-container>
              <v-row class="cardTheme luckyCardColumnTheme">
                <GoodItemCard
                  :item="good[random]"
                  v-model="quantity.random"
                  :clickFunction="clickRandom"
                  isLuckyItem
                />
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="fullWidth cardTheme pb-5" v-if="!showBox">
            <v-card-title class="justify-center white--text"
              >Pandora's Box</v-card-title
            >
            <v-card-actions class="justify-center">
              <v-btn @click="pandoraBtn" class="customDisabled" x-large
                >DO NOT CLICK!</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="fullWidth cardTheme sideTheme" height="270px">
            <v-card-title class="justify-center white--text boldText cardTheme"
              >Recommend Goods</v-card-title
            >
            <v-container>
              <v-row class="cardColumnTheme">
                <GoodItemCard
                  :item="good[0]"
                  v-model="quantity.goodOne"
                  :clickFunction="clickOne"
                />
                <GoodItemCard
                  :item="good[1]"
                  v-model="quantity.goodTwo"
                  :clickFunction="clickTwo"
                />
                <GoodItemCard
                  :item="good[2]"
                  v-model="quantity.goodThree"
                  :clickFunction="clickThree"
                />
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
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
    showBox: false,
    showFirework: false,
    random: 0,
    quantity: {
      random: "",
      goodOne: "",
      goodTwo: "",
      goodThree: "",
    },
    cart: {
      Pen: [0, 0],
      Pineapple: [1, 0],
      Apple: [2, 0],
    },
  }),
  methods: {
    luckyBtn() {
      this.showFirework = true;
      setTimeout(() => {
        this.showFirework = false;
        this.showBox = true;
        this.random = 3 + Math.floor(Math.random() * (this.good.length - 3));
        this.cart[this.good[this.random].name] = [this.random, 0];
      }, 1500);
    },
    pandoraBtn() {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_target"); // Nostalgia trick
    },
    clickRandom() {
      this.cart[this.good[this.random].name] = [
        this.random,
        parseInt(this.quantity.random),
      ];
      this.$emit("homeCart", this.cart);
      this.quantity.random = "";
      this.cart[this.good[this.random].name] = [this.random, 0];
    },
    clickOne() {
      this.cart.Pen = [0, parseInt(this.quantity.goodOne)];
      this.$emit("homeCart", this.cart);
      this.quantity.goodOne = "";
      this.cart.Pen = [0, 0];
    },
    clickTwo() {
      this.cart.Pineapple = [1, parseInt(this.quantity.goodTwo)];
      this.$emit("homeCart", this.cart);
      this.quantity.goodTwo = "";
      this.cart.Pineapple = [1, 0];
    },
    clickThree() {
      this.cart.Apple = [2, parseInt(this.quantity.goodThree)];
      this.$emit("homeCart", this.cart);
      this.quantity.goodThree = "";
      this.cart.Apple = [2, 0];
    },
  },
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "90px";
        case "sm":
          return "150px";
        case "md":
          return "200px";
        default:
          return "300px"; // Default height
      }
    },
  },
};
</script>

<style scoped>
.customDisabled {
  background-color: rgba(0, 0, 0, 0.12) !important;
  cursor: not-allowed;
}
.container {
  max-width: 100%;
}
.v-container.mainTheme,
.v-card.mainTheme {
  max-height: 200vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
}

.v-card.sideTheme {
  max-height: 200vh;
  overflow-y: overflow;
}

.v-container.mainTheme::-webkit-scrollbar,
.v-card.mainTheme::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.GreenColor {
  background-color: #4caf50 !important;
  color: white !important;
}
.mainTheme {
  background-color: rgb(80, 75, 75);
}
.cardTheme {
  background-color: #ffa726;
}
.cardColumnTheme {
  border-radius: 0px 0px 4px 4px;
  margin-bottom: 10px;
  background-color: #ffa726;
}
.luckyCardColumnTheme {
  border-radius: 0px 0px 4px 4px;
  background-color: #ffa726;
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

.firework-animation {
  width: 12vw;
  height: 12vw;
  margin: -40px auto 0;
  background: url("@/assets/firework.gif") top no-repeat;
  background-size: contain;
}

.lucky-transition-enter-active,
.lucky-transition-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.lucky-transition-enter-from,
.lucky-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
