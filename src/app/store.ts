import { audiencesSlice } from '@/features/audiences/audiencesSlice';
import { disciplinesSlice } from '@/features/disciplines/disciplinesSlice';
import { groupsSlice } from '@/features/groups/groupsSlice';
import { schedulesSlice } from '@/features/schedules/schedulesSlice';
import { teachersSlice } from '@/features/teachers/teachersSlice';
import { usersSlice } from '@/features/users/usersSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const usersPersistConfig = {
  key: 'comtehno:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersSlice.reducer),
  teachers: teachersSlice.reducer,
  groups: groupsSlice.reducer,
  audiences: audiencesSlice.reducer,
  disciplines: disciplinesSlice.reducer,
  schedules: schedulesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
