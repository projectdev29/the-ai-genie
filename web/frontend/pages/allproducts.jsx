// import { ProductResourceList } from "../components/ProductResourceList";
import {
  Badge,
  Columns,
  Inline,
  Layout,
  Page,
  Stack,
  Tag,
  Text,
} from "@shopify/polaris";
import React from "react";
import { ProductSidebar } from "../components/ui/ProductSidebar";
import { SelectedProductEmpty } from "../components/ui/SelectedProductEmpty";

// import {
//   AlertMinor,
//   CircleTickMinor,
//   ExternalMinor,
//   SaveMinor,
// } from "@shopify/polaris-icons";

import AlertCircle from "../assets/Icons/AlertCircle";
import CheckmarkCircle from "../assets/Icons/CheckmarkCircle";
import FloppyDisk from "../assets/Icons/FloppyDisk";
import PaperPlane from "../assets/Icons/PaperPlane";

import styles from "./allProducts.module.scss";

import { SelectedProductDetails } from "../components/ui/ProductDescriptionCarousel";

function Icon({ Src, color }) {
  return (
    <div className={styles.Icon} style={{ color: color }}>
      <Src />
    </div>
  );
}

export default function AllProducts(props) {
  const [showProduct, setShowProduct] = React.useState(false);
  function toggleSelected() {
    console.log("Clicked");
    setShowProduct(!showProduct);
  }

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
        // titleMetadata={<Badge status="success">Online store</Badge>}
        breadcrumbs={[{ content: "Products", url: "#" }]}
        secondaryActions={
          <Stack>
            <Text variant="bodySm" as="span" color="subdued">
              Filter By :
            </Text>
            {data.map((item) => (
              // <Tag url="#" onClick={() => toggleSelected()}>
              <Stack spacing="extraTight" alignment="center">
                <Icon
                  Src={item.tagSource}
                  color="#666666"
                  onClick={() => console.log(item.tagName + " clicked")}
                />
                <Text variant="bodySm" as="span" color="subdued">
                  {item.tagName}
                </Text>
              </Stack>
              // </Tag>
            ))}
          </Stack>
        }
      >
        {/* <Layout> */}
        {/* <Layout.Section> */}
        {/* <SpacingBackground> */}
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
            setShowProduct={setShowProduct}
            showProduct={showProduct}
            onClickHandler={toggleSelected}
          />
          {/* <ProductResourceList /> */}
          {showProduct ? <SelectedProductDetails /> : <SelectedProductEmpty />}
        </Columns>
        {/* </SpacingBackground> */}
        {/* </Layout.Section> */}
        {/* </Layout> */}
      </Page>
    </div>
  );
}
