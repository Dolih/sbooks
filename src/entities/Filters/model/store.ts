import { FiltersApi } from ".."
import { IFilter } from "./types"
import { Commit } from 'vuex'

export const NAMESPACE = 'FiltersModel'

const IS_NAMESPACED = true

export const module = {
    namespaced: IS_NAMESPACED,

    state: {
        authors: [] as IFilter[],
        genres: [] as IFilter[],
        years: [] as IFilter[]
    },

    getters: {
        getAuthors: (state: { authors: IFilter[] }) => state.authors,
        getGenres: (state: { genres: IFilter[] }) => state.genres,
        getYears: (state: { years: IFilter[] }) => state.years
    },

    mutations: {
        setAuthors(state: { authors: IFilter[] }, authors: IFilter[]) {
            state.authors = authors
        },
        setGenres(state: { genres: IFilter[] }, genres: IFilter[]) {
            state.genres = genres
        },
        setYears(state: { years: IFilter[] }, years: IFilter[]) {
            state.years = years
        }
    },

    actions: {
        async fetchAuthors({ commit }: { commit: Commit }) {
            const authors = await FiltersApi.getAuthors()
            if (authors) {
                commit('setAuthors', authors)
            }
        },
        async fetchGenres({ commit }: { commit: Commit }) {
            const genres = await FiltersApi.getGenres()
            if (genres) {
                commit('setGenres', genres)
            }
        },
        async fetchYears({ commit }: { commit: Commit }) {
            const years = await FiltersApi.getYears()
            if (years) {
                commit('setYears', years)
            }
        },

        async addAuthor({ commit, state }: { commit: Commit, state: { authors: IFilter[] } }, {id, name}: IFilter) {
            const response = await FiltersApi.setAuthor({id, name})
            if(response){
                commit('setAuthors', [...state.authors, {id, name}])
            }
        },

        async addGenre({ commit, state }: { commit: Commit, state: { genres: IFilter[] } }, {id, name}: IFilter) {
            const response = await FiltersApi.setGenre({id, name})
            if(response){
                commit('setGenres', [...state.genres, {id, name}])
            }
        },

        async addYear({ commit, state }: { commit: Commit, state: { years: IFilter[] } }, {id, name}: IFilter) {
            const response = await FiltersApi.setYear({id, name})
            if(response){
                commit('setYears', [...state.years, {id, name}])
            }
        }
    }
}