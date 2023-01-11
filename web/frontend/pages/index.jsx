import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Button,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {
  const authFetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [store, setStore] = useState({});
  let shopExists = false;

  useEffect(() => {
    authFetch("/api/shop")
      .then((response) => response.json())
      .then((responseJson) => {
        setStore(responseJson[0]);
        // fetch("http://localhost:3000/api/store/" + store[0].id)
        //   .then((storeData) => storeData.json())
        //   .then((storeJsonData) => {
        //     // this means first time user. lets get started should save store info
        //     console.log("data returned from api: " + storeJsonData.result[0]);
        //   });
      });
  }, []);

  const getStarted = useCallback(() => {
    if (!shopExists) {
      fetch("http://localhost:3000/api/store/", {
        method: "POST",
        body: JSON.stringify({
          storeId: store.id,
          name: store.name,
          description: store.email,
        }),
        headers: { "Content-Type": "application/json" },
      }).then(navigate("/allproducts", store));
    }
  });
  return (
    <Page narrowWidth>
      <TitleBar title="Welcome to The Brainstormer!" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>
                    Generate FAQs for all your products with ease.
                  </Heading>
                  <p>Ready to go?</p>
                  <Button primary onClick={getStarted}>
                    Let's get started!
                  </Button>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Welcome trophy"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>
                    Generate FAQs for all your products with ease.
                  </Heading>
                  <p>Ready to go?</p>
                  <Button primary onClick={getStarted}>
                    Let's get started!
                  </Button>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Welcome trophy"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
