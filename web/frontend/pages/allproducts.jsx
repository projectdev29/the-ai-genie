// import { ProductResourceList } from "../components/ProductResourceList";
import {
  Badge,
  Columns,
  Icon,
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

import {
  AlertMinor,
  CircleTickMinor,
  ExternalMinor,
  SaveMinor,
} from "@shopify/polaris-icons";

import styles from "./allProducts.module.scss";

import { SelectedProductDetails } from "../components/ui/ProductDescriptionCarousel";

// const SpacingBackground = ({ children, width = "100%" }) => {
//   return (
//     <div
//       style={{
//         background:
//           "repeating-linear-gradient(-45deg, #7B47F1, #7B47F1 1px, #E8D1FA 1px, #E8D1FA 7px)",
//         width: width ?? undefined,
//         height: "auto",
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// const Placeholder = ({ label = "", height = "auto", width = "auto" }) => {
//   return (
//     <div
//       style={{
//         display: "inherit",
//         background: "#7B47F1",
//         height: height ?? undefined,
//         width: width ?? undefined,
//       }}
//     >
//       <Inline align="center" blockAlign="center">
//         <div
//           style={{
//             color: "#FFFFFF",
//             width: width ?? undefined,
//           }}
//         >
//           <Text as="h2" variant="bodyMd" fontWeight="medium" alignment="center">
//             {label}
//           </Text>
//         </div>
//       </Inline>
//     </div>
//   );
// };

export default function AllProducts(props) {
  const [showProduct, setShowProduct] = React.useState(false);
  function toggleSelected() {
    console.log("Clicked");
    setShowProduct(!showProduct);
  }

  return (
    <div className={styles.Page}>
      <Page
        title="All Products"
        // titleMetadata={<Badge status="success">Online store</Badge>}
        breadcrumbs={[{ content: "Products", url: "#" }]}
        secondaryActions={
          <Stack>
            <Text variant="bodySm" as="span" color="subdued">
              Filters:
            </Text>
            <Tag url="#" onClick={() => toggleSelected()}>
              <Stack spacing="extraTight">
                <Icon source={AlertMinor} color="subdued" />
                <span> Not Started Yet </span>
              </Stack>
            </Tag>
            <Tag url="#" onClick={() => toggleSelected()}>
              <Stack spacing="extraTight">
                <Icon
                  source={CircleTickMinor}
                  color="subdued"
                  onClick={() => console.log("Clicked")}
                />
                <span>Reviewed </span>
              </Stack>
            </Tag>
            <Tag url="#" onClick={() => toggleSelected()}>
              <Stack spacing="extraTight">
                <Icon
                  source={SaveMinor}
                  color="subdued"
                  onClick={() => console.log("Clicked")}
                />
                <span>Saved For Later </span>
              </Stack>
            </Tag>
            <Tag url="#" onClick={() => toggleSelected()}>
              <Stack spacing="extraTight">
                <Icon
                  source={ExternalMinor}
                  color="subdued"
                  onClick={() => console.log("Clicked")}
                />
                <span>Published </span>
              </Stack>
            </Tag>
          </Stack>
        }
      >
        <Layout>
          <Layout.Section>
            {/* <SpacingBackground> */}
            <Columns
              columns={{
                xs: "3fr 3fr",
                md: "3fr 4fr",
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
              {showProduct ? (
                <SelectedProductDetails />
              ) : (
                <SelectedProductEmpty />
              )}
            </Columns>
            {/* </SpacingBackground> */}
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
