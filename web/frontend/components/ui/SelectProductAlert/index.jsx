import React from "react";
import { EmptyState } from "@shopify/polaris";

import styles from "./SelectProductAlert.module.scss";

export function SelectProductAlert() {
  return (
    <div className={styles.EmptyCard}>
      <div className={styles.EmptyCardContent}>
        <EmptyState image="/assets/emptyProductList.svg" fullWidth>
          <p className={styles.EmptyCardContentText}>
            Select a product from the list on the left to edit or generate new
            product description.
          </p>
        </EmptyState>
      </div>
    </div>
  );
}
