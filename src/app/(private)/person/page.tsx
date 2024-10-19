"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { ContentHeader, SearchComponent, TableComponent } from "@/compoments";
import { PersonRegisterDrawer } from "./(register)";
import { Person } from "@/models";
import { usePersonList } from "@/hooks/requests/usePersonList";

export default function PersonPage() {
  const [personList, setPersonList] = useState<Person[] | null>(null);

  const handleGetValues = (value: Person[] | null) => {
    setPersonList(value);
  };

  const persons = personList?.map((person) => ({
    name: person.name,
    email: person.email,
  })) as Person[] | null;

  return (
    <Box w={"full"} h={"full"}>
      <ContentHeader leftTitle="Pessoas">
        <PersonRegisterDrawer />
      </ContentHeader>
      <VStack px={8}>
        <SearchComponent<Person[]>
          getValues={handleGetValues}
          arrayOptions={[
            { value: "name", label: "Nome" },
            { value: "cpf", label: "CPF" },
            { value: "cnpj", label: "CNPJ" },
          ]}
          url={"/persons"}
        />
        {/* Acrescentar prop titles para substituir os nomes das colunas na tabela
          Exemplo: titles={['Nome', 'CPF', 'Email']}.
          Se titles não for passado, os nomes das colunas serão as chaves do objeto */}
        <TableComponent<Person> titles={["Nome", "Email"]} rows={persons} />
      </VStack>
    </Box>
  );
}
