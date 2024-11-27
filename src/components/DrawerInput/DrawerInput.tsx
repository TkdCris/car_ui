import { Input, Text } from "@chakra-ui/react";

import { Field } from "../ui/field";
import { FieldError } from "react-hook-form";

type DrawerInputProps = {
  title: string;
  type?: string;
  placeholder?: string;
  register?: any;
  labelW?: string;
  error?: FieldError;
};
export const DrawerInput = ({
  title,
  type,
  placeholder,
  register,
  labelW,
  error,
}: DrawerInputProps) => {
  return (
    <>
      <Field
        display={"flex"}
        orientation={{ base: "vertical", md: "horizontal" }}
        label={title}
        whiteSpace={"nowrap"}
        flexShrink={0}
        css={{ "--field-label-width": labelW }}
      >
        <Input
          alignSelf="center"
          type={type}
          h={8}
          placeholder={placeholder}
          {...register}
        />
      </Field>
      <Text alignSelf={"end"} color="red">
        {error?.message}
      </Text>
    </>
  );
};
