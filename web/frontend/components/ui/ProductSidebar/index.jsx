import React from "react";
import { Card, ResourceList, ResourceItem, Pagination } from "@shopify/polaris";

import { SingleProductCard } from "../SingleProductCard";
import { products } from "../../../pages/products";

import styles from "./ProductSidebar.module.scss";

export function ProductSidebar({ onClickHandler }) {
  return (
    <Card>
      <div className={styles.Sidebar}>
        <ResourceList
          resourceName={{ singular: "customer", plural: "customers" }}
          items={products}
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
                  onClickHandler={() => {
                    console.log(id);
                    onClickHandler(id);
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
          <Pagination
            label="Showing 5 of 16"
            hasPrevious
            onPrevious={() => {
              console.log("Previous");
            }}
            hasNext
            onNext={() => {
              console.log("Next");
            }}
          />
        </div>
      </div>
    </Card>
  );
}
