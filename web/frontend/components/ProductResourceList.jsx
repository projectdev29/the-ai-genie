import { useNavigate } from "@shopify/app-bridge-react";
import { Card, ResourceList, Avatar, ResourceItem } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProductResourceList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authFetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  function processVariants(variant) {
    return {
      title: variant.title == "Default Title" ? "" : variant.title,
      weight: variant.weight + " " + variant.weight_unit,
    };
  }

  function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  const handleItemClick = useCallback((id) => {
    products.map((p) => {
      if (p.id === id) {
        navigate("/productdetails/" + id);
      }
    });
  });

  useEffect(() => {
    console.log("effect here");
    setIsLoading(true);
    authFetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        let initProductList = [];
        data.map((product) => {
          let bodyText = stripHtml(product.body_html);
          let fullText = bodyText;
          if (bodyText.length > 200) {
            bodyText = bodyText.substring(0, 200) + "...";
          }
          let vars = product.variants.map(processVariants);
          const productToAdd = {
            id: product.id,
            name: product.title,
            description: bodyText,
            full_description: fullText,
            variants: vars,
            content: "",
          };
          initProductList.push(productToAdd);
        });
        setProducts(initProductList);
      });
  }, []);

  const promotedBulkActions = [
    {
      content: "Generate FAQs",
      onAction: () => {
        let updatedProducts = [];
        let mapPromises = products.map(async (product) => {
          if (selectedItems.includes(product.id)) {
            const resp = await fetch(
              "http://localhost:3000/api/generatefaqforproduct",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ store: { id: "foo" }, product }),
              }
            );
            const jsonResponse = await resp.json();

            let updatedProduct = {
              ...product,
              content: jsonResponse.result,
            };
            updatedProducts.push(updatedProduct);
          } else {
            updatedProducts.push(product);
          }
        });
        Promise.all(mapPromises).then(() => {
          setProducts(updatedProducts);
        });
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
        bulkActions={bulkActions}
      />
    </Card>
  );

  function renderItem(item) {
    const { id, url, name, description, content } = item;
    const media = <Avatar customer size="medium" name={name} />;
    console.log("here");
    const promotedBulkActions = content
      ? [
          {
            content: "View FAQs",
            onAction: () => {
              alert(content);
            },
          },
        ]
      : null;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        onClick={handleItemClick}
        accessibilityLabel={`Click to select ${name}`}
        shortcutActions={promotedBulkActions}
        persistActions
      >
        <p>
          <b>{name}</b>
        </p>
        <div>{description}</div>
        {/* <div>{content}</div> */}
      </ResourceItem>
    );
  }
}
