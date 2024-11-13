import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import toast from 'react-hot-toast';

import useUserStore from '@/store/useUserStore';
import { apiBaseUrl, verifyUser } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email().min(5).max(50),
  password: z.string().min(5).max(50),
});
export type ErrorResponse = {
  error: string;
};
const Login = () => {
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const { mutate: loginUser } = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const result = await axios.post(`${apiBaseUrl}/auth/login`, values);

      return result;
    },
    onSuccess: async (res) => {
      toast.success('Logged in successfully');
      localStorage.setItem('token', res.data.token);

      const isVerified = await verifyUser();
      if (isVerified) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }

      if (res.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.error(err.response?.data.error || 'something went wrong');
    },
  });
  // Define login form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginUser(values);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-sky-300 to-sky-50 px-5'>
      <div className='sm:w-80 w-full bg-white shadow-lg rounded-lg p-5'>
        <h3 className='text-center mb-5 font-medium text-xl'>Login</h3>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Email Field */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='********'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type='submit' className='w-full'>
                Submit
              </Button>

              {/* Forgot Password Link */}
              <div className='text-center mt-4'>
                <Link
                  className='text-sm text-sky-500 hover:underline'
                  to='/forgot-password'
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
