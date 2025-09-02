import React, { ReactNode } from 'react';
import Logo from "@/Components/Logo";
import { Link } from "@inertiajs/react";

interface AuthLayoutProps {
  logo?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  logo = true, 
  header, 
  footer, 
  children 
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {logo && (
        <header className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link href="/">
              <Logo size="lg" />
            </Link>
          </div>
        </header>
      )}

      <main className="flex grow flex-col items-center justify-center">
        <h2 className="mt-6 text-center text-2xl/9 font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {header}
        </h2>
        <div className="mt-6 w-full sm:mx-auto sm:max-w-md">
          <div className="rounded-lg border-zinc-500/10 px-6 py-12 sm:px-12 dark:border-zinc-500/10 dark:bg-zinc-500/5">
            {children}
          </div>

          <p className="mt-10 text-center text-sm text-zinc-500">
            {footer}
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;