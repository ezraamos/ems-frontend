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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { apiBaseUrl, getAuthHeader } from '@/lib/utils';
import toast from 'react-hot-toast';
import { ErrorResponse } from '@/pages/Login';
import { useNavigate } from 'react-router-dom';
import { Department } from '../departments/columns';

const formSchema = z.object({
  firstName: z.string().min(1, 'This field is required.'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'This field is required.'),
  email: z.string().email(),
  employeeId: z.string().min(1, 'This field is required.'),
  dateOfBirth: z.string().min(1, 'This field is required.'), // Change as needed
  gender: z.string().min(1, 'This field is required.'),
  maritalStatus: z.string().min(1, 'This field is required.'),
  department: z.string().min(1, 'This field is required.'),
  designation: z.string().min(1, 'This field is required.'),
  salary: z
    .string()
    .min(1, 'This field is required.')
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine((val) => !isNaN(val), 'Salary must be a number'),
  password: z.string().min(1, 'This field is required.'),
  role: z.string().min(1, 'This field is required.'),
});

const AddEmployee = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data: departmentsList } = useQuery<{ id: string; name: string }[]>({
    queryKey: ['departments'],
    queryFn: async () => {
      const res = await axios.get(`${apiBaseUrl}/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return res.data.data.map((dep: Department) => ({
        id: dep._id,
        name: dep.departmentName,
      }));
    },
  });

  const { mutate: addEmployee } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const result = await axios.post(
        `${apiBaseUrl}/employee/add`,
        values,
        getAuthHeader
      );
      return result;
    },
    onSuccess: async (res) => {
      if (res.data.success) {
        toast.success('Added New Employee Successfully!');
        navigate('/admin-dashboard/employees');
      }
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      console.log(err);
      toast.error(err.response?.data.error || 'something went wrong');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    addEmployee(values);
  }

  return (
    <div className='p-10'>
      <h3 className='text-2xl font-medium'>Add New Employee</h3>
      <div className='mt-6 flex justify-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='p-5 shadow-md rounded-xl flex-1 max-w-5xl '
          >
            <div className='grid grid-cols-3 gap-x-12 gap-y-6'>
              {/* Existing Fields */}
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='First Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='middleName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Middle Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Last Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              {/* New Fields */}
              <FormField
                control={form.control}
                name='employeeId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder='Employee ID' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='data-[placeholder]:text-muted-foreground'>
                          <SelectValue placeholder='Select Gender' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='maritalStatus'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='data-[placeholder]:text-muted-foreground'>
                          <SelectValue placeholder='Select Marital Status' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='single'>Single</SelectItem>
                          <SelectItem value='married'>Married</SelectItem>
                          <SelectItem value='widowed'>Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Department Select */}
              <FormField
                control={form.control}
                name='department'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='data-[placeholder]:text-muted-foreground'>
                          <SelectValue placeholder='Select Department' />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentsList?.map((dep) => (
                            <SelectItem key={dep.id} value={dep.id}>
                              {dep.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='designation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Designation' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Role Select */}
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='data-[placeholder]:text-muted-foreground'>
                          <SelectValue placeholder='Select Role' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='admin'>Admin</SelectItem>
                          <SelectItem value='employee'>Employee</SelectItem>
                          {/* Add more roles dynamically or statically */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='salary'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='Salary' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-center'>
              <Button
                className='w-fit  self-center bg-sky-700 hover:bg-sky-900'
                type='submit'
              >
                Add Employee
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
