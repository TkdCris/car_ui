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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { setCookie } from "@/utils/handleCookies";

export default function Login() {
  const { register, handleSubmit } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      sessionStorage.removeItem("token");
    }
  }, []);

  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    setIsError(false);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_URL || "",
        data
      );

      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      setCookie("token", response.data.token, 12);
    } catch (error) {
      setIsError(true);
      return null;
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
