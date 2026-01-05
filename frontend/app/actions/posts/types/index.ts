export type CreatePostInput = {
  title: string;
  content: string;
};

export type PostErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type UpdatePostInput = {
  id: number;
  title?: string;
  content?: string;
};

export type DeletePostInput = {
  id: number;
};
