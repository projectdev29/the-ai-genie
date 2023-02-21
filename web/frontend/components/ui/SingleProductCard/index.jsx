import React from "react";
import { Image, Stack, Text } from "@shopify/polaris";

import styles from "./SingleProductCard.module.scss";

import AlertCircle from "../../../assets/Icons/AlertCircle";
import CheckmarkCircle from "../../../assets/Icons/CheckmarkCircle";
import FloppyDisk from "../../../assets/Icons/FloppyDisk";
import PaperPlane from "../../../assets/Icons/PaperPlane";

function Icon({ Src, color }) {
  return (
    <div className={styles.Icon} style={{ color: color }}>
      <Src />
    </div>
  );
}

export function SingleProductCard({
  image,
  tag,
  name,
  description,
  shortName,
  onClickHandler,
}) {
  const icons = {
    "Not Started Yet": { source: AlertCircle, color: "#EBB21E" },
    Reviewed: { source: CheckmarkCircle, color: "#2789E5" },
    "Saved For Later": { source: FloppyDisk, color: "#999999" },
    Published: { source: PaperPlane, color: "#008080" },
  };

  return (
    <div className={styles.Card} onClick={onClickHandler}>
      <Stack spacing="extraTight" wrap={false}>
        <Stack.Item>
          <div className={styles.Image}>
            <Image src={`/assets/${image}`}></Image>
          </div>
        </Stack.Item>
        <Stack.Item>
          <div className={styles.TextContent}>
            <Stack spacing="extraTight">
              <Icon Src={icons[tag].source} color={icons[tag].color} />
              <p style={shortName ? { width: "100px" } : {}}>{name}</p>
            </Stack>
            {description && (
              <Text variation="span" color="subdued">
                {description}
              </Text>
            )}
          </div>
        </Stack.Item>
      </Stack>
    </div>
  );
}
