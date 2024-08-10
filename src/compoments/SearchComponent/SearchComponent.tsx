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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema, searchSchema } from "@/schemas";

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
    resolver: zodResolver(searchSchema),
    defaultValues: {
      key: "",
      value: "",
    },
  });
  const onSubmit = async (data: SearchSchema) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        getValues(result);
      } else {
        getValues(null);
        console.error("Erro ao enviar dados:", response.status);
      }
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
