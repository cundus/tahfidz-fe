/* eslint-disable react/prop-types */
import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import Pagination from "../atoms/Pagination";

const TableCustom = ({ thead, tbody, theadCustom, isLoading }) => {
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
        <Tbody css={{ fontSize: "15px" }}>
          {tbody}
          {isLoading && (
            <Td colSpan={5} textAlign="center">
              <Spinner size="xl" color="blue" />
            </Td>
          )}
        </Tbody>
      </Table>
      <Pagination />
    </TableContainer>
  );
};

export default TableCustom;
