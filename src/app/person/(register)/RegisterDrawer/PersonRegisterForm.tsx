"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { type PersonRegisterSchema, personRegisterSchema } from "@/schemas";
import { DrawerInput } from "@/compoments";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

export const PersonRegisterForm = forwardRef<RegisterFormHandle, {}>(
  (props, ref) => {
    const [typeOfPeople, setTypeOfPeople] = useState<string>("pf");

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
      watch,
    } = useForm<PersonRegisterSchema>({
      resolver: zodResolver(personRegisterSchema),
      defaultValues: {
        typeOfPeople: "pf",
        name: "",
        cpf: "",
        cnpj: "",
        phone: "",
        email: "",
        birthdate: "",
      },
    });

    const onSubmit: SubmitHandler<PersonRegisterSchema> = async (data) => {
      console.log("Submitted Data: ", data);
      try {
        const response = await fetch("/api/person", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const person = await response.json();
          console.log("Person registered: ", person);
        } else {
          console.error("Error sending data:", response.status);
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      requestSubmit: () => {
        handleSubmit(onSubmit)();
      },
    }));

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection={"column"} gap="4" bg="bg_form" p={4} shadow="lg">
          <FormControl>
            <RadioGroup
              value={typeOfPeople}
              onChange={(value) => {
                reset({
                  name: "",
                  cpf: "",
                  cnpj: "",
                });
                setTypeOfPeople(value);
                setValue("typeOfPeople", value);
              }}
            >
              <Stack direction={"row"}>
                <Radio defaultChecked value="pf">
                  PF
                </Radio>
                <Radio value="pj">PJ</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Card>
            <CardHeader>
              <Heading size="md">
                {typeOfPeople === "pf" ? "Dados pessoais" : "Dados da empresa"}
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing="6">
                <FormControl isInvalid={!!errors.name}>
                  <DrawerInput
                    title="Nome"
                    type="text"
                    placeholder={
                      typeOfPeople === "pf"
                        ? "Nome completo *"
                        : "Razão Social *"
                    }
                    register={register("name")}
                  />
                  <FormErrorMessage
                    position="absolute"
                    top="100%"
                    right="0"
                    mt={1}
                  >
                    {errors.name?.message}
                  </FormErrorMessage>
                </FormControl>

                {typeOfPeople === "pf" ? (
                  <FormControl isInvalid={!!errors.cpf}>
                    <Box position="relative">
                      <DrawerInput
                        title="CPF"
                        type="text"
                        placeholder="Informe o CPF *"
                        register={register("cpf")}
                      />
                      <FormErrorMessage
                        position="absolute"
                        top="100%"
                        right="0"
                        mt={1}
                      >
                        {errors.cpf?.message}
                      </FormErrorMessage>
                    </Box>
                  </FormControl>
                ) : (
                  <FormControl isInvalid={!!errors.cnpj}>
                    <Box position="relative">
                      <DrawerInput
                        title="CNPJ"
                        type="text"
                        placeholder="Informe o CNPJ *"
                        register={register("cnpj", { required: true })}
                      />
                      <FormErrorMessage
                        position="absolute"
                        top="100%"
                        right="0"
                        mt={1}
                      >
                        {errors.cnpj?.message}
                      </FormErrorMessage>
                    </Box>
                  </FormControl>
                )}

                <DrawerInput
                  title="Telefone"
                  type="text"
                  placeholder="Número de telefone"
                  register={register("phone")}
                />
                <FormControl isInvalid={!!errors.email}>
                  <Box position="relative">
                    <DrawerInput
                      title="Email"
                      type="email"
                      placeholder="Digite o email"
                      register={register("email")}
                    />
                    <FormErrorMessage
                      position="absolute"
                      top="100%"
                      right="0"
                      mt={1}
                    >
                      {errors.email?.message}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
                {typeOfPeople === "pf" && (
                  <DrawerInput
                    title="Nascimento"
                    type="text"
                    placeholder="dd/mm/aaaa"
                    register={register("birthdate")}
                  />
                )}
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </form>
    );
  }
);

PersonRegisterForm.displayName = "RegisterForm";
