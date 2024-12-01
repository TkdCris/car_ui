import { forwardRef, useImperativeHandle, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, Flex, Heading, Textarea } from "@chakra-ui/react";
import { useHookFormMask } from "use-mask-input";

import { api, setHeaderToken } from "@/services/axios/axios";

import { cnpjFormat, ieFormat, imFormat } from "@/utils/masks";
import {
  LegalEntityRegisterSchema,
  legalEntityRegisterSchema,
} from "@/schemas";
import { Switch } from "@/components/ui/switch";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
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
  const registerWithMask = useHookFormMask(register);

  const onSubmit: SubmitHandler<LegalEntityRegisterSchema> = async (data) => {
    setHeaderToken();
    data.icmsTaxPayer = isIcmsTaxPayer;
    data.observation = observation;

    try {
      await api.post("/persons", data);
      setOpen && setOpen(false);
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
    const handleSwitch = (checked: boolean) => {
      setIsIcmsTaxPayer(checked);
    };

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
              onCheckedChange={(e) => handleSwitch(e.checked)}
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

  function addressCard() {
    return (
      <Card.Root bg={"drawer.content"}>
        <Card.Header>
          <Heading size="md">{"Endereço"}</Heading>
        </Card.Header>
        <Card.Body gap={2}>
          <DrawerInput
            title="Rua"
            type="text"
            placeholder={"Endereço"}
            register={register("location.address")}
            labelW="6rem"
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
            title="Cidade"
            type="text"
            placeholder={"Cidade"}
            register={register("location.city")}
            labelW="6rem"
          />
          <DrawerInput
            title="Estado"
            type="text"
            placeholder={"Estado"}
            register={register("location.state")}
            labelW="6rem"
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
          <Textarea onChange={(e) => setObservation(e.target.value)} />
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
