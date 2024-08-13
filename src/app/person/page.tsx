"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { ContentHeader, SearchComponent, TableComponent } from "@/compoments";
import type { Pessoa } from "@/types";
import { PersonRegisterDrawer } from "./(register)";

export default function PersonPage() {
  const [personList, setPersonList] = useState<Pessoa[] | null>(null);

  const handleGetValues = (value: Pessoa[] | null) => {
    setPersonList(value);
  };

  return (
    <Box w={"full"} h={"full"}>
      <ContentHeader leftTitle="Pessoas">
        <PersonRegisterDrawer />
      </ContentHeader>
      <VStack px={8}>
        <SearchComponent<Pessoa[]>
          getValues={handleGetValues}
          arrayOptions={[
            { value: "name", label: "Nome" },
            { value: "cpf", label: "CPF" },
            { value: "cnpj", label: "CNPJ" },
          ]}
          url="https://api/person_search"
        />
        {/* Acrescentar prop titles para substituir os nomes das colunas na tabela
          Exemplo: titles={['Nome', 'CPF', 'Email']}. Se não for acrescentado,
          os nomes das colunas serão as chaves do objeto */}
        <TableComponent<Pessoa> rows={personList} />
      </VStack>
    </Box>
  );
}
