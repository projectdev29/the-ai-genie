import React, { useState } from "react";
import { Columns, Page, Stack, Text } from "@shopify/polaris";
import { ProductSidebar } from "../components/ui/ProductSidebar";
import { SelectProductAlert } from "../components/ui/SelectProductAlert";
import { SelectedProductDetails } from "../components/ui/ProductDescriptionCarousel";

import AlertCircle from "../assets/icons/AlertCircle";
import CheckmarkCircle from "../assets/icons/CheckmarkCircle";
import FloppyDisk from "../assets/icons/FloppyDisk";
import PaperPlane from "../assets/icons/PaperPlane";

import styles from "./allProducts.module.scss";
import { useEffect } from "react";
import { ShopifyApiHelper } from "../../middleware/shopifyapihelper";
import { BackendApiHelper } from "../../middleware/backendapihelper";
import { useAuthenticatedFetch } from "../hooks";
import { ProductProvider } from "./ProductContext";

function Icon({ Src, color }) {
  return (
    <div style={{ color: color }}>
      <Src />
    </div>
  );
}

export default function AllProducts(props) {
  const [selectedTag, setSelectedTag] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [storeId, setStoreId] = useState();
  const [productsFromStore, setProductsFromStore] = useState();
  const [productsFromDb, setProductsFromDb] = useState();
  const [tagsMap, setTagsMap] = useState([]);
  const [descriptionSuggestions, setDescriptionSuggestions] = useState([]);
  const authFetch = useAuthenticatedFetch();
  const [isLoading, setIsLoading] = useState(true);

  const tagsData = [
    {
      id: 1,
      tagName: "Not Started Yet",
      tagColor: "#EBB21E",
      tagSource: AlertCircle,
    },
    {
      id: 2,
      tagName: "Reviewed",
      tagColor: "#2789E5",
      tagSource: CheckmarkCircle,
    },
    {
      id: 3,
      tagName: "Saved For Later",
      tagColor: "#999999",
      tagSource: FloppyDisk,
    },
    {
      id: 4,
      tagName: "Published",
      tagColor: "#008080",
      tagSource: PaperPlane,
    },
  ];

  function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  useEffect(async () => {
    if (!window.sessionStorage["store_id"]) {
      const shopifyStore = await ShopifyApiHelper.getStore(authFetch);
      window.sessionStorage["store_id"] = shopifyStore.id;
      setStoreId(shopifyStore.id);
    } else {
      let sId = window.sessionStorage["store_id"];
      setStoreId(sId);
    }
    if (!window.sessionStorage["products_from_db"]) {
      const productsFromDbResults = await BackendApiHelper.doGet(
        "/api/products/" + storeId
      );
      setProductsFromDb(productsFromDbResults.result);
      window.sessionStorage["products_from_db"] = JSON.stringify({
        result: productsFromDbResults.result,
      });
    } else {
      setProductsFromDb(JSON.parse(window.sessionStorage["products_from_db"]));
    }

    if (productsFromDb) {
      let initialTagsMap = [];
      await Promise.all(
        productsFromDb.result.map((productFromDb) => {
          initialTagsMap[productFromDb.product_id.toString()] =
            productFromDb.tags;
        })
      );
      setTagsMap(initialTagsMap);
    }

    if (!window.sessionStorage["products_from_store"]) {
      const productsResp = await ShopifyApiHelper.getAllProducts(authFetch);
      let productsFromStore = [];
      productsResp.forEach(function (item) {
        let productToAdd = {
          id: item.id,
          image: item.images.length > 0 ? item.images[0].src : null,
          tag: tagsMap[item.id] ? tagsMap[item.id] : "Not Started Yet",
          name: item.title,
          description: stripHtml(item.body_html),
        };
        productsFromStore.push(productToAdd);
      });
      let pfs = { products: productsFromStore };
      setProductsFromStore(pfs);
      window.sessionStorage["products_from_store"] = JSON.stringify(pfs);
    } else {
      setProductsFromStore(
        JSON.parse(window.sessionStorage["products_from_store"])
      );
    }
    setIsLoading(false);
  }, []);

  return isLoading ? null : (
    <div className={styles.Page}>
      <Page
        title="All Products"
        breadcrumbs={[{ content: "Dashboard", url: "/" }]}
        secondaryActions={
          <Stack>
            <Text variant="bodySm" as="span" color="subdued">
              Filter By :
            </Text>
            {tagsData.map((tagItem) => (
              <Stack spacing="extraTight" alignment="center" key={tagItem.id}>
                <div
                  className={styles.Tag}
                  onClick={() => {
                    setSelectedTag(tagItem.tagName);
                    setSelectedProduct(undefined);
                  }}
                >
                  <Icon
                    Src={tagItem.tagSource}
                    color={
                      tagItem.tagName === selectedTag ? "#916A00" : "#666666"
                    }
                  />
                  <Text
                    variant="bodySm"
                    as="span"
                    color={
                      tagItem.tagName === selectedTag ? "warning" : "subdued"
                    }
                  >
                    {tagItem.tagName}
                  </Text>
                </div>
              </Stack>
            ))}
          </Stack>
        }
      >
        <Columns
          columns={{
            xs: "3fr 3fr",
            md: "3fr 3fr",
          }}
          gap={{
            xs: "4",
            md: "1",
          }}
        >
          <ProductProvider
            value={{
              product: selectedProduct,
              setProduct: setSelectedProduct,
              descriptionSuggestions: descriptionSuggestions,
              setDescriptionSuggestions: setDescriptionSuggestions,
              productsFromStore: productsFromStore,
              setProductsFromStore: setProductsFromStore,
            }}
          >
            <ProductSidebar tag={selectedTag} />
            {selectedProduct ? (
              <SelectedProductDetails />
            ) : (
              <SelectProductAlert />
            )}
          </ProductProvider>
        </Columns>
      </Page>
    </div>
  );
}
