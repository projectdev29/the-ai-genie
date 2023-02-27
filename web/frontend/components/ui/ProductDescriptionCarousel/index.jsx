import React, { useState, useCallback, useEffect } from "react";
import { Card, Stack, TextField } from "@shopify/polaris";
import { Carousel } from "@mantine/carousel";
import { Text, Button } from "@mantine/core";
import { createStyles } from "@mantine/core";

import styles from "./ProductDescriptionCarousel.module.scss";

import AlertCircle from "../../../assets/Icons/AlertCircle";
import CheckmarkCircle from "../../../assets/Icons/CheckmarkCircle";
import FloppyDisk from "../../../assets/Icons/FloppyDisk";
import PaperPlane from "../../../assets/Icons/PaperPlane";
import { BackendApiHelper } from "../../../../middleware/backendapihelper";
import { useAuthenticatedFetch } from "../../../hooks";
import { ShopifyApiHelper } from "../../../../middleware/shopifyapihelper";
import ProductContext from "../../../pages/ProductContext";
import { useContext } from "react";

function Icon({ Src, color }) {
  return (
    <div style={{ color: color }}>
      <Src />
    </div>
  );
}

const icons = {
  "Not Started Yet": { source: AlertCircle, color: "#EBB21E" },
  Reviewed: { source: CheckmarkCircle, color: "#2789E5" },
  "Saved For Later": { source: FloppyDisk, color: "#999999" },
  Published: { source: PaperPlane, color: "#008080" },
};

