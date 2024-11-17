"use client";

import { Box, Button, Center, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import { Field } from "@/components/ui/field";
import { authSchema, type AuthSchema } from "@/schemas";
import { setCookie } from "@/utils/handleCookies";

export default function Login() {
  const { register, handleSubmit } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
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
        color={"login.text"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root size="lg" maxW="md">
            <Center>
              <Fieldset.Legend display={"flex"} pb={6} fontSize={30}>
                Controle Auto Revenda
              </Fieldset.Legend>
            </Center>
            <Fieldset.Content>
              <Field label="Nome de usuário">
                <Input
                  {...register("username")}
                  placeholder="Digite seu nome de usuário"
                  borderColor={"login.text"}
                />
              </Field>
              <Field label="Senha">
                <Input
                  {...register("password")}
                  placeholder="Digite sua senha"
                  borderColor={"login.text"}
                />
              </Field>
            </Fieldset.Content>
            <Button type="submit" mt={8} colorScheme="blue" w="100%">
              Login
            </Button>
          </Fieldset.Root>

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
