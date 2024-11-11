import { forwardRef, useImperativeHandle, useState } from "react";
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
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { DrawerInput } from "@/compoments";
import {
  naturalPersonRegisterSchema,
  NaturalPersonRegisterSchema,
} from "@/schemas";
import { api, setHeaderToken } from "@/services/axios/axios";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

export const NaturalPersonRegisterForm = forwardRef<RegisterFormHandle, {}>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<NaturalPersonRegisterSchema>({
      resolver: zodResolver(naturalPersonRegisterSchema),
      defaultValues: {
        legalEntity: false,
        idCompany: "",
        name: "",
        nickname: "",
        email: "",
        phone: "",
        cellphone: "",
        notary: "",
        observation: "",
        location: {
          address: "",
          city: "",
          number: "",
          complement: "",
          state: "",
          postalCode: "",
        },
        cpf: "",
        rg: "",
        birthdate: "",
        fatherName: "",
        motherName: "",
        crc: "",
      },
    });

    const toast = useToast();
    const [observation, setObservation] = useState("");

    const onSubmit: SubmitHandler<NaturalPersonRegisterSchema> = async (
      data
    ) => {
      setHeaderToken();
      data.observation = observation;

      try {
        await api.post("/persons", data);
        toast({
          title: "Pessoa Física",
          description: "Cadastro realizado com sucesso!.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
      }
    };

    useImperativeHandle(ref, () => ({
      requestSubmit: () => {
        handleSubmit(onSubmit)();
      },
    }));

    function personCard() {
      return (
        <Card bg={"drawer.content"}>
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
              <FormControl isInvalid={!!errors.nickname}>
                <DrawerInput
                  title="Apelido"
                  type="text"
                  placeholder={"Apelido"}
                  register={register("nickname")}
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.nickname?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <Box position="relative">
                  <DrawerInput
                    title="Email"
                    type="email"
                    placeholder="exemplo@gmail.com"
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
              <FormControl isInvalid={!!errors.cellphone}>
                <Box position="relative">
                  <DrawerInput
                    title="Celular"
                    type="text"
                    placeholder="(xx)99999-9999"
                    register={register("cellphone")}
                  />
                  <FormErrorMessage
                    position="absolute"
                    top="100%"
                    right="0"
                    mt={1}
                  >
                    {errors.cellphone?.message}
                  </FormErrorMessage>
                </Box>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <Box position="relative">
                  <DrawerInput
                    title="Telefone"
                    type="text"
                    placeholder="Telefone fixo"
                    register={register("phone")}
                  />
                  <FormErrorMessage
                    position="absolute"
                    top="100%"
                    right="0"
                    mt={1}
                  >
                    {errors.phone?.message}
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
      );
    }

    function documentationCard() {
      return (
        <Card bg={"drawer.content"}>
          <CardHeader>
            <Heading size="md">{"Documentação"}</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing="6">
              <FormControl isInvalid={!!errors.cpf}>
                <Box position="relative">
                  <DrawerInput
                    title="CPF"
                    type="text"
                    placeholder="Informe o CPF *"
                    register={register("cpf", { required: true })}
                    labelMinW="3rem"
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

              <FormControl isInvalid={!!errors.rg}>
                <DrawerInput
                  title="RG"
                  type="text"
                  placeholder={"Registro Geral"}
                  register={register("rg")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.rg?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.crc}>
                <DrawerInput
                  title="CRC"
                  type="text"
                  placeholder={"Conselho Regional de Contabilidade"}
                  register={register("crc")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.crc?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </CardBody>
        </Card>
      );
    }

    function addressCard() {
      return (
        <Card bg={"drawer.content"}>
          <CardHeader>
            <Heading size="md">{"Endereço"}</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing="6">
              <FormControl isInvalid={!!errors.location?.address}>
                <DrawerInput
                  title="Rua"
                  type="text"
                  placeholder={""}
                  register={register("location.address")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.location?.address?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.location?.number}>
                <DrawerInput
                  title="Número"
                  type="text"
                  placeholder={"Número"}
                  register={register("location.number")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.location?.number?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.location?.complement}>
                <DrawerInput
                  title="Complemento"
                  type="text"
                  placeholder={"Complemento"}
                  register={register("location.complement")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.location?.complement?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.location?.city}>
                <DrawerInput
                  title="Cidade"
                  type="text"
                  placeholder={"Cidade"}
                  register={register("location.city")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.location?.city?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.location?.state}>
                <DrawerInput
                  title="Estado"
                  type="text"
                  placeholder={"Estado"}
                  register={register("location.state")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.location?.state?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </CardBody>
        </Card>
      );
    }

    function observationCard() {
      return (
        <Card bg={"drawer.content"}>
          <CardHeader>
            <Heading size="md">{"Observação"}</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <FormControl isInvalid={!!errors.observation}>
              <Textarea onChange={(e) => setObservation(e.target.value)} />
              <FormErrorMessage position="absolute" top="100%" right="0" mt={0}>
                {errors.observation?.message}
              </FormErrorMessage>
            </FormControl>
          </CardBody>
        </Card>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection={"column"} gap="2">
          {personCard()}
          {documentationCard()}
          {addressCard()}
          {observationCard()}
        </Flex>
      </form>
    );
  }
);

NaturalPersonRegisterForm.displayName = "NaturalPersonRegisterForm";
