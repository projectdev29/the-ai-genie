import { Card, Heading, Stack, TextContainer } from "@shopify/polaris";
import ProductStats from "./ProductStats";

export function Summary(props) {
  return (
    <Card
      title="Summary"
      primaryFooterAction={{
        content: "View All Products",
        onAction: props.showProductHandler,
      }}
      footerActionAlignment="left"
    >
      <Card.Section>
        <Stack wrap={false} distribution="center" alignment="center">
          <Stack.Item>
            <ProductStats />
          </Stack.Item>
        </Stack>
      </Card.Section>
      <Card.Section>
        <Stack>
          <Stack.Item>
            <TextContainer spacing="loose">
              <Heading>
                Brainstorm new descriptions or generate FAQs directly from the
                app.
              </Heading>
            </TextContainer>
          </Stack.Item>
        </Stack>
      </Card.Section>
    </Card>
  );
}
