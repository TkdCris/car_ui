import { forwardRef, useImperativeHandle } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Stack,
} from "@chakra-ui/react";

import { type PersonRegisterSchema, personRegisterSchema } from "@/schemas";
import { DrawerInput } from "@/compoments";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

export const NaturalPersonRegisterForm = forwardRef<RegisterFormHandle, {}>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<PersonRegisterSchema>({
      resolver: zodResolver(personRegisterSchema),
      defaultValues: {
        legalEntity: false,
        name: "",
        documentNumber: "",
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
        <Flex
          flexDirection={"column"}
          gap="4"
          bg="bg_form"
          shadow="lg"
          w={"full"}
        >
          <Card>
            <CardHeader>
              <Heading size="md">{"Dados pessoais"}</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing="6">
                <FormControl isInvalid={!!errors.name}>
                  <DrawerInput
                    title="Nome"
                    type="text"
                    placeholder={"Nome completo *"}
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

                <FormControl isInvalid={!!errors.documentNumber}>
                  <Box position="relative">
                    <DrawerInput
                      title="CPF"
                      type="text"
                      placeholder="Informe o CPF *"
                      register={register("documentNumber")}
                    />
                    <FormErrorMessage
                      position="absolute"
                      top="100%"
                      right="0"
                      mt={1}
                    >
                      {errors.documentNumber?.message}
                    </FormErrorMessage>
                  </Box>
                </FormControl>

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

                <DrawerInput
                  title="Nascimento"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  register={register("birthdate")}
                />
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </form>
    );
  }
);

NaturalPersonRegisterForm.displayName = "NaturalPersonRegisterForm";
