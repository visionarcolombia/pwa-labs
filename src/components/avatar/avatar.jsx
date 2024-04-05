import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import ReactSession from '../../adapters/session/session';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Mi perfil',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handlerLogout = () => {
    ReactSession.remove('user');
    localStorage.clear();
    navigate('/login', {replace: true})

  }

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    const token = ReactSession.get("user")
    if(token){
      const object = JSON.parse(window.atob(token.split('.')[1]))
      setUser({username: object.username, email: object.email})
    }

  }, [])

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="photoURL" >{user && user.username.charAt(0)}</Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user && user.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user && user.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handlerLogout} sx={{ m: 1 }}>
          Cerrar sesión
        </MenuItem>
      </Popover>
    </>
  );
}
