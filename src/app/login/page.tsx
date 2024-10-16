"use client";

import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { authSchema, type AuthSchema } from "@/schemas";
import { login } from "@/hooks/requests/useAuth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    login(data);
  };

  return (
    <Center height={"100vh"} bg="login.bg">
      <Box
        w={"md"}
        shadow={"lg"}
        p={10}
        bg="login.content"
        rounded={"md"}
        color={"input.text"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Center>
            <FormLabel display={"flex"} pb={6} fontSize={30} color={"white"}>
              Login
            </FormLabel>
          </Center>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} placeholder="Digite seu email" />
            <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Senha</FormLabel>
            <Input
              fontStyle={"blue"}
              {...register("password")}
              {...register}
              placeholder="Digite sua senha"
            />
            <FormErrorMessage position="absolute" top="100%" left="0" mt={1}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <Button type="submit" mt={6} colorScheme="blue" w="100%">
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
}
