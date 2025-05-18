"use client";

import theme from "@/utils/theme";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NextLink from "next/link";
import React from "react";

type ProfileCardProps = {
  id: string | undefined;
  firstName: string;
  lastName: string;
  age: string;
  link: string;
  gender: string;
  state: string;
  nutritionStatus: string;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
  onDelete?: (id: string | undefined) => void;
  editLink?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  link,
  firstName,
  lastName,
  age,
  gender,
  state,
  nutritionStatus,
  showDeleteButton = false,
  showEditButton = false,
  onDelete,
  editLink,
}) => {
  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onDelete?.(id);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (editLink) {
      window.location.href = editLink; // Redirect to edit page
    }
  };

  return (
    <Link
      component={NextLink}
      sx={{ textDecoration: "none" }}
      href={link || ""}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: "none",
          position: "relative",
        }}
      >
        {showDeleteButton && (
          <IconButton
            onClick={handleDeleteClick}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
            aria-label="delete"
          >
            <DeleteIcon color="error" />
          </IconButton>
        )}

        {showEditButton && editLink && (
          <IconButton
            onClick={handleEditClick}
            sx={{
              position: "absolute",
              top: 8,
              right: showDeleteButton ? 48 : 8,
              zIndex: 1,
            }}
            aria-label="edit"
          >
            <EditIcon color="primary" />
          </IconButton>
        )}

        <CardActionArea>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              color="text.primary"
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {firstName} {lastName}
            </Typography>

            <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
              <Typography variant="body2" color="text.primary">
                Age: {age}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Gender: {gender}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.primary">
              State: {state}
            </Typography>

            <Typography variant="body2" color="primary.main" sx={{ mt: 1 }}>
              Nutrition Status: {nutritionStatus}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProfileCard;
