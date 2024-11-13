import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  icon: React.ReactNode;
  text: string;
  number: number | string;
  iconBgColor: string;
};

const SummaryCard = ({ icon, text, number, iconBgColor }: Props) => {
  return (
    <div className='rounded flex bg-sky-50 shadow-md overflow-hidden'>
      <div
        className={cn(`px-2 flex justify-center items-center ${iconBgColor}`)}
      >
        {icon}
      </div>
      <div className='px-4 py-2'>
        <p>{text}</p>
        <p className='font-medium'>{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
