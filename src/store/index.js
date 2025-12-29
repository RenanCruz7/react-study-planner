import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice'
import themeReducer from './slices/themeSlice'
import analyticsReducer from './slices/analyticsSlice'

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        theme: themeReducer,
        analytics: analyticsReducer,
    },
})