import { Button } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { LegalEntityEditForm, NaturalPersonEditForm } from "../forms";
import {
  LegalEntityRegisterSchema,
  NaturalPersonRegisterSchema,
} from "@/schemas";
import { Client } from "@/models";

export const PersonEditDrawer = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState<Client>();

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  useImperativeHandle(ref, () => ({
    handleOpenEditDrawer: (data: any) => {
      setPerson(data);
      setOpen(true);
    },
  }));

  return (
    <>
      <DrawerRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="end"
        size="md"
      >
        <DrawerBackdrop />
        <DrawerTrigger />

        <DrawerContent bg={"drawer.bg"}>
          <DrawerHeader fontWeight={"bold"}>Editar</DrawerHeader>

          <DrawerBody px={{ base: 2, md: 6 }}>
            {person?.legalEntity ? (
              <LegalEntityEditForm
                ref={formRef}
                personToEdit={person as LegalEntityRegisterSchema}
                setOpen={setOpen}
              />
            ) : (
              <NaturalPersonEditForm
                ref={formRef}
                personToEdit={person as NaturalPersonRegisterSchema}
                setOpen={setOpen}
              />
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button colorPalette="blue" onClick={handleSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
});

PersonEditDrawer.displayName = "PersonEditDrawer";
