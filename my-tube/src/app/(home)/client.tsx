'use client'

import { trpc } from '@/trpc/client'
import React from 'react'

const PageClient = () => {
    const [data] = trpc.hello.useSuspenseQuery({
        text:"Harsh"
    })
  return (
    <div>
page client says:{data.greeting}
    </div>
  )
}

export default PageClient
