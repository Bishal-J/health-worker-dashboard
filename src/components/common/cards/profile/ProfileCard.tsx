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
  onDelete?: (id: string | undefined) => void;
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
  onDelete,
}) => {
  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent navigation
    event.preventDefault();
    onDelete?.(id);
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
