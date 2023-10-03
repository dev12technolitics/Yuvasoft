import { Box, Button, Link, Stack } from "@mui/material";

export default function UserTableToolbar() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{ py: 2.5, px: 3 }}
      className="flex justify-between"
    >
      <Box>
        <Link href="/createuser">
          <Button variant="contained">Add User</Button>
        </Link>
      </Box>
    </Stack>
  );
}
