import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
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
  FormLabel,
  Heading,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";

import {
  LegalEntityRegisterSchema,
  legalEntityRegisterSchema,
} from "@/schemas";
import { DrawerInput } from "@/compoments";
import { api, setHeaderToken } from "@/services/axios/axios";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

export const LegalEntityRegisterForm = forwardRef<RegisterFormHandle, {}>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LegalEntityRegisterSchema>({
      resolver: zodResolver(legalEntityRegisterSchema),
      defaultValues: {
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
        cnpj: "",
        ie: "",
        im: "",
        taxRegime: "",
        suframa: "",
        icmsTaxPayer: false,
      },
    });

    const [isIcmsTaxPayer, setIsIcmsTaxPayer] = useState(false);
    const [observation, setObservation] = useState("");

    const onSubmit: SubmitHandler<LegalEntityRegisterSchema> = async (data) => {
      setHeaderToken();
      data.icmsTaxPayer = isIcmsTaxPayer;
      data.observation = observation;

      try {
        await api.post("/persons", data);
      } catch (error) {
        console.error(error);
      }
    };

    useImperativeHandle(ref, () => ({
      requestSubmit: () => {
        handleSubmit(onSubmit)();
      },
    }));

    function companyCard() {
      const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
        setIsIcmsTaxPayer(e.target.checked);
      };

      return (
        <Card bg={"drawer.content"}>
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
              <FormControl isInvalid={!!errors.nickname}>
                <DrawerInput
                  title="Nome fantasia"
                  type="text"
                  placeholder={"Nome fantasia"}
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
                    placeholder="Telefone comercial"
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
              <FormControl isInvalid={!!errors.phone}>
                <Flex position="relative" align={"center"}>
                  <FormLabel htmlFor="Contribuinte ICMS" mb="0">
                    Contribuinte ICMS
                  </FormLabel>
                  <Switch onChange={handleSwitch} id="icmsTaxpayer" />
                </Flex>
              </FormControl>
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
              <FormControl isInvalid={!!errors.cnpj}>
                <Box position="relative">
                  <DrawerInput
                    title="CNPJ"
                    type="text"
                    placeholder="Informe o CNPJ *"
                    register={register("cnpj", { required: true })}
                    labelMinW="3rem"
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

              <FormControl isInvalid={!!errors.im}>
                <DrawerInput
                  title="IM"
                  type="text"
                  placeholder={"Inscrição Municipal"}
                  register={register("im")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.im?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.ie}>
                <DrawerInput
                  title="IE"
                  type="text"
                  placeholder={"Inscrição Estadual"}
                  register={register("ie")}
                  labelMinW="3rem"
                />
                <FormErrorMessage
                  position="absolute"
                  top="100%"
                  right="0"
                  mt={1}
                >
                  {errors.ie?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </CardBody>
        </Card>
      );
    }

    function adressCard() {
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
        <Flex flexDirection={"column"} gap="2" shadow="lg">
          {companyCard()}
          {documentationCard()}
          {adressCard()}
          {observationCard()}
        </Flex>
      </form>
    );
  }
);

LegalEntityRegisterForm.displayName = "LegalEntityRegisterForm";
