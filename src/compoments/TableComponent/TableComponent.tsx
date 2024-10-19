import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface TableComponentProps<T extends { [key: string]: any }> {
  titles?: Array<string>;
  rows: Array<T> | null;
  footer?: boolean;
}

export function TableComponent<T extends { [key: string]: any }>({
  titles,
  rows,
  footer = false,
}: TableComponentProps<T>) {
  if (!rows) return null;

  const removeObjectValues = <T extends Record<string, any>>(
    array: Array<T>
  ) => {
    return array.map((row) => {
      return Object.fromEntries(
        Object.entries(row).filter(([key, value]) => typeof value !== "object")
      );
    });
  };

  const rowsObjectWithOutObjectOnValues = removeObjectValues(rows);
  const titlesFromRow = Object.keys(rowsObjectWithOutObjectOnValues[0]);
  const titleList = titles ? titles : titlesFromRow;

  return (
    <TableContainer
      w={"full"}
      h={"full"}
      mx={4}
      p={2}
      bg={"table.body"}
      shadow={"md"}
    >
      <Table size="sm">
        <Thead bg={"table.header"} shadow={"md"}>
          <Tr>
            <Th key={"#"}>{"#"}</Th>
            {titleList.map((title, index) => (
              <Th key={index}>{title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows &&
            rowsObjectWithOutObjectOnValues.map((row, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                {Object.values(row).map((value, index) => {
                  return (
                    <Td key={index}>
                      {typeof value === "boolean"
                        ? value
                          ? "Sim"
                          : "Não"
                        : value}
                    </Td>
                  );
                })}
              </Tr>
            ))}
        </Tbody>
        {footer && (
          <Tfoot>
            <Tr>
              {titles &&
                titles.map((title, index) => <Th key={index}>{title}</Th>)}
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
}
