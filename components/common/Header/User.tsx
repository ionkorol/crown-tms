import {
  Box,
  Typography,
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Link,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { useAuth } from "lib";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginLeft: theme.spacing(1),
    },
  })
);

const User = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const auth = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <React.Fragment>
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
                .reduce((response, word) => (response += word.slice(0, 1)), "")}
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
    </React.Fragment>
  );
};

export default User;
