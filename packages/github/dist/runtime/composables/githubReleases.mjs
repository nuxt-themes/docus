import { withQuery } from "ufo";
export const githubReleases = (query = {}) => {
  const url = withQuery("/api/_github/releases", query);
  return $fetch(url);
};
