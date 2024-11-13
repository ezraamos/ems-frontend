import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { apiBaseUrl } from '@/lib/utils';
import toast from 'react-hot-toast';
import { ErrorResponse } from '@/pages/Login';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  departmentName: z.string().min(3).max(20),
  departmentDescription: z.string().min(10),
});

const AddDepartment = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentName: '',
      departmentDescription: '',
    },
  });

  const { mutate: addDepartment } = useMutation({
    mutationFn: async (values: {
      departmentName: string;
      departmentDescription: string;
    }) => {
      const result = await axios.post(`${apiBaseUrl}/department/add`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return result;
    },
    onSuccess: async (res) => {
      if (res.data.success) {
        toast.success('Added New Department Successfully!');
        navigate('/admin-dashboard/departments');
      }
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.error(err.response?.data.error || 'something went wrong');
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    addDepartment(values);
    // console.log(values);
  }
  return (
    <div className='p-10'>
      <h3 className='text-2xl font-medium'>Add New Department</h3>
      <div className='mt-6 flex justify-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8  p-5 shadow-md rounded-xl flex-1 max-w-md'
          >
            <FormField
              control={form.control}
              name='departmentName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Department Name' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='departmentDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter Department Description'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center'>
              <Button className='bg-sky-800 hover:bg-sky-800' type='submit'>
                Add Department
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddDepartment;
