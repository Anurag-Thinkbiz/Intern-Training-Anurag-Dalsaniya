import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Input } from "../../atoms/InputElement/Input";
import { Button } from "../../atoms/Button/Button";
import { FormDataType, formInputTextType } from "../../../data/modal/types/formType/formType";
import { schema } from "../../../data/modal/validation/formValidation";
import { userTypeForHook } from "../../../data/modal/types/hookTypes/hookType";
import {
  FormSection,
  FormStyle,
} from "../../styles/formStyle/formMolecules.style";
import useRegister from "../../../hooks/useRegister";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

const FormMoleculer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors,  isSubmitting, isLoading },
    reset,
    watch,
    trigger,
  } = useForm<FormDataType>({
    resolver: joiResolver(schema),
  });

  const { registerUser } = useRegister<userTypeForHook>();

  const [touched, setTouched] = useState<string[]>();

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

  const handleBlurEvent = useCallback(
    (e: Event) => {
      const name = e?.currentTarget?.name;
      // console.log({name})
      async function handleBlur() {
        if (!touched?.includes(name)) {
          setTouched((prev) => [...(prev ?? []), name]);
        }
      }
      handleBlur();
    },
    [touched]
  );

  useEffect(() => {

  }, [touched]);
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
            touchedFields={touched?.includes("name")}
            error={errors.name?.message}
            // onBlur={handleBlurEvent}
            onBlur={async () => {
              const isValid = await trigger("name");
              console.log("Is valid:", isValid); // Debug to check if it's triggering validation correctly
            }}
          />
        </div>

        <div>
          <Input
            name="password"
            type="password"
            labelText={t("password")}
            htmlForLabel="password"
            placeholder={t("enter your password")}
            registerProps={register("password")}
            touchedFields={touched?.includes("password")}
            error={errors.password?.message}
            onBlur={(e: Event) => handleBlurEvent(e)}
          />
        </div>

        <div>
          <Input
            name="email"
            type="email"
            labelText={t("email")}
            htmlForLabel="email"
            placeholder={t("Enter your email")}
            registerProps={register("email")}
            touchedFields={touched?.includes("email")}
            error={errors.email?.message}
            onBlur={(e: Event) => handleBlurEvent(e)}
          />
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
            touchedFields={touched?.includes("address")}
            onBlur={(e: Event) => handleBlurEvent(e)}
          />
        </div>
        <FormSection>
          <label htmlFor="role">{t("admin")}</label>
          <Input
            name="role"
            type="checkbox"
            labelText=""
            htmlForLabel=""
            error={errors.role?.message}
            checked={roleValue || false}
            registerProps={register("role")}
            onBlur={(e: Event) => handleBlurEvent(e)}
          />
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
