import React from "react";
import { Stack, Icon, Image, Text } from "@shopify/polaris";
import {
  AlertMinor,
  CircleTickMinor,
  SaveMinor,
  FinancesMinor,
} from "@shopify/polaris-icons";

import styles from "./SingleProductCard.module.scss";

export function SingleProductCard({
  image,
  tag,
  name,
  description,
  shortName,
  onClickHandler,
}) {
  const icons = {
    "Not Started Yet": { source: AlertMinor, color: "warning" },
    Reviewed: { source: CircleTickMinor, color: "interactive" },
    "Saved For Later": { source: SaveMinor, color: "subdued" },
    Published: { source: FinancesMinor, color: "success" },
  };

  return (
    <div className={styles.Card}>
      <Stack spacing="extraTight">
        <Stack.Item>
          <div className={styles.Image}>
            <Image src={`/assets/${image}`}></Image>
          </div>
        </Stack.Item>
        <Stack.Item>
          <Stack spacing="extraTight">
            <Icon source={icons[tag].source} color={icons[tag].color} />
            <p style={shortName ? { width: "100px" } : {}}>{name}</p>
          </Stack>
          {description && (
            <Text variation="bodySm" color="subdued">
              {description}
            </Text>
          )}
        </Stack.Item>
      </Stack>
    </div>
  );
}
