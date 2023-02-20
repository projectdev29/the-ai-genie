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

import { products } from "./products";

import styles from "./index.module.scss";

export default function HomePage() {
  const authFetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [store, setStore] = useState({});
  const [tagsMap, setTagsMap] = useState([]);
  const [productCount, setProductCount] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState(null);
  const [bannerStatus, setBannerStatus] = useState("success");
  const { dontShowMainScreen } = useParams();

  useEffect(async () => {
    console.log("dont show main screen: " + dontShowMainScreen);
    if (dontShowMainScreen) {
      setShowProducts(true);
    }
    const shopResponse = await authFetch("/api/shop");
    const stores = await shopResponse.json();
    setStore(stores[0]);

    const countResponse = await authFetch("/api/products/count");
    const countResponseJson = await countResponse.json();
    setProductCount(countResponseJson.count);

    const productsFromDb = await BackendApiHelper.doGet(
      "/api/products/" + stores[0].id
    );

    if (productsFromDb.result) {
      let initialTagsMap = [];
      await Promise.all(
        productsFromDb.result.map((productFromDb) => {
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
            Dashboard
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
                    {products.slice(0, 4)?.map((product) => (
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
