import React, { useState } from "react";
import { Tabs } from "@chakra-ui/react";

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
import { Button } from "@/components/ui/button";
import { LegalEntityRegisterForm, NaturalPersonRegisterForm } from "../forms";

export function PersonRegisterDrawer() {
  const [open, setOpen] = useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
    setOpen(false);
  };

  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement="end"
      size="md"
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="subtle" size="xs" width={"5rem"} colorPalette={"blue"}>
          Novo
        </Button>
      </DrawerTrigger>
      <DrawerContent pos={"absolute"}>
        <DrawerHeader>
          <DrawerTitle>Cadastrar</DrawerTitle>
        </DrawerHeader>
        <DrawerBody px={{ base: 2, md: 6 }}>
          <Tabs.Root defaultValue="pf" variant="line" lazyMount>
            <Tabs.List colorPalette="blue">
              <Tabs.Trigger value="pf" fontSize={"lg"} fontWeight={"semibold"}>
                Pessoa Física
              </Tabs.Trigger>
              <Tabs.Trigger value="pj" fontSize={"lg"} fontWeight={"semibold"}>
                Pessoa Jurídica
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="pf">
              <NaturalPersonRegisterForm ref={formRef} />
            </Tabs.Content>
            <Tabs.Content value="pj">
              <LegalEntityRegisterForm ref={formRef} />
            </Tabs.Content>
          </Tabs.Root>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <Button variant={"solid"} colorPalette={"blue"} onClick={handleSave}>
            Save
          </Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
