import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

export function useLoadLSDataToStore<
  T extends (data: any, dispatch: Dispatch) => void
>(key: string, action: T) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      action(JSON.parse(localStorage.getItem(key) || "[]"), dispatch);
    }
  }, []);
}
