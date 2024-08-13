import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { PersonRegisterForm } from ".";

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
          <DrawerHeader>Cadastrar pessoa</DrawerHeader>

          <DrawerBody>
            <PersonRegisterForm ref={formRef} />
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
