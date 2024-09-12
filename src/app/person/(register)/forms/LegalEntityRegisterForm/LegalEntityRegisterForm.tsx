import { forwardRef, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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

import { personRegisterSchema, PersonRegisterSchema } from "@/schemas";
import { DrawerInput } from "@/compoments";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

export const LegalEntityRegisterForm = forwardRef<RegisterFormHandle, {}>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<PersonRegisterSchema>({
      resolver: zodResolver(personRegisterSchema),
      defaultValues: {
        legalEntity: true,
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
        console.log("requestSubmit");
        handleSubmit(onSubmit)();
      },
    }));

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection={"column"} gap="4" bg="bg_form" shadow="lg">
          <Card>
            <CardHeader>
              <Heading size="md">{"Dados da empresa"}</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing="6">
                <FormControl isInvalid={!!errors.name}>
                  <DrawerInput
                    title="Nome"
                    type="text"
                    placeholder={"Razão Social *"}
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
                      title="CNPJ"
                      type="text"
                      placeholder="Informe o CNPJ *"
                      register={register("documentNumber", { required: true })}
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
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </form>
    );
  }
);

LegalEntityRegisterForm.displayName = "LegalEntityRegisterForm";
