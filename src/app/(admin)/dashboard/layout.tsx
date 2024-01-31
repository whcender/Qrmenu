import React, { ReactNode } from 'react';
import DashNav from "@/app/(admin)/_components/dashNav";
import QueryProvider from '@/provider/queryProvider'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <QueryProvider>
                <DashNav />
                <main>{children}</main>
            </QueryProvider>
        </div>
    );
}

export default Layout;
