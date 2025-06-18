import { Grid, Box, Typography } from '@mui/material';
import BrandingImg from "./../assets/Branding.jpg"


const Branding = ()=> {
    return (
        <Grid container  height="100%" m={3} spacing={2} >
            <Grid item size={{xs :12 , sm : 6}} order={{xs : 1 , sm : 0}} height="100%" >
               <Box component="img" src={BrandingImg}  height="100%" width="100%"></Box>
            </Grid>

            <Grid item size={{xs :12 , sm : 6}} order={{xs : 0 , sm : 1}} height="100%" container alignItems="center" sx={{background : "#ced5f5" }}>
                <Grid pl={2}>
                    <Typography variant='h4'>Welcome to CodeMaster Training</Typography>
                    <Typography variant="h6">
                        Unlock your potential with our beginner-friendly web development training.
                    </Typography>

                    <ul>
                        <li>Expert Instructors</li>
                        <li>Flexible Schedule</li>
                        <li>Career-Focused Training</li>
                        <li>Real-World Projects</li>
                        <li>Interactive Coding Sessions</li>
                    </ul>
                </Grid>
                   
            </Grid>


        </Grid>

    )
}

export default Branding;