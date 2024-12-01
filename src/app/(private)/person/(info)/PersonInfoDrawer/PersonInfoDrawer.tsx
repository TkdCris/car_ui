import {
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { withMask } from "use-mask-input";

import {
  birthdateFormat,
  cellphoneFormat,
  cnpjFormat,
  cpfFormat,
  ieFormat,
  imFormat,
  phoneFormat,
} from "@/utils/masks";
import { Client, LegalEntity, NaturalPerson } from "@/models";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PersonEditDrawer } from "../../(edit)";

export const PersonInfoDrawer = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState<Client>();

  const drawerEditRef = React.useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    handleOpenDrawer: (data: any) => {
      setPerson(data);
      setOpen((prev) => !prev);
    },
  }));

  const handleEdit = (data: Client) => {
    if (drawerEditRef.current) {
      drawerEditRef.current.handleOpenEditDrawer(data);
    }
    setOpen(false);
  };

  function personalData() {
    return (
      <Card.Root overflow="auto">
        <Card.Header>
          <Heading size={"md"}>Dados pessoais</Heading>
        </Card.Header>
        <Card.Body pt={2} mr={4}>
          <VStack align={"start"} bg={"drawer.content"} gap={1} pr={2}>
            <HStack>
              <Text minW={"6rem"} as="b">
                Nome:
              </Text>
              <Text whiteSpace="nowrap">{person?.name}</Text>
            </HStack>
            <HStack>
              <Text minW={"6rem"} as="b">
                Apelido:
              </Text>
              <Text whiteSpace="nowrap">{person?.nickname}</Text>
            </HStack>
            <HStack>
              <Text minW={"6rem"} as="b">
                Email:
              </Text>
              <Text whiteSpace="nowrap">{person?.email}</Text>
            </HStack>

            <HStack>
              <Text minW={"6rem"} as="b">
                Celular:
              </Text>
              <Text ref={withMask(cellphoneFormat)} whiteSpace="nowrap">
                {person?.cellphone}
              </Text>
            </HStack>
            <HStack>
              <Text minW={"6rem"} as="b">
                Tel fixo:
              </Text>
              <Text ref={withMask(phoneFormat)} whiteSpace="nowrap">
                {person?.phone}
              </Text>
            </HStack>
            <HStack>
              <Text minW={"6rem"} as="b">
                Nascimento:
              </Text>
              <Text ref={withMask(birthdateFormat)} whiteSpace="nowrap">
                {(person as NaturalPerson)?.birthdate}
              </Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  function companyData() {
    return (
      <Card.Root overflow={"auto"}>
        <Card.Header>
          <Heading size={"md"}>Dados da Empresa</Heading>
        </Card.Header>
        <Card.Body pt={2}>
          <VStack align={"start"} bg={"drawer.content"} gap={1}>
            <HStack>
              <Text minW={"8rem"} as="b">
                Nome:
              </Text>
              <Text whiteSpace="nowrap">{person?.name}</Text>
            </HStack>
            <HStack>
              <Text minW={"8rem"} as="b">
                Nome Fantasia:
              </Text>
              <Text whiteSpace="nowrap">{person?.nickname}</Text>
            </HStack>
            <HStack>
              <Text minW={"8rem"} as="b">
                Email:
              </Text>
              <Text whiteSpace="nowrap">{person?.email}</Text>
            </HStack>
            <HStack>
              <Text minW={"8rem"} as="b">
                Celular:
              </Text>
              <Text ref={withMask(cellphoneFormat)} whiteSpace="nowrap">
                {person?.cellphone}
              </Text>
            </HStack>
            <HStack>
              <Text minW={"8rem"} as="b">
                Telefone:
              </Text>
              <Text ref={withMask(phoneFormat)} whiteSpace="nowrap">
                {person?.phone}
              </Text>
            </HStack>
            <HStack>
              <Text minW={"8rem"} as="b">
                Contribuinte ICMS:
              </Text>
              <Text>
                {(person as LegalEntity)?.icmsTaxPayer ? "Sim" : "Não"}
              </Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  function naturalPersonDocumentationData() {
    return (
      <Card.Root overflow="auto">
        <Card.Header>
          <Heading size={"md"}>Documentação</Heading>
        </Card.Header>
        <Card.Body pt={2}>
          <VStack align={"start"} bg={"drawer.content"} gap={1}>
            <HStack>
              <Text minW={"3rem"} as="b">
                CPF:
              </Text>
              <Text ref={withMask(cpfFormat)} whiteSpace="nowrap">
                {(person as NaturalPerson)?.cpf}
              </Text>
            </HStack>
            <HStack>
              <Text minW={"3rem"} as="b">
                RG:
              </Text>
              <Text whiteSpace="nowrap">{(person as NaturalPerson)?.rg}</Text>
            </HStack>
            <HStack>
              <Text minW={"3rem"} as="b">
                CRC:
              </Text>
              <Text whiteSpace="nowrap">{(person as NaturalPerson)?.crc}</Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  function legalEntityDocumentationData() {
    return (
      <Card.Root overflow="auto">
        <Card.Header>
          <Heading size={"md"}>Documentação</Heading>
        </Card.Header>
        <Card.Body pt={2}>
          <VStack align={"start"} bg={"drawer.content"} gap={1}>
            <HStack>
              <Text minW={"3rem"} as="b">
                CNPJ:
              </Text>
              <Text ref={withMask(cnpjFormat)} whiteSpace="nowrap">
                {(person as LegalEntity)?.cnpj}
              </Text>
            </HStack>
            <HStack>
              <Text minW={"3rem"} as="b">
                IM:
              </Text>
              <Text ref={withMask(imFormat)} whiteSpace="nowrap">
                {(person as LegalEntity)?.im}
              </Text>
            </HStack>
            <HStack>
              <Text minW={"3rem"} as="b">
                IE:
              </Text>
              <Text ref={withMask(ieFormat)} whiteSpace="nowrap">
                {(person as LegalEntity)?.ie}
              </Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  function addressData() {
    return (
      <Card.Root overflow="auto">
        <Card.Header>
          <Heading size={"md"}>Endereço</Heading>
        </Card.Header>
        <Card.Body pt={2}>
          <VStack align={"start"} bg={"drawer.content"} gap={1}>
            <HStack>
              <Text minW={"7rem"} as="b">
                Rua:
              </Text>
              <Text whiteSpace="nowrap">{person?.location.address}</Text>
            </HStack>
            <HStack>
              <Text minW={"7rem"} as="b">
                Número:
              </Text>
              <Text whiteSpace="nowrap">{person?.location?.number}</Text>
            </HStack>
            <HStack>
              <Text minW={"7rem"} as="b">
                Complemento:
              </Text>
              <Text whiteSpace="nowrap">{person?.location?.complement}</Text>
            </HStack>
            <HStack>
              <Text minW={"7rem"} as="b">
                Cidade:
              </Text>
              <Text whiteSpace="nowrap">{person?.location?.city}</Text>
            </HStack>
            <HStack>
              <Text minW={"7rem"} as="b">
                Estado:
              </Text>
              <Text whiteSpace="nowrap">{person?.location?.state}</Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    );
  }

  function observationData() {
    return (
      <Card.Root>
        <Card.Header>
          <Heading size={"md"}>Observações</Heading>
        </Card.Header>
        <Card.Body pt={0}>
          <Textarea value={person?.observation || ""} />
        </Card.Body>
      </Card.Root>
    );
  }

  function naturalPersonInfo() {
    return (
      <Stack color={"content.text"}>
        {personalData()}
        {naturalPersonDocumentationData()}
        {addressData()}
        {observationData()}
      </Stack>
    );
  }

  function legalEntityInfo() {
    return (
      <Stack color={"content.text"}>
        {companyData()}
        {legalEntityDocumentationData()}
        {addressData()}
        {observationData()}
      </Stack>
    );
  }

  return (
    <>
      <PersonEditDrawer ref={drawerEditRef} />
      <DrawerRoot size={"md"} open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerTrigger />

        <DrawerContent bg={"drawer.bg"} p={"none"} m={"none"}>
          <DrawerHeader>
            <DrawerTitle>{person?.name}</DrawerTitle>
          </DrawerHeader>

          <DrawerBody px={{ base: 2, md: 6 }}>
            <Tabs.Root
              defaultValue="dados"
              variant="line"
              colorScheme="blue"
              lazyMount
            >
              <Tabs.List color={"drawer.text"} colorPalette="blue">
                <Tabs.Trigger value={"dados"} as="b">
                  Dados
                </Tabs.Trigger>
                <Tabs.Trigger value={"negocios"} as="b">
                  Negócios efetuados
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="dados">
                {person?.legalEntity ? legalEntityInfo() : naturalPersonInfo()}
              </Tabs.Content>
              <Tabs.Content value="negocios">
                <p>Negócios</p>
              </Tabs.Content>
            </Tabs.Root>
          </DrawerBody>

          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </DrawerActionTrigger>
            <Button
              colorScheme="blue"
              onClick={() => person && handleEdit(person)}
              colorPalette="cyan"
            >
              Editar
            </Button>
          </DrawerFooter>

          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
});

PersonInfoDrawer.displayName = "PersonInfoDrawer";
