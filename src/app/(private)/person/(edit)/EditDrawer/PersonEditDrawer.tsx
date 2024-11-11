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
import React, { forwardRef, useImperativeHandle, useState } from "react";

import { LegalEntityEditForm, NaturalPersonEditForm } from "../forms";
import {
  LegalEntityRegisterSchema,
  NaturalPersonRegisterSchema,
} from "@/schemas";
import { Client } from "@/models";

export const PersonEditDrawer = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [person, setPerson] = useState<Client>();

  const btnRef = React.useRef(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
    onClose();
  };

  useImperativeHandle(ref, () => ({
    handleOpenEditDrawer: (data: any) => {
      setPerson(data);
      onOpen();
    },
  }));

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />

        <DrawerContent bg={"drawer.bg"}>
          <DrawerCloseButton />
          <DrawerHeader fontWeight={"bold"}>Editar</DrawerHeader>

          <DrawerBody>
            {person?.legalEntity ? (
              <LegalEntityEditForm
                ref={formRef}
                personToEdit={person as LegalEntityRegisterSchema}
              />
            ) : (
              <NaturalPersonEditForm
                ref={formRef}
                personToEdit={person as NaturalPersonRegisterSchema}
              />
            )}
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
});

PersonEditDrawer.displayName = "PersonEditDrawer";
