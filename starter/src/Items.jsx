import SingleItem from "./SingleItem";
import { useQuery } from "@tanstack/react-query";
import customFetch from "./utils";

const Items = () => {
  const result = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await customFetch.get("/");
      return response.data;
    },
  });

  const { isLoading, isError, error, data } = result;

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

  if (isError) {
    return <p style={{ marginTop: "1rem" }}>There was an error...</p>;
  }

  // {Axios Error}
  // if (error) {
  //   return <p style={{ marginTop: "1rem" }}>{error.response.data}...</p>;
  // }

  console.log(result);

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
