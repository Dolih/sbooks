<template>
    <v-container>
        <FiltersList
        @AuthorsFiltersList="handleAuthorsFiltersList"
        @GenresFiltersList="handleGenresFiltersList"
        @YearsFiltersList="handleYearsFiltersList"
        />
        <BooksList
        :AuthorsFiltersList="AuthorsList"
        :GenresFiltersList="GenresList"
        :YearsFiltersList="YearsList"
        />
    </v-container>
</template>
<script setup lang="ts">
import { BooksList } from '@/widgets/Book/BooksList';
import { FiltersList } from '@/widgets/Filter/FiltersList';
import { IFilter } from '@/entities/Filters/model/types';
import { Ref, ref } from 'vue';

const AuthorsList: Ref<IFilter[]> = ref([])
const GenresList: Ref<IFilter[]> = ref([])
const YearsList: Ref<IFilter[]> = ref([])

const handleAuthorsFiltersList = (data: IFilter[]) => {
    AuthorsList.value = data
}

const handleGenresFiltersList = (data: IFilter[]) => {
    GenresList.value = data
}

const handleYearsFiltersList = (data: IFilter[]) => {
    YearsList.value = data
}

</script>