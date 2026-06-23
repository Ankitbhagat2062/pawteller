import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginRegisterSplit } from '@/components/admin/LoginRegisterSplit';

const page = async () => {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("adminAuthToken")?.value;
  if (adminToken) {
    redirect('/admin/dashboard')
  }
  return (
    <LoginRegisterSplit />
  )
}

export default page
