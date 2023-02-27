export const ShopifyApiHelper = {
  getStore: async function (authFetch) {
    // const authFetch = useAuthenticatedFetch();
    const shopResponse = await authFetch("/api/shop");
    const stores = await shopResponse.json();
    return stores[0];
  },
  getAllProducts: async function (authFetch, storeId) {
    const productResponse = await authFetch("/api/products");
    const products = await productResponse.json();
    return products;
  },
  getAllProducts: async function (authFetch) {
    const productResponse = await authFetch("/api/products");
    const products = await productResponse.json();
    return products;
  },
  getProductsCount: async function (authFetch) {
    const countResponse = await authFetch("/api/products/count");
    const countResponseJson = await countResponse.json();
    return countResponseJson.count;
  },
};
