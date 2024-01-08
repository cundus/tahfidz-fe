/* eslint-disable react/prop-types */
import Pagination from "../atoms/Pagination";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

const TableCustom = ({ thead, tbody }) => {
  return (
    <TableContainer marginTop={6} border="1px solid #E2E8F0">
      <Table variant="simple">
        <Thead bg="#F8F9FA">
          <Tr>
            {thead.map((item) => (
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{tbody}</Tbody>
      </Table>
      <Pagination />
    </TableContainer>
  );
};

export default TableCustom;
