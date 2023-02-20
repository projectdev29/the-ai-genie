import React from "react";

import {
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
  Stack,
  Page,
} from "@shopify/polaris";
import { Pagination } from "@shopify/polaris";

import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { Columns, Inline } from "@shopify/polaris";
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
            // const media = <Avatar customer size="medium" name={name} />;
            return (
              <ResourceItem
                id={id}
                url={url}
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
                {/* <Text variant="bodyMd" fontWeight="bold" as="h3">
												{name}
											</Text>
											<div>{location}</div> */}
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
