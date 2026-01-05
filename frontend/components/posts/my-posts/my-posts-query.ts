import { parseAsInteger, parseAsString } from "nuqs";

export const myPostsQueryState = {
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};
