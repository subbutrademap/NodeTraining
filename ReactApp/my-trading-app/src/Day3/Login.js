import React from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, Button, Link, Paper } from '@mui/material';

const Login = () => (
  <>
    <AppBar position="static">
      <Toolbar><Typography variant="h6">My Trading Application</Typography></Toolbar>
    </AppBar>
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" px={2}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 350, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <TextField fullWidth label="Username" variant="outlined" margin="normal" />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
        <Button fullWidth variant="contained" >Login</Button>
        <Box textAlign="center" mt={2}>
          <Link href="#" underline="hover">Forgot Password?</Link>
          <Link href="#" underline="hover" >New User?</Link>
        </Box>
      </Paper>
    </Box>
  </>
);

export default Login;
