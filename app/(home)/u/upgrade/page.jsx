"use client";

import Typography from "@/components/Typography";
import { RadioGroup } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import FreemiumRadioItem from "./components/FreemiumRadioItem";
import PremiumRadioItem from "./components/PremiumRadioItem";
import { useRouter, useSearchParams } from "next/navigation";
import MatchsView from "@/components/Matchs/MatchsView";
import PremiumCheckout from "./PremiumCheckout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FreemiumCheckout from "./FreemiumCheckout";

const page = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const checkout = (searchParams.get("checkout") || "").toLowerCase();
  const router = useRouter();

  useEffect(() => {
    if (checkout !== "premium" && checkout !== "freemium")
      router.replace("/u/upgrade");
  }, [checkout]);

  return (
    <div className="">
      <div className="mb-12">
        <Typography variant="h3">Edit Profile page</Typography>

        <Typography variant="caption">Add your Profile</Typography>
      </div>

      {{
        premium: <PremiumCheckout />,
        freemium: <FreemiumCheckout />,
      }[checkout] || (
        <RadioGroup
          className="flex items-center gap-40"
          onValueChange={setValue}
        >
          <FreemiumRadioItem value={value} />
          <PremiumRadioItem value={value} />
        </RadioGroup>
      )}
      {value && (
        <Button
          as={Link}
          onClick={() => setValue("")}
          href={`/u/upgrade/?checkout=${value}`}
          size="default-min"
          className="ml-auto mt-8 max-w-fit hover:no-underline"
        >
          Proceed
        </Button>
      )}

      <MatchsView
        withPagniation
        orientation="horizontal"
        title="Similar Searches"
      />
    </div>
  );
};

export default page;
