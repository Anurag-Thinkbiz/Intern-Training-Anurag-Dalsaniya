import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../atoms/button/Button";
import { Input } from "../../atoms/inputElement/Input";
import { FormStyle } from "../../styles/formStyle/formMolecules.style";
import { loginDataType } from "../../../data/modal/types/formType/formType";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../../data/modal/validation/formValidation";
import useAuth from "../../../hooks/useAuth";
import { t } from "i18next";

const LoginFormMolecule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
    trigger,
  } = useForm<loginDataType>({
    resolver: joiResolver(loginSchema),
  });
  const { authUser } = useAuth();
  const onSubmit: SubmitHandler<loginDataType> = (data: loginDataType) => {
    authUser(data);
    reset();
  };
  let isValid = false;
  const isFormSubmitting = isSubmitting || isLoading;
  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          name="email"
          type="email"
          labelText={t("email")}
          htmlForLabel="email"
          placeholder={t("enter your email")}
          registerProps={register("email")}
          onBlur={async () => {
            isValid = await trigger("email");
          }}
        />
        {!isValid && <p>{errors.email?.message}</p>}
      </div>
      <div>
        <Input
          name="password"
          type="password"
          labelText={t("password")}
          htmlForLabel="password"
          placeholder={t("enter your password")}
          registerProps={register("password")}
          onBlur={async () => {
            isValid = await trigger("password");
          }}
        />
        {!isValid && <p>{errors.password?.message}</p>}
      </div>
      {isFormSubmitting ? (
        <p>loading...</p>
      ) : (
        <Button text={t("login")} type="submit" />
      )}
    </FormStyle>
  );
};
export default LoginFormMolecule;
