"use client";

import {
  Box,
  Button,
  createListCollection,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { api, setHeaderToken } from "@/services/axios/axios";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
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
    setHeaderToken();

    try {
      const response = await api.get<T>(`${url}?${data.key}=${data.value}`);
      const result = response.data;
      if (response) getValues(result);
    } catch (error) {
      getValues(null);
      console.error("Erro ao enviar dados:", error);
    }
  };

  const frameworks = createListCollection({
    items: [...arrayOptions],
  });

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
          <SelectRoot collection={frameworks} flex={1}>
            <SelectLabel truncate>Pesquiser por</SelectLabel>
            <SelectTrigger minW={"8rem"}>
              <SelectValueText placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {arrayOptions.map((option) => (
                <SelectItem key={option.value} item={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          <Input
            placeholder={"Digite o que deseja pesquisar"}
            bg={"input.bg"}
            {...register("value")}
          />
          <Button variant={"outline"} type="submit" color="content.text">
            Pesquisar
          </Button>
        </HStack>
      </form>
    </Box>
  );
}
