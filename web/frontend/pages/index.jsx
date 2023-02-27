import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Page, Layout, Stack, Banner } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

import { useAuthenticatedFetch } from "../hooks";
import ProductStats from "../components/ProductStats";
import { BackendApiHelper } from "../../middleware/backendapihelper";
import { TagsProvider } from "../components/TagsContext";
import { SingleProductCard } from "../components/ui/SingleProductCard";
import { ViewAllProductsCard } from "../components/ui/ViewAllProductsCard";

import { dummyProducts } from "./products";

import styles from "./index.module.scss";
import { ShopifyApiHelper } from "../../middleware/shopifyapihelper";

export default function HomePage() {
  const authFetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState(0);
  const [tagsMap, setTagsMap] = useState([]);
  const [productCount, setProductCount] = useState(null);
  const [productsFromDb, setProductsFromDb] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState(null);
  const [bannerStatus, setBannerStatus] = useState("success");

  useEffect(async () => {
    if (!window.sessionStorage["store_id"]) {
      const shopifyStore = await ShopifyApiHelper.getStore(authFetch);
      window.sessionStorage["store_id"] = shopifyStore.id;
      setStoreId(shopifyStore.id);

      const productCount = await ShopifyApiHelper.getProductsCount(authFetch);
      setProductCount(productCount);
      window.sessionStorage["product_count"] = productCount;

      const productsFromDbResults = await BackendApiHelper.doGet(
        "/api/products/" + shopifyStore.id
      );
      setProductsFromDb(productsFromDbResults.result);
      window.sessionStorage["products_from_db"] = productsFromDbResults.result;
    } else {
      setStoreId(window.sessionStorage["store_id"]);
      setProductCount(window.sessionStorage["product_count"]);
      setProductsFromDb(window.sessionStorage["products_from_db"]);
    }

    if (productsFromDb) {
      let initialTagsMap = [];
      await Promise.all(
        productsFromDb.result.map((productFromDb) => {
          // there will be only 1 tag per product
          let tag = productFromDb.tags;
          if (initialTagsMap[tag]) {
            initialTagsMap[tag] =
              initialTagsMap[tag] + "," + productFromDb.product_id.toString();
          } else if (tag) {
            initialTagsMap[tag] = productFromDb.product_id.toString();
          }
        })
      );
      setTagsMap(initialTagsMap);
    }
  }, []);

  const handleShowProducts = useCallback(() => {
    navigate("/allproducts");
  });

  const updateBanner = useCallback((message, show) => {
    setBannerMessage(message);
    setShowBanner(show);
  });

  return (
    <div className={styles.Page}>
      <Page>
        <div className={styles.Heading}>
          <Text variant="headingMd" as="h1" fontWeight="regular">
            Products Overview
          </Text>
        </div>
        {showBanner ? (
          <Banner
            title={bannerMessage}
            status={bannerStatus}
            onDismiss={() => {
              updateBanner("", false);
            }}
          />
        ) : null}
        <TitleBar primaryAction={null} />
        <Layout>
          <Layout.Section>
            <TagsProvider
              value={{ tagsMap: tagsMap, productCount: productCount }}
            >
              <Stack>
                <Stack>
                  <ProductStats />
                  <ViewAllProductsCard
                    showProductHandler={handleShowProducts}
                  />
                </Stack>
                <Stack.Item>
                  <div className={styles.Subheading}>
                    <Text variant="headingSm" as="h2" color="subdued">
                      Recently Updated Products
                    </Text>
                  </div>
                  <Stack spacing="extraLoose">
                    {dummyProducts.slice(0, 4)?.map((product) => (
                      <SingleProductCard
                        key={product.id}
                        image={product.image}
                        tag={product.tag}
                        name={product.name}
                        shortName
                      />
                    ))}
                  </Stack>
                </Stack.Item>
              </Stack>
            </TagsProvider>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
