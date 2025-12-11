import { axiosInstance } from "../lib/axios";
import { mockCategoryMap } from "../mock";
import { mockBestDealProducts } from "../mock/products-best-deal.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === "true";

export async function getBestDealProducts() {
  if (USE_MOCK) {
    // Simulate network delay
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockBestDealProducts), 400)
    );
  }

  // LIVE GRAPHQL QUERY
  const query = `
    query Products {
      products {
        id
        name
        price
        category
      }
    }
  `;

  const res = await axiosInstance.post("graphql", { query });

  if (res.data.errors) {
    throw new Error(res.data.errors[0].message);
  }

  return res.data.data.products;
}

export async function getProductsByCategory(slug: string) {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockCategoryMap[slug] || []), 400)
    );
  }

  const query = `
    query ProductsByCategory($slug: String!) {
      productsByCategory(slug: $slug) {
        id
        name
        category
        price
        image
      }
    }
  `;

  const response = await axiosInstance.post("/graphql", {
    query,
    variables: { slug },
  });

  return response.data.data.productsByCategory;
}