import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export const signInSchema = z.object({
  email: z.string().email({message: "Email inválido"}).trim(),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").trim(),
});

export const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "all",
    criteriaMode: "all",
  });

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
  };
};