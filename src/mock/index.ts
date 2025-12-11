import { mockBestDealProducts } from "./products-best-deal.mock";
import { mockElectronicsProducts } from "./products-electronics.mock";
import { mockFashionProducts } from "./products-fashion.mock";
import { mockHomeAppliancesProducts } from "./products-home-appliances.mock";

import { mockSportsProducts } from "./products-sports.mock";

export const mockCategoryMap: Record<string, any[]> = {
  sports: mockSportsProducts,
  fashion: mockFashionProducts,
  electronics: mockElectronicsProducts,
  homeAppliances: mockHomeAppliancesProducts
};

export { mockBestDealProducts };
