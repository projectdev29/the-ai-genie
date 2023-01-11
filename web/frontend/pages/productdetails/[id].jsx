import {
  Button,
  CalloutCard,
  Card,
  Checkbox,
  Heading,
  Layout,
  MediaCard,
  TextContainer,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthenticatedFetch } from "../../hooks";

export default function ProductDetails() {
  const authFetch = useAuthenticatedFetch();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [checkGenerateCopy, setCheckGenerateCopy] = useState(false);
  const [checkGenerateFaq, setCheckGenerateFaq] = useState(false);

  useEffect(() => {
    console.log("id: " + id);
    authFetch("/api/products/" + id)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  const handleGenerateCopy = useCallback(
    (newChecked) => setCheckGenerateCopy(newChecked),
    []
  );

  const handleGenerateFaq = useCallback(
    (newChecked) => setCheckGenerateFaq(newChecked),
    []
  );

  const handleGenerate = useCallback(() => {
    if (checkGenerateCopy) {
      console.log("generate copy checked.");
    }
    if (checkGenerateFaq) {
      console.log("generate faqs checked.");
    }
  });
  if (JSON.stringify(product) != "{}") {
    return (
      <Layout>
        <Layout.Section>
          <Card>
            <div>
              <Card title="Product Overview" size="small">
                <br />
                <br />
                {product.images.length > 0 ? (
                  <div>
                    <img alt={product.title} src={product.images[0].src} />
                    <br />
                    <br />
                  </div>
                ) : null}
                <b>{product.title}</b>
                <br />
                <br />
                {product.body_html}
                <br />
                <br />
                <Checkbox
                  label="Generate Copy for the product"
                  checked={checkGenerateCopy}
                  onChange={handleGenerateCopy}
                />
                <br />
                <Checkbox
                  label="Generate FAQs for the product"
                  checked={checkGenerateFaq}
                  onChange={handleGenerateFaq}
                />
                <br />
                <br />
                <Button onClick={handleGenerate} primary>
                  Generate
                </Button>
              </Card>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    );
  } else {
    return <div></div>;
  }
}
