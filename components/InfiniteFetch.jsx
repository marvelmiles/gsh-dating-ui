"use client";

import { queryClient } from "@/app/providers/QueryProvider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";

const InfiniteFetch = ({
  queryKey,
  queryFn,
  setApi,
  children,
  infiniteScroll = true,
}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isPlaceholderData, isRefetching, refetch } =
    useQuery({
      queryKey: [queryKey, page],
      queryFn: useCallback(() => queryFn(page), [queryFn]),
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
    if (infiniteScroll && !isPlaceholderData && inView && hasMore)
      setPage((page) => page + 1);
  }, [infiniteScroll, isPlaceholderData, inView, hasMore]);

  useEffect(() => {
    setApi &&
      setApi({
        hasMore,
        page,
        refetch,
        handleNextPage: () => setPage(hasMore ? page + 1 : page),
        handlePrevPage: () => setPage(page > 2 ? page - 1 : 1),
      });
  }, [setApi, page, hasMore, refetch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
          {children({ data: data?.data || [] })}
          <div ref={ref} />
          <div
            className={`
          py-4 text-center font-medium ${infiniteScroll ? "px-4" : ""}
          `}
          >
            {isRefetching ? (
              <Loading />
            ) : hasMore ? null : infiniteScroll ? (
              data?.data?.length ? (
                "Looks like you have reached the end"
              ) : (
                "Sorry, we can't find any match"
              )
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default InfiniteFetch;
