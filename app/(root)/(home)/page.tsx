import QuestionCards from "@/components/Cards/QuestionCards";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

 // Import the QuestionProps type from the appropriate file


import { getQuestion } from "@/lib/actions/question.action";
import { QuestionProps } from "@/types";


export default async function  Home() {

  const result:QuestionProps = await getQuestion({});
  // console.log("resp",result);
  
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"}>
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.length > 0 ? (
          result.map((question: QuestionProps) => (
            <div key={question._id}>
              <QuestionCards
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answer={question.answers}
                createAt={question.createdAt}
              />
            </div>
          ))
        ) : (
          <NoResult
            title={"There are No Questions To Show"}
            description={"Be The First One To Break The Silence And Ask A Question."}
            url="/ask-question"
            LinkTitle={"Ask A Question"}
          />
        )}
      </div>
    </>
  );
}
