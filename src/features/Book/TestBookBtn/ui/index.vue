<template>
    <v-btn
        :loading="isLoading"
        class="w-75"
        prepend-icon="mdi-beta"
        color="brown-darken-1"
        variant="outlined"
        size="small"
        @click="addTestBook()"
    >
        Тестовая книга
    </v-btn>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { IBook } from '@/entities/Book/model/types';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const isLoading = computed(() => store.state.booksModel.isLoading);

const addTestBook = async () => {
    const authors = store.getters['FiltersModel/getAuthors'];
    const genres = store.getters['FiltersModel/getGenres'];
    const years = store.getters['FiltersModel/getYears'];

    const randomAuthorIndex = Math.floor(Math.random() * authors.length);
    const randomGenreIndex = Math.floor(Math.random() * genres.length);
    const randomYearIndex = Math.floor(Math.random() * years.length);
    const price = Math.floor(Math.random() * (5000 - 200 + 1)) + 200;
    const img = Math.floor(Math.random() * 5) + 1;

    await store.dispatch('booksModel/addNewBook', {
        id: -1,
        img: img,
        title: 'Тестовая книга',
        author: authors[randomAuthorIndex],
        genre: genres[randomGenreIndex],
        year: years[randomYearIndex],
        price: price
    } as IBook);

    router.go(0) // Пришлось перезагружать страницу, так как в ответе не возвращается ID
}

</script>