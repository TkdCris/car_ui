"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { ContentHeader, SearchComponent, TableComponent } from "@/compoments";
import { PersonRegisterDrawer } from "./(register)";
import { PersonToTableList } from "@/models";

export default function PersonPage() {
  const [personList, setPersonList] = useState<PersonToTableList[] | null>(
    null
  );

  const handleGetValues = (value: PersonToTableList[] | null) => {
    setPersonList(value);
  };

  const persons = personList?.map((person) => ({
    id: person.id,
    name: person.name,
    email: person.email,
    legalEntity: person.legalEntity,
  })) as PersonToTableList[] | null;

  return (
    <Box w={"full"} h={"full"}>
      <ContentHeader leftTitle="Pessoas">
        <PersonRegisterDrawer />
      </ContentHeader>
      <VStack px={8}>
        <SearchComponent<PersonToTableList[]>
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
        <TableComponent<PersonToTableList>
          titles={["Nome", "Email", "Pessoa Jurídica"]}
          rows={persons}
          data={personList}
        />
      </VStack>
    </Box>
  );
}
