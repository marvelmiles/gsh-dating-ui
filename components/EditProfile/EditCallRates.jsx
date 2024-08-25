import React from "react";
import Typography from "../Typography";
import { CircleAlertIcon } from "lucide-react";
import Dropdown from "../Dropdown";
import Table from "../Table";
import useForm from "@/app/hooks/useForm";
import { toast } from "react-toastify";
import FormField from "../FormField";
import axios from "@/lib/axios";
import { useAuth } from "@/app/providers/AuthProvider";

const EditCallRates = ({ renderActionBtns }) => {
  const {
    currentUser: { id: cid, bio },
    updateUser,
  } = useAuth();

  const { isSubmitting, handleSubmit, reset, register } = useForm({
    defaultFormData: bio,
  });

  const handleSave = async () => {
    try {
      const { errors, formData } = handleSubmit();

      if (errors) return toast("Invalid data", { type: "error" });

      const res = await axios.put(`/users/${cid}`, { bio: formData });

      if (!res.success) throw res;

      updateUser(res.data);

      toast("Call rates updated successfully!", { type: "success" });
    } catch (err) {
      toast(err.message, { type: "error" });
    } finally {
      reset(true);
    }
  };

  const wrapperClassName = "max-w-[200px]";

  const serviceRows = [
    "30 Minutes",
    "1 Hour",
    "2 Hours",
    "3 Hours",
    "6 Hours",
    "12 Hours",
    "24 Hours",
    "48 Hours",
    "Another 24 Hours",
  ].map((item, i) => [
    item,
    <FormField
      key={`${item}-${i + 1}`}
      wrapperClassName={wrapperClassName}
      type="number"
      {...register(`${item}-incall`)}
    />,
    <FormField
      key={`${item}-${i + 2}`}
      wrapperClassName={wrapperClassName}
      type="number"
      {...register(`${item}-outcall`)}
    />,
  ]);

  return (
    <div>
      <Typography as="div" className="border p-4">
        <div>
          <CircleAlertIcon size={25} className="text-white fill-primary" />
        </div>
        <div>
          To increase the credibility and visibility of your profile, we
          strongly recommend to add rates. Rates appear in the filters on the
          main page and other important pages. Visitors love to filter escorts
          based on rates. If you don’t add rates visitors won’t be able to find
          you!!!
        </div>
      </Typography>

      <div className="my-8">
        <Dropdown
          label="Currency"
          items={["Eur"]}
          triggerClassName="w-full max-w-[500px]"
          onSelect={(currency) =>
            reset((formData) => ({ ...formData, currency }))
          }
        />
        <Table
          cellClassName="min-w-[180px]"
          className="my-8 border"
          tdClassName="hover:bg-transparent"
          heads={["Duration Of Services", "Incall Rates", "Outcall Rates"]}
          rows={serviceRows}
        />
        {renderActionBtns(handleSave, isSubmitting)}
      </div>
    </div>
  );
};

export default EditCallRates;
