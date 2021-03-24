import React, { useRef } from "react";
import { useForm } from "react-hook-form";


function LoginPage() {
  const { register, watch, errors, handleSubmit } = useForm();

  const password = useRef();
  password.current = watch("password");
  const onSubmit = (data) => {
    console.log(data);

    // enter post request with axios
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column'}}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Name</label>
        <input name="name" ref={register({ required: true, maxLength: 20 })} />
        {errors.name && errors.name.type === "required" && (
          <p>This name field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>Your input exceed maximum lenght(10)</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLenght: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This name field is required</p>
        )}
        {errors.password && errors.password.type === "minLenght" && (
          <p>Your should enter more than 6 characters for password</p>
        )}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>This name field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>The password does not match</p>
          )}
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
