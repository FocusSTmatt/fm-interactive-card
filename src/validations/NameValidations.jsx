import * as yup from "yup"; 

export const nameSchema = yup.object().shape({
    name: yup.string().matches(/[a-z]/gi).required(),
})