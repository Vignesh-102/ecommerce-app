import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = loginSchema.extend({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
