import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/types";

const Auth = () => {

  const [variant, setVariant] = useState("login");
  const togglevariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
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
  }

  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)}>
        {/* <TextField /> */}
        <TextField label='メールアドレス' {...register('email')} />
        <TextField label='パスワード' {...register('password')} />
        <Button type="submit">Login</Button>
    </Stack>
  );
};

export default Auth;
