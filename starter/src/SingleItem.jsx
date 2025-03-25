import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },

    onSuccess: (storeStateForCheckbox, variables) => {
      // `variables.isDone` is the latest state of the checkbox
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      if (variables.isDone) {
        toast.success("Item marked as done");
      } else {
        toast.success("Item unchecked");
      }
    },

    // reference from the previous snippet
    //       onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey: ["tasks"] });
    //     if (item.isDone) {
    //       toast.success("Item marked as done");
    //     }

    //   },
    // });
  });

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone ? "line-through" : "none",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => console.log("delete task")}
      >
        delete
      </button>
    </div>
  );
};

export default SingleItem;
