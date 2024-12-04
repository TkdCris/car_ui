import { Box, Table } from "@chakra-ui/react";

import { PersonInfoDrawer } from "@/app/(private)/person/(info)";
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
  interface DrawerRef {
    handleOpenDrawer: (data: T) => void;
  }

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

  const handleOpenInfoDrawer = (data: T) => {
    if (drawerInfRef.current) {
      drawerInfRef.current.handleOpenDrawer(data);
    }
  };

  const rowsObjectWithOutObjectOnValues = removeObjectValues(rows);
  const titlesFromRow = rowsObjectWithOutObjectOnValues.length
    ? Object.keys(rowsObjectWithOutObjectOnValues[0])
    : [];
  const titleList = titles ? titles : titlesFromRow;

  return (
    <>
      <PersonInfoDrawer ref={drawerInfRef} />
      <Box pt={0} w={"full"} mb={4} mx={4} overflowX="auto">
        <Table.Root
          w={"100%"}
          h={"full"}
          px={4}
          bg={"table.body"}
          shadow={"md"}
          size="sm"
          whiteSpace={"nowrap"}
          interactive
        >
          <Table.Header shadow={"md"}>
            <Table.Row bg={"table.header"} h={"2rem"}>
              <Table.ColumnHeader key={"#"}>{"#"}</Table.ColumnHeader>
              {titleList.map((title, index) => (
                <Table.ColumnHeader key={index}>{title}</Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows &&
              rowsObjectWithOutObjectOnValues.map((row, irowIndex) => (
                <Table.Row
                  _hover={{ bg: "drawer.content" }}
                  transition="0.3s ease-in-out"
                  key={irowIndex}
                >
                  {Object.entries(row).map(([key, value], index) => {
                    if (key === "id") {
                      value = irowIndex + 1;
                    }
                    return (
                      <Table.Cell
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
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
          </Table.Body>
          {footer && (
            <Table.Footer>
              <Table.Row>
                {titles &&
                  titles.map((title, index) => (
                    <Table.Cell key={index}>{title}</Table.Cell>
                  ))}
              </Table.Row>
            </Table.Footer>
          )}
        </Table.Root>
      </Box>
    </>
  );
}
