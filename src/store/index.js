import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    products: [],
  },
  mutations: {
    loadProducts(state, products) {
      console.log(products);
      state.products = products;
    },
  },
  actions: {
    loadProducts({ commit }) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          console.log("Dados recebidos da API:", response.data); // Para debug
          commit("loadProducts", response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar produtos:", error); // Mostra o erro no console
        });
    },
  },

  modules: {},
});
