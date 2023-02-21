import { Columns, Page, Stack, Text } from "@shopify/polaris";
import React from "react";
import { ProductSidebar } from "../components/ui/ProductSidebar";
import { SelectProductAlert } from "../components/ui/SelectProductAlert";
import { SelectedProductDetails } from "../components/ui/ProductDescriptionCarousel";

import AlertCircle from "../assets/icons/AlertCircle";
import CheckmarkCircle from "../assets/icons/CheckmarkCircle";
import FloppyDisk from "../assets/icons/FloppyDisk";
import PaperPlane from "../assets/icons/PaperPlane";

import styles from "./allProducts.module.scss";

function Icon({ Src, color }) {
  return (
    <div style={{ color: color }}>
      <Src />
    </div>
  );
}

export default function AllProducts(props) {
  const [selectedTag, setSelectedTag] = React.useState();
  const [selectedProduct, setSelectedProduct] = React.useState();

  const data = [
    {
      id: 1,
      tagName: "Not Started Yet",
      tagColor: "#EBB21E",
      tagSource: AlertCircle,
    },
    {
      id: 2,
      tagName: "Reviewed",
      tagColor: "#2789E5",
      tagSource: CheckmarkCircle,
    },
    {
      id: 3,
      tagName: "Saved For Later",
      tagColor: "#999999",
      tagSource: FloppyDisk,
    },
    {
      id: 4,
      tagName: "Published",
      tagColor: "#008080",
      tagSource: PaperPlane,
    },
  ];

  return (
    <div className={styles.Page}>
      <Page
        title="All Products"
        breadcrumbs={[{ content: "Dashboard", url: "/" }]}
        secondaryActions={
          <Stack>
            <Text variant="bodySm" as="span" color="subdued">
              Filter By :
            </Text>
            {data.map((item) => (
              <Stack spacing="extraTight" alignment="center" key={item.id}>
                <div
                  className={styles.Tag}
                  onClick={() => {
                    setSelectedTag(item.tagName);
                    setSelectedProduct(undefined);
                  }}
                >
                  <Icon
                    Src={item.tagSource}
                    color={item.tagName === selectedTag ? "#916A00" : "#666666"}
                  />
                  <Text
                    variant="bodySm"
                    as="span"
                    color={item.tagName === selectedTag ? "warning" : "subdued"}
                  >
                    {item.tagName}
                  </Text>
                </div>
              </Stack>
            ))}
          </Stack>
        }
      >
        <Columns
          columns={{
            xs: "3fr 3fr",
            md: "3fr 3fr",
          }}
          gap={{
            xs: "4",
            md: "1",
          }}
        >
          <ProductSidebar
            tag={selectedTag}
            onClickProduct={setSelectedProduct}
          />
          {selectedProduct ? (
            <SelectedProductDetails product={selectedProduct} />
          ) : (
            <SelectProductAlert />
          )}
        </Columns>
      </Page>
    </div>
  );
}
