import { apiBaseUrl, getAuthHeader } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import AdminDashboardLoader from '../AdminDashboardLoader';
const formSchema = z.object({
  departmentName: z.string().min(3).max(20),
  departmentDescription: z.string().min(10),
});
const EditDepartment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: departmentData, isLoading } = useQuery({
    queryKey: ['department', id],
    queryFn: async () => {
      const res = await axios.get(
        `${apiBaseUrl}/department/${id}`,
        getAuthHeader
      );

      return res.data.department;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentName: '',
      departmentDescription: '',
    },
  });

  useEffect(() => {
    if (departmentData) {
      form.reset({
        departmentName: departmentData.departmentName,
        departmentDescription: departmentData.departmentDescription,
      });
    }
  }, [departmentData, form]);

  const { mutate: updateDepartment, isPending } = useMutation({
    mutationFn: async (value: {
      departmentName: string;
      departmentDescription: string;
    }) => {
      const { departmentName, departmentDescription } = value;
      await axios.put(
        `${apiBaseUrl}/department/${id}`,
        {
          id,
          departmentName,
          departmentDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success('Edited Department Successfully');
      navigate('/admin-dashboard/departments');
    },
    onError: () => {
      toast.error('Something went wrong when editing the deparment!');
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    updateDepartment(values);
    // console.log(values);
  }

  if (isLoading) return <AdminDashboardLoader />;

  return (
    <div className='p-10'>
      <h3 className='text-2xl font-medium'>Edit Department</h3>
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
            <Button
              className='bg-sky-800 hover:bg-sky-800 min-w-full'
              type='submit'
            >
              {isPending ? (
                <LoaderCircle className='animate-spin' />
              ) : (
                'Update Department'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditDepartment;
