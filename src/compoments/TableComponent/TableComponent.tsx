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

  const titleList = titles ? titles : Object.keys(rows[0]);

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
            {titleList.map((title, index) => (
              <Th key={index}>{title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows &&
            rows.map((row, index) => (
              <Tr key={index}>
                {Object.values(row).map((value: any, index) => {
                  if (typeof value === "string") {
                    return <Td key={index}>{value}</Td>;
                  }
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
