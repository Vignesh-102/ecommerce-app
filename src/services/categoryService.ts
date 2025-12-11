import { axiosInstance } from "../lib/axios";
import { mockCategories } from "../mock/categories.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === "true";

export async function getCategories() {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockCategories), 300)
    );
  }

  const query = `
    query {
      categories {
        id
        name
        slug
      }
    }
  `;

  const res = await axiosInstance.post("/graphql", { query });

  if (res.data.errors) {
    throw new Error(res.data.errors[0].message);
  }

  return res.data.data.categories;
}
