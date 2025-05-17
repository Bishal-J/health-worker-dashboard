"use client";

import { useFetchFormCount } from "@/apis/workers";
import FormLink from "@/components/form-link/FormLink";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoading, data } = useFetchFormCount();
  const submittedFormCount = data?.submitted_form_count ?? 0;

  const [draftFormCount, setDraftFormCount] = useState(0);

  // Load draft form count from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const drafts = JSON.parse(localStorage.getItem("formDrafts") || "[]");
      setDraftFormCount(drafts.length);
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            textAlign: "center",
            border: (theme) => `1.5px solid ${theme.palette.primary.main}22`,
            boxShadow: (theme) =>
              `0 8px 32px 0 ${theme.palette.primary.main}22`,
            backdropFilter: "blur(2px)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Welcome back
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Choose an option below to continue your work.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 4,
              minHeight: 100,
              justifyContent: isLoading ? "center" : "flex-start",
              alignItems: isLoading ? "center" : "stretch",
            }}
          >
            {isLoading ? (
              <CircularProgress size={28} />
            ) : (
              <>
                <FormLink
                  title="Forms Submitted"
                  link="form-submit"
                  count={submittedFormCount}
                />

                <FormLink
                  title="Forms Sync"
                  link="form-sync"
                  count={draftFormCount}
                />
              </>
            )}
          </Box>

          <Button
            variant="contained"
            size="large"
            LinkComponent={Link}
            href="/entry-new"
            sx={{
              px: 4,
              fontWeight: 600,
              boxShadow: (theme) =>
                `0 2px 8px 0 ${theme.palette.primary.main}33`,
              transition: "background 0.2s, box-shadow 0.2s",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
                boxShadow: (theme) =>
                  `0 4px 16px 0 ${theme.palette.primary.main}44`,
              },
            }}
          >
            Make New Entry
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
