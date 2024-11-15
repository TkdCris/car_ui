import { forwardRef, useImperativeHandle, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  Field,
  Fieldset,
  Flex,
  Heading,
  Textarea,
} from "@chakra-ui/react";

import { api, setHeaderToken } from "@/services/axios/axios";
import { Switch } from "@/components/ui/switch";
import { toaster } from "@/components/ui/toaster";
import { DrawerInput } from "@/components";
import {
  LegalEntityRegisterSchema,
  legalEntityRegisterSchema,
} from "@/schemas";

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

    const onSubmit: SubmitHandler<LegalEntityRegisterSchema> = async (data) => {
      setHeaderToken();
      data.icmsTaxPayer = isIcmsTaxPayer;
      data.observation = observation;

      try {
        await api.post("/persons", data);
        toaster.success({
          title: "Pessoa Jurídica",
          description: "Cadastro realizado com sucesso!.",
          duration: 9000,
        });
      } catch (error) {
        console.error(error);
        toaster.error({
          title: "Erro",
          description: "Houve um erro ao cadastrar.",
          duration: 9000,
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
          <Card.Body>
            <Fieldset.Root>
              <DrawerInput
                title="Nome"
                type="text"
                placeholder={"Razão Social *"}
                register={register("name")}
                labelW="6rem"
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
              />
              <DrawerInput
                title="Celular"
                type="text"
                placeholder="(xx)99999-9999"
                register={register("cellphone")}
                labelW="6rem"
              />

              <DrawerInput
                title="Telefone"
                type="text"
                placeholder="Telefone comercial"
                register={register("phone")}
                labelW="6rem"
              />
              <Flex position="relative" align={"center"} gap={4}>
                <Fieldset.Legend mb="0">Contribuinte ICMS</Fieldset.Legend>
                <Switch
                  onCheckedChange={(e) => handleSwitch(e.checked)}
                  id="icmsTaxpayer"
                />
              </Flex>
            </Fieldset.Root>
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
          <Card.Body>
            <Field.Root>
              <DrawerInput
                title="CNPJ"
                type="text"
                placeholder="Informe o CNPJ *"
                register={register("cnpj", { required: true })}
                labelW="3rem"
              />
              <DrawerInput
                title="IM"
                type="text"
                placeholder={"Inscrição Municipal"}
                register={register("im")}
                labelW="3rem"
              />
              <DrawerInput
                title="IE"
                type="text"
                placeholder={"Inscrição Estadual"}
                register={register("ie")}
                labelW="3rem"
              />
            </Field.Root>
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
          <Card.Body>
            <Field.Root>
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
            </Field.Root>
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
  }
);

LegalEntityRegisterForm.displayName = "LegalEntityRegisterForm";
