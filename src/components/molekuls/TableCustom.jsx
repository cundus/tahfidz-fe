/* eslint-disable react/prop-types */
import Pagination from "../atoms/Pagination";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

const TableCustom = ({ thead, tbody, theadCustom }) => {
  return (
    <TableContainer marginTop={6} border="1px solid #E2E8F0">
      <Table variant="simple">
        <Thead
          css={{ textTransform: "capitalize", fontSize: "15px" }}
          bg="#F8F9FA"
        >
          {theadCustom ? (
            theadCustom
          ) : (
            <Tr>
              {thead.map((item) => (
                <Th key={item}>{item}</Th>
              ))}
            </Tr>
          )}
        </Thead>
        <Tbody css={{ fontSize: "15px" }}>{tbody}</Tbody>
      </Table>
      <Pagination />
    </TableContainer>
  );
};

export default TableCustom;
