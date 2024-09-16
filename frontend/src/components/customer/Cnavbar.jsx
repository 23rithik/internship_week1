import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation } from 'react-router-dom';

const pages = ['Home', 'View Tickets', 'Review'];

function Cnavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Function to determine if the current path is one of the passed paths
  const isActive = (paths) => paths.includes(location.pathname);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: 'calc(100% - 160px)', 
        left: '80px', 
        top: '30px', 
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: -1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img
                src="https://i.pinimg.com/474x/6e/96/03/6e96035f9ee514180c799e17b25e8b92.jpg"
                alt="Logo"
                style={{
                  height: '40px',
                  width: '40px',
                  marginRight: '10px',
                  borderRadius: '50%',
                }}
              />
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    backgroundColor: isActive(page === 'Home' ? ['/customer_home', '/tickets', '/movie_book'] : [`/${page.toLowerCase().replace(' ', '')}`])
                      ? 'rgba(0, 0, 0, 0.1)'
                      : 'inherit',
                  }}
                >
                  <Link to={page === 'Home' ? '/customer_home' : `/${page.toLowerCase().replace(' ', '')}`} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        color: isActive(page === 'Home' ? ['/customer_home', '/tickets', '/movie_book'] : [`/${page.toLowerCase().replace(' ', '')}`])
                          ? 'primary.main'
                          : 'inherit',
                      }}
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: isActive(page === 'Home' ? ['/customer_home', '/tickets', '/movie_book'] : [`/${page.toLowerCase().replace(' ', '')}`])
                    ? 'primary.main'
                    : 'black',
                  display: 'block',
                  backgroundColor: isActive(page === 'Home' ? ['/customer_home', '/tickets', '/movie_book'] : [`/${page.toLowerCase().replace(' ', '')}`])
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'inherit',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  },
                }}
              >
                <Link to={page === 'Home' ? '/customer_home' : `/${page.toLowerCase().replace(' ', '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  my: 2,
                  color: isActive(['/login']) ? 'primary.main' : 'black',
                  display: 'block',
                  backgroundColor: isActive(['/login']) ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  },
                }}
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Cnavbar;
