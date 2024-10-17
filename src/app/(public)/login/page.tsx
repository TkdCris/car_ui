"use client";

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { authSchema, type AuthSchema } from "@/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    setIsError(false);
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      setIsError(true);
      return;
    }

    router.push("/");
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
              Faça seu Login
            </FormLabel>
          </Center>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input {...register("email")} placeholder="Digite seu email" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Senha</FormLabel>
            <Input {...register("password")} placeholder="Digite sua senha" />
          </FormControl>
          <FormControl>
            <Button type="submit" mt={8} colorScheme="blue" w="100%">
              Login
            </Button>
          </FormControl>
          {isError && (
            <Text mt={4} color={"error"}>
              Email e/ou senha inválidos!
            </Text>
          )}
        </form>
      </Box>
    </Center>
  );
}
