import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { ProductResourceList } from "../components/ProductResourceList";

export default function PageName() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Heading>
            Select the products and see what actions you can perform on them{" "}
          </Heading>
          <ProductResourceList />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
