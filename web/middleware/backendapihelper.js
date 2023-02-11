export const BackendApiHelper = {
  endpoint: "http://localhost:3000",
  doGet: async function (resourcePath) {
    const response = await fetch(this.endpoint + resourcePath);
    return await response.json();
  },
  doPost: async function (resourcePath, body) {
    const response = await fetch(this.endpoint + resourcePath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  doDelete: async function (resourcePath, body) {
    const response = await fetch(this.endpoint + resourcePath, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },
};
