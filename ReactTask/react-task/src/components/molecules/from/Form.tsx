import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Input } from "../../atoms/InputElement/Input";
import { Button } from "../../atoms/Button/Button";
import { FormDataType } from "../../../data/modal/types/formType/formType";
import { schema } from "../../../data/modal/validation/formValidation";
import { userTypeForHook } from "../../../data/modal/types/hookTypes/reduxType";
import { FormSection, FormStyle } from "../../styles/formStyle/formMolecules.style";
import useRegister from "../../../hooks/useRegister";

const FormMoleculer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting,isLoading },
    reset,
    watch,
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

  return (
    <>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            name="name"
            type="text"
            labelText="Name"
            htmlForLabel="name"
            placeholder="Enter your name"
            error={errors.name?.message}
            registerProps={register("name")}
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
            name="address"
            type="text"
            labelText="Address"
            htmlForLabel="address"
            placeholder="Enter your address"
            error={errors.address?.message}
            registerProps={register("address")}
            touchedFields={touchedFields}
          />
        </div>

        <FormSection>
          <label htmlFor="role">Admin</label>
          <Input
            name="role"
            type="checkbox"
            labelText=""
            htmlForLabel=""
            error={errors.role?.message}
            checked={roleValue || false}
            registerProps={register("role")}
            touchedFields={touchedFields}
          />
        </FormSection>

        {/* Disable submit button while the form is submitting */}
        {isFormSubmitting ? (
          <p>loading...</p>
        ) : (
          <Button text={"Submit"} type="submit" />
        )}
      </FormStyle>
    </>
  );
};

export default FormMoleculer;
