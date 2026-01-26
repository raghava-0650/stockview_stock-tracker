import React from 'react';

import Header from '@/components/Header';
import NavItems from '@/components/NavItems';

const layout = ({ children }: { children : React.ReactNode }) => {
  return (
    <main className='min-h-screen text-gray-400'>
        <Header />
        <div className='container py-10'>
            {children}
        </div>
        <nav className='hidden sm:block'>
            <NavItems />
        </nav>
    </main>
  )
}

export default layout