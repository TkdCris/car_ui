"use client";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { api, setHeaderToken } from "@/services/axios/axios";
import { useForm } from "react-hook-form";

import { SearchSchema } from "@/schemas";

type SearchComponentProps<T> = {
  getValues: (value: T | null) => void;
  arrayOptions: { value: string; label: string }[];
  url: string;
};

export function SearchComponent<T>({
  getValues,
  arrayOptions,
  url,
}: SearchComponentProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      key: "name",
      value: "",
    },
  });

  const onSubmit = async (data: SearchSchema) => {
    const token = sessionStorage.getItem("token");
    if (token) setHeaderToken(token);

    try {
      const response = await api.get<T>(`${url}?${data.key}=${data.value}`);
      const result = response.data;
      if (response) getValues(result);
    } catch (error) {
      getValues(null);
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Box w={"full"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack
          pt={2}
          gap={2}
          alignItems={"end"}
          flexDirection={{ base: "column", sm: "row" }}
          color={"content.text"}
        >
          <FormControl flex={1}>
            <FormLabel whiteSpace="nowrap" fontSize={"sm"}>
              Pesquisar por
            </FormLabel>
            <Select
              placeholder="Selecione..."
              variant="outline"
              bg={"input.bg"}
              {...register("key")}
            >
              {arrayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl flex={2} isInvalid={!!errors.value}>
            <Box position="relative">
              <Input
                placeholder={"Digite o que deseja pesquisar"}
                bg={"input.bg"}
                {...register("value")}
              />
              <FormErrorMessage position="absolute" top="100%" left="0">
                {errors.value?.message}
              </FormErrorMessage>
            </Box>
          </FormControl>
          <Button variant={"outline"} type="submit" color="content.text">
            Pesquisar
          </Button>
        </HStack>
      </form>
    </Box>
  );
}
