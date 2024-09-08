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
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for determining the current page

const pages = ['Home', 'View Tickets', 'Review'];

function Cnavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation(); // Get the current location

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Function to determine if a page is active
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: 'calc(100% - 160px)', // Slightly smaller than the full width of the page
        left: '80px', // Adjust left margin to center the Navbar
        top: '30px', // Add space from the top of the viewport
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Adjusted transparency
        backdropFilter: 'blur(15px)', // Increased blur effect for stronger glass look
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // Added subtle shadow to enhance depth
        borderRadius: '8px', // Rounded corners for a more modern look
        border: '1px solid rgba(255, 255, 255, 0.2)' // Light border to enhance the glass effect
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
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
                    backgroundColor: isActive(page === 'Home' ? '/customer_home' : `/${page.toLowerCase().replace(' ', '')}`) ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
                  }}
                >
                  <Link to={page === 'Home' ? '/customer_home' : `/${page.toLowerCase().replace(' ', '')}`} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        color: isActive(page === 'Home' ? '/customer_home' : `/${page.toLowerCase().replace(' ', '')}`) ? 'primary.main' : 'inherit',
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
                  color: isActive(page === 'Home' ? '/customer_home' : `/${page.toLowerCase().replace(' ', '')}`) ? 'primary.main' : 'black',
                  display: 'block',
                  backgroundColor: isActive(page === 'Home' ? '/customer_home' : `/${page.toLowerCase().replace(' ', '')}`) ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
                  '&:hover': {
                    color: 'primary.main', // Change text color on hover
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional background on hover
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', // 3D shadow effect
                    transform: 'translateY(-2px)', // Lift the element
                    transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition
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
                  color: isActive('/login') ? 'primary.main' : 'black',
                  display: 'block',
                  backgroundColor: isActive('/login') ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
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
