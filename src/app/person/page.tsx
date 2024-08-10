"use client";

import { Box, VStack } from "@chakra-ui/react";

import { ContentHeader, SearchComponent } from "@/compoments";
import type { Person } from "@/types";
import { useState } from "react";
import { TableComponent } from "@/compoments/TableComponent";

export default function PersonPage() {
  const [personList, setPersonList] = useState<Person[] | null>(null);

  const handleGetValues = (value: Person[] | null) => {
    setPersonList(value);
  };

  return (
    <Box w={"full"} h={"full"}>
      <ContentHeader title="Pessoas" />
      <VStack px={8}>
        <SearchComponent<Person[]>
          getValues={handleGetValues}
          arrayOptions={[
            { value: "name", label: "Nome" },
            { value: "document", label: "CPF" },
          ]}
          url="https://api/person_search"
        />
        {/* Acrescentar prop titles para substituir os nomes das colunas na tabela
          Exemplo: titles={['Nome', 'CPF', 'Email']}. Se não for acrescentado,
          os nomes das colunas serão as chaves do objeto */}
        <TableComponent<Person> rows={personList} />
      </VStack>
    </Box>
  );
}
