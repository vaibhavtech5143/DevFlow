import UserCard from "@/components/Cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const CommunityPage = async () => {
  const result = await getAllUsers({});

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Amazing geeks..."
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <main className="mt-12 flex flex-wrap gap-4">
        {result && result.users.length > 0 ? (
          result.users.map((user) => (
            <Link href={`/users/${user._id}`} key={user._id}>
              <UserCard user={user} />
            </Link>
          ))
        ) : (
          <section className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No User Yet</p>
          </section>
        )}
      </main>
    </main>
  );
};

export default CommunityPage;
