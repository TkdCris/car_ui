import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import { Client, LegalEntity, NaturalPerson } from "@/models";

export const PersonInfoDrawer = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [person, setPerson] = useState<Client>();

  const btnRef = React.useRef(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleEdit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  useImperativeHandle(ref, () => ({
    handleOpenDrawer: (data: any) => {
      setPerson(data);
      onOpen();
    },
  }));

  function personalData() {
    return (
      <Box>
        <Heading mb={2} size={"md"}>
          Dados pessoais
        </Heading>
        <VStack align={"start"} p={2} bg={"drawer.content"} gap={1}>
          <HStack>
            <Text minW={"8rem"} as="b">
              Nome:
            </Text>
            <Text>{person?.name}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Apelido:
            </Text>
            <Text>{person?.nickname}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Email:
            </Text>
            <Text>{person?.email}</Text>
          </HStack>

          <HStack>
            <Text minW={"8rem"} as="b">
              Celular:
            </Text>
            <Text>{person?.cellphone}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Tel fixo:
            </Text>
            <Text>{person?.phone}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Nascimento:
            </Text>
            <Text>{(person as NaturalPerson)?.birthday}</Text>
          </HStack>
        </VStack>
      </Box>
    );
  }

  function companyData() {
    return (
      <Box>
        <Heading mb={2} size={"md"}>
          Dados da Empresa
        </Heading>
        <VStack align={"start"} p={2} bg={"drawer.content"} gap={1}>
          <HStack>
            <Text as="b">nome:</Text>
            <Text>{person?.name}</Text>
          </HStack>
          <HStack>
            <Text as="b">Nome Fantasia:</Text>
            <Text>{person?.nickname}</Text>
          </HStack>
          <HStack>
            <Text as="b">Email:</Text>
            <Text>{person?.email}</Text>
          </HStack>
        </VStack>
      </Box>
    );
  }

  function naturalPersonDocumentationData() {
    return (
      <Box>
        <Heading mb={2} size={"md"}>
          Documentação
        </Heading>
        <VStack align={"start"} p={2} bg={"drawer.content"} gap={1}>
          <HStack>
            <Text minW={"8rem"} as="b">
              CPF:
            </Text>
            <Text>{(person as NaturalPerson)?.cpf}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              RG:
            </Text>
            <Text>{(person as NaturalPerson)?.rg}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              CRC:
            </Text>
            <Text>{(person as NaturalPerson)?.crc}</Text>
          </HStack>
        </VStack>
      </Box>
    );
  }

  function legalEntityDocumentationData() {
    return (
      <Box>
        <Heading mb={2} size={"md"}>
          Documentação
        </Heading>
        <VStack align={"start"} p={2} bg={"drawer.content"} gap={1}>
          <HStack>
            <Text minW={"8rem"} as="b">
              CNPJ:
            </Text>
            <Text>{(person as LegalEntity)?.cnpj}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              IM:
            </Text>
            <Text>{(person as LegalEntity)?.im}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              IE:
            </Text>
            <Text>{(person as LegalEntity)?.ie}</Text>
          </HStack>
        </VStack>
      </Box>
    );
  }

  function addressData() {
    return (
      <Box>
        <Heading mb={2} size={"md"}>
          Endereço
        </Heading>
        <VStack align={"start"} p={2} bg={"drawer.content"} gap={1}>
          <HStack>
            <Text minW={"8rem"} as="b">
              Rua:
            </Text>
            <Text>{person?.location.address}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Número:
            </Text>
            <Text>{person?.location?.number}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Complemento:
            </Text>
            <Text>{person?.location?.complement}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Cidade:
            </Text>
            <Text>{person?.location?.city}</Text>
          </HStack>
          <HStack>
            <Text minW={"8rem"} as="b">
              Estado:
            </Text>
            <Text>{person?.location?.state}</Text>
          </HStack>
        </VStack>
      </Box>
    );
  }

  function observationData() {
    return (
      <Box>
        <Heading mb={2} size={"md"}>
          Observações
        </Heading>
        <VStack align={"start"} p={2} bg={"drawer.content"} gap={1}>
          <HStack>
            <Text>{person?.observation}</Text>
          </HStack>
        </VStack>
      </Box>
    );
  }

  function naturalPersonInfo() {
    return (
      <Stack gap={4} color={"content.text"}>
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />

        <DrawerContent bg={"drawer.bg"} p={"none"} m={"none"}>
          <DrawerCloseButton />
          <DrawerHeader bg={"header.bg"} fontWeight={"bold"}>
            {person?.name}
          </DrawerHeader>

          <DrawerBody>
            <Tabs>
              <TabList color={"drawer.text"}>
                <Tab as="b">Dados</Tab>
                <Tab as="b">Negócios efetuados</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {person?.legalEntity
                    ? legalEntityInfo()
                    : naturalPersonInfo()}
                </TabPanel>
                <TabPanel>
                  <p>Negócios</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="blue" onClick={handleEdit}>
              Editar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
});

PersonInfoDrawer.displayName = "PersonInfoDrawer";
