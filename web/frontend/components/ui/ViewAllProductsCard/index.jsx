import React from "react";
import { MediaCard } from "@shopify/polaris";
import { CardSvgComponent } from "./CardSvgComponent";

export function ViewAllProductsCard({ showProductHandler }) {
  return <CardSvgComponent showProductHandler={showProductHandler} />;
}
