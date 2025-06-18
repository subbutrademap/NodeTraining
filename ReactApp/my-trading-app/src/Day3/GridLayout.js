import { Grid } from '@mui/material';

const GridLayout = () => {
  return (
    <Grid container spacing={1} m={1} direction={'row'} justifyContent={'flex-start'} >
        <Grid size={4} border={1} p={1} textAlign={'center'}>
            Sample Content1
        </Grid>

        <Grid  border={1} p={1}  textAlign={'center'}>
            
        </Grid>

        <Grid sx={{ ml: 'auto' }} border={1} p={1}  textAlign={'center'}>
            Sample Content2
        </Grid>
      
    </Grid>
  );
};

export default GridLayout;
