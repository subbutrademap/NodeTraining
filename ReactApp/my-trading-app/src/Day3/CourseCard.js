import { Typography , Card, CardMedia , CardContent, CardActions , Button } from '@mui/material';
import ReactLogo from "./../assets/React.png"

const CourseCard = ({logo, title, duration, fees})=> {

    return (
        <Card sx={{background : "#ced5f5"}}>
        <CardMedia component="img" height="70" sx={{objectFit : "contain"}} image={logo}>

        </CardMedia>

        <CardContent>
            <Typography variant='h6' textAlign="center" >{title}</Typography>
            <ul>
                <li>Course Duration : {duration} Days</li>
                <li>Course Fee : {fees}</li>
            </ul>
        </CardContent>

        <CardActions  sx={{justifyContent : "center"}}>
            <Button size="small" variant="contained">Register</Button>
            <Button size="small">Details</Button>
        </CardActions>
    </Card>
    )
}

export default CourseCard