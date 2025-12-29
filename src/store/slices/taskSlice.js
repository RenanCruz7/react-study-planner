import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, title: "Sample Task 1", description: "This is a sample task", completed: false },
    { id: 2, title: "Sample Task 2", description: "This is another sample task", completed: true },
    { id: 3, title: "Sample Task 3", description: "Yet another sample task", completed: false },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const taskWithId = {
        ...action.payload,
        id: Date.now(),
        completed: false,
      };
      state.tasks.push(taskWithId);
    },
    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    editTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    }
  },
});

export const { addTask, toggleTaskComplete, editTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectPedingTasks = (state) => state.tasks.tasks.filter(task => !task.completed);
export const selectCompletedTasks = (state) => state.tasks.tasks.filter(task => task.completed);

export default taskSlice.reducer;
