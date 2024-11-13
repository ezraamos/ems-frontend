import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl } from '@/lib/utils';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

type Props = {
  department: { id: string; name: string; description: string };
};
const ActionButtons = ({ department }: Props) => {
  const { id, name, description } = department;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteDepartment, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`${apiBaseUrl}/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    },
    onSuccess: () => {
      toast.success('Deleted Department Successfully');
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Deleted Department Failed');
    },
  });

  return (
    <div className='flex space-x-2 '>
      <Button
        variant='outline'
        className='bg-blue-500 text-white hover:bg-blue-600 hover:text-white'
        onClick={() =>
          navigate(`/admin-dashboard/departments/${id}`, {
            state: {
              name,
              description,
            },
          })
        }
      >
        Edit
      </Button>

      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            variant='outline'
            className='bg-red-500 text-white  hover:text-white hover:bg-red-600 w-20'
          >
            {isPending ? <LoaderCircle className='animate-spin' /> : 'Delete'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Department</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this department? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant='destructive' onClick={() => deleteDepartment()}>
              Confirm
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant='outline'
              className='ml-2'
              asChild
            >
              <AlertDialogTrigger>Cancel</AlertDialogTrigger>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;
