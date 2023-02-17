import {
  Text,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Button,
  List,
  Banner,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductResourceList, ProductsCard } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

import ProductStats from "../components/ProductStats";
import { BackendApiHelper } from "../../middleware/backendapihelper";
import { TagsProvider } from "../components/TagsContext";
import { useParams } from "react-router-dom";

import { SingleProductCard } from "../components/ui/SingleProductCard";
import {
  ViewAllProductsCard,
  Card,
} from "../components/ui/ViewAllProductsCard";
// import { ProductCard } from '../components/ui/ProductCard'

import styles from "./index.module.scss";

export default function HomePage() {
  const authFetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [store, setStore] = useState({});
  const [tagsMap, setTagsMap] = useState([]);
  const [productCount, setProductCount] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState(null);
  const [bannerStatus, setBannerStatus] = useState("success");
  let shopExists = false;
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
    setShowProducts(true);
  });

  const handleShowSummary = useCallback(() => {
    setShowProducts(false);
  });
  const updateBanner = useCallback((message, show) => {
    setBannerMessage(message);
    setShowBanner(show);
  });
  return (
    <div className={styles.Page}>
      <Page>
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
              {showProducts ? (
                <div>
                  <ProductResourceList
                    updateBanner={updateBanner}
                  ></ProductResourceList>
                  <br />
                  <Button onClick={handleShowSummary} primary>
                    Back
                  </Button>
                </div>
              ) : (
                <div>{/* <Summary></Summary> */}</div>
              )}
              <Stack>
                <Stack.Item fill>
                  <ProductStats />
                </Stack.Item>
                <Stack.Item fill>
                  <ViewAllProductsCard
                    showProductHandler={handleShowProducts}
                  />
                </Stack.Item>
                {/* <Card showProductHandler={handleShowProducts} /> */}
                <Stack.Item>
                  <Text variant="headingMd" as="h6">
                    Online store dashboard
                  </Text>
                  <Stack wrap={false}>
                    <SingleProductCard />
                    <SingleProductCard />
                    <SingleProductCard />
                    {/* <SingleProductCard /> */}
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
