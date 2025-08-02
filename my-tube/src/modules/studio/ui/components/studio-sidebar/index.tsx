'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { LogOutIcon, VideoIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { StudioSidebarHeader } from './studio-sidebar-header'


const StudioSidebar = () => {
  const pathname = usePathname()
  return (
    <Sidebar className='pt-16 z-40 ' collapsible='icon'>
      <SidebarContent className='bg-background'>
        <SidebarGroup>
          <SidebarMenu>
            <StudioSidebarHeader/>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === "/studio"} tooltip={"Content"} asChild>
                <Link href={"/studio"}>
                  <VideoIcon className='size-5' />
                  <span className='text-sm'>Content</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={"Exit studio"} asChild>
                <Link href={"/"}>
                  <LogOutIcon className='size-5' />
                  <span className='text-sm'>Exit studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default StudioSidebar
