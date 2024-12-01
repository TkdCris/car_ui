import { Box, Input, Text } from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

import { Field } from "../ui/field";

type DrawerInputProps = {
  title: string;
  type?: string;
  placeholder?: string;
  register?: any;
  labelW?: string;
  error?: FieldError | undefined;
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
    <Box display="flex" flexDir="column">
      <Field
        orientation={{ base: "vertical", md: "horizontal" }}
        label={title}
        whiteSpace={"nowrap"}
        flexShrink={0}
        css={{ "--field-label-width": labelW }}
        invalid={!!error?.message}
      >
        <Input
          alignSelf="center"
          type={type}
          placeholder={placeholder}
          {...register}
        />
      </Field>
      <Text alignSelf={"end"} color="error">
        {error?.message}
      </Text>
    </Box>
  );
};
