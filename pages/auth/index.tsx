import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/types";

const Auth = () => {
  const [variant, setVariant] = useState("login");

  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    if (variant === "register") {
      try {
        await axios.post("/api/register", {
          name: data?.name,
          email: data?.email,
          password: data?.password,
        });
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      {variant === "register" && (
        <TextField label="名前" {...register("name")} />
      )}
      <TextField label="メールアドレス" {...register("email")} />
      <TextField label="パスワード" {...register("password")} />
      <Button type="submit">Login</Button>
      <Button type="button" onClick={() => setVariant("register")}>Create Account</Button>
    </Stack>
  );
};

export default Auth;
