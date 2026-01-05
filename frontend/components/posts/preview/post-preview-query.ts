import { parseAsBoolean, parseAsInteger } from "nuqs";

export const postPreviewQueryState = {
  dialog: parseAsBoolean.withDefault(false),
  postId: parseAsInteger,
  edit: parseAsBoolean,
};
