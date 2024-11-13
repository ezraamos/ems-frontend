import { apiBaseUrl, getAuthHeader } from '@/lib/utils';
import { useMutation, useQueries } from '@tanstack/react-query';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useEffect } from 'react';
import { Department } from '../departments/columns';
import { LoaderCircle } from 'lucide-react';
import AdminDashboardLoader from '../AdminDashboardLoader';

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
  salary: z.number(),
  password: z.string().optional(),
  role: z.string().min(1, 'This field is required.'),
});

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [
    { data: departmentsList, isLoading: isDepartmentsLoading },
    { data: employeeData, isLoading: isEmployeeLoading },
  ] = useQueries({
    queries: [
      {
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
      },
      {
        queryKey: ['employee', id],
        queryFn: async () => {
          const res = await axios.get(
            `${apiBaseUrl}/employee/${id}`,
            getAuthHeader
          );
          return res.data.employee;
        },
      },
    ],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (employeeData) {
      form.reset({
        ...employeeData,

        dateOfBirth: new Date(employeeData.dateOfBirth)
          .toISOString()
          .split('T')[0],
        department: employeeData.department._id,
        firstName: employeeData.userId.firstName,
        middleName: employeeData.userId.middleName || undefined,
        lastName: employeeData.userId.lastName,
        email: employeeData.userId.email,
        role: employeeData.userId.role,
      });
    }
  }, [employeeData, form]);

  const { mutate: updateEmployee, isPending } = useMutation({
    mutationFn: async (value: z.infer<typeof formSchema>) => {
      await axios.put(
        `${apiBaseUrl}/employee/${id}`,
        { ...value, userId: employeeData.userId._id },
        getAuthHeader
      );
    },
    onSuccess: () => {
      toast.success('Edited Employee Successfully');
      navigate('/admin-dashboard/employees');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Something went wrong when editing the employee!');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateEmployee(values);
    // console.log(values);
  }

  if (isEmployeeLoading || isDepartmentsLoading)
    return <AdminDashboardLoader />;

  return (
    <div className='p-10'>
      <h3 className='text-2xl font-medium'>Edit Employee</h3>
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
                          {departmentsList.map(
                            (dep: { id: string; name: string }) => (
                              <SelectItem key={dep.id} value={dep.id}>
                                {dep.name}
                              </SelectItem>
                            )
                          )}
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
                        placeholder='(optional)'
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
                {isPending ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  'Update Employee'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditEmployee;
