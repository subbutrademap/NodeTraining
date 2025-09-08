import {Paper, Typography , Box , TextField , Button} from "@mui/material"
import LoginFormConfig from "./LoginFormConfig";

const LoginForm = ()=> {

    const {loginForm} = LoginFormConfig();

    return (
        <Box sx={{width : "100vw", height :"100vh" , display : "flex" , justifyContent : "center" , alignItems : "center"}}>
            <Paper elevation={2} sx={{width : "30%"}}>
                <Typography variant="h3" textAlign="center">Login Form</Typography>
                <form onSubmit={loginForm.handleSubmit}>
                    <Box sx={{display : "flex" ,flexFlow : "column" , gap : 2 , p:2}}>

                            <TextField variant="standard" value={loginForm.values.userName}
                             name="userName" onChange={loginForm.handleChange} 
                             onBlur={loginForm.handleBlur} label="Username"
                             error={loginForm.touched.userName && Boolean(loginForm.errors.userName)}
                             helperText={loginForm.touched.userName && loginForm.errors.userName}
                             ></TextField>
                            
                            <TextField variant="standard" value={loginForm.values.password} 
                            name="password" onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} label="Password" 
                            type="password" error={loginForm.touched.password && Boolean(loginForm.errors.password)}
                            helperText={loginForm.touched.password && loginForm.errors.password}></TextField>
                            <Button variant="contained" type="submit" sx={{alignSelf : "center"}}

                            >Login</Button>

                    </Box>
                </form> 
            </Paper>
        </Box>
    )
}

export default LoginForm;