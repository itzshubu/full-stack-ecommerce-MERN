/** Encode search query for URL path segment */
export const encodeSearchQuery = (query) =>
  encodeURIComponent((query || "").trim());

/** Decode search query from route param */
export const decodeSearchQuery = (param) => {
  if (!param) return "";
  try {
    return decodeURIComponent(param).trim();
  } catch {
    return String(param).trim();
  }
};

/** Build search results path */
export const getSearchPath = (query) => {
  const trimmed = (query || "").trim();
  if (!trimmed) return null;
  return `/search/${encodeSearchQuery(trimmed)}`;
};

/** Match products by name, description, category fields */
export const filterProductsBySearch = (products, query) => {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];

  return products.filter((item) => {
    const haystack = [
      item.name,
      item.description,
      item.subcategory,
      item.main_category,
      item.type,
      String(item.productId),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
};
