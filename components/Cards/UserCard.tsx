"use server"
import { getTopInteractedTags } from '@/lib/actions/tag.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
import RenderTag from '../shared/RenderTag'

interface Props {
  user: {
    _id: string,
    clerkId: string,
    name: string,
    picture: string,
    username: string
  }
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({
    userId: user._id,
  })

  return (
    <Link href={`/profile/${user.clerkId}`} className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'>  {/* Single Link */}
    <main className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8'>
      <Image src={user.picture}
             alt='user profile picture'
             height={100}
             width={100}
             className='rounded-full object-contain'
      />
      <article className='mt-4 text-center'>
        <h3 className='h3-bold text-dark200_light900 line-clamp-1'>{user.name}</h3>
        <p className='body-regular text-dark500_light500 mt-2'>@{user.username}</p>
      </article>
      <main className='mt-5'>
        {interactedTags.length > 0 ? (
          <section className='flex items-center gap-2'>
            {interactedTags.map((tag) => (
              <RenderTag key={tag._id}
                         _id={tag._id}
                         name={tag.name}
              />
            ))}
          </section>
        ) : (
          <Badge>No Tags Yet</Badge>
        )}
      </main>
    </main>
  </Link>
  )
}

export default UserCard
