
import DashboardContent from '@/modules/dashboard/dashboard-content';
import DashboardLayout from '@/modules/dashboard/dashboard-layaout';
import React from 'react';

const page = () => {
  return (
   <DashboardLayout>
    <DashboardContent />
   </DashboardLayout>
  );
}

export default page;
