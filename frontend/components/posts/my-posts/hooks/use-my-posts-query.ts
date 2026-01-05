"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { useQueryStates } from "nuqs";
import type { PostListItem } from "../../shared/post-types";
import { myPostsQueryState } from "../my-posts-query";

type UseMyPostsQueryOptions = {
  posts: PostListItem[];
  pageSize?: number;
  debounceMs?: number;
};

export function useMyPostsQuery({
  posts,
  pageSize = 8,
  debounceMs = 350,
}: UseMyPostsQueryOptions) {
  const [{ q, page }, setQuery] = useQueryStates(myPostsQueryState);
  const [searchValue, setSearchValue] = useState(q);

  useEffect(() => {
    setSearchValue(q);
  }, [q]);

  useEffect(() => {
    if (searchValue === q) {
      return;
    }

    const timeoutId = setTimeout(() => {
      void setQuery({ q: searchValue, page: 1 }, { history: "replace" });
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchValue, q, setQuery, debounceMs]);

  const normalizedQuery = q.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(normalizedQuery)
    );
  }, [posts, normalizedQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / pageSize)
  );
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    if (page !== currentPage) {
      void setQuery({ page: currentPage }, { history: "replace" });
    }
  }, [page, currentPage, setQuery]);

  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = filteredPosts.slice(
    pageStart,
    pageStart + pageSize
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handlePrevPage = () => {
    void setQuery(
      { page: Math.max(1, currentPage - 1) },
      { history: "push" }
    );
  };

  const handleNextPage = () => {
    void setQuery(
      { page: Math.min(totalPages, currentPage + 1) },
      { history: "push" }
    );
  };

  return {
    searchValue,
    filteredPosts,
    pageItems,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePrevPage,
    handleNextPage,
  };
}
