import React, { useMemo } from "react";
import { ResourceList, ResourceItem } from "@shopify/polaris";

import { SingleProductCard } from "../SingleProductCard";
import { dummyProducts } from "../../../pages/products";

import ChevronLeft from "../../../assets/icons/ChevronLeft";
import ChevronRight from "../../../assets/icons/ChevronRight";

import styles from "./ProductSidebar.module.scss";
import ProductContext from "../../../pages/ProductContext";
import { useContext } from "react";

export function ProductSidebar({ tag }) {
  const productContext = useContext(ProductContext);

  const filteredProducts = useMemo(() => {
    if (productContext.productsFromStore) {
      // console.log(productsFromStore.products[0]);
      return productContext.productsFromStore.products.filter(
        (product) => tag === undefined || product.tag === tag
      );
    } else {
      return [];
    }
  }, [productContext.productsFromStore, tag]);

  return (
    <div className={styles.Sidebar}>
      <ResourceList
        resourceName={{ singular: "product", plural: "products" }}
        items={filteredProducts}
        renderItem={(item) => {
          const { id, image, tag, name, description } = item;
          return (
            <ResourceItem
              id={id}
              accessibilityLabel={`View details for ${name}`}
            >
              <SingleProductCard
                onClick={() => {
                  productContext.setProduct(item);
                }}
                image={image}
                tag={tag ? tag : "Not Yet Started"}
                name={name}
                description={description}
              />
            </ResourceItem>
          );
        }}
      />
      <div className={styles.Pagination}>
        <div
          className={styles.Left}
          onClick={() => {
            console.log("Previous");
          }}
        >
          <ChevronLeft />
          Prev
        </div>
        <div className={styles.PaginationText}>Showing 5 of 16</div>
        <div
          className={styles.Right}
          onClick={() => {
            console.log("Next");
          }}
        >
          Next
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
