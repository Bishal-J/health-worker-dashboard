"use client";

import theme from "@/utils/theme";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";

type ProfileCardProps = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  state: string;
  nutritionStatus: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  firstName,
  lastName,
  age,
  gender,
  state,
  nutritionStatus,
}) => {
  return (
    <Link
      component={NextLink}
      sx={{ textDecoration: "none" }}
      href={`/profile/${id}`}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: "none",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              color="text.primary"
              sx={{ fontWeight: "bold" }}
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
