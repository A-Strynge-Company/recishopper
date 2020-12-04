import axios from 'axios';

export default {
  created() {
    console.log('useless');
  },
  methods: {
    getOneProduct(productId: string): Promise<unknown> {
      return axios.get(`https://world.openfoodfacts.org/api/v0/product/${productId}.json`);
    },
    getProducts(productIds: Array<string>): Promise<unknown[]> {
      const promises = productIds.map((pId) => this.getOneProduct(pId));
      return Promise.all(promises);
    },
    getMissingsProducts(
      currentProducts: { code: string }[],
      productsIds: Array<string>,
    ): Promise<unknown[]> {
      const currentsIds = currentProducts.map((p: { code: string }) => p.code);
      const missingIds = productsIds.filter((p: string) => !currentsIds.includes(p));
      return this.getProducts(missingIds);
    },
  },
};
