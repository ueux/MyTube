'use client'

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ClapperboardIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AuthButton = () => {
  return (
    <>
      <SignedIn>

        {/* <Button asChild variant={'secondary'}>
          <Link href={"/studio"}>
          <ClapperboardIcon />
          Studio</Link>
        </Button> */}

        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link label='Studio' labelIcon={<ClapperboardIcon className='size-4' />} href='/studio' />
            <UserButton.Action label='manageAccount'/>
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button variant={'outline'} className='px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:size-5'>
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  )
}

export default AuthButton
