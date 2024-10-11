"use client";

import { queryClient } from "@/app/providers/QueryProvider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import { Button } from "./ui/button";
import Typography from "./Typography";

const InfiniteFetch = ({
  queryKey,
  queryFn,
  setApi,
  children,
  infiniteScroll = true,
  endEl = "Looks like you have reached the end",
  emptyEl = infiniteScroll
    ? "Sorry, we can't find any match"
    : "Looks like there's is no data for this page",
}) => {
  const [reload, setReload] = useState(false);

  const [page, setPage] = useState(1);

  const getCacheData = (
    data = {
      data: [],
      currentPage: page,
    }
  ) => {
    if (!infiniteScroll) return data;

    let d = [];

    for (let i = 0; i < data.currentPage; i++) {
      d = [...d, ...(queryClient.getQueryData([queryKey, i])?.data || [])];
    }

    if (!d.length) d = data.data;

    return {
      ...data,
      data: d,
    };
  };

  const {
    data,
    isLoading,
    isPlaceholderData,
    isRefetching,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    select: getCacheData,
  });

  const { ref, inView } = useInView();

  const initData = queryClient.getQueryData([queryKey, 1]) ||
    data || {
      data: [],
    };

  const hasFetched = initData.totalPages !== undefined;

  const hasMore = infiniteScroll
    ? data && data.data.length < data.totalDocs && page < data.totalPages
    : page < initData.totalPages;

  useEffect(() => {
    if (infiniteScroll && !isPlaceholderData && inView && hasMore)
      setPage((page) => page + 1);
  }, [infiniteScroll, isPlaceholderData, inView, hasMore]);

  useEffect(() => {
    setApi &&
      setApi({
        hasFetched,
        hasMore,
        page,
        isFetching,
        refetch,
        setReload,
        handleNextPage: () => {
          !infiniteScroll && setReload(true);
          setPage(hasMore ? page + 1 : page);
        },
        handlePrevPage: () => {
          !infiniteScroll && setReload(true);
          setPage(page > 2 ? page - 1 : 1);
        },
      });
  }, [
    setApi,
    page,
    hasFetched,
    hasMore,
    refetch,
    setReload,
    infiniteScroll,
    isFetching,
  ]);

  useEffect(() => {
    if (!isFetching && reload) setReload(false);
  }, [isFetching, reload]);

  const retryEl = (
    <div className="flex-center flex-col gap-4">
      <Typography>
        Something went wrong. Check network and try again.
      </Typography>
      <Button onClick={() => refetch()} className="w-full max-w-[145px]">
        Retry
      </Button>
    </div>
  );

  return (
    <>
      {(!infiniteScroll && isRefetching) || isLoading || reload ? (
        <Loading />
      ) : hasFetched ? (
        <div className="">
          {children({ data: (data || getCacheData()).data })}
          <div ref={ref} />
          <div
            className={`
          py-4 text-center font-medium ${infiniteScroll ? "px-4" : ""}
          `}
          >
            {isRefetching ? (
              <Loading />
            ) : error ? (
              retryEl
            ) : hasMore ? null : data.data.length ? (
              endEl
            ) : (
              emptyEl
            )}
          </div>
        </div>
      ) : infiniteScroll ? (
        <Typography className="text-center">
          Something went wrong. Refresh browser or check network.
        </Typography>
      ) : (
        retryEl
      )}
    </>
  );
};

export default InfiniteFetch;
