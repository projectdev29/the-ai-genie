import React from "react";
import { Card, ResourceList, ResourceItem, Pagination } from "@shopify/polaris";

import { SingleProductCard } from "../SingleProductCard";
import { products } from "../../../pages/products";

import styles from "./ProductSidebar.module.scss";
import ChevronLeft from "../../../assets/Icons/ChevronLeft";
import ChevronRight from "../../../assets/Icons/ChevronRight";

export function ProductSidebar({ onClickHandler }) {
  return (
    <>
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
    </>
  );
}
