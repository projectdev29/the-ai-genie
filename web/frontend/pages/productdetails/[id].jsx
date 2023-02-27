import {
  Banner,
  Button,
  CalloutCard,
  Card,
  Checkbox,
  Heading,
  Layout,
  MediaCard,
  Page,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackendApiHelper } from "../../../middleware/backendapihelper";
import { ProductResults } from "../../components/ProductResults";
import { useAuthenticatedFetch } from "../../hooks";
import { ProductProvider } from "../ProductContext";
import { Image } from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";

export default function ProductDetails() {
  const authFetch = useAuthenticatedFetch();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  let productId = id.split(",")[0];
  let storeId = id.split(",")[1];

  useEffect(async () => {
    let productResp = await authFetch("/api/products/" + productId);
    let productJson = await productResp.json();
    setProduct(productJson);

    await BackendApiHelper.doPost("/api/product/tag", {
      productId: productId,
      storeId: storeId,
      tag: "In Progress",
    });
  }, []);

  const handleGenerateAlternateDescriptions = useCallback(async () => {
    const copyResult = await BackendApiHelper.doPost(
      "/api/generatecopyforproduct",
      { product }
    );
    setProduct((prevValue) => {
      return {
        ...prevValue,
        copy: copyResult.result,
      };
    });
  });

  const handleMarkAsReviewed = useCallback(async () => {
    updateTag("Reviewed");
  });

  const handleSaveForLater = useCallback(async () => {
    updateTag("Save For Later");
  });

  const backToHomePage = useCallback(() => {
    navigate("/");
  });

  async function updateTag(tagValue) {
    await BackendApiHelper.doPost("/api/product/tag", {
      productId: productId,
      storeId: storeId,
      tag: tagValue,
    });
  }

  const handleGenerateFaqs = useCallback(async () => {
    const faqResult = await BackendApiHelper.doPost(
      "/api/generatefaqforproduct",
      { product }
    );
    setProduct((prevValue) => {
      return {
        ...prevValue,
        faqs: faqResult.result,
      };
    });
  });

  if (JSON.stringify(product) != "{}") {
    let width = 200;
    let height = 200;
    if (product.images.length > 0) {
      height = (product.images[0].height * 200) / product.images[0].width;
    }

    return (
      <Page title="Generate Description">
        <Card
          sectioned
          footerActionAlignment="left"
          primaryFooterAction={{
            content: "Back",
            onAction: backToHomePage,
          }}
        >
          <Stack distribution="fill">
            <Stack.Item>
              {product.images.length > 0 ? (
                <div>
                  <Image
                    src={product.images[0].src}
                    height={height}
                    width={width}
                    alt={product.title}
                  />
                  <br />
                  <br />
                </div>
              ) : null}
            </Stack.Item>
            <Stack.Item>
              <b>{product.title}</b>
              <br />
              <br />
              {product.body_html}
              <br />
              <br />
            </Stack.Item>
          </Stack>
          <Button onClick={handleGenerateAlternateDescriptions}>
            Generate Alternate Descriptions
          </Button>
          &nbsp;
          <Button onClick={handleMarkAsReviewed}>Mark As Reviewed</Button>
          &nbsp;
          <Button onClick={handleMarkAsReviewed}>Save For Later</Button>
          <br />
          <br />
          {/* <Button onClick={handleGenerateFaqs} primary>
          Generate FAQs for the product
        </Button> */}
          <ProductProvider value={{ product, setProduct }}>
            <ProductResults></ProductResults>
          </ProductProvider>
        </Card>
      </Page>
    );
  } else {
    return <div></div>;
  }
}
