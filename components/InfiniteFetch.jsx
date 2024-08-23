"use client";

import { queryClient } from "@/app/providers/QueryProvider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteFetch = ({ queryKey, queryFn, children }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isPlaceholderData, isRefetching } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    select(data) {
      let d = [];

      for (let i = 1; i < page; i++) {
        d = [...d, ...(queryClient.getQueryData([queryKey, i])?.data || [])];
      }

      return {
        ...data,
        data: d.concat(data.data),
      };
    },
  });

  const { ref, inView } = useInView();

  const hasMore =
    data && data.data.length < data.totalDocs && page < data.totalPages;

  useEffect(() => {
    if (!isPlaceholderData && inView && hasMore) setPage((page) => page + 1);
  }, [isPlaceholderData, inView, hasMore]);

  return (
    <>
      {isLoading ? (
        <div>"Fetching..." </div>
      ) : (
        <div>
          {children({ data: data?.data || [] })}
          <div ref={ref} />
          <div>
            {isRefetching
              ? "Loading more..."
              : hasMore
              ? "Load More"
              : "Nothing more to load"}
          </div>
        </div>
      )}
    </>
  );
};

export default InfiniteFetch;
