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
      axios
        .get("https://fakestoreapi.in/api/products")
        .then((response) => {
          console.log(response.data); // Para verificar a estrutura da resposta
          if (response.data && response.data.products) {
            commit("loadProducts", response.data.products); // Ajuste para usar 'products'
          } else {
            console.error("Produtos não encontrados.");
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar os produtos:", error);
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
