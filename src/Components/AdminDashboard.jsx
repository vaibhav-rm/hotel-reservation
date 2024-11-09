import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion, AnimatePresence } from 'framer-motion';
import { Client, Account, Databases, Query } from 'appwrite';

// Initialize Appwrite
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('672e05b7001bd6a46b34');

const account = new Account(client);
const databases = new Databases(client);

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700', // Gold color
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://legrande.com/">
        Le Grande Restaurant
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

// Login component
const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

// Dashboard component
const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Reservations Overview
          </Typography>
          <Typography variant="body1">
            Total Reservations: 150
          </Typography>
          <Typography variant="body1">
            Pending Reservations: 30
          </Typography>
          <Typography variant="body1">
            Completed Reservations: 120
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recent Activities
          </Typography>
          <Typography variant="body2">
            • New reservation made by John Doe
          </Typography>
          <Typography variant="body2">
            • Reservation approved for Jane Smith
          </Typography>
          <Typography variant="body2">
            • Menu updated: Added new dessert
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Today's Reservations
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Guests</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Alice Johnson</TableCell>
                <TableCell>18:00</TableCell>
                <TableCell>4</TableCell>
                <TableCell>Confirmed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Williams</TableCell>
                <TableCell>19:30</TableCell>
                <TableCell>2</TableCell>
                <TableCell>Pending</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

// ReservationsComponent
const ReservationsComponent = ({ status }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await databases.listDocuments(
          '672e06430023b0353f74',
          '672e064a002426795cf4',
          [
            Query.equal('status', status)
          ]
        );
        setReservations(response.documents);
      } catch (error) {
        console.error('Error fetching reservations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [status]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Guests</TableCell>
              {status === 'pending' && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={reservation.$id}>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.dateTime}</TableCell>
                <TableCell>{reservation.guests}</TableCell>
                {status === 'pending' && (
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                      Approve
                    </Button>
                    <Button variant="contained" color="error" size="small">
                      Reject
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// MenuManagement component
const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Filet Mignon', category: 'Main Course', price: 35.99 },
    { id: 2, name: 'Caesar Salad', category: 'Appetizer', price: 9.99 },
    { id: 3, name: 'Crème Brûlée', category: 'Dessert', price: 8.99 },
  ]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Menu Management
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Add New Item
      </Button>
    </Paper>
  );
};

// StaffManagement component
const StaffManagement = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: 'John Doe', position: 'Chef', contact: 'john@example.com' },
    { id: 2, name: 'Jane Smith', position: 'Waiter', contact: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', position: 'Manager', contact: 'mike@example.com' },
  ]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Staff Management
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((employee) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.contact}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Add New Staff
      </Button>
    </Paper>
  );
};

// Reports component
const Reports = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Report
            </Typography>
            <Typography variant="body1">
              Total Revenue: $15,000
            </Typography>
            <Typography variant="body1">
              Average Daily Revenue: $500
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Reservation Report
            </Typography>
            <Typography variant="body1">
              Total Reservations: 150
            </Typography>
            <Typography variant="body1">
              Average Party Size: 4
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Generate Detailed Report
      </Button>
    </Paper>
  );
};

// Settings component
const Settings = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Restaurant Name"
            defaultValue="Le Grande Restaurant"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contact Email"
            defaultValue="info@legrande.com"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Opening Hours"
            defaultValue="11:00 AM - 10:00 PM"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Reservation Time Slot Duration"
            defaultValue="2 hours"
            variant="outlined"
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Settings
      </Button>
    </Paper>
  );
};

// Main AdminDashboard component
const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
            ml: open ? `${drawerWidth}px` : 0,
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Le Grande Admin Dashboard
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={() => setActiveTab('dashboard')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => setActiveTab('pending')}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Pending Reservations" />
            </ListItemButton>
            <ListItemButton onClick={() => setActiveTab('completed')}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Completed Reservations" />
            </ListItemButton>
            <ListItemButton onClick={() => setActiveTab('menu')}>
              <ListItemIcon>
                <RestaurantMenuIcon />
              </ListItemIcon>
              <ListItemText primary="Menu Management" />
            </ListItemButton>
            <ListItemButton onClick={() => setActiveTab('staff')}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Staff Management" />
            </ListItemButton>
            <ListItemButton onClick={() => setActiveTab('reports')}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton onClick={() => setActiveTab('settings')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            pt: 8, // Add padding top to account for the AppBar
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'pending' && <ReservationsComponent status="pending" />}
                {activeTab === 'completed' && <ReservationsComponent status="completed" />}
                {activeTab === 'menu' && <MenuManagement />}
                {activeTab === 'staff' && <StaffManagement />}
                {activeTab === 'reports' && <Reports />}
                {activeTab === 'settings' && <Settings />}
              </motion.div>
            </AnimatePresence>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;