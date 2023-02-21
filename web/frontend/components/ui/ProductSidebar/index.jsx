import React from "react";
import { ResourceList, ResourceItem } from "@shopify/polaris";

import { SingleProductCard } from "../SingleProductCard";
import { products } from "../../../pages/products";

import ChevronLeft from "../../../assets/icons/ChevronLeft";
import ChevronRight from "../../../assets/icons/ChevronRight";

import styles from "./ProductSidebar.module.scss";

export function ProductSidebar({ tag, onClickProduct }) {
  const filteredProducts = React.useMemo(() => {
    return products.filter(
      (product) => tag === undefined || product.tag === tag
    );
  }, [products, tag]);

  return (
    <div className={styles.Sidebar}>
      <ResourceList
        resourceName={{ singular: "customer", plural: "customers" }}
        items={filteredProducts}
        renderItem={(item) => {
          const { id, image, tag, name, description } = item;
          return (
            <ResourceItem
              id={id}
              // url={url}
              // media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <SingleProductCard
                onClick={() => {
                  onClickProduct(item);
                }}
                image={image}
                tag={tag}
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
