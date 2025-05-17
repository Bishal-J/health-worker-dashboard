"use client";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import ThemeToggleSwitch from "../theme-toggle/ThemeToggleSwitch";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={3}
      sx={{
        boxShadow: (theme) => `0 2px 8px 0 ${theme.palette.primary.main}22`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/" passHref>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              sx={{
                transition: "background 0.2s, color 0.2s",
                color: (theme) => theme.palette.secondary.main,
                marginRight: 2,
              }}
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Typography
            variant="h5"
            fontWeight={700}
            color="inherit"
            sx={{ letterSpacing: 1 }}
          >
            Dashboard
          </Typography>

          <ThemeToggleSwitch />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
