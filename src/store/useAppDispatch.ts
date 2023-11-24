import { useDispatch } from "react-redux";
import { store } from "./index";

export type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default useAppDispatch;
