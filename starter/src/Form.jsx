import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import customFetch from "./utils";
import { toast } from "react-toastify";

const Form = () => {
  const [newItemName, setNewItemName] = useState("");
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: async (taskTitle) => {
      return await customFetch.post("/", { title: taskTitle });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task added! 🎉");
      setNewItemName("");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) {
      toast.warn("Task name cannot be empty!");
      return;
    }
    createTask(newItemName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Task Bud</h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default Form;
