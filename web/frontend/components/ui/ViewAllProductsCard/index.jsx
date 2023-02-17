import React from "react";
import { MediaCard } from "@shopify/polaris";
import { CardSvgComponent } from "./CardSvgComponent";

export function Card({ showProductHandler }) {

  return (
    <div className="" style={{ width: "260px", height: "280px" }}>
      <MediaCard
        portrait={true}
        title="Getting Started"
        primaryAction={{
          content: "Learn about getting started",
          onAction: () => {},
        }}
        description="Discover how Shopify can power up your entrepreneurial journey."
        popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
      >
        <img
          alt=""
          width="260px"
          height="280px"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
    </div>
  );
}

export function ViewAllProductsCard({ showProductHandler }) {
  return (
	<CardSvgComponent showProductHandler={showProductHandler}/>
  );
}
