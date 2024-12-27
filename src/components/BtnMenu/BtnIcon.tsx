import { Icon } from "@chakra-ui/react";

interface BtnIconProps {
  icon: React.ReactNode;
}

export function BtnIcon({ icon }: BtnIconProps) {
  return <Icon size={"md"}>{icon}</Icon>;
}
