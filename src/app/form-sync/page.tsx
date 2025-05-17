"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/common/cards/profile/ProfileCard";
import CustomSearchInput from "@/components/common/search/CustomSearch";
import { Box, Button, Container, Typography } from "@mui/material";
import theme from "@/utils/theme";

import { FormData } from "@/components/form/MultiStepForm"; // Ensure this points to your types

export default function FormSyncPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [draftForms, setDraftForms] = useState<FormData[]>([]);

  const handleSyncData = () => {};

  // Load drafts from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDrafts = JSON.parse(
        localStorage.getItem("formDrafts") || "[]"
      );
      setDraftForms(savedDrafts);
    }
  }, []);

  // Filter based on search input
  const filteredDrafts = draftForms.filter((form) => {
    const search = searchValue.toLowerCase();
    return (
      form.firstName.toLowerCase().includes(search) ||
      form.lastName.toLowerCase().includes(search) ||
      form.gender?.toLowerCase().includes(search)
    );
  });

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

        <Box textAlign="center" my={2}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="button"
            onClick={handleSyncData}
          >
            Sync Data
          </Button>
        </Box>

        <Box mb={4}>
          <CustomSearchInput
            value={searchValue}
            setValue={setSearchValue}
            placeholder="Search by name or ID..."
          />
        </Box>

        <Box display="flex" flexDirection="column" gap={3} mb={5}>
          {filteredDrafts.length > 0 ? (
            filteredDrafts.map((form, index) => (
              <ProfileCard
                key={index}
                id={form.familyId}
                firstName={form.firstName}
                lastName={form.lastName}
                age={form.age}
                gender={form.gender}
                state={form.state}
                nutritionStatus={form.nutritionStatus}
              />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No forms to sync.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
