import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TodoCard } from "./TodoCard";

export interface ITodo {
  id: string;
  title: string;
}

export const Todos = () => {
  const { ref, inView, entry } = useInView();

  const fetchTodos = async (pageParam: number) => {
    console.log(pageParam);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`,
    );
    return res.json();
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({ pageParam }) => fetchTodos(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const content = data?.pages.map((todos: ITodo[]) => {
    return todos.map((item) => <TodoCard key={item.id} item={item} />);
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error... {error.message}</p>;
  }

  return (
    <div className="text-center">
      {content}{" "}
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading more... " : "load more"}
      </button>
    </div>
  );
};
