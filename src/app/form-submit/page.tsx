"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";

import ProfileCard from "@/components/common/cards/profile/ProfileCard";
import CustomSearchInput from "@/components/common/search/CustomSearch";
import { useFetchForms } from "@/apis/workers";
import type { Form } from "@/types";

export default function FormSubmitPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();

  const { isLoading, data, isError } = useFetchForms();

  const filteredForms = useMemo(() => {
    if (!data) return [];

    const search = searchValue.trim().toLowerCase();
    if (!search) return data;

    return data.filter((form: Form) => {
      return (
        [form.first_name, form.last_name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search) ||
        form.gender?.toLowerCase().includes(search) ||
        form.uuid?.toLowerCase().includes(search)
      );
    });
  }, [data, searchValue]);

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
            onClick={() => router.push("/")}
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

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error" textAlign="center">
            Failed to load forms.
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={3} mb={5}>
            {filteredForms.length === 0 ? (
              <Typography textAlign="center">No forms found.</Typography>
            ) : (
              filteredForms.map((form: Form) => (
                <ProfileCard
                  link={`/form-submit/${form.uuid}`}
                  key={form.uuid}
                  id={form.uuid}
                  firstName={form.first_name}
                  lastName={form.last_name}
                  age={form.age}
                  gender={form.gender}
                  state={form.state}
                  nutritionStatus={form.nutrition_status}
                />
              ))
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
