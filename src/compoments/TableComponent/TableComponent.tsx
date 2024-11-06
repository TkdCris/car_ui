import { PersonInfoDrawer } from "@/app/(private)/person/(info)";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

interface TableComponentProps<T extends { [key: string]: any }> {
  titles?: Array<string>;
  rows: Array<T> | null;
  data: Array<T> | null;
  footer?: boolean;
  drawer?: any;
}

export function TableComponent<T extends { [key: string]: any }>({
  titles,
  rows,
  data,
  footer = false,
}: TableComponentProps<T>) {
  const drawerInfRef = React.useRef<DrawerRef | null>();

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

  const getRowById = (id: string) => {
    return data && data.find((row) => row.id === id);
  };

  interface DrawerRef {
    handleOpenDrawer: (data: T) => void;
  }

  const handleOpenInfoDrawer = (data: T) => {
    if (drawerInfRef.current) {
      drawerInfRef.current.handleOpenDrawer(data);
    }
  };

  const rowsObjectWithOutObjectOnValues = removeObjectValues(rows);
  const titlesFromRow = Object.keys(rowsObjectWithOutObjectOnValues[0]);
  const titleList = titles ? titles : titlesFromRow;

  return (
    <>
      <PersonInfoDrawer ref={drawerInfRef} />
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
              rowsObjectWithOutObjectOnValues.map((row, irowIndex) => (
                <Tr
                  _hover={{ bg: "drawer.content" }}
                  transition="0.3s ease-in-out"
                  key={irowIndex}
                >
                  {Object.entries(row).map(([key, value], index) => {
                    if (key === "id") {
                      value = irowIndex + 1;
                    }
                    return (
                      <Td
                        _hover={{ fontSize: "blue" }}
                        key={index}
                        onClick={() =>
                          handleOpenInfoDrawer(getRowById(row.id) as T)
                        }
                      >
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
    </>
  );
}
