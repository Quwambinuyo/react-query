// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import customFetch from "./utils";
// import { toast } from "react-toastify";

import { useDeleteTask, useEditTask } from "./reactQueryCustomHooks";

const SingleItem = ({ item }) => {
  const { editTask } = useEditTask();
  const { deleteTask, deleteTaskLoading } = useDeleteTask();

  // -----------reference--------------- //
  // const queryClient = useQueryClient();
  // const { mutate: editTask } = useMutation({
  //   mutationFn: ({ taskId, isDone }) => {
  //     return customFetch.patch(`/${taskId}`, { isDone });
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["tasks"] });
  //   },

  //   // reference for marked and unmarked checkbox success message
  //   onSuccess: (_, isChecked) => {
  //     // `variables.isDone` is the latest state of the checkbox
  //     queryClient.invalidateQueries({ queryKey: ["tasks"] });

  //     if (isChecked.isDone) {
  //       toast.success("Item Cheked");
  //     } else {
  //       toast.success("Item unchecked");
  //     }
  //   },
  // });

  // const { mutate: deleteTask, isLoading } = useMutation({
  //   mutationFn: (taskId) => {
  //     return customFetch.delete(`/${taskId}`);
  //   },

  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["tasks"] });
  //   },
  // });

  // --------------end--------------- //

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
        disabled={deleteTaskLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};

export default SingleItem;
