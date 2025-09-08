
import {Paper, Typography , Box , TextField , Button} from "@mui/material"
import { useState } from "react";
import { CalcModel } from "./CalcModel";


const Calculator = ()=> {

    const [model,updateModel] = useState(CalcModel)

    function updateCalcModel(ctrl) {
        updateModel(
            (preValue) => {
             return {
                ...preValue , 
                [ctrl.target.name] : parseInt(ctrl.target.value) || ""
             }
            }
        )
    }

    function calculate(operation) {
        let result = 0;
        switch(operation) {
             case "ADD" :
                result =  model.num1 + model.num2;
                break;
            case "SUB" : 
                result = model.num1 - model.num2;
                break;
                
        }
        updateModel((p)=> {return {...p , result}})

    }


    return (
       <Paper elevation={2} sx={{p:2, m: 2 , width : "25%"}} >
            <Typography variant="h3">Calculator</Typography>

             <Box sx={{display : "flex", gap : 2}}>
                <TextField label="Number 1" variant="standard" value={model.num1} name="num1" onChange={updateCalcModel} ></TextField>
                <TextField label="Number 2" variant="standard" value={model.num2} name="num2" onChange={updateCalcModel} ></TextField>
                <TextField label="Result" variant="standard" value={model.result} disabled="true" ></TextField>

            </Box> 

            <Box sx={{display : "flex", gap : 2 , mt:2}}>
                <Button variant="contained" onClick={()=> calculate("ADD")}>Addition</Button>
                <Button variant="contained" onClick={()=> calculate("SUB")}>Subtraction</Button>
            </Box> 
            
       </Paper>
    )
}

export default Calculator;