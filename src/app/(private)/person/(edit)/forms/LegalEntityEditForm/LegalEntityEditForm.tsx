import { forwardRef, useImperativeHandle, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  Fieldset,
  Flex,
  Heading,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useHookFormMask } from "use-mask-input";

import { api, setHeaderToken } from "@/services/axios/axios";
import {
  type LegalEntityRegisterSchema,
  legalEntityRegisterSchema,
} from "@/schemas";
import { LegalEntity } from "@/models";
import {
  cellphoneFormat,
  cnpjFormat,
  ieFormat,
  imFormat,
  numberToMaskFormat,
  phoneFormat,
  zipcodeFormat,
} from "@/utils/masks";
import { getAddressByZipCode } from "@/utils/getAddressByZipCode";

import { toaster } from "@/components/ui/toaster";
import { Switch } from "@/components/ui/switch";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { DrawerInput } from "@/components";

type RegisterFormHandle = {
  requestSubmit: () => void;
};

type LegalEntityEditFormProps = {
  personToEdit?: LegalEntity;
  setOpen?: (valor: boolean) => void;
};

export const LegalEntityEditForm = forwardRef<
  RegisterFormHandle,
  LegalEntityEditFormProps
>(({ personToEdit, setOpen }, ref) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<LegalEntityRegisterSchema>({
    resolver: zodResolver(legalEntityRegisterSchema),
    defaultValues: {
      legalEntity: true,
      idCompany: personToEdit?.idCompany || "",
      name: personToEdit?.name || "",
      nickname: personToEdit?.nickname || "",
      email: personToEdit?.email || "",
      phone: personToEdit?.phone
        ? numberToMaskFormat(personToEdit.phone, phoneFormat)
        : "",
      cellphone: personToEdit?.cellphone
        ? numberToMaskFormat(personToEdit.cellphone, cellphoneFormat)
        : "",
      notary: personToEdit?.notary || "",
      observation: personToEdit?.observation || "",
      location: {
        street: personToEdit?.location.street || "",
        city: personToEdit?.location.city || "",
        number: personToEdit?.location.number || "",
        complement: personToEdit?.location.complement || "",
        state: personToEdit?.location.state || "",
        zipcode: personToEdit?.location.zipcode
          ? numberToMaskFormat(personToEdit?.location.zipcode, zipcodeFormat)
          : "",
        neighborhood: personToEdit?.location.neighborhood || "",
      },
      cnpj: personToEdit?.cnpj
        ? numberToMaskFormat(personToEdit.cnpj, cnpjFormat)
        : "",
      ie: personToEdit?.ie ? numberToMaskFormat(personToEdit.ie, ieFormat) : "",
      im: personToEdit?.im ? numberToMaskFormat(personToEdit.im, imFormat) : "",
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
  const registerWithMask = useHookFormMask(register);
  const [isSearchingAddress, setIsSearchingAddress] = useState<boolean>(false);
  const { location } = watch();

  const onSubmit: SubmitHandler<LegalEntityRegisterSchema> = async (data) => {
    setHeaderToken();
    data.icmsTaxPayer = isIcmsTaxPayer;
    data.observation = observation;

    try {
      await api.put(`/persons/${personToEdit?.id}`, data);
      setOpen && setOpen(false);
      toaster.success({
        title: "Pessoa Jurídica",
        description: "Atualizada com sucesso!.",
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Erro",
        description: "Houve um erro ao atualizar.",
        duration: 3000,
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
              error={errors?.email}
            />
            <DrawerInput
              title="Celular"
              type="text"
              placeholder="(xx)99999-9999"
              register={registerWithMask("cellphone", cellphoneFormat)}
              labelW="6rem"
              error={errors.cellphone}
            />
            <DrawerInput
              title="Telefone"
              type="text"
              placeholder="Telefone comercial"
              register={registerWithMask("phone", phoneFormat)}
              labelW="6rem"
              error={errors?.phone}
            />
            <Flex position="relative" align={"center"} gap={4}>
              <Fieldset.Legend mb="0">Contribuinte ICMS</Fieldset.Legend>
              <Switch
                defaultChecked={personToEdit?.icmsTaxPayer}
                onCheckedChange={(e) => handleSwitch(e.checked)}
                id="icmsTaxPayer"
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
        <Card.Body>
          <Field flexDir={"row"} alignItems={"center"} pos="relative">
            <DrawerInput
              title="Código Postal"
              type="text"
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
      <Flex flexDirection={"column"} gap="2" shadow="lg">
        {companyCard()}
        {documentationCard()}
        {addressCard()}
        {observationCard()}
      </Flex>
    </form>
  );
});

LegalEntityEditForm.displayName = "LegalEntityEditForm";
