<template>
  <v-container class="payment-container" fluid>
    <v-row justify="center" class="fill-height">
      <v-col cols="12" md="8" lg="6">
        <!-- Empty Cart Message -->
        <div v-if="Object.keys(cart).length === 0" class="empty-cart-container">
          <v-card class="empty-cart-card text-center pa-8">
            <v-icon size="120" color="grey lighten-1" class="mb-4"
              >mdi-cart-outline</v-icon
            >
            <h2 class="text-h4 mb-4 grey--text text--darken-1">
              Your Cart is Empty
            </h2>
            <p class="text-body-1 mb-6 grey--text">
              Add some items to your cart before proceeding to checkout.
            </p>
            <v-btn
              color="primary"
              large
              @click="$router.push({ name: 'product' })"
              class="px-8"
            >
              Continue Shopping
            </v-btn>
          </v-card>
        </div>

        <!-- Payment Form -->
        <div v-else>
          <!-- Order Summary -->
          <v-card class="order-summary-card mb-6">
            <v-card-title class="text-h5 primary white--text">
              <v-icon left>mdi-receipt</v-icon>
              Order Summary
            </v-card-title>
            <v-card-text class="pa-6">
              <!-- Header Row -->
              <v-row class="header-row py-3 mb-3">
                <v-col cols="6" class="font-weight-bold text-subtitle-1"
                  >Product</v-col
                >
                <v-col
                  cols="2"
                  class="font-weight-bold text-subtitle-1 text-center"
                  >Price</v-col
                >
                <v-col
                  cols="2"
                  class="font-weight-bold text-subtitle-1 text-center"
                  >Qty</v-col
                >
                <v-col
                  cols="2"
                  class="font-weight-bold text-subtitle-1 text-center"
                  >Total</v-col
                >
              </v-row>
              <v-divider class="mb-4"></v-divider>

              <!-- Cart Items -->
              <div
                v-for="(value, index) in cart"
                :key="index"
                class="item-row py-4 mb-3"
              >
                <v-row align="center">
                  <v-col cols="6">
                    <div class="d-flex align-center">
                      <v-avatar size="48" class="mr-4 primary lighten-4">
                        <v-icon size="24" color="primary">{{
                          good[value[0]].src
                        }}</v-icon>
                      </v-avatar>
                      <div>
                        <span class="font-weight-medium text-subtitle-1">{{
                          index
                        }}</span>
                        <div class="text-caption text-grey-600">
                          {{ good[value[0]].name }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="2" class="text-center text-subtitle-1">
                    ${{ good[value[0]].price.toFixed(2) }}
                  </v-col>
                  <v-col cols="2" class="text-center">
                    <v-chip color="primary" small>{{ value[1] }}</v-chip>
                  </v-col>
                  <v-col
                    cols="2"
                    class="text-center font-weight-bold text-subtitle-1"
                  >
                    ${{ (good[value[0]].price * value[1]).toFixed(2) }}
                  </v-col>
                </v-row>
              </div>

              <v-divider class="my-6"></v-divider>

              <!-- Total Row -->
              <v-row class="total-row py-4">
                <v-col cols="8" class="text-right">
                  <span class="text-h5 font-weight-bold">Total Amount:</span>
                </v-col>
                <v-col cols="4" class="text-center">
                  <span class="text-h4 font-weight-bold primary--text">
                    ${{ totalPrice.toFixed(2) }}
                  </span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Payment Form -->
          <v-card class="payment-form-card">
            <!-- TEST APP DISCLAIMER -->
            <v-alert
              type="warning"
              prominent
              class="mb-0"
              border="left"
              colored-border
              elevation="2"
            >
              <v-icon slot="prepend" color="warning" large
                >mdi-alert-triangle</v-icon
              >
              <div class="text-h6 font-weight-bold mb-2">
                ⚠️ TEST APPLICATION - DO NOT USE REAL CREDIT CARDS
              </div>
              <div class="text-body-1">
                This is a <strong>demo/test application</strong> for development
                purposes only.
                <span class="font-weight-bold text-red--text"
                  >NEVER input real credit card information, personal data, or
                  sensitive financial details.</span
                >
              </div>
              <div class="text-caption mt-2">
                Use test data like: <code>1234 5678 9012 3456</code> for card
                number, <code>12/25</code> for expiry, <code>123</code> for CVV
              </div>
            </v-alert>

            <v-card-title class="text-h5 primary white--text">
              <v-icon left>mdi-credit-card</v-icon>
              Payment Information
            </v-card-title>
            <v-card-text class="pa-6">
              <v-form ref="paymentForm" v-model="formValid">
                <!-- Card Number Section -->
                <div class="mb-6">
                  <v-text-field
                    v-model="paymentForm.cardNumber"
                    label="Card Number (TEST DATA ONLY)"
                    placeholder="1234 5678 9012 3456"
                    outlined
                    :rules="[rules.required, rules.cardNumber]"
                    prepend-inner-icon="mdi-credit-card"
                    hint="Use test data only - never real credit card numbers"
                    persistent-hint
                    class="payment-field"
                    height="40"
                  ></v-text-field>
                </div>

                <!-- Expiry and CVV Section -->
                <v-row class="mb-6">
                  <v-col cols="12" md="6" class="pr-md-3">
                    <v-text-field
                      v-model="paymentForm.expiryDate"
                      label="Expiry Date (TEST DATA ONLY)"
                      placeholder="MM/YY"
                      outlined
                      :rules="[rules.required, rules.expiryDate]"
                      prepend-inner-icon="mdi-calendar"
                      hint="Use test data like 12/25"
                      persistent-hint
                      class="payment-field"
                      height="40"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="pl-md-3">
                    <v-text-field
                      v-model="paymentForm.cvv"
                      label="CVV (TEST DATA ONLY)"
                      placeholder="123"
                      outlined
                      :rules="[rules.required, rules.cvv]"
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      hint="Use test data like 123"
                      persistent-hint
                      class="payment-field"
                      height="40"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Cardholder Name Section -->
                <div class="mb-6">
                  <v-text-field
                    v-model="paymentForm.cardholderName"
                    label="Cardholder Name (TEST DATA ONLY)"
                    placeholder="John Doe"
                    outlined
                    :rules="[rules.required]"
                    prepend-inner-icon="mdi-account"
                    hint="Use fake names only"
                    persistent-hint
                    class="payment-field"
                    height="40"
                  ></v-text-field>
                </div>

                <!-- Email Section -->
                <div class="mb-6">
                  <v-text-field
                    v-model="paymentForm.email"
                    label="Email Address (TEST DATA ONLY)"
                    placeholder="john.doe@example.com"
                    outlined
                    :rules="[rules.required]"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    hint="Use fake email addresses only"
                    persistent-hint
                    class="payment-field"
                    height="40"
                  ></v-text-field>
                </div>
              </v-form>
            </v-card-text>

            <!-- Final Warning -->
            <div class="mr-4">
              <v-alert
                type="error"
                dense
                text
                class="text-center mb-2"
                max-width="300"
              >
                <strong>IT IS A TEST APP</strong>
              </v-alert>
            </div>

            <v-card-actions class="pa-6">
              <v-btn
                large
                outlined
                color="grey"
                @click="$router.push({ name: 'product' })"
                class="px-6"
              >
                Back to Shopping
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                large
                color="success"
                @click="processPayment"
                :loading="processing"
                :disabled="!formValid"
                class="px-8"
              >
                <v-icon left>mdi-lock</v-icon>
                Pay ${{ totalPrice.toFixed(2) }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    good: Array,
    cart: Object,
  },
  data() {
    return {
      paymentForm: {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        email: "",
      },
      formValid: false,
      processing: false,
      rules: {
        required: (v) => !!v || "This field is required",
        cardNumber: (v) =>
          /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(v) ||
          "Please enter a valid card number",
        expiryDate: (v) =>
          /^\d{2}\/\d{2}$/.test(v) || "Please enter expiry date as MM/YY",
        cvv: (v) => /^\d{3,4}$/.test(v) || "Please enter a valid CVV",
        email: (v) =>
          /.+@.+\..+/.test(v) || "Please enter a valid email address",
      },
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (const [, value] of Object.entries(this.cart)) {
        total += this.good[value[0]].price * value[1];
      }
      return total;
    },
  },
  methods: {
    processPayment() {
      if (this.$refs.paymentForm.validate()) {
        this.processing = true;

        // Simulate payment processing
        setTimeout(() => {
          this.processing = false;

          // Emit event to clear cart instead of directly modifying parent
          this.$emit("paymentSuccess", this.cart);

          // Redirect to home page
          this.$router.push({ name: "home" });
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.payment-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

.empty-cart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.empty-cart-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.order-summary-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.payment-form-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header-row {
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.item-row {
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 8px;
}

.item-row:hover {
  background-color: #f8f9fa;
  transform: translateX(4px);
}

.item-row:last-child {
  border-bottom: none;
}

.total-row {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  border: 2px solid #dee2e6;
}

.v-text-field {
  margin-bottom: 0.5rem;
}

/* Payment Form Enhancements */
.payment-field {
  transition: all 0.3s ease;
}

.payment-field:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.payment-field .v-input__slot {
  border-radius: 12px;
}

.payment-field .v-label {
  font-weight: 500;
  color: #424242;
}

.payment-field .v-messages {
  margin-top: 8px;
}

.payment-field .v-hint {
  color: #666;
  font-size: 0.875rem;
}

/* Responsive spacing for mobile */
@media (max-width: 768px) {
  .payment-field {
    margin-bottom: 1rem;
  }

  .mb-6 {
    margin-bottom: 1.5rem !important;
  }
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
}

.v-card-title {
  border-radius: 16px 16px 0 0;
}

.v-card-title .v-icon {
  margin-right: 8px;
}

.text-center {
  margin: 0 auto;
}
</style>
