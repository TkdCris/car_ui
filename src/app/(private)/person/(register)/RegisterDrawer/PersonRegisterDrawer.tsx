import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { LegalEntityRegisterForm, NaturalPersonRegisterForm } from "../forms";

export function PersonRegisterDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
      <Button h={8} w={20} ref={btnRef} colorScheme="blue" onClick={onOpen}>
        Novo
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight={"bold"}>Cadastrar</DrawerHeader>

          <DrawerBody>
            <Tabs isLazy variant="enclosed">
              <TabList>
                <Tab fontSize={"lg"} fontWeight={"semibold"}>
                  Pessoa Física
                </Tab>
                <Tab fontSize={"lg"} fontWeight={"semibold"}>
                  Pessoa Jurídica
                </Tab>
              </TabList>
              <TabPanels bg={"drawer.bg"}>
                <TabPanel px={0}>
                  <NaturalPersonRegisterForm ref={formRef} />
                </TabPanel>
                <TabPanel px={0}>
                  <LegalEntityRegisterForm ref={formRef} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
