import React from "react";
import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import { Card, Stack, Icon } from "@shopify/polaris";
import { Button } from "@mantine/core";

import { createStyles } from "@mantine/core";
import { CirclePlusMinor } from "@shopify/polaris-icons";

import styles from "./ProductDescriptionCarousel.module.scss";

const useStyles = createStyles((theme) => ({
  GenerateCard: {
    backgroundColor: "#f2fbfb",
    border: "1px solid #EAEAEA",
    borderRadius: "12px 12px 0 0",
  },
  text: {
    textAlign: "center",
    padding: "4rem 1rem",
    maxWidth: "80%",
    margin: "0 auto",
  },
  Heading: {
    fontSize: "16px",
  },
  SubHeading: {
    fontSize: "12px",
  },
  ButtonGroup: {
    padding: "1rem",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
  Button: {
    backgroundColor: "#2789e5",
    width: "50%",
  },
}));
export function SelectedProductDetails() {
  const { classes } = useStyles();

  const [generate, setGenerate] = React.useState(false);
  const toggleGenerate = () => {
    setGenerate(!generate);
  };

  return (
    <div>
      <div className={classes.GenerateCard}>
        <Card.Section>
          <Stack distribution="equalSpacing">
            <h3 className={classes.Heading}>Kids Winter Beanie Hat</h3>
            <Icon source={CirclePlusMinor} />
          </Stack>
          <Stack spacing="loose" vertical>
            <p className={classes.SubHeading}>
              Some dummy description about the product can be viewed here.
            </p>
            <Stack wrap={false}>
              <Button
                style={{ backgroundColor: "#008080" }}
                onClick={() => toggleGenerate()}
              >
                Generate
              </Button>
              <Button variant="subtle">Mark As Reviewed</Button>
              <Button variant="subtle">Save For Later</Button>
            </Stack>
          </Stack>
        </Card.Section>
      </div>
      {generate ? (
        <Card.Section>
          <Stack alignment="center" distribution="fillEvenly">
            <Text my="lg" fz="lg">
              Generated Results
            </Text>
            <Text my="lg" fz="xs" c="dimmed" ta="right">
              Showing 1 of 5 Suggestions
            </Text>
          </Stack>
          <ProductDescriptionCarousel />
          <div className={classes.ButtonGroup}>
            <Button
              primary
              onClick={() => console.log("Clicked")}
              className={classes.Button}
            >
              Update Product
            </Button>
          </div>
        </Card.Section>
      ) : null}
    </div>
  );
}

export function ProductDescriptionCarousel({ generatedTextData }) {
  const { classes } = useStyles();

  return (
    <div className={styles.TextCard}>
      <Carousel
        slideSize="100%"
        height={200}
        slideGap="xs"
        controlsOffset="xs"
        controlSize={40}
      >
        <Carousel.Slide>
          <Text className={classes.text} fz="sm">
            Detachable raccoon fur pom pom light weight and comfortable kids
            winter beanie hat.
          </Text>
        </Carousel.Slide>
        <Carousel.Slide>
          <Text className={classes.text} fz="sm">
            Detachable raccoon fur pom pom light weight and comfortable kids
            winter beanie hat.
          </Text>
        </Carousel.Slide>
        <Carousel.Slide>
          <Text className={classes.text} fz="sm">
            Detachable raccoon fur pom pom light weight and comfortable kids
            winter beanie hat.
          </Text>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
