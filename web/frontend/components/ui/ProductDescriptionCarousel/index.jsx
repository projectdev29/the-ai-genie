import React, { useState, useCallback, useEffect } from "react";
import { Card, Stack, TextField } from "@shopify/polaris";
import { Carousel } from "@mantine/carousel";
import { Text, Button } from "@mantine/core";
import { createStyles } from "@mantine/core";

import styles from "./ProductDescriptionCarousel.module.scss";

import AlertCircle from "../../../assets/Icons/AlertCircle";
import CheckmarkCircle from "../../../assets/Icons/CheckmarkCircle";
import FloppyDisk from "../../../assets/Icons/FloppyDisk";
import PaperPlane from "../../../assets/Icons/PaperPlane";

function Icon({ Src, color }) {
  return (
    <div style={{ color: color }}>
      <Src />
    </div>
  );
}

const icons = {
  "Not Started Yet": { source: AlertCircle, color: "#EBB21E" },
  Reviewed: { source: CheckmarkCircle, color: "#2789E5" },
  "Saved For Later": { source: FloppyDisk, color: "#999999" },
  Published: { source: PaperPlane, color: "#008080" },
};

const useStyles = createStyles((theme) => ({
  GenerateCard: {
    backgroundColor: "#f2fbfb",
    border: "1px solid #EAEAEA",
    borderRadius: "12px 12px 0 0",
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

export function SelectedProductDetails({ product }) {
  const { classes } = useStyles();

  return (
    <div>
      <div className={classes.GenerateCard}>
        <Card.Section>
          <Stack distribution="equalSpacing">
            <h3 className={classes.Heading}>{product.name}</h3>
            <Icon
              Src={icons[product.tag].source}
              color={icons[product.tag].color}
            />
          </Stack>
          <Stack spacing="loose" vertical>
            <p className={classes.SubHeading}>{product.description}</p>
            <Stack wrap={false}>
              <Button style={{ backgroundColor: "#008080" }}>Generate</Button>
              <Button variant="subtle">Mark As Reviewed</Button>
              <Button variant="subtle">Save For Later</Button>
            </Stack>
          </Stack>
        </Card.Section>
      </div>
      <Card.Section>
        <Stack alignment="center" distribution="fillEvenly">
          <Text my="lg" fz="lg">
            Generated Results
          </Text>
          <Text my="lg" fz="xs" c="dimmed" ta="right">
            Showing 1 of 5 Suggestions
          </Text>
        </Stack>
        <ProductDescriptionCarousel reviews={product.reviews} />
        <div className={classes.ButtonGroup}>
          <Button
            primary
            className={classes.Button}
            disabled={!product.reviews}
          >
            Update Product
          </Button>
        </div>
      </Card.Section>
    </div>
  );
}

export function ProductDescriptionCarousel({ reviews }) {
  const [sReviews, setSReviews] = useState();

  useEffect(() => {
    setSReviews(reviews);
  }, [reviews]);

  const handleChangeReview = useCallback(
    (index) => (value) => {
      setSReviews((prevSReviews) => {
        const newSReviews = [...prevSReviews];
        newSReviews[index] = value;
        return newSReviews;
      });
    },
    []
  );

  return (
    <Carousel
      slideSize="100%"
      slideGap="xs"
      controlsOffset="xs"
      controlSize={40}
      align="center"
    >
      {sReviews ? (
        sReviews.map((sReview, index) => (
          <Carousel.Slide key={index}>
            <div className={styles.TextField}>
              <TextField
                value={sReview}
                onChange={handleChangeReview(index)}
                multiline={4}
                autoComplete="off"
              />
            </div>
          </Carousel.Slide>
        ))
      ) : (
        <Carousel.Slide>
          <div className={styles.TextField}>
            <TextField
              placeholder={`Click “Generate” button above to generate new description suggestions. You can edit suggestions using this text area. Click side arrows to see next or previous suggestion. Once done click "Update Product" to save changes.`}
              multiline={4}
              autoComplete="off"
              disabled
            />
          </div>
        </Carousel.Slide>
      )}
    </Carousel>
  );
}
