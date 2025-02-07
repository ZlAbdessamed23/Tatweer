import React from 'react';

import AuthLayout from '@/app/components/AuthComps/AuthLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <div className='font-montserrat w-full h-full'>
        {children}
      </div>
    </AuthLayout>
  );
}