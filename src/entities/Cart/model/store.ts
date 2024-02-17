import { Commit } from "vuex"
import { IBooksInCart } from "./types"

export const NAMESPACE = 'cartModel'

const IS_NAMESPACED = true

export const module = {
    namespaced: IS_NAMESPACED,

    state: {
        booksInCart: localStorage.getItem('booksInCart') ? JSON.parse(localStorage.getItem('booksInCart') as string) : [] as IBooksInCart[],
        totalBooksCount: Number(localStorage.getItem('totalBooksCount') ? JSON.parse(localStorage.getItem('totalBooksCount') as string) : 0) as number
    },

    getters: {
        getBooksInCart: (state: { booksInCart: IBooksInCart[] }) => state.booksInCart,

        getTotalBooksCount: (state: { totalBooksCount: number }) => state.totalBooksCount,

        getBookInCartById: (state: { booksInCart: IBooksInCart[] }) => (id: number) => {
            const findBook = state.booksInCart.find((book) => book.id === id)

            if(findBook) {
                return findBook.count
            }
        }
    },

    mutations: {
        setBookInCart(state: { booksInCart: IBooksInCart[], totalBooksCount: number }, info: { id: number, operation: boolean }) {
            const foundBookInCart = state.booksInCart.find(book => book.id === info.id)

            if(info.operation){
                state.totalBooksCount++

                if(foundBookInCart){
                    foundBookInCart.count++
                } else {
                    state.booksInCart.push({
                        id: info.id,
                        count: 1
                    } as IBooksInCart)
                }
            } else {
                state.totalBooksCount--

                if(foundBookInCart){
                    foundBookInCart.count--

                    if(foundBookInCart.count === 0){
                        state.booksInCart = state.booksInCart.filter(book => book.id !== info.id)
                    }
                }
            }

            localStorage.setItem('booksInCart', JSON.stringify(state.booksInCart))
            localStorage.setItem('totalBooksCount', JSON.stringify(state.totalBooksCount))
        },

        deleteFromCart(state: { booksInCart: IBooksInCart[], totalBooksCount: number }, id: number) {
            const foundBook = state.booksInCart.find((book) => book.id === id);
            if (foundBook) {
                state.totalBooksCount -= foundBook.count;
            }

            localStorage.setItem('booksInCart', JSON.stringify(state.booksInCart))
            localStorage.setItem('totalBooksCount', JSON.stringify(state.totalBooksCount))
            state.booksInCart = state.booksInCart.filter((book) => book.id !== id)
        },

        deleteCart(state: { booksInCart: IBooksInCart[], totalBooksCount: number }) {
            localStorage.removeItem('booksInCart')
            localStorage.removeItem('totalBooksCount')
            state.booksInCart = []
            state.totalBooksCount = 0
        }
    },


    actions: {

        setBookInCart({ commit }: { commit: Commit }, id: number) {
            commit('setBookInCart', {id: id, operation: true})
        },

        reduceCountBookInCart({ commit }: { commit: Commit }, id: number) {
            commit('setBookInCart', {id: id, operation: false})
        },

        deleteFromCart({ commit }: { commit: Commit }, id: number) {
            commit('deleteFromCart', id)
        },

        deleteCart({ commit }: { commit: Commit }) {
            commit('deleteCart')
        }
    }
}