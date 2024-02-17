import type { IBook } from "./types"
import { BooksApi } from ".."
import { Commit } from 'vuex'

export const NAMESPACE = 'booksModel'

const IS_NAMESPACED = true

export const module = {
    namespaced: IS_NAMESPACED,

    state: {
        books: [] as IBook[],
        isLoading: false
    },

    getters: {
        getBooks: (state: { books: IBook[] }) => state.books,

        getBookById: (state: { books: IBook[] }) => (id: number) => {
            return state.books.find((book) => book.id === id)
        },

        getIsLoading: (state: { isLoading: boolean }) => state.isLoading
    },

    mutations: {
        setBooks(state: { books: IBook[] }, books: IBook[]) {
            state.books = books
        },

        setNewBook(state: { books: IBook[] }, book: IBook) {
            state.books.push(book)
        },

        setEditedBook(state: { books: IBook[] }, book: IBook) {
            const index = state.books.findIndex((b) => b.id === book.id)
            state.books[index] = book
        },

        removeBook(state: { books: IBook[] }, _id: number) {
            state.books = state.books.filter((book) => book._id !== _id)
        },
    },

    actions: {
        async setBooks({ commit }: { commit: Commit }) {
            const response = await BooksApi.getBooks()
            if(response){
                commit('setBooks', response)
            }
        },

        async addNewBook({ commit, state }: { commit: Commit, state: { books: IBook[], isLoading: boolean } }, book: IBook) {
            state.isLoading = true
            book.id = state.books.length 
            const response = await BooksApi.setNewBook(book)
            if(response){
                commit('setNewBook', book)
            }
            state.isLoading = false
        },

        async setEditedBook({ commit, state }: { commit: Commit, state: { isLoading: boolean } }, {book, id}: {book: IBook, id: number}) {
            state.isLoading = true
            const response = await BooksApi.updateBook(book, id)
            if(response){
                commit('setEditedBook', book)
                console.log(book)
            }
            state.isLoading = false
        },

        async removeBook({ commit }: { commit: Commit }, _id: number) {
            const response = await BooksApi.removeBook(_id)
            if(response){
                commit('removeBook', _id)
            }
        },
    },
}