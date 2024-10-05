import React from "react";
import Typography from "../Typography";
import { CircleAlertIcon } from "lucide-react";
import FilePicker from "../FilePicker";
import useForm from "@/app/hooks/useForm";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

const UploadProfileVideo = ({ renderActionBtns }) => {
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

      if (profileCover[4]) {
        if (!keys.length) return toast("Sorry, no video to upload");
      } else if (!keys.length)
        return toast("Please upload a video of yourself", {
          type: "error",
        });

      const updateIndex = {};

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        updateIndex[key] = i;
        _formData.append("profileCover", formData[key]);
      }

      _formData.append("updateIndex", updateIndex);

      const res = await axios.put(
        `/users/update-profile-cover/${cid}?strictMode=false`,
        _formData
      );

      if (!res.success) throw res;

      updateUser(res.data);

      toast("Uploaded profile video successfully", { type: "success" });
    } catch (err) {
      console.log(err);

      toast(err.message, { type: "error" });
    } finally {
      reset(true);
    }
  };

  return (
    <div>
      <Typography as="div" className="border p-4">
        <div>
          <CircleAlertIcon size={25} className="text-white fill-primary" />
        </div>
        <div>
          To increase the credibility and visibility of your profile, we
          strongly recommend to upload your video. The video will be displayed
          on your profile and video listing page. Visitors love to filter
          escorts based on video. If you don´t add video visitors won´t be able
          to find you!!!
        </div>
      </Typography>

      <div className="p-4">
        <Typography variant="h3" className="my-8 text-center">
          Upload a Nice Video Of You
        </Typography>

        <FilePicker
          isVideo
          containerClassName="mx-auto"
          disabled={isSubmitting}
          id={4}
          src={profileCover[4]?.url}
          onFileChange={(file, id) =>
            reset((formData) => ({ ...formData, [id]: file }))
          }
          onDelete={(id) => removeField(id)}
        />

        <ul className="mt-8 list-disc">
          <li>Accepted video formats: .mkv, .mp4, .mov </li>
          <li>Maximum video size 100Mb</li>
          <li>Maximum video length is 5 minutes</li>
          <li>Minimum video length is 10 seconds</li>
        </ul>
      </div>

      {renderActionBtns(handleSave, isSubmitting)}
    </div>
  );
};

export default UploadProfileVideo;
