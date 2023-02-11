import { Page, Layout, Heading } from "@shopify/polaris";
import { ProductResourceList } from "../components/ProductResourceList";

export default function AllProducts(props) {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <ProductResourceList />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
