import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import contentReducer from "./content";
import watchedReducer from "./watched";
import favReducer from "./favorites";
import otherFavReducer from "./otherFavorites";

//Para persistir, instalar redux-persist
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage: storage,
};

//creo un único reducer unificado
const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  favorites: favReducer,
  watched: watchedReducer,
  otherFavs:otherFavReducer,
});

//acá configuro la persistencia (se crea un reducer persistido y la store que administra el estado a persistir)
export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);

//LUEGO HAY QUE AGREGAR EL PERSISTOR EN EL INDEX.JS DONDE TAMBIÉN SE ENVUELVE CON EL STORE