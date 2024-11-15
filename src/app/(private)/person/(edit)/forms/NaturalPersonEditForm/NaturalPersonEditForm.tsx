import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  Field,
  Flex,
  Heading,
  Textarea,
} from "@chakra-ui/react";

import { api, setHeaderToken } from "@/services/axios/axios";
import { toaster } from "@/components/ui/toaster";
import { DrawerInput } from "@/components";
import {
  type NaturalPersonRegisterSchema,
  naturalPersonRegisterSchema,
} from "@/schemas";
import { NaturalPerson } from "@/models";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

type NaturalPersonEditFormProps = {
  personToEdit?: NaturalPerson;
};

export const NaturalPersonEditForm = forwardRef<
  RegisterFormHandle,
  NaturalPersonEditFormProps
>(({ personToEdit }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NaturalPersonRegisterSchema>({
    resolver: zodResolver(naturalPersonRegisterSchema),
    defaultValues: {
      legalEntity: false,
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
      cpf: personToEdit?.cpf || "",
      rg: personToEdit?.rg || "",
      birthdate: personToEdit?.birthdate || "",
      fatherName: personToEdit?.fatherName || "",
      motherName: personToEdit?.motherName || "",
      crc: personToEdit?.crc || "",
    },
  });

  const [observation, setObservation] = useState(
    personToEdit?.observation || ""
  );

  const onSubmit: SubmitHandler<NaturalPersonRegisterSchema> = async (data) => {
    setHeaderToken();
    data.observation = observation;

    try {
      await api.put(`/persons/${personToEdit?.id}`, data);
      toaster.success({
        title: "Pessoa Física",
        description: "Atualizada com sucesso!",
        duration: 9000,
      });
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Erro",
        description: "Houve um erro ao atualizar.",
        duration: 9000,
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
          <Heading size="md">Dados pessoais</Heading>
        </Card.Header>
        <Card.Body>
          <Field.Root>
            <DrawerInput
              title="Nome"
              type="text"
              placeholder={"Nome completo *"}
              register={register("name")}
            />
            <DrawerInput
              title="Apelido"
              type="text"
              placeholder={"Apelido"}
              register={register("nickname")}
            />
            <DrawerInput
              title="Email"
              type="email"
              placeholder="exemplo@gmail.com"
              register={register("email")}
            />
            <DrawerInput
              title="Celular"
              type="text"
              placeholder="(xx) 99999-9999"
              register={register("cellphone")}
            />
            <DrawerInput
              title="Telefone"
              type="text"
              placeholder="Telefone fixo"
              register={register("phone")}
            />
            <DrawerInput
              title="Nascimento"
              type="text"
              placeholder="dd/mm/aaaa"
              register={register("birthdate")}
            />
          </Field.Root>
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
              title="CPF"
              type="text"
              placeholder="Informe o CPF *"
              register={register("cpf", { required: true })}
              labelW="2rem"
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
        <CardHeader>
          <Heading size="md">{"Observação"}</Heading>
        </CardHeader>
        <Card.Body pt={0}>
          <Textarea
            defaultValue={personToEdit?.observation || ""}
            onChange={(e) => setObservation(e.target.value)}
          />
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

NaturalPersonEditForm.displayName = "NaturalPersonEditForm";
