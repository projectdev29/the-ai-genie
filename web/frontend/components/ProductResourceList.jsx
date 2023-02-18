import { useNavigate } from "@shopify/app-bridge-react";
import {
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  ChoiceList,
  Filters,
  Badge,
  Stack,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { BackendApiHelper } from "../../middleware/backendapihelper";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { ProductSidebar } from "./ui/ProductSidebar";

export function ProductResourceList(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authFetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [productFilterStatus, setProductFiterStatus] = useState(null);
  const [tagsMap, setTagsMap] = useState([]);
  const [storeId, setStoreId] = useState(null);

  const handleProductFilterStatusChange = useCallback((value) => {
    setProductFiterStatus(value);
    console.log(value);
  }, []);

  const handleProductFilterStatusRemove = useCallback(
    () => setProductFiterStatus(null),
    []
  );

  const filters = [
    {
      key: "productFilterStatus",
      label: "Select Tags to filter",
      filter: (
        <ChoiceList
          title="Product status"
          titleHidden
          choices={[
            { label: "Not Yet Started", value: "Not Yet Started" },
            { label: "Saved For Later", value: "Saved For Later" },
            { label: "Reviewed", value: "Reviewed" },
          ]}
          selected={productFilterStatus || []}
          onChange={handleProductFilterStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(productFilterStatus)) {
    const key = "productFilterStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, productFilterStatus),
      onRemove: handleProductFilterStatusRemove,
    });
  }

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  function disambiguateLabel(key, value) {
    switch (key) {
      case "productFilterStatus":
        return value.map((val) => ` ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
  function processVariants(variant) {
    return {
      title: variant.title == "Default Title" ? "" : variant.title,
      weight: variant.weight + " " + variant.weight_unit,
    };
  }

  function updateTag(tagValue) {
    setIsLoading(true);
    let newTagsMap = tagsMap;
    let mapPromises = products.map(async (product) => {
      if (selectedItems.includes(product.id)) {
        await BackendApiHelper.doPost("/api/product/tag", {
          productId: product.id,
          storeId: storeId,
          tag: tagValue,
        });
        newTagsMap[product.id.toString()] = tagValue;
      }
    });
    Promise.all(mapPromises).then(() => {
      setTagsMap(newTagsMap);
      setIsLoading(false);
      props.updateBanner("Success", true);
      setSelectedItems([]);
    });
  }

  function deleteTags() {
    setIsLoading(true);
    let newTagsMap = tagsMap;
    let mapPromises = products.map(async (product) => {
      if (selectedItems.includes(product.id)) {
        await BackendApiHelper.doDelete("/api/product/tag", {
          productId: product.id,
          storeId: storeId,
        });
        if (newTagsMap[product.id.toString()]) {
          newTagsMap[product.id.toString()] = "Not Yet Started";
        }
      }
    });
    Promise.all(mapPromises).then(() => {
      setTagsMap(newTagsMap);
      setIsLoading(false);
      props.updateBanner("Success", true);
      setSelectedItems([]);
    });
  }

  function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  const navigateToItemDetails = useCallback((id) => {
    navigate("/productdetails/" + id + "," + storeId);
  });

  useEffect(async () => {
    setIsLoading(true);

    const shopResponse = await authFetch("/api/shop");
    const store = await shopResponse.json();
    setStoreId(store[0].id);
    const productsFromDb = await BackendApiHelper.doGet(
      "/api/products/" + store[0].id
    );

    if (productsFromDb.result) {
      let initialTagsMap = [];
      await Promise.all(
        productsFromDb.result.map((productFromDb) => {
          initialTagsMap[productFromDb.product_id.toString()] =
            productFromDb.tags;
        })
      );
      setTagsMap(initialTagsMap);
    }

    const response = await authFetch("/api/products");
    const data = await response.json();

    let initProductList = [];
    data.map((product) => {
      let bodyText = stripHtml(product.body_html);
      let fullText = bodyText;
      if (bodyText.length > 200) {
        bodyText = bodyText.substring(0, 200) + "...";
      }
      let vars = product.variants.map(processVariants);
      let mediaUrl = product.images.length > 0 ? product.images[0].src : null;
      const productToAdd = {
        id: product.id,
        name: product.title,
        description: bodyText,
        full_description: fullText,
        variants: vars,
        content: "",
        mediaUrl: mediaUrl,
      };
      initProductList.push(productToAdd);
    });
    setIsLoading(false);
    setProducts(initProductList);
  }, []);

  const promotedBulkActions = [
    {
      content: "Mark As Reviewed",
      onAction: () => {
        updateTag("Reviewed");
      },
    },
    {
      content: "Save For Later",
      onAction: () => {
        updateTag("Saved For Later");
      },
    },
    {
      content: "Clear Tags",
      onAction: () => {
        deleteTags();
      },
    },
  ];

  const bulkActions = [];

  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={products}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        loading={isLoading}
        // bulkActions={bulkActions}
        filterControl={
          <Filters
            filters={filters}
            appliedFilters={appliedFilters}
            hideQueryField
          />
        }
      />
      <ProductSidebar />
    </Card>
  );

  function renderItem(item) {
    const { id, mediaUrl, name, description } = item;
    const media = (
      <Avatar customer size="large" name={name} source={mediaUrl} />
    );

    let badgeProgress = null;
    let badgeStatus = "attention";
    let badgeText = "Not Yet Started";
    let tagStatus = tagsMap[id];

    if (tagStatus) {
      badgeText = tagStatus;
    }
    if (tagStatus === "Reviewed") {
      badgeProgress = "complete";
      badgeStatus = null;
    } else if (tagStatus === "In Progress") {
      badgeProgress = "partiallyComplete";
      badgeStatus = "warning";
    } else if (tagStatus === "Saved For Later") {
      badgeProgress = null;
      badgeStatus = "info";
    }

    const ri = (
      <ResourceItem
        id={id}
        // url={url}
        media={media}
        onClick={navigateToItemDetails}
        accessibilityLabel={`Click to select ${name}`}
        persistActions
      >
        <Stack>
          <Stack.Item fill>
            <p>
              <b>{name}</b>
            </p>
            <div>{description}</div>
          </Stack.Item>
          <Stack.Item>
            <Badge progress={badgeProgress} status={badgeStatus}>
              {badgeText}
            </Badge>
          </Stack.Item>
        </Stack>
      </ResourceItem>
    );
    let displayItem = false;
    if (productFilterStatus) {
      let key = "";
      for (key in productFilterStatus) {
        if (tagsMap[id] && tagsMap[id].includes(productFilterStatus[key])) {
          displayItem = true;
          break;
        }
      }
      if (displayItem) {
        return ri;
      } else {
        return null;
      }
    } else {
      return ri;
    }
  }
}
