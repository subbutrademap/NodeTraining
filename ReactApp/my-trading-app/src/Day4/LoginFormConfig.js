import { useFormik } from "formik";
import * as yup from "yup";
const LoginFormConfig = () => {
    const loginForm = useFormik({
        initialValues : {
            userName : "Subbu",
            password : ""
        },
        validationSchema : yup.object({
            userName : yup.string().required("Username required"),
            password : yup.string().required("Password Required").min(3, "password must be 3 or more characters")
        }),
        onSubmit : (values)=> {
            console.log(values);

        }
    });

    return {
        loginForm
    }
}

export default LoginFormConfig;