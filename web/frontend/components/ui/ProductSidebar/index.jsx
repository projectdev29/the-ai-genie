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

import styles from "./ProductSidebar.module.scss";

export function ProductSidebar() {
  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "customer", plural: "customers" }}
        items={[
          {
            id: 100,
            url: "#",
            name: "Mae Jemison",
            location: "Decatur, USA",
          },
          {
            id: 200,
            url: "#",
            name: "Ellen Ochoa",
            location: "Los Angeles, USA",
          },
          {
            id: 300,
            url: "#",
            name: "Ellen Ochoa",
            location: "Los Angeles, USA",
          },
        ]}
        renderItem={(item) => {
          const { id, url, name, location } = item;
          // const media = <Avatar customer size="medium" name={name} />;

          return (
            <ResourceItem
              id={id}
              url={url}
              // media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <SingleProductCard />
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
    </Card>
  );
}
