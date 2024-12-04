import { forwardRef, useImperativeHandle, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useHookFormMask } from "use-mask-input";
import { api, setHeaderToken } from "@/services/axios/axios";

import { zipcodeFormat, cnpjFormat, ieFormat, imFormat } from "@/utils/masks";
import { getAddressByZipCode } from "@/utils/getAddressByZipCode";
import {
  LegalEntityRegisterSchema,
  legalEntityRegisterSchema,
} from "@/schemas";
import { Switch } from "@/components/ui/switch";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { DrawerInput } from "@/components";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

type LegalEntityRegisterFormProps = {
  setOpen?: (valor: boolean) => void;
};

export const LegalEntityRegisterForm = forwardRef<
  RegisterFormHandle,
  LegalEntityRegisterFormProps
>(({ setOpen }, ref) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<LegalEntityRegisterSchema>({
    resolver: zodResolver(legalEntityRegisterSchema),
    defaultValues: {
      legalEntity: true,
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
        neighborhood: "",
      },
      cnpj: "",
      ie: "",
      im: "",
      taxRegime: "",
      suframa: "",
      icmsTaxPayer: false,
    },
  });

  const registerWithMask = useHookFormMask(register);
  const [isSearchingAddress, setIsSearchingAddress] = useState<boolean>(false);
  const { location } = watch();

  const onSubmit: SubmitHandler<LegalEntityRegisterSchema> = async (data) => {
    setHeaderToken();
    try {
      await api.post("/persons", data);
      setOpen && setOpen(false);
      reset();
      toaster.success({
        title: "Pessoa Jurídica",
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

  function companyCard() {
    return (
      <Card.Root bg={"drawer.content"}>
        <CardHeader>
          <Heading size="md">{"Dados da empresa"}</Heading>
        </CardHeader>
        <Card.Body gap={2}>
          <DrawerInput
            title="Nome"
            type="text"
            placeholder={"Razão Social *"}
            register={register("name")}
            labelW="6rem"
            error={errors.name}
          />

          <DrawerInput
            title="Nome fantasia"
            type="text"
            placeholder={"Nome fantasia"}
            register={register("nickname")}
            labelW="6rem"
          />
          <DrawerInput
            title="Email"
            type="email"
            placeholder="exemplo@gmail.com"
            register={register("email")}
            labelW="6rem"
            error={errors?.email}
          />
          <DrawerInput
            title="Celular"
            type="text"
            placeholder="Telefone móvel"
            register={registerWithMask("cellphone", ["(99) 99999-9999"])}
            labelW="6rem"
            error={errors?.cellphone}
          />

          <DrawerInput
            title="Telefone"
            type="text"
            placeholder="Telefone fixo"
            register={registerWithMask("phone", ["(99) 99999-9999"])}
            labelW="6rem"
            error={errors?.phone}
          />
          <Field
            display={"flex"}
            orientation={"horizontal"}
            justifyContent={"start"}
            gap={4}
            label="Contribuinte ICMS"
            whiteSpace={"nowrap"}
          >
            <Switch
              onCheckedChange={(e) => setValue("icmsTaxPayer", e.checked)}
              id="icmsTaxpayer"
            />
          </Field>
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
            title="CNPJ"
            type="text"
            placeholder="Informe o CNPJ *"
            register={registerWithMask("cnpj", cnpjFormat)}
            labelW="3rem"
            error={errors.cnpj}
          />
          <DrawerInput
            title="IM"
            type="text"
            placeholder={"Inscrição Municipal"}
            register={registerWithMask("im", imFormat)}
            labelW="3rem"
            error={errors.im}
          />
          <DrawerInput
            title="IE"
            type="text"
            placeholder={"Inscrição Estadual"}
            register={registerWithMask("ie", ieFormat)}
            labelW="3rem"
            error={errors.ie}
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
      <Flex flexDirection={"column"} gap="2" shadow="lg">
        {companyCard()}
        {documentationCard()}
        {addressCard()}
        {observationCard()}
      </Flex>
    </form>
  );
});

LegalEntityRegisterForm.displayName = "LegalEntityRegisterForm";
