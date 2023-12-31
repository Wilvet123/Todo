import {createSlice} from "@reduxjs/toolkit";
import {replaceTaskByIndex} from "../utils";
import {Task, Tasks} from "../types.ts";

const initialState: Tasks = {
    tasks: [],
    targetTask: -1,
    selectedTask: {
        id: -1,
        date: new Date().toLocaleDateString("en", {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        }),
        timeIn: "00:00",
        timeOut: "00:00",
        title: "",
        completed: false,
        selected: false
    },
    selectedDate: new Date().toLocaleDateString("en", {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    }),
    page: 0,
    loading: false,
    mobileMenuState: "closed"
}

const taskReducer = createSlice({
    name: "taskData",
    initialState: initialState,
    reducers: {
        updateTasks: (state, action) => {
            return {
                ...state,
                tasks: action.payload
            }
        },
        updatePage: (state, action) => {
            return {
                ...state,
                page: action.payload
            }
        },
        updateMMS: (state, action) => {
            return {
                ...state,
                mobileMenuState: action.payload.length === 0 ? " " : action.payload
            }
        },
        updateST: (state, action) => {
            return {
                ...state,
                selectedTask: action.payload
            }
        },
        updateST_1: (state, action) => {
            return {
                ...state,
                selectedTask: {
                    ...state.selectedTask,
                    [action.payload.name]: [action.payload.value]
                }
            }
        },
        addTask: (state, action) => {
            return {
                ...state,
                mobileMenuState: "closed",
                tasks: [...state.tasks, action.payload]
            };
        },
        deleteTask: (state, action) => {
            const taskIdToDelete = action.payload;
            // console.log(taskIdToDelete)
            return {
                ...state,
                mobileMenuState: "closed",
                tasks: state.tasks.filter((task: Task) => task.id !== taskIdToDelete)
            };
        },
        updateSD: (state, action) => {
            return {
                ...state,
                selectedDate: action.payload
            }
        },
        updateTT: (state, action) => {
            return {
                ...state,
                targetTask: action.payload
            }
        },
        replaceTaskAtIndex: (state, action) => {
            const {index, newTask} = action.payload;
            return replaceTaskByIndex(state, index - 1, newTask);
        }
    }
})

export const {
    updateTasks,
    updatePage,
    updateMMS,
    updateST,
    updateSD,
    updateST_1,
    addTask,
    deleteTask,
    updateTT,
    replaceTaskAtIndex,
} = taskReducer.actions
export default taskReducer.reducer