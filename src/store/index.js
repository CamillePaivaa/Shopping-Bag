import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    products: [],
    productInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      console.log(products);
      state.products = products;
    },
    addProductToBag(state, product) {
      state.productInBag.push(product);
    },
    removeProductFromBag(state, productId) {
      var updatedBag = state.productInBag.filter(
        (item) => item.id != productId
      );
      state.productInBag = updatedBag;
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        commit("loadProducts", response.data);
      });
    },
    addProductToBag({ commit }, product) {
      product.quantity = 1;
      commit("addProductToBag", product);
    },
    removeProductFromBag({ commit }, productId) {
      if (confirm("Are you sure you want to remove the item?")) {
        commit("removeProductFromBag", productId);
      }
    },
  },

  modules: {},
});
