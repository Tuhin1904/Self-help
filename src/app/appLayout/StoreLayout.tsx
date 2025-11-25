'use client'
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Header from "./Header";
import Footer from "./Footer";

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={store}>
        {children}
    </Provider>;
}
