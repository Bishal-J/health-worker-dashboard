"use client";

import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Button,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useRouter } from "next/navigation";
import { useFetchFormById } from "@/apis/workers";
import dayjs from "dayjs";

export default function ProfileView() {
  const router = useRouter();
  const { uuid } = useParams() as { uuid: string };
  const { data: profile, isLoading, isError } = useFetchFormById(uuid);

  if (isLoading) {
    return (
      <CenteredBox>
        <CircularProgress size={40} thickness={5} />
      </CenteredBox>
    );
  }

  if (isError || !profile) {
    return (
      <CenteredBox>
        <Typography variant="h6" color="error">
          Failed to load profile data.
        </Typography>
      </CenteredBox>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Field label="Family ID" value={profile.family_id} />
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={router.back}
          >
            Go Back
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Basic Info */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Field
              label="Full Name"
              value={`${profile.first_name} ${profile.last_name}`}
            />
            <Field
              label="Date of Birth"
              value={dayjs(profile.dob).format("MMMM D, YYYY")}
            />
            <Field label="Age" value={`${profile.age} years`} />
            <Field label="Gender" value={capitalize(profile.gender)} />
            <Field label="State" value={capitalize(profile.state)} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field label="Cohort" value={profile.cohort} />
            <Field label="Height" value={`${profile.height} cm`} />
            <Field
              label="Weight"
              value={`${(profile.weight / 1000).toFixed(2)} kg`}
            />
            <Field label="BMI" value={profile.bmi.toFixed(1)} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        {/* Status Info */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Nutrition Status
            </Typography>
            <Chip
              label={capitalize(profile.nutrition_status)}
              color={profile.nutrition_status === "poor" ? "error" : "success"}
              variant="filled"
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Vaccination Status
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {capitalize(profile.vaccination_status)}
            </Typography>
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle1" fontWeight={600}>
              Enrolled in Feeding Program
            </Typography>
            <Chip
              label={profile.enrolled_feeding_program ? "Yes" : "No"}
              color={profile.enrolled_feeding_program ? "success" : "default"}
              variant="filled"
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <Box mb={2}>
    <Typography
      variant="subtitle2"
      fontWeight={600}
      color="text.secondary"
      gutterBottom
    >
      {label}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {value}
    </Typography>
  </Box>
);

const capitalize = (text: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

const CenteredBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    bgcolor="background.default"
  >
    {children}
  </Box>
);
