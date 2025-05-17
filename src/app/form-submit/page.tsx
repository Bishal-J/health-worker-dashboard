"use client";

import { useState } from "react";
import ProfileCard from "@/components/common/cards/profile/ProfileCard";
import CustomSearchInput from "@/components/common/search/CustomSearch";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function FormSubmitPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme(); // Get the current theme

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
            Form Submit Page
          </Typography>

          <Button
            variant="contained"
            disableElevation
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>

        <Typography variant="body1" color="text.primary" mb={4}>
          List of all the forms that have been submitted by you.
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
      </Container>
    </Box>
  );
}
