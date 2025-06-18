import React from 'react';
import { Grid } from '@mui/material';
import ReactLogo from "./../assets/React.png"
import NodeJSLogo from "./../assets/NodeJS.png";
import ReactMUILogo from "./../assets/RMUI.png"

import Header from './Header';
import Branding from './Branding';
import CourseCard from './CourseCard';

const Home = () => {
  return (

    <Grid container  direction={'column'} >
        <Grid>
            <Header />

        </Grid>

        <Grid sx={{ height : {xs : 'auto' , sm : "350px"}}}>
            <Branding />
           
        </Grid>

        <Grid>

            <Grid container justifyContent="center" spacing={5} mt={8}>

                <CourseCard title="React JS" duration={10} fees={5000} logo={ReactLogo} />  
                <CourseCard title="NodeJS" duration={8} fees={4000} logo={NodeJSLogo} />  
                <CourseCard title="React MUI" duration={5} fees={2000} logo={ReactMUILogo} />  

            </Grid>


         
        </Grid>

    </Grid>


  );
};

export default Home;
