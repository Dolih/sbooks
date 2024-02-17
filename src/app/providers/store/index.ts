import { createStore } from "vuex";
import { FiltersModel } from "@/entities/Filters";
import {  BooksModel } from "@/entities/Book";
import { CartModel } from "@/entities/Cart";
export const store = createStore({
    modules:{
        [CartModel.NAMESPACE]: CartModel.module,
        [BooksModel.NAMESPACE]: BooksModel.module,
        [FiltersModel.NAMESPACE]: FiltersModel.module,

    }
})