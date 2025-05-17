"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/common/cards/profile/ProfileCard";
import CustomSearchInput from "@/components/common/search/CustomSearch";
import { Box, Button, Container, Typography } from "@mui/material";
import theme from "@/utils/theme";

export default function FormSyncPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box
      sx={{
        py: 6,
        color: theme.palette.text.primary,
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight={700} color="text.primary">
            Form Sync Page
          </Typography>
          <Button
            variant="contained"
            disableElevation
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>

        <Typography variant="subtitle1" color="text.primary" mb={4}>
          List of all the forms waiting to be synced with the server.
        </Typography>

        <Box mb={4}>
          <CustomSearchInput
            value={searchValue}
            setValue={setSearchValue}
            placeholder="Search by name or ID..."
          />
        </Box>

        <Box display="flex" flexDirection="column" gap={3} mb={5}>
          <ProfileCard
            id="123"
            firstName="Jane"
            lastName="Doe"
            age={29}
            gender="Female"
            state="California"
            nutritionStatus="Well-nourished"
          />
        </Box>

        <Box textAlign="center" mt={4}>
          <Button variant="contained" size="large">
            Sync Data
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