const useStyles = createStyles((theme) => ({
  GenerateCard: {
    backgroundColor: "#f2fbfb",
    border: "1px solid #EAEAEA",
    borderRadius: "12px 12px 0 0",
  },
  Heading: {
    fontSize: "16px",
  },
  SubHeading: {
    fontSize: "12px",
  },
  ButtonGroup: {
    padding: "1rem",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
  Button: {
    backgroundColor: "#2789e5",
    width: "50%",
  },
}));

export function SelectedProductDetails() {
  const { classes } = useStyles();
  const authFetch = useAuthenticatedFetch();
  const productContext = useContext(ProductContext);

  const updateProductInShopifyAdmin = useCallback(async () => {
    console.log("here");
    let resp = await authFetch("/api/products/description", {
      method: "PUT",
      body: JSON.stringify({
        id: productContext.product.id,
        body_html:
          productContext.product.reviews[productContext.product.reviewIndex],
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(resp);
  }, [productContext.product]);

  const updateProductsFromStoreWithCurrentProduct = useCallback(
    async (newReviews, newDescription) => {
      productContext.setProductsFromStore((prevValue) => {
        let newProducts = [...prevValue.products];
        let index = newProducts.findIndex(
          (p) => p.id === productContext.product.id
        );
        newProducts[index] = {
          ...newProducts[index],
          description: newDescription,
          reviews: newReviews,
        };
        //potentially cache it
        return {
          products: newProducts,
        };
      });
    },
    [productContext.product]
  );
  const updateProductDescription = useCallback(
    async (productIndex) => {
      // await updateProductInShopifyAdmin();
      let descriptionSuggestions =
        productContext.descriptionSuggestions[productIndex];
      let descToUpdate = descriptionSuggestions.suggestionIndex
        ? descriptionSuggestions.suggestions[
            descriptionSuggestions.suggestionIndex
          ]
        : descriptionSuggestions.suggestions[0];
      productContext.setProduct((prevValue) => {
        return {
          ...prevValue,
          description: descToUpdate,
        };
      });
      // set description in product from store
      productContext.setProductsFromStore((prevValue) => {
        let newProductsFromStore = { ...prevValue };
        newProductsFromStore.products[productIndex] = {
          ...newProductsFromStore.products[productIndex],
          description: descToUpdate,
        };
        return newProductsFromStore;
      });

      //setproductsfromstore
      // setproductsfromdb
    },
    [productContext.product, productContext.descriptionSuggestions]
  );

  const handleGenerateAlternateDescriptions = useCallback(async () => {
    const copyResult = await BackendApiHelper.doPost(
      "/api/generatecopyforproduct",
      { product: productContext.product }
    );
    let newSuggestions = [copyResult.result];

    let index = productContext.descriptionSuggestions.findIndex(
      (p) => p.productId === productContext.product.id
    );
    let newDescriptionSuggestions = [...productContext.descriptionSuggestions];

    //product already exists in suggestions
    if (index >= 0) {
      newSuggestions = [
        ...newDescriptionSuggestions[index].suggestions,
        copyResult.result,
      ];
      newDescriptionSuggestions[index] = {
        productId: productContext.product.id,
        suggestions: newSuggestions,
      };
    } else {
      let newDescriptionSuggestion = {
        productId: productContext.product.id,
        suggestions: newSuggestions,
      };
      newDescriptionSuggestions.push(newDescriptionSuggestion);
    }

    productContext.setDescriptionSuggestions(newDescriptionSuggestions);
    //probably not needed
    //updateProductsFromStoreWithCurrentProduct(newReviews, product.description);
  });

  let productIndex = productContext.descriptionSuggestions.findIndex(
    (p) => p.productId === productContext.product.id
  );

  return (
    <div>
      <div className={classes.GenerateCard}>
        <Card.Section>
          <Stack distribution="equalSpacing">
            <h3 className={classes.Heading}>{productContext.product.name}</h3>
            <Icon
              Src={icons[productContext.product.tag].source}
              color={icons[productContext.product.tag].color}
            />
          </Stack>
          <Stack spacing="loose" vertical>
            <p className={classes.SubHeading}>
              {productContext.product.description}
            </p>
            <Stack wrap={false}>
              <Button
                style={{ backgroundColor: "#008080" }}
                onClick={handleGenerateAlternateDescriptions}
              >
                Generate Alt. Copy
              </Button>
              <Button variant="subtle">Mark As Reviewed</Button>
              <Button variant="subtle">Save For Later</Button>
            </Stack>
          </Stack>
        </Card.Section>
      </div>
      <Card.Section>
        <Stack alignment="center" distribution="fillEvenly">
          <Text my="lg" fz="lg">
            Generated Suggestions
          </Text>
          <Text my="lg" fz="xs" c="dimmed" ta="right">
            Showing 1 of 5 Suggestions
          </Text>
        </Stack>
        <ProductDescriptionCarousel
          updateProductsFromStoreWithCurrentProduct={
            updateProductsFromStoreWithCurrentProduct
          }
        />
        <div className={classes.ButtonGroup}>
          <Button
            // primary
            className={classes.Button}
            disabled={productIndex < 0}
            onClick={() => {
              updateProductDescription(productIndex);
            }}
          >
            Use This Description
          </Button>
        </div>
      </Card.Section>
    </div>
  );
}

export function ProductDescriptionCarousel({
  updateProductsFromStoreWithCurrentProduct,
}) {
  const productContext = useContext(ProductContext);
  const handleChangeReview = useCallback(
    (index, productIndex) => (value) => {
      productContext.setDescriptionSuggestions((prevValue) => {
        const newDescriptionSuggestions = [...prevValue];
        let newSuggestions = [
          ...newDescriptionSuggestions[productIndex].suggestions,
        ];
        newSuggestions[index] = value;
        newDescriptionSuggestions[productIndex].suggestions = newSuggestions;
        newDescriptionSuggestions[productIndex].suggestionIndex = index;
        return newDescriptionSuggestions;
      });
    },
    [productContext.product]
  );

  let productIndex = productContext.descriptionSuggestions.findIndex(
    (p) => p.productId === productContext.product.id
  );
  return (
    <Carousel
      slideSize="100%"
      slideGap="xs"
      controlsOffset="xs"
      controlSize={40}
      align="center"
    >
      {productIndex >= 0 ? (
        productContext.descriptionSuggestions[productIndex].suggestions.map(
          (sReview, index) => (
            <Carousel.Slide key={index}>
              <div className={styles.TextField}>
                <TextField
                  value={sReview}
                  onChange={handleChangeReview(index, productIndex)}
                  multiline={6}
                  autoComplete="off"
                />
              </div>
            </Carousel.Slide>
          )
        )
      ) : (
        <Carousel.Slide>
          <div className={styles.TextField}>
            <TextField
              placeholder={`Click “Generate” button above to generate new description suggestions. You can edit suggestions using this text area. Click side arrows to see next or previous suggestion. Once done click "Use This Description" to save changes.`}
              multiline={6}
              autoComplete="off"
              disabled
            />
          </div>
        </Carousel.Slide>
      )}
    </Carousel>
  );
}
