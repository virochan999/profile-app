import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useUserStore from "../store/store";

// Define login form schema using zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  // Use the form hook with zod schema
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle login form submission
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      // Send login request to API
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      setUser({
        username: data.username,
        email: data.email,
        profileImage: data.profileImage ? data.profileImage[0] : null,
      });

      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 text-white">
      <div className="w-full max-w-md flex flex-col gap-8 shadow-lg rounded-lg p-8 bg-gradient-to-r from-neutral-900 to-gray-800">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <Button type="submit">Login</Button>
              <Button
                type="button"
                className="flex gap-2"
              >
                <span>Don't have account? </span>
                <NavLink
                  to="/signup"
                  className="underline"
                >
                  create a account
                </NavLink>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
