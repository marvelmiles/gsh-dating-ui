"use client";

import React, { useCallback, useMemo, useState } from "react";
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

const MatchsView = ({
  withPagniation = false,
  orientation = "vertical",
  title,
  containerClassName,
  queryKey,
  type = "",
}) => {
  const {
    currentUser: { id: cid },
  } = useAuth();

  const { isScreen } = useScreen({ screen: 1024 });

  const [filterParam, setFilterParam] = useState("");

  const { isSubmitting, handleSubmit, reset, register } = useForm();

  queryKey = queryKey || useMemo(() => new Date().getTime().toString(), []);

  const getQuery = useCallback(
    async (page) => {
      const res = await axios.get(
        `/users/?page=${page}&size=10&type=${type}&filter=${filterParam}&${
          cid ? `searchUid=${cid}` : ""
        }`
      );

      if (!res.success) throw res;

      return res.data;
    },
    [filterParam]
  );

  const handleApplyFilter = async () => {
    const { errors, formData } = handleSubmit();

    if (errors) return toast("Invalid data", { type: "error" });
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
          items={["Man", "Woman", "Both"]}
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
            disabled={isSubmitting}
            size="default-min"
            onClick={handleApplyFilter}
            // className="ml-auto"
          >
            Filter
          </Button>
        </div>
      </div>
    );
  };

  const galleryProps = { medias: [1] };

  const gridClass = `
  grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  xl:grid-cols-4
  `;

  return (
    <div
      className={cn(
        `w-full flex flex-col gap-4 ${title ? "mt-[80px]" : ""}`,
        containerClassName
      )}
    >
      {!withPagniation && renderFilterBtns()}

      {title && (
        <Typography
          variant="h3"
          className="font-bold mb-5 font-garamond text-center"
        >
          {title}
        </Typography>
      )}
      <InfiniteFetch queryKey={queryKey} queryFn={getQuery}>
        {({ data }) => {
          return orientation === "horizontal" ? (
            <div className={gridClass}>
              {data.slice(0, 4).map((user = defaultUser, i) => (
                <MatchCard
                  user={user}
                  galleryProps={{
                    ...galleryProps,
                    medias: [1],
                  }}
                  key={i}
                />
              ))}
            </div>
          ) : (
            <div className={gridClass}>
              {data.map((_, i) => (
                <MatchCard galleryProps={galleryProps} key={i} />
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
              disabled
            >
              <ChevronLeftIcon />
            </Button>
            <Typography variant="text">1</Typography>
            <Button
              variant="ghost"
              size="icon-xl"
              className="hover:bg-muted/50"
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div>
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
