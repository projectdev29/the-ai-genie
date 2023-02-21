import { Card, EmptyState, Icon } from "@shopify/polaris";
import React from "react";

import styles from "./SelectedProductEmpty.module.scss";

export function SelectedProductEmpty() {
  return (
    <div className={styles.EmptyCard}>
      <div className={styles.EmptyCardContent}>
        <EmptyState
          // heading="Select a product to get started"
          // action={{ content: 'Upload files' }}
          image="/assets/emptyProductList.svg"
          fullWidth
        >
          <p className={styles.EmptyCardContentText}>
            Select a product from the list on the left to edit or generate new
            product description.
          </p>
        </EmptyState>
      </div>
    </div>
  );
}
