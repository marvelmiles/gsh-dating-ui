"use client";

import React, { useRef, useState } from "react";
import MatchCard from "./MatchCard";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Dropdown from "../Dropdown";
import FormField from "../FormField";
import Typography from "../Typography";
import { cn } from "@/lib/utils";
import useScreen from "@/app/hooks/useScreen";
import axios from "@/lib/axios";
import { defaultUser, useAuth } from "@/app/providers/AuthProvider";
import InfiniteFetch from "../InfiniteFetch";
import useForm from "@/app/hooks/useForm";
import { toast } from "react-toastify";
import { createSearchParam } from "@/app/utils/serializers";

const MatchsView = ({
  withPagniation = false,
  orientation = "vertical",
  title,
  containerClassName,
  queryKey = "users",
  type = "",
  size = 10,
  filterParams,
  query = "",
  searchParam = "",
  endEl,
  emptyEl,
  searchUid = "",
}) => {
  const {
    currentUser: { id: cid, isLogin },
  } = useAuth();

  const { isScreen } = useScreen({ screen: 1200 });

  const stateRef = useRef({});

  const [filterParam, setFilterParam] = useState(undefined);

  const [api, setApi] = useState({});

  const {
    isSubmitting,
    handleSubmit,
    reset,
    register,
    formData: { gender },
  } = useForm({
    defaultFormData: {
      gender: "male",
    },
  });

  const getQuery = async (page) => {
    const params = createSearchParam(
      {
        ...filterParam,
        ...filterParams,
      },
      `size=${size}&type=${type}&q=${query}&searchUid=${`${searchUid} ${cid}`}&${searchParam}`,
      "filter"
    );

    stateRef.current.params = params;

    const res = await axios.get(`/users/?page=${page}&${params}`);

    if (!res.success) throw res;

    return res.data;
  };

  const handleApplyFilter = () => {
    try {
      const { errors, formData } = handleSubmit();

      if (errors) return toast("Invalid data", { type: "error" });

      setFilterParam(formData);
    } catch (err) {
    } finally {
      reset(true);
    }
  };

  const handleResetFilter = () => {
    reset({});
    setFilterParam(undefined);
  };

  const renderFilterBtns = () => {
    return (
      <div
        className="
      flex flex-col lg:flex-row gap-4 mb-4 lg:items-center
      "
      >
        <div
          className={`
          grid grid-cols-1 s320:grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2
          my-4 sm:gap-y-6
      `}
        >
          <Dropdown
            reset={!gender}
            orientation={isScreen ? "horizontal" : undefined}
            label="Gender"
            items={["Male", "Female", "Both"]}
            triggerClassName="w-full py-3"
            containerClassName="lg:items-center"
            onSelect={(gender) =>
              reset((formData) => ({ ...formData, gender }))
            }
          />
          <FormField
            type="number"
            label="Age"
            orientation={isScreen ? "horizontal" : undefined}
            wrapperClassName="w-full"
            containerClassName="lg:items-center"
            className="py-3"
            {...register("age")}
          />
          <FormField
            label="Country of Residence"
            orientation={isScreen ? "horizontal" : undefined}
            containerClassName={`
            s320:col-span-2 sm:col-auto lg:items-center
            `}
            wrapperClassName="w-full"
            className="py-3"
            {...register("residentCountry")}
          />
        </div>
        <div
          className="
          w-full lg:w-auto flex gap-4
          "
        >
          {filterParam ? (
            <Button
              disabled={isSubmitting || api.isFetching}
              size="default-min"
              onClick={handleResetFilter}
              className="py-[14px] h-auto flex-1 md:max-w-[224px]"
              variant="outline"
            >
              Reset
            </Button>
          ) : null}

          <Button
            disabled={isSubmitting || api.isFetching}
            size="default-min"
            onClick={handleApplyFilter}
            className="py-[14px] h-auto flex-1 md:max-w-[224px]"
          >
            Filter
          </Button>
        </div>
      </div>
    );
  };

  const galleryProps = { hideCarouselIndicators: true, withVideoEvent: false };

  const gridClass = `
  grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  xl:grid-cols-4 ${orientation === "horizontal" ? "px-4" : ""}
  `;

  const isInfiniteScroll = orientation === "vertical";

  return (
    <div
      className={cn(
        `w-full flex flex-col gap-4 ${title ? "mt-[80px]" : ""}`,
        containerClassName
      )}
    >
      {!withPagniation && renderFilterBtns()}

      {/* {isLogin + "" + cid} */}

      {title && (
        <Typography
          variant="h3"
          className="font-bold mb-5 font-garamond text-center"
        >
          {title}
        </Typography>
      )}
      <InfiniteFetch
        infiniteScroll={isInfiniteScroll}
        setApi={setApi}
        queryKey={[
          filterParams,
          size,
          query,
          searchParam,
          cid,
          type,
          queryKey,
          filterParam,
        ]}
        key={orientation + filterParam + query}
        queryFn={getQuery}
        endEl={endEl}
        emptyEl={emptyEl}
      >
        {({ data }) => {
          return orientation === "horizontal" ? (
            <div className={gridClass}>
              {data.slice(0, 4).map((user = defaultUser, i) => (
                <MatchCard user={user} galleryProps={galleryProps} key={i} />
              ))}
            </div>
          ) : (
            <div className={gridClass}>
              {data.map((user = defaultUser, i) => (
                <MatchCard user={user} galleryProps={galleryProps} key={i} />
              ))}
            </div>
          );
        }}
      </InfiniteFetch>

      {withPagniation && (
        <div className="my-12 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon-xl"
              className="hover:bg-muted/50"
              disabled={api.page === 1}
              onClick={api.handlePrevPage}
            >
              <ChevronLeftIcon />
            </Button>
            <Typography variant="text">{api.page}</Typography>
            <Button
              disabled={!api.hasMore}
              variant="ghost"
              size="icon-xl"
              className="hover:bg-muted/50"
              onClick={api.handleNextPage}
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div className="px-4">
            <Typography variant="h3" className="mb-8 text-center">
              Filter Your Matches
            </Typography>
            {renderFilterBtns()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchsView;
