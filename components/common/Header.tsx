import {
  AppBar,
  Box,
  Button,
  Theme,
  Grid,
  Toolbar,
  Typography,
  Avatar,
  MenuItem,
  Menu,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useAuth } from "lib";
import React, { useState } from "react";
import { Logo } from "components/common";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow: "none",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    },
    logo: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginLeft: theme.spacing(1),
    },
  })
);

const Header = () => {
  const auth = useAuth();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="secondary">
      <Toolbar>
        <div className={classes.logo}>
          <Logo />
        </div>
        {auth.user ? (
          <div>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Typography>{auth.user.name}</Typography>
              <Avatar className={classes.avatar}>
                {auth.user.name
                  .split(/\s/)
                  .reduce(
                    (response, word) => (response += word.slice(0, 1)),
                    ""
                  )}
              </Avatar>
            </Box>
            <Popper
              open={open}
              anchorEl={anchorEl}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow">
                        <MenuItem onClick={auth.signOut}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        ) : (
          <Link href="/login">
            <Button>Log In</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
