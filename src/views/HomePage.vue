<template>
  <div class="home">
    <div class="products">
      <div
        class="product"
        :class="{ inBag: isInBag(product) }"
        v-for="(product, index) in this.products"
        :key="index"
      >
        <div class="product-image">
          <img :src="product.image" />
        </div>

        <h4>{{ product.title }}</h4>

        <p class="price">
          US${{
            product.price && !isNaN(product.price)
              ? product.price.toFixed(2)
              : "0.00"
          }}
        </p>

        <button v-if="!isInBag(product)" @click="addProductInBag(product)">
          Add to bag
        </button>
        <button v-else @click="removeProductFromBag(product)" class="remove">
          Remove from bag
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("loadProducts"); // Carrega os produtos ao criar o componente
  },
  computed: mapState(["products", "productInBag"]),

  methods: {
    addProductInBag(product) {
      this.$store.dispatch("addProductToBag", product); // Adiciona o produto na sacola
    },
    isInBag(product) {
      return this.productInBag.find((item) => item.id == product.id);
    },
    removeProductFromBag(product) {
      this.$store.dispatch("removeProductFromBag", product.id); // Remove o produto da sacola
    },
  },
};
</script>

<style lang="scss">
.home {
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .product {
      flex: 0 0 30%;
      box-sizing: border-box;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      padding: 16px;
      margin: 8px;
      height: 380px;
      display: flex;
      flex-direction: column;

      @media only screen and (max-width: 769px) {
        flex: 0 0 40%;
        height: auto;
      }

      @media only screen and (max-width: 640px) {
        flex: 0 0 90%;
      }

      &.inBag {
        border: 1px solid #007bff;
      }

      .product-image {
        margin: 10px auto;
        img {
          max-width: 160px;
          max-height: 130px;
        }
      }

      h4 {
        margin: 16px auto;
        font-size: 14px;
        max-width: 90%;
        font-weight: normal;
        text-align: center;
      }

      p.price {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
        text-align: center;
      }

      button {
        color: #fff;
        background-color: #007bff;
        border: 1px solid #007bff;
        border-radius: 100px;
        font-weight: 400;
        text-align: center;
        padding: 8px 16px;
        cursor: pointer;
        margin-top: auto;

        &:hover {
          opacity: 0.8;
        }

        &.remove {
          background-color: transparent;
          border: none;
          color: black;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
