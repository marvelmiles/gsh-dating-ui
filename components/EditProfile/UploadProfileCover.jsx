import useForm from "@/app/hooks/useForm";
import React from "react";
import Typography from "../Typography";
import FilePicker from "../FilePicker";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useAuth } from "@/app/providers/AuthProvider";

const UploadProfileCover = ({ renderActionBtns }) => {
  const {
    currentUser: { id: cid, profileCover },
    updateUser,
  } = useAuth();

  const { isSubmitting, handleSubmit, reset, removeField } = useForm();

  const handleSave = async () => {
    try {
      const { formData, errors } = handleSubmit();

      if (errors) return toast("Invalid image", { type: "error" });

      const _formData = new FormData();

      const keys = Object.keys(formData);

      if (profileCover.slice(0, 4).every((url) => !!url)) {
        if (!keys.length) return toast("Sorry, no image to upload");
      } else if (keys.length < 4)
        return toast("Please upload four pictures of yourself", {
          type: "error",
        });

      const updateIndex = {};

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        updateIndex[key] = i;
        _formData.append("profileCover", formData[key]);
      }

      _formData.append(
        "rules",
        JSON.stringify({
          updateIndex,
        })
      );

      const res = await axios.put(
        `/users/update-profile-cover/${cid}?strictMode=false`,
        _formData
      );

      if (!res.success) throw res;

      updateUser(res.data);

      toast("Uploaded profile cover successfully", { type: "success" });
    } catch (err) {
      console.log(err);

      toast(err.message, { type: "error" });
    } finally {
      reset(true);
    }
  };

  return (
    <div>
      <Typography variant="h3" className="mb-8 text-center">
        Upload Your Picture (4 Pictures required)
      </Typography>

      <div
        className="
    grid grid-cols-1 gap-4 sm:grid-cols-2 
    md:grid-cols-3 lg:grid-cols-4
    "
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <FilePicker
            disabled={isSubmitting}
            containerClassName="w-full"
            key={i}
            id={i}
            src={profileCover[i]}
            onFileChange={(file, id) => {
              reset((formData) => ({ ...formData, [id]: file }));
            }}
            onDelete={(id) => removeField(id)}
          />
        ))}
      </div>
      {renderActionBtns(handleSave, isSubmitting)}
    </div>
  );
};

export default UploadProfileCover;
