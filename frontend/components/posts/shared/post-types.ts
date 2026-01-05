export type PostListItem = {
  id: number;
  title: string;
  author: string | null;
  created_at: string | null;
};

export type PostPreview = {
  id: number;
  title: string;
  content: string;
  author: string | null;
  created_at: string | null;
  updated_at?: string | null;
};
