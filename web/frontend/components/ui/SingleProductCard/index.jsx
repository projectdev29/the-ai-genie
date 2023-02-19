import {
  Stack,
  Badge,
  Thumbnail,
  Card,
  TextStyle,
  Icon,
} from "@shopify/polaris";
import { AlertMinor } from "@shopify/polaris-icons";
import { CircleTickMajor } from "@shopify/polaris-icons";
import React from "react";
import styles from "./SingleProductCard.module.scss";

export function SingleProductCard({
  imgSrc,
  icon,
  productName,
  productDescription,
  onClickHandler,
}) {
  return (
    <div className={styles.Card} onClick={onClickHandler}>
      <div>
        <Stack alignment="leading" spacing="extraTight">
          <Stack.Item>
            <div className={styles.Image}>
              <Thumbnail
                source="/assets/shopping.webp"
                alt="Black choker necklace"
              />
            </div>
          </Stack.Item>
          <Icon source={AlertMinor} color="warning" />
          <Stack.Item fill>
            {productName ? <p>{productName}</p> : <div> </div>}
            {productDescription ? (
              <TextStyle variation="subdued">{productDescription}</TextStyle>
            ) : null}
          </Stack.Item>
        </Stack>
      </div>
    </div>
  );
}
