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
import { formSchema } from "../hookform/resolvers/zod";
import useUserStore from "../store/store";

const Signup = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      profileImage: null,
    },
  });

  const fileRef = form.register("profileImage");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("email", values.email);

      if (values.profileImage && values.profileImage.length > 0) {
        formData.append("profileImage", values.profileImage[0]);
      }

      setUser({
        username: values.username,
        email: values.email,
        profileImage: values.profileImage ? values.profileImage[0] : null,
      });

      await axios.post("http://localhost:5000/auth/Signup", formData, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 text-white">
      <div className="w-full max-w-md flex flex-col gap-8 shadow-lg rounded-lg p-8 bg-gradient-to-r from-neutral-900 to-gray-800">
        <h2 className="text-2xl font-bold text-center">Sign up</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="profileImage"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Upload your image..."
                      {...fileRef}
                      accept="image/*"
                      className="file:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <Button type="submit">Sign up</Button>
              <Button
                type="button"
                className="flex gap-2"
              >
                <span>Already have an account?</span>
                <NavLink
                  to="/login"
                  className={"underline"}
                >
                  login
                </NavLink>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
