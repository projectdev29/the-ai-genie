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
}) {
  return (
    <div className={styles.Card}>
      <div style={{ padding: "1rem" }}>
        <Stack alignment="leading" spacing="extraTight">
          <Stack.Item>
            <div className={styles.Image}>
              <Thumbnail
                source="/assets/shopping.webp"
                alt="Black choker necklace"
              />
            </div>
          </Stack.Item>
          <Stack.Item fill>
            <p>Kids winter beanie hatsame</p>
            <TextStyle variation="subdued">some dummy description</TextStyle>
          </Stack.Item>
          <Icon source={AlertMinor} color="warning" />
        </Stack>
      </div>
    </div>
  );
}
