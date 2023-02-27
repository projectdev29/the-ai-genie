import { Card, Heading, Stack, TextField } from "@shopify/polaris";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";
import ProductContext from "../pages/ProductContext";
export function ProductResults() {
  const productContext = useContext(ProductContext);
  const [alternateDesc, setAlternateDesc] = useState();
  const authFetch = useAuthenticatedFetch();

  const handleCopyChange = useCallback(
    (newValue) => {
      setAlternateDesc(newValue);
    },
    [alternateDesc]
  );

  async function updateProductInShopifyAdmin(updatedProduct) {
    let resp = await authFetch("/api/products/description", {
      method: "PUT",
      body: JSON.stringify({
        id: updatedProduct.id,
        body_html: updatedProduct.body_html,
      }),
      //   body: JSON.stringify("{}"),
      headers: { "Content-Type": "application/json" },
    });
    console.log(resp);
  }
  const publishNewDescription = useCallback(async () => {
    productContext.setProduct((prevValue) => {
      let updatedProduct = {
        ...prevValue,
        body_html: alternateDesc,
      };
      updateProductInShopifyAdmin(updatedProduct);
      return updatedProduct;
    });
  }, [alternateDesc]);

  const regenerateNewDescription = useCallback(() => {
    //call shopify Admin API to update the product description
  }, [productContext.product]);

  useEffect(() => {
    setAlternateDesc(productContext.product.copy);
  }, [productContext.product.copy]);
  return (
    <div>
      {typeof alternateDesc != "undefined" ? (
        <Card
          footerActionAlignment="left"
          secondaryFooterActions={[
            {
              content: "Give me another description",
              onAction: regenerateNewDescription,
            },
          ]}
          primaryFooterAction={{
            content: "Update Product",
            onAction: publishNewDescription,
          }}
        >
          <Heading>Generated Result:</Heading>
          <br></br>
          <TextField
            value={alternateDesc}
            onChange={handleCopyChange}
            multiline={4}
            autoComplete="off"
            helpText="You can edit our suggestion in this text area. Just click 'Use This Description' when you have finalized the description and are ready to save."
          />
          <br></br>
        </Card>
      ) : null}
      {typeof productContext.product.faqs != "undefined" ? (
        <Card title="FAQ suggestions: ">
          <p>{productContext.product.faqs}</p>
        </Card>
      ) : null}
    </div>
  );
}
