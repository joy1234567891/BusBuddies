import React from "react";
import { AspectRatio } from "./aspect-ratio";
import { Card, CardContent } from "./card";

export const BusLogo = () => {
  return (
    <Card className="w-[775px] border-0 bg-transparent shadow-none">
      <CardContent className="p-0">
        <AspectRatio ratio={775 / 298}>
          <img
            className="w-full h-full object-cover"
            alt="BusBuddies logo"
            src="https://c.animaapp.com/AiyHbdYU/img/group-1.svg"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
};


