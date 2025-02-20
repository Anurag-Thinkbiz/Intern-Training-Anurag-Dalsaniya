import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/InputElement/Input";
import { FormStyle } from "../../styles/formStyle/formMolecules.style";
import { loginDataType } from "../../../data/modal/types/formType/formType";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from "../../../data/modal/validation/formValidation";

const LoginFormMolecule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting, isLoading },
  } = useForm<loginDataType>({
    resolver: joiResolver(schema),
  });

  //   const { registerUser } = useRegister<userTypeForHook>();

  const onSubmit: SubmitHandler<loginDataType> = (data) => {
    console.log(data);

    // registerUser(setRoleData);
  };
  const isFormSubmitting = isSubmitting || isLoading;
  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          name="email"
          type="email"
          labelText="Email"
          htmlForLabel="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          registerProps={register("email")}
          touchedFields={touchedFields}
        />
      </div>
      <div>
        <Input
          name="password"
          type="password"
          labelText="Password"
          htmlForLabel="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          registerProps={register("password")}
          touchedFields={touchedFields}
        />
      </div>
      {isFormSubmitting ? (
        <p>loading...</p>
      ) : (
        <Button text={"Login"} type="submit" />
      )}
    </FormStyle>
  );
};
export default LoginFormMolecule;
