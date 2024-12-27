import React from "react";
import { IconBaseProps, IconType } from "react-icons/lib";

interface BtnIconProps extends IconBaseProps {
  icon: IconType;
}

export function BtnIcon({ icon: IconComponent, ...rest }: BtnIconProps) {
  return <IconComponent style={{ width: "20px", height: "20px" }} {...rest} />;
}
