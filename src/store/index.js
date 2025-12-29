import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice'
import themeReducer from './slices/themeSlice'
import analyticsReducer from './slices/analyticsSlice'
import { loadState, saveState, throttle } from './localStorage'

const persistedState = loadState();

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        theme: themeReducer,
        analytics: analyticsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: persistedState,
})

const throttleSaveState = throttle((state) => {
  saveState({
    tasks: state.tasks,
    theme: state.theme,
    analytics: state.analytics,
  });
}, 1000);

store.subscribe(() => {
    throttleSaveState(store.getState());
});