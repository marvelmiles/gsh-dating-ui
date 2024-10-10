"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { genderList, interestedInList } from "@/app/config/constants";

const MatchsView = ({
  withPagniation = false,
  orientation = "vertical",
  title,
  containerClassName,
  queryKey = "users",
  type = "",
  size = 10,
  filterParams,
  searchParam = "",
  endEl,
  emptyEl,
  searchUid = "",
}) => {
  const {
    currentUser: { id: cid, search: query = "" },
  } = useAuth();

  searchParam = searchParam || query ? `bio=fullname` : "";

  const { isScreen } = useScreen({ screen: 14000 });

  const stateRef = useRef({});

  const [api, setApi] = useState({});

  const defaultFormData = {
    gender: "",
    interestedIn: "",
    age: "",
    residentCountry: "",
  };

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    reset,
    register,
    formData,
  } = useForm({
    defaultFormData,
  });

  const [filterParam, setFilterParam] = useState(defaultFormData);

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

  const handleApplyFilter = useCallback(
    (data = {}) => {
      try {
        const { errors, formData } = handleSubmit();

        if (errors) return toast("Invalid data", { type: "error" });

        setFilterParam({
          ...formData,
          gender: formData.gender === "Both" ? "" : formData.gender,
          interestedIn:
            formData.interestedIn === "Anyone" ? "" : formData.gender,
          ...(data.target ? {} : data),
        });
      } catch (err) {
      } finally {
        reset(true);
      }
    },
    [handleSubmit]
  );

  useEffect(() => {
    console.log(formData);
    if (!formData.age || !formData.residentCountry) handleApplyFilter();
  }, [formData, handleApplyFilter]);

  const renderFilterBtns = () => {
    return (
      <div
        className="
      flex flex-col lg:flex-row gap-4 mb-4 lg:items-center
      "
      >
        <div
          className={`
          grid grid-cols-1 s320:grid-cols-2 md:grid-cols-4 gap-y-2
          my-4 sm:gap-y-6 gap-4
      `}
        >
          <Dropdown
            reset={!formData.gender}
            orientation={isScreen ? "horizontal" : undefined}
            label="Gender"
            items={genderList}
            triggerClassName="w-full py-3"
            onSelect={(gender) =>
              reset((formData) => ({ ...formData, gender }))
            }
          />

          <Dropdown
            reset={!formData.interestedIn}
            orientation={isScreen ? "horizontal" : undefined}
            label="Interested In"
            items={interestedInList}
            triggerClassName="w-full py-3"
            onSelect={(interestedIn) =>
              reset((formData) => ({ ...formData, interestedIn }))
            }
          />

          <FormField
            type="number"
            label="Age"
            orientation={isScreen ? "horizontal" : undefined}
            wrapperClassName="w-full"
            className="py-3"
            {...register("age")}
          />
          <FormField
            label="Country of Residence"
            orientation={isScreen ? "horizontal" : undefined}
            containerClassName={`
            s320:col-span-2 sm:col-auto
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
          <Button
            loading={isSubmitting || api.isFetching}
            size="default-min"
            onClick={handleApplyFilter}
            className="py-[14px] h-auto flex-1 md:max-w-[164px]"
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
