import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Flex, Heading, Spinner, Textarea } from "@chakra-ui/react";
import { useHookFormMask } from "use-mask-input";
import { api, setHeaderToken } from "@/services/axios/axios";
import { BsSearch } from "react-icons/bs";

import {
  birthdateFormat,
  cellphoneFormat,
  zipcodeFormat,
  cpfFormat,
  phoneFormat,
} from "@/utils/masks";
import {
  naturalPersonRegisterSchema,
  NaturalPersonRegisterSchema,
} from "@/schemas";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import { getAddressByZipCode } from "@/utils/getAddressByZipCode";
import { Button } from "@/components/ui/button";
import { DrawerInput } from "@/components";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

type NaturalPersonRegisterFormProps = {
  setOpen?: (valor: boolean) => void;
};

export const NaturalPersonRegisterForm = forwardRef<
  RegisterFormHandle,
  NaturalPersonRegisterFormProps
>(({ setOpen }, ref) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
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
        street: "",
        city: "",
        number: "",
        complement: "",
        state: "",
        zipcode: "",
      },
      cpf: "",
      rg: "",
      birthdate: "",
      fatherName: "",
      motherName: "",
      crc: "",
    },
  });

  const registerWithMask = useHookFormMask(register);
  const [isSearchingAddress, setIsSearchingAddress] = useState<boolean>(false);
  const { location } = watch();

  const onSubmit: SubmitHandler<NaturalPersonRegisterSchema> = async (data) => {
    setHeaderToken();
    try {
      await api.post("/persons", data);
      setOpen && setOpen(false);
      reset();
      toaster.success({
        title: "Pessoa Física",
        description: "Cadastro realizado com sucesso!.",
      });
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Erro",
        description: "Houve um erro ao cadastrar.",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    requestSubmit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  function personCard() {
    return (
      <Card.Root bg={"drawer.content"}>
        <Card.Header>
          <Heading size="md">{"Dados pessoais"}</Heading>
        </Card.Header>
        <Card.Body gap={2}>
          <DrawerInput
            title="Nome"
            type="text"
            placeholder={"Nome completo *"}
            register={register("name")}
            error={errors.name}
          />
          <DrawerInput
            title="Apelido"
            type="text"
            placeholder={"Apelido"}
            register={register("nickname")}
            error={errors.nickname}
          />
          <DrawerInput
            title="Email"
            type="email"
            placeholder="exemplo@gmail.com"
            register={register("email")}
            error={errors?.email}
          />

          <DrawerInput
            title="Celular"
            type="text"
            placeholder="Telefone celular"
            register={registerWithMask("cellphone", cellphoneFormat)}
            error={errors.cellphone}
          />
          <DrawerInput
            title="Telefone"
            type="text"
            placeholder="Telefone fixo"
            register={registerWithMask("phone", phoneFormat)}
            error={errors.phone}
          />
          <DrawerInput
            title="Nascimento"
            type="text"
            placeholder="dia/mês/ano"
            register={registerWithMask("birthdate", birthdateFormat)}
            error={errors.birthdate}
          />
        </Card.Body>
      </Card.Root>
    );
  }

  function documentationCard() {
    return (
      <Card.Root bg={"drawer.content"}>
        <Card.Header>
          <Heading size="md">{"Documentação"}</Heading>
        </Card.Header>
        <Card.Body gap={2}>
          <DrawerInput
            title="CPF"
            type="text"
            placeholder="Informe o CPF *"
            register={registerWithMask("cpf", cpfFormat, {
              required: true,
            })}
            labelW="2rem"
            error={errors?.cpf}
          />
          <DrawerInput
            title="RG"
            type="text"
            placeholder={"Registro Geral"}
            register={register("rg")}
            labelW="2rem"
          />
          <DrawerInput
            title="CRC"
            type="text"
            placeholder={"Conselho Regional de Contabilidade"}
            register={register("crc")}
            labelW="2rem"
          />
        </Card.Body>
      </Card.Root>
    );
  }

  const handleSearchAddress = async (zipcode: string) => {
    setError("location.zipcode", { message: "" });
    if (!location.zipcode || location.zipcode.replace(/\D/g, "").length !== 8) {
      setError("location.zipcode", { message: "CEP deve conter 8 dígitos" });
      return;
    }

    setIsSearchingAddress(true);
    try {
      const { data } = await getAddressByZipCode(zipcode);
      setValue("location.street", data.street);
      setValue("location.city", data.city);
      setValue("location.state", data.state);
      setValue("location.neighborhood", data.neighborhood);
    } catch (error) {
      console.error("Search address error: ");
      setError("location.zipcode", { message: "CEP não encontrado" });
    } finally {
      setIsSearchingAddress(false);
    }
  };

  function addressCard() {
    return (
      <Card.Root bg={"drawer.content"}>
        <Card.Header>
          <Heading size="md">{"Endereço"}</Heading>
        </Card.Header>
        <Card.Body gap={2}>
          <Field flexDir={"row"} alignItems={"center"} pos="relative">
            <DrawerInput
              title="Código Postal"
              type="text"
              placeholder={"zipcode"}
              register={registerWithMask("location.zipcode", zipcodeFormat)}
              labelW="6rem"
              error={errors.location?.zipcode}
            />
            <Button
              pos={"absolute"}
              variant="ghost"
              right={0}
              disabled={location.zipcode.replace(/\D/g, "").length !== 8}
              top={{ base: "1.7rem", md: "0" }}
              onClick={() => handleSearchAddress(location.zipcode)}
            >
              {isSearchingAddress ? <Spinner size="sm" /> : <BsSearch />}
            </Button>
          </Field>

          <DrawerInput
            title="Rua"
            type="text"
            placeholder={"Endereço"}
            register={register("location.street")}
            labelW="6rem"
            value={location.street}
          />
          <DrawerInput
            title="Número"
            type="text"
            placeholder={"Número"}
            register={register("location.number")}
            labelW="6rem"
          />
          <DrawerInput
            title="Complemento"
            type="text"
            placeholder={"Complemento"}
            register={register("location.complement")}
            labelW="6rem"
          />
          <DrawerInput
            title="Bairro"
            type="text"
            placeholder={"Bairro"}
            register={register("location.neighborhood")}
            labelW="6rem"
            value={location.neighborhood}
          />
          <DrawerInput
            title="Cidade"
            type="text"
            placeholder={"Cidade"}
            register={register("location.city")}
            labelW="6rem"
            value={location.city}
          />
          <DrawerInput
            title="Estado"
            type="text"
            placeholder={"Estado"}
            register={register("location.state")}
            labelW="6rem"
            value={location.state}
          />
        </Card.Body>
      </Card.Root>
    );
  }

  function observationCard() {
    return (
      <Card.Root bg={"drawer.content"}>
        <Card.Header>
          <Heading size="md">{"Observação"}</Heading>
        </Card.Header>
        <Card.Body pt={0}>
          <Textarea onChange={(e) => setValue("observation", e.target.value)} />
        </Card.Body>
      </Card.Root>
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
});

NaturalPersonRegisterForm.displayName = "NaturalPersonRegisterForm";
