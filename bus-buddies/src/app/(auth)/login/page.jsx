import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { getSession } from '@/lib/auth';

export default async function LoginPage() {
  // Redirect to dashboard if already logged in
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4">
      <AuthForm type="login" />
      <p className="text-center mt-4">
        Log in to your account or{' '}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}