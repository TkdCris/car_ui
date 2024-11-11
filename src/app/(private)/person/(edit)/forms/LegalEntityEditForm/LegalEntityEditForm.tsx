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
  useToast,
} from "@chakra-ui/react";

import { api, setHeaderToken } from "@/services/axios/axios";
import {
  type LegalEntityRegisterSchema,
  legalEntityRegisterSchema,
} from "@/schemas";
import { DrawerInput } from "@/compoments";
import { LegalEntity } from "@/models";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

type LegalEntityEditFormProps = {
  personToEdit?: LegalEntity;
};

export const LegalEntityEditForm = forwardRef<
  RegisterFormHandle,
  LegalEntityEditFormProps
>(({ personToEdit }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LegalEntityRegisterSchema>({
    resolver: zodResolver(legalEntityRegisterSchema),
    defaultValues: {
      legalEntity: true,
      idCompany: personToEdit?.idCompany || "",
      name: personToEdit?.name || "",
      nickname: personToEdit?.nickname || "",
      email: personToEdit?.email || "",
      phone: personToEdit?.phone || "",
      cellphone: personToEdit?.cellphone || "",
      notary: personToEdit?.notary || "",
      observation: personToEdit?.observation || "",
      location: {
        address: personToEdit?.location.address || "",
        city: personToEdit?.location.city || "",
        number: personToEdit?.location.number || "",
        complement: personToEdit?.location.complement || "",
        state: personToEdit?.location.state || "",
        postalCode: personToEdit?.location.postalCode || "",
      },
      cnpj: personToEdit?.cnpj || "",
      ie: personToEdit?.ie || "",
      im: personToEdit?.im || "",
      taxRegime: personToEdit?.taxRegime || "",
      suframa: personToEdit?.suframa || "",
      icmsTaxPayer: personToEdit?.icmsTaxPayer || false,
    },
  });

  const [isIcmsTaxPayer, setIsIcmsTaxPayer] = useState(
    personToEdit?.icmsTaxPayer || false
  );
  const [observation, setObservation] = useState(
    personToEdit?.observation || ""
  );

  const toast = useToast();

  const onSubmit: SubmitHandler<LegalEntityRegisterSchema> = async (data) => {
    setHeaderToken();
    data.icmsTaxPayer = isIcmsTaxPayer;
    data.observation = observation;

    try {
      await api.put(`/persons/${personToEdit?.id}`, data);
      toast({
        title: "Pessoa Jurídica",
        description: "Atualizada com sucesso!.",
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
            <FormControl isInvalid={!!errors.icmsTaxPayer}>
              <Flex position="relative" align={"center"}>
                <FormLabel htmlFor="Contribuinte ICMS" mb="0">
                  Contribuinte ICMS
                </FormLabel>
                <Switch
                  defaultChecked={personToEdit?.icmsTaxPayer}
                  onChange={handleSwitch}
                  id="icmsTaxPayer"
                />
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
              <FormErrorMessage position="absolute" top="100%" right="0" mt={1}>
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
});

LegalEntityEditForm.displayName = "LegalEntityEditForm";
