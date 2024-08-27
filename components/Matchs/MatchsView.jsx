"use client";

import React, { useState } from "react";
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
import { serializeFilter } from "@/app/utils/serializers";

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
  searchParam,
  endEl = "",
  emptyEl = "",
}) => {
  const {
    currentUser: { id: cid, isLogin },
  } = useAuth();

  const { isScreen } = useScreen({ screen: 1024 });

  const [filterParam, setFilterParam] = useState("");

  const [api, setApi] = useState({});

  const { isSubmitting, handleSubmit, reset, register } = useForm({
    defaultFormData: {
      gender: "male",
    },
  });

  const getQuery = async (page) => {
    console.log(cid, "ss");

    const res = await axios.get(
      `/users/?page=${page}&size=${size}&type=${type}&searchUid=${
        cid ? cid : ""
      }&q=${query}&${searchParam}&${serializeFilter(
        filterParams
      )}&${filterParam}`
    );

    if (!res.success) throw res;

    return res.data;
  };

  const handleApplyFilter = async () => {
    try {
      const { errors, formData } = handleSubmit();

      if (errors) return toast("Invalid data", { type: "error" });

      const param = serializeFilter(formData);

      setFilterParam(param);
    } catch (err) {
    } finally {
      reset(true);
    }
  };

  const renderFilterBtns = () => {
    const contClass = "w-[46%] sm:w-[120px] lg:w-auto lg:items-center";

    return (
      <div
        className={`
      flex flex-wrap gap-x-4 gap-y-2 my-4 sm:items-center 
      sm:gap-y-6
      `}
      >
        <Dropdown
          orientation={isScreen ? "horizontal" : undefined}
          label="Gender"
          items={["Male", "Female", "Both"]}
          containerClassName={contClass}
          triggerClassName="w-full"
          onSelect={(gender) => reset((formData) => ({ ...formData, gender }))}
        />
        <FormField
          type="number"
          label="Age"
          orientation={isScreen ? "horizontal" : undefined}
          containerClassName={contClass}
          wrapperClassName="w-full"
          className="py-3"
          {...register("age")}
        />
        <FormField
          label="Country of Residence"
          orientation={isScreen ? "horizontal" : undefined}
          containerClassName={`${contClass} w-full sm:w-auto`}
          className="py-3"
          {...register("residentCountry")}
        />
        <div
          className="
          mt-3 sm:mt-0 w-full lg:w-auto
          "
        >
          <Button
            disabled={isSubmitting || api.isFetching}
            size="default-min"
            onClick={handleApplyFilter}
            className="h-[45px]"
          >
            Filter
          </Button>
        </div>
      </div>
    );
  };

  const galleryProps = { hideCarouselBtns: true, withVideoEvent: false };

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
