import LoginFormMolecule from "../../molecules/loginForm/loginForm"
import {  FormHeading,FormContainerLogin } from "../../styles/formStyle/formOrganisms.style";


const LoginForm = ({formHeading}:{formHeading:string}) => {
  return (
    <FormContainerLogin >
        <FormHeading >{formHeading}</FormHeading>
        <LoginFormMolecule></LoginFormMolecule>
    </FormContainerLogin>
  )
}

export default LoginForm;