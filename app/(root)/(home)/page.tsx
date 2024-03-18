import QuestionCards from "@/components/Cards/QuestionCards";
import HomeFilters from "@/components/Home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const questions: QuestionProps[] = [
  {
    _id: "1",
    title: "What are the common cybersecurity threats in modern networks?",
    tags: [{ _id: "8", name: "cybersecurity" }, { _id: "9", name: "threats" }],
    author: { _id: "1", name: "John Doe", picture: "path/to/picture" },
    upvotes: 20344444445,
    views: 154444444450,
    answers: [],
    createdAt: "2024-03-10T08:00:00",
  },
  {
    _id: "2",
    title: "How can individuals protect their personal data from cyberattacks?",
    tags: [{ _id: "8", name: "cybersecurity" }, { _id: "10", name: "data protection" }],
    author: { _id: "2", name: "Alice Smith", picture: "path/to/picture" },
    upvotes: 15,
    views: 120,
    answers: [],
    createdAt: "2024-03-10T08:00:00",
  },
  {
    _id: "3",
    title: "What are the signs of an unhealthy relationship?",
    tags: [{ _id: "11", name: "relationship" }, { _id: "12", name: "unhealthy signs" }],
    author: { _id: "3", name: "Emily Johnson", picture: "path/to/picture" },
    upvotes: 25,
    views: 180,
    answers: [],
    createdAt: "2024-03-10T08:00:00",
  },
  {
    _id: "4",
    title: "How to improve communication in a romantic relationship?",
    tags: [{ _id: "11", name: "relationship" }, { _id: "13", name: "communication" }],
    author: { _id: "4", name: "Michael Brown", picture: "path/to/picture" },
    upvotes: 18,
    views: 130,
    answers: [],
    createdAt: "2024-03-10T08:00:00",
  },
  {
    _id: "5",
    title: "What are the best practices for securing IoT devices from cyber threats?",
    tags: [{ _id: "8", name: "cybersecurity" }, { _id: "14", name: "IoT security" }],
    author: { _id: "5", name: "Sophia Garcia", picture: "path/to/picture" },
    upvotes: 100000002,
    views: 114585547850,
    answers: [],
    createdAt: "2024-03-10T08:00:00",
  },
  {
    _id: "6",
    title: "How to rebuild trust after infidelity in a relationship?",
    tags: [{ _id: "11", name: "relationship" }, { _id: "15", name: "trust issues" }],
    author: { _id: "6", name: "David Lee", picture: "path/to/picture" },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: "2024-03-10T08:00:00",
  },
];

console.log(questions);

console.log(questions);

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"}>
          <Button className="primary-gradient min-h-[46px]
     px-4 py-3 !text-light-900">
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

        {questions.length > 0 ?
          questions.map((questions) => (
            <div key={questions._id}><QuestionCards
            key={questions._id}
            _id={questions._id}
            title={questions.title}
            tags={questions.tags}
            author={questions.author}
            upvotes={questions.upvotes}
            views={questions.views}
            answers={questions.answers}
            createdAt={questions.createdAt}
            /></div>
          )) : <NoResult title={"There are No Quest0on To Show"}

            description={"Be The First One To Break The Silence And Ask A  Question."}
            url="/ask-question"
            LinkTitle={"Ask A Question"}
          />}
      </div>
    </>
  );
}
