"use client";

import React, { useState } from "react";
import { MatchCardHeader } from "../Matchs/MatchCard";
import FormField from "../FormField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Typography from "../Typography";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Dropdown from "../Dropdown";
import { Checkbox } from "../ui/checkbox";
import EditIcon from "../icons/EditIcon";
import { CheckIcon, XIcon } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import Image from "next/image";
import useForm from "@/app/hooks/useForm";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

const EditUserBiodata = ({ cardHeadergalleryProps, renderActionBtns }) => {
  const { currentUser, updateUser } = useAuth();

  const { formData, register, reset, removeField, isSubmitting, handleSubmit } =
    useForm({ defaultFormData: currentUser.bio });

  const router = useRouter();

  const [editName, setEditName] = useState(false);

  const [socialID, setSocialID] = useState(null);

  const handleEditCover = () => {
    router.push(
      window.location.search.toLowerCase().replace(`&next=${next}`, "") +
        `&next=${1}`
    );
  };

  const handleSocial = (bool, prop) => {
    if (bool) {
      reset((formData) => ({ ...formData, [prop.name]: "" }));
      setSocialID(prop);
    } else {
      removeField(prop.name);
      setSocialID(null);
    }
  };

  const handleSave = async () => {
    try {
      const { formData, errors } = handleSubmit();

      if (errors)
        return toast("Please confirm if all field are valid.", {
          type: "error",
        });

      const user = await axios.put(`/users/${currentUser.id}`, {
        bio: formData,
      });

      updateUser(user.data);

      toast("Updated bio data successfully!", { type: "success" });
    } catch (err) {
      console.group(err.code);
      toast(err.message, { type: "error" });
    } finally {
      reset(true);
    }
  };

  return (
    <div className="match-card layout-contained">
      <MatchCardHeader
        user={currentUser}
        galleryProps={{
          ...cardHeadergalleryProps,
          indexIndicatorHolder: (
            <Button onClick={handleEditCover} className="text-white">
              Edit Cover
            </Button>
          ),
        }}
      />
      <div className="match-card-body">
        <div className="flex-between">
          <div className="flex items-center gap-2 text-ellipsis">
            {editName ? (
              <FormField placeholder="Fullname" {...register("fullname")} />
            ) : (
              <Typography className="font-bold text-ellipsis" variant="text">
                {currentUser.bio.fullname || "Your name"}
              </Typography>
            )}
            {editName ? (
              <Button
                size="icon"
                variant="outline"
                className="border-none"
                onClick={() => {
                  removeField("fullname");
                  setEditName(false);
                }}
              >
                <XIcon />
              </Button>
            ) : (
              <Button
                size="icon"
                variant="outline"
                className="border-none"
                onClick={() => setEditName(true)}
              >
                <EditIcon />
              </Button>
            )}
          </div>
          <div className="online-indicator">
            <div
              className={`online-indicator-dot ${
                currentUser.isLogin ? "" : "offline"
              }`}
            />
            <Typography>
              {currentUser.isLogin ? "Online" : "Offline"}
            </Typography>
          </div>
        </div>

        <FormField
          placeholder="Tell us who you're"
          as="textarea"
          containerClassName="max-w-none mt-4"
          wrapperClassName="w-full"
          className="h-[100px]"
          {...register("aboutMe")}
          maxLength={1000}
        />
        <div className="font-medium w-fit ml-auto py-3">
          {formData.aboutMe?.length || 0}/1000
        </div>
        <div className="mt-12">
          <RadioGroup
            defaultValue="Female"
            className="
          flex items-center gap-x-8 flex-wrap
          "
            onValueChange={(value) => reset({ ...formData, gender: value })}
          >
            <RadioGroupItem
              Icon={CheckIcon}
              className="border-black-mild text-black-mild"
              label="Female"
            />
            <RadioGroupItem
              Icon={CheckIcon}
              className="border-black-mild text-black-mild"
              label="Male"
            />
            <RadioGroupItem
              Icon={CheckIcon}
              className="border-black-mild text-black-mild"
              label="Duo with a Girl"
            />
          </RadioGroup>
        </div>

        <div
          className="
      mt-8 grid grid-cols-1 gap-8 
      s320:grid-cols-2 md:grid-cols-3
      "
        >
          <FormField
            label="Age"
            wrapperClassName="w-full"
            type="number"
            {...register("age")}
          />
          <FormField
            label="Height"
            wrapperClassName="w-full"
            type="number"
            {...register("height")}
          />
          <FormField
            type="number"
            label="Weight"
            wrapperClassName="w-full"
            {...register("weight")}
          />
          <Dropdown
            label="Ethnicity"
            triggerClassName="w-full"
            items={[
              "Arabian",
              "Asian",
              "Ebony(Black)",
              "Caucasian(White",
              "Hispanic",
              "Indian",
              "Latin",
              "Mongolia",
              "Mixed race",
              "Others",
            ]}
            onSelect={(value) => reset({ ...formData, ethnicity: value })}
          />
          <Dropdown
            label="Hair Colour"
            triggerClassName="w-full"
            items={["Red", "Blonde", "Brown", "Black", "Others"]}
            onSelect={(value) => reset({ ...formData, hairColor: value })}
          />
          <Dropdown
            label="Hair Length"
            triggerClassName="w-full"
            items={["Short", "Medium", "Long"]}
            onSelect={(value) => reset({ ...formData, hairLength: value })}
          />
          <Dropdown
            label="Breast Size"
            triggerClassName="w-full"
            items={["A", "B", "C", "D", "E", "F", "G", "H", "Others"]}
            onSelect={(value) => reset({ ...formData, breastSize: value })}
          />
          <Dropdown
            label="Breast Type"
            triggerClassName="w-full"
            items={["Natural", "Sillicon"]}
            onSelect={(value) => reset({ ...formData, breastType: value })}
          />
          <FormField
            label="Nationality"
            wrapperClassName="w-full"
            {...register("nationality")}
          />
          <Dropdown
            label="Travel"
            triggerClassName="w-full"
            items={["No", "Country Wide", "Europe", "Worldwide", "Others"]}
            onSelect={(value) => reset({ ...formData, travel: value })}
          />
          <Dropdown
            label="Language"
            triggerClassName="w-full"
            items={["English", "Others"]}
            onSelect={(value) => reset({ ...formData, language: value })}
          />
          <Dropdown
            label="Tatoo"
            triggerClassName="w-full"
            items={["Yes", "No"]}
            onSelect={(value) => reset({ ...formData, tatoo: value })}
          />
          <Dropdown
            label="Piercing"
            triggerClassName="w-full"
            items={[
              "No",
              "Belly",
              "Eyebrow",
              "Genitals",
              "Mouth Area",
              "Nose",
              "Nipples",
              "Tongue",
              "Others",
            ]}
            onSelect={(value) => reset({ ...formData, piercing: value })}
          />
          <Dropdown
            label="Smoking"
            triggerClassName="w-full"
            items={["Yes", "No"]}
            onSelect={(value) => reset({ ...formData, smoking: value })}
          />
          <Dropdown
            label="Eye Colour"
            triggerClassName="w-full"
            onSelect={(value) => reset({ ...formData, eyeColor: value })}
          />
          <Dropdown
            label="Pubic Hair"
            triggerClassName="w-full"
            items={["Trimmed", "Shaved", "Natural"]}
            onSelect={(value) => reset({ ...formData, pubicHair: value })}
          />
          <Dropdown
            label="Are you a Porn star"
            triggerClassName="w-full"
            items={["Yes", "NO"]}
            onSelect={(value) => reset({ ...formData, pornStar: value })}
          />
          <Dropdown
            label="Meeting with"
            triggerClassName="w-full"
            items={["Woman", "Couples", "Man", "Both"]}
            onSelect={(value) => reset({ ...formData, hairColor: value })}
          />
          <FormField
            label="Phone Contact"
            wrapperClassName="w-full"
            {...register("phone")}
          />
          <FormField
            label="Resident Country"
            wrapperClassName="w-full"
            {...register("residentCountry")}
          />
          <FormField
            label="City"
            wrapperClassName="w-full"
            {...register("city")}
          />
        </div>

        <div className="my-4 flex flex-col gap-4">
          <Typography>Social Media</Typography>
          <div className="flex items-center gap-8">
            <Checkbox
              id="fb"
              label={
                <div className="relative aspect-square w-[15px] h-[15px]">
                  <Image fill alt="" src="/images/fb-icon.png" />
                </div>
              }
              onCheckedChange={(bool) =>
                handleSocial(bool, {
                  label: "Facebook ID",
                  name: "facebookID",
                })
              }
              className="border-border"
            />
            <Checkbox
              id="tg"
              label={
                <div className="relative aspect-square w-[15px] h-[15px]">
                  <Image fill alt="" src="/images/tg-icon.png" />
                </div>
              }
              onCheckedChange={(bool) =>
                handleSocial(bool, {
                  label: "Telegram ID",
                  name: "telegramID",
                })
              }
              className="border-border"
            />

            <Checkbox
              id="wa"
              label={
                <div className="relative aspect-square w-[15px] h-[15px]">
                  <Image fill alt="" src="/images/wa-icon.png" />
                </div>
              }
              onCheckedChange={(bool) =>
                handleSocial(bool, {
                  label: "Whatsapp ID",
                  name: "whatsappID",
                })
              }
              className="border-border"
            />
          </div>
          {socialID ? (
            <FormField label={socialID.label} {...register(socialID.name)} />
          ) : null}
        </div>

        {renderActionBtns(handleSave, isSubmitting)}
      </div>
    </div>
  );
};

export default EditUserBiodata;
