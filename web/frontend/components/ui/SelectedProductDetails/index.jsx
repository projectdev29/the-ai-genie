import React from "react";
import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import { Button, ButtonGroup, Card, Stack } from "@shopify/polaris";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  text: {
    textAlign: "center",
    padding: "2rem 1rem",
    maxWidth: "80%",
    margin: "0 auto",
  },
}));
export function SelectedProductDetails() {


  const [generate, setGenerate] = React.useState(false);
  const toggleGenerate = () => {
    setGenerate(!generate);
  };

  return (
    <Card title="Kids Winter Beanie Hat">
      <Card.Section>
        <Stack spacing="loose" vertical>
          <p>Some dummy description about the product can be viewed here.</p>
          <Stack distribution="fill">
            <ButtonGroup>
              <Button primary onClick={() => toggleGenerate()}>
                Generate
              </Button>
              <Button plain>Mark As Reviewed</Button>
              <Button plain>Save For Later</Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Card.Section>
      {generate ? (
        <Card.Section>
          <Text fz="lg">Generated Results</Text>
          <ProductDescriptionCarousel />
          <Button
            fullWidth={true}
            primary
            onClick={() => console.log("Clicked")}
          >
            Update Product
          </Button>
        </Card.Section>
      ) : null}
    </Card>
  );
}

export function ProductDescriptionCarousel({ generatedTextData }) {

  const { classes } = useStyles();

  return (
    <Carousel
      slideSize="100%"
      height={200}
      slideGap="xs"
      controlsOffset="xl"
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
        {" "}
        <Text className={classes.text} fz="sm">
          Detachable raccoon fur pom pom light weight and comfortable kids
          winter beanie hat.
        </Text>
      </Carousel.Slide>
    </Carousel>
  );
}
