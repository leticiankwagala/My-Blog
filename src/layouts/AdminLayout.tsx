import type { ReactNode } from 'react'
import { AdminSidebar } from '../components/AdminSidebar'
import { AdminHeader } from '../components/AdminHeader'
import { AdminFooter } from '../components/AdminFooter'

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <AdminSidebar />
      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col px-4 py-6 sm:px-8 lg:px-0 lg:pt-6 lg:pr-6 lg:pb-6 lg:pl-[176px]">{children}</main>
        <AdminFooter />
      </div>
    </div>
  )
}
