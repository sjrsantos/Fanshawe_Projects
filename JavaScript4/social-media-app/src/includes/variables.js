export const appName = "The Great App";

export const postStatus = ["Draft", "Published", "Archive"];

/**
 * Categories array
 * consist of id and name
 */
export const categories = [
  {
    id: "edu",
    name: "Education",
  },
  {
    id: "ent",
    name: "Entertainment",
  },
  {
    id: "gam",
    name: "Gaming",
  },
  {
    id: "nws",
    name: "News",
  },
  {
    id: "oth",
    name: "Other",
  },
];

/**
 * Get a category based on its id
 * @param {string} id
 *   The id of the category to retrieve
 * @returns
 *   The category name or "None" if not found
 */

export const getCategory = (id) => {
  const category = categories.find((c) => c.id === id);
  return category?.name || "None";
};

/**
 * List of available statuses
 */
export const statuses = [
  { id: "drf", text: "Draft" },
  { id: "pub", text: "Published" },
  { id: "arc", text: "Archived" },
];

/**
 * Get the status based on its id
 * @param {string} id
 *  The id of the status to retrieve
 * @returns
 * The status text or "Not Set" if not found
 */
export const getPostStatus = (id) => {
  const status = statuses.find((s) => s.id === id);
  return status?.text || "Not Set";
};
