import { Input } from "@chakra-ui/react";

import { Field } from "../ui/field";

type DrawerInputProps = {
  title: string;
  type?: string;
  placeholder?: string;
  register: any;
  labelW?: string;
};
export const DrawerInput = ({
  title,
  type,
  placeholder,
  register,
  labelW,
}: DrawerInputProps) => {
  return (
    <Field
      orientation={{ base: "vertical", md: "horizontal" }}
      alignItems="start"
      label={title}
      whiteSpace={"nowrap"}
      flexShrink={0}
      css={{ "--field-label-width": labelW }}
      justifyContent="end"
    >
      <Input type={type} h={8} placeholder={placeholder} {...register} />
    </Field>
  );
};
