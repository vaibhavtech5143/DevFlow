import Answer from '@/components/forms/Answer';
import Metric from '@/components/shared/Metric';
import RenderTag from '@/components/shared/RenderTag';
import ParseHTML from '@/components/shared/parseHTML';
import { getQuestionById } from '@/lib/actions/question.action';
import { formatLargeNumber, getTimestamp } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = async ({  params:any  }) => {

    const result = await getQuestionById({ questionId: params.id });
    return (
        <>
            <div className="flex-start w-full flex-col">
                <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 '>

                    <Link href={`/profile/${result.question.author.clerkID}`}
                    className='flex items-center justify-start gap-1'
                    >
                    
                        <Image

                            src={result.question.author.picture}
                            className='rounded-full'
                            width={22}
                            height={22}
                            alt='user profile picture'
                        />
                        <p className=' flex-start paragraph-semibold text-dark400_light900'
                        >{result.question.author.name}</p>
                    </Link>

                    <div className="text-dark300_light700 flex  justify-end">

                VOTING
                    </div>
                </div>
<h2 className='h2-semibold text-dark200_light900 mt-3.5'>
    {result.question.title}
</h2>

            </div>

            <div className='mb-8 mt-5 flex flex-wrap gap-4'>
            <Metric imgUrl="/assets/icons/clock.svg"
        alt="clock icon"
        value={`asked ${getTimestamp(result.question.createdAt)}`}
        title="Votes"   
        textStyles="small-medium text-dark400_light800" href={undefined} isAuthor={undefined}        />
        <Metric imgUrl="/assets/icons/message.svg"
        alt="message"
        value={formatLargeNumber(result.question.answers.length)} 
        title="Answers"
        textStyles="small-medium text-dark200_light900" href={undefined} isAuthor={undefined}        />
        <Metric imgUrl="/assets/icons/eye.svg"
        alt="eye"
        value={formatLargeNumber(result.question.views)}
        title="Views"
        textStyles="small-medium text-dark400_light800" href={undefined} isAuthor={undefined}        />
            </div>
    
            <ParseHTML data={result.question.content}/>

            <div className='mt-8 flex flex-wrap gap-2'>
  {result && result.question.tags.length > 0 ? (
    result.question.tags.map((tag: any) => (
      <RenderTag key={tag.id} _id={tag._id} name={tag.name} showCount={false} />
    ))
  ) : null}
</div>
<Answer />
        </>
    );
};

export default Page;
