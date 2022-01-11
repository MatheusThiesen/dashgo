import { Box, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export default function Pagination() {
  return (
    <Stack
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
      direction={["column", "row"]}
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack spacing="2" direction="row">
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
      </Stack>
    </Stack>
  );
}
