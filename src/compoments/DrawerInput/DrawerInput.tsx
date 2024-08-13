import { FormLabel, HStack, Input } from "@chakra-ui/react";

type DrawerInputProps = {
  title: string;
  type?: string;
  placeholder?: string;
  register: any;
};
export const DrawerInput = ({
  title,
  type,
  placeholder,
  register,
}: DrawerInputProps) => {
  return (
    <HStack alignItems={"flex-end"}>
      <FormLabel w={"8rem"}>{title}:</FormLabel>
      <Input type={type} h={8} placeholder={placeholder} {...register} />
    </HStack>
  );
};
