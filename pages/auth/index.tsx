import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/types";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Auth = () => {
  const [variant, setVariant] = useState("login");

  const schema = useMemo(() => {
    const baseSchema = {
      email: z
        .string()
        .nonempty({ message: "メールアドレスは必須です" })
        .email({ message: "適切なメールアドレスにしてください" }),
      password: z
        .string()
        .nonempty({ message: "パスワードは必須です" })
        .min(8, { message: "パスワードは8文字以上にしてください" })
        .max(32, { message: "パスワードは32文字以下にしてください" }),
    };

    if (variant === "register") {
      return z.object({
        ...baseSchema,
        name: z
          .string()
          .nonempty({ message: "名前は必須です" })
          .min(2, { message: "名前は2文字以上にしてください" })
          .max(50, { message: "名前は50文字以下にしてください" }),
      });
    }

    return z.object(baseSchema);
  }, [variant]);

  const togglevariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.6)),url(/images/login3.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 1 / 3,
          backgroundColor: "#000",
          borderRadius: 2,
          color: "#fff",
          textAlign: "center",
          py: 6,
          px: 8,
          boxSizing: "border-box",
        }}
        spacing={4}
      >
        <Box>
          <img src="/images/lwiz.png" width="50%" />
          <Typography sx={{ fontStyle: "italic" }}>
            Connect intern student with company
          </Typography>
        </Box>
        <Stack spacing={2}>
          {variant === "register" && (
            <TextField
              label="name"
              {...register("name")}
              error={Boolean(errors.name)}
              helperText={errors.name?.message as string}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#C30E14", // フォーカス時のボーダー色
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#C30E14", // フォーカス時のボーダー色
                  },
                  "&:hover fieldset": {
                    borderColor: "#C30E14", // ホバー時のボーダー色
                  },
                  background: "#fff", // backgroundプロパティをここに移動
                },
                "& .MuiInputLabel-shrink.Mui-focused": {
                  color: "#C30E14",
                },
                "& .MuiInputLabel-root": {
                  background: "transparent",
                },
              }}
            />
          )}
          <TextField
            label="email"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#C30E14", // フォーカス時のボーダー色
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#C30E14", // フォーカス時のボーダー色
                },
                "&:hover fieldset": {
                  borderColor: "#C30E14", // ホバー時のボーダー色
                },
                background: "#fff", // backgroundプロパティをここに移動
              },
              "& .MuiInputLabel-shrink.Mui-focused": {
                color: "#C30E14",
              },
              "& .MuiInputLabel-root": {
                background: "transparent",
              },
            }}
          />
          <TextField
            label="password"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message as string}
            type="password"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#C30E14", // フォーカス時のボーダー色
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#C30E14", // フォーカス時のボーダー色
                },
                "&:hover fieldset": {
                  borderColor: "#C30E14", // ホバー時のボーダー色
                },
                background: "#fff", // backgroundプロパティをここに移動
              },
              "& .MuiInputLabel-shrink.Mui-focused": {
                color: "#C30E14",
              },
              "& .MuiInputLabel-root": {
                background: "transparent",
              },
            }}
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#C30E14",
            "&:hover": {
              backgroundColor: "#C30E14",
              opacity: 0.8,
            },
          }}
        >
          {variant === "login" ? "Login" : "Sign Up"}
        </Button>
        <Button type="button" onClick={togglevariant} sx={{ color: "#C30E14" }}>
          {variant === "login" ? "Create account?" : "Login?"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Auth;
