import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Input } from "../../atoms/inputElement/Input";
import { Button } from "../../atoms/button/Button";
import { FormDataType } from "../../../data/modal/types/formType/formType";
import { schema } from "../../../data/modal/validation/formValidation";
import { userTypeForHook } from "../../../data/modal/types/hookTypes/hookType";
import {
  FormSection,
  FormStyle,
} from "../../styles/formStyle/formMolecules.style";
import useRegister from "../../../hooks/useRegister";
import { useTranslation } from "react-i18next";

const FormMoleculer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
    watch,
    trigger,
  } = useForm<FormDataType>({
    resolver: joiResolver(schema),
  });

  const { registerUser } = useRegister<userTypeForHook>();

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    const setRoleData: userTypeForHook = {
      ...data,
      role: data.role ? "admin" : "user",
    };
    registerUser(setRoleData);
    reset();
  };

  const isFormSubmitting = isSubmitting || isLoading;
  const roleValue = watch("role");
  const { t } = useTranslation();

  let isValid: any;
  return (
    <>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            name="name"
            type="text"
            labelText={t("name")}
            htmlForLabel="name"
            placeholder={t("name")}
            registerProps={register("name")}
            error={errors.name?.message}
            onBlur={async () => {
              isValid = await trigger("name");
            }}
          />
          {!isValid && <p>{errors.name?.message}</p>}
        </div>

        <div>
          <Input
            name="password"
            type="password"
            labelText={t("password")}
            htmlForLabel="password"
            placeholder={t("enter your password")}
            registerProps={register("password")}
            error={errors.password?.message}
            onBlur={async () => {
              isValid = await trigger("password");
            }}
          />
          {!isValid && <p>{errors.password?.message}</p>}
        </div>

        <div>
          <Input
            name="email"
            type="email"
            labelText={t("email")}
            htmlForLabel="email"
            placeholder={t("Enter your email")}
            registerProps={register("email")}
            error={errors.email?.message}
            onBlur={async () => {
              isValid = await trigger("email");
            }}
          />
          {!isValid && <p>{errors.email?.message}</p>}
        </div>

        <div>
          <Input
            name="address"
            type="text"
            labelText={t("address")}
            htmlForLabel="address"
            placeholder={t("Enter your address")}
            error={errors.address?.message}
            registerProps={register("address")}
            onBlur={async () => {
              isValid = await trigger("address");
            }}
          />
          {!isValid && <p>{errors.address?.message}</p>}
        </div>
        <FormSection>
          <label htmlFor="role">{t("admin")}</label>
          <Input
            name="role"
            type="checkbox"
            labelText=""
            htmlForLabel=""
            areaLabel="admin"
            error={errors.role?.message}
            checked={roleValue || false}
            registerProps={register("role")}
            onBlur={async () => {
              isValid = await trigger("role");
            }}
          />
          {!isValid && <p>{errors.role?.message}</p>}
        </FormSection>

        {isFormSubmitting ? (
          <p>loading...</p>
        ) : (
          <Button text={t("submit")} type="submit" />
        )}
      </FormStyle>
    </>
  );
};

export default FormMoleculer;
