"use client";
import { Context } from "@/context";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function UserPage({ params: { user_slug } }) {
  // Context
  const { warframes } = useContext(Context);
  // States
  const [warframe, setWarframe] = useState();

  useEffect(() => {
    if (!warframes) return;
    setWarframe(
      warframes.filter((wf) => wf.wikiaThumbnail)[
        Math.round(Math.random() * warframes.length - 1)
      ]
    );
  }, [warframes]);

  return (
    warframe && (
      <div>
        {user_slug}
        <Image
          alt='warframe'
          src={warframe.wikiaThumbnail}
          priority={false}
          width={100}
          height={100}
        />
      </div>
    )
  );
}
