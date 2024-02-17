<template>
    <v-row
        class='mb-4 mt-1 ml-15 ml-sm-15 ml-md-0 ml-lg-0'
    >
        <v-responsive
            max-width="400px"
        >
            <v-text-field
                v-model="search"
                density="compact"
                variant="outlined"
                label="Найти книгу"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
            />

        </v-responsive>

    </v-row>

    <v-row>
        <v-btn-toggle
        color="brown-darken-1"
        background-color="primary"
        mandatory
        >
            <v-btn 
            prepend-icon="mdi-sort"
            :ripple="false"
            @click="sorted('price')"
            >
                Цена
            </v-btn>

            <v-btn 
            prepend-icon="mdi-sort"
            :ripple="false"
            @click="sorted('year')"
            >
                Год
            </v-btn>
        </v-btn-toggle>
    </v-row>

    <v-row>
        <v-col
        v-if="isEditPath()"
        >
            <CreateCard>
                <template v-slot:CreateBookBtn>
                    <CreateBookBtn/>
                </template>

                <template v-slot:TestBookBtn>
                    <TestBookBtn/>
                </template>
            </CreateCard>
        </v-col>
        <v-col v-for="book in filtredBooks" :key="book.id"
         cols="12" sm="6" md="4" lg="3" xl="2"
        > 
            <BookCard
            :isEditPage = "isEditPath()"
            :book = book
            >
                <template v-slot:action>
                    <AddToCart v-if="!isEditPath()" 
                        :id="book.id"
                    />
                    <EditBookBtn v-else
                        :book="book"
                    />
                </template>
            </BookCard>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { BookCard } from '@/entities/Book'
import { CreateCard } from '@/entities/Book';
import { AddToCart } from '@/features/Cart/AddToCart'
import { TestBookBtn } from '@/features/Book'
import { CreateBookBtn } from '@/features/Book';
import { EditBookBtn } from '@/features/Book';
import type { IFilter } from '@/entities/Filters/model/types';
import type { IBook } from '@/entities/Book/model/types';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const route = useRoute();
const store = useStore();

const isEditPath = () => {
    return route.path.includes('edit')
}
const props = defineProps<{
    AuthorsFiltersList: IFilter[],
    GenresFiltersList: IFilter[],
    YearsFiltersList: IFilter[],
}>()

const search = ref('')

const books = computed(() => store.getters['booksModel/getBooks'])

const sort = ref({
    nameFilter: '',
    typeFilter: false

})

const sorted = (type: string) => {
    sort.value.typeFilter = !sort.value.typeFilter
    sort.value.nameFilter = type
}
// Функция для фильтрации по авторам
const filterByAuthors = (data: IBook[], authors: {id: number}[]) => {
    return data.filter((book: { author: { id: number; }; }) => authors.some((author: { id: number; }) => Number(author.id) === Number(book.author.id)));
}

// Функция для фильтрации по жанрам
const filterByGenres = (data: IBook[], genres: {id: number}[]) => {
    return data.filter((book: { genre: { id: any; }; }) => genres.some((genre: { id: number; }) => Number(genre.id) === Number(book.genre.id)));
}

// Функция для фильтрации по годам
const filterByYears = (data: IBook[], years: {name: string}[]) => {
    return data.filter((book: { year: any; }) => years.some((year: { name: string; }) => year.name == book.year.name));
}

// Функция для сортировки по цене или году
const sortBy = (data: IBook[], type: keyof IBook, ascending: boolean) => {
    return data.sort((a:{[name: string]: any}, b: {[name: string]: any}) => ascending ? Number((type === 'price')? a[type] : a[type]?.name) - Number((type === 'price')? b[type] :b[type]?.name) : Number((type === 'price')? b[type] : b[type]?.name) - Number((type === 'price')? a[type] : a[type]?.name));
}

const filtredBooks = computed(() => {
    let data:IBook[] = [...books.value].reverse();
    console.log(props.YearsFiltersList)
    console.log(data)
    if(props.AuthorsFiltersList.length){
        data = filterByAuthors(data, props.AuthorsFiltersList)
    }

    if(props.GenresFiltersList.length){
        data = filterByGenres(data, props.GenresFiltersList)
    }

    if(props.YearsFiltersList.length){
        data = filterByYears(data, props.YearsFiltersList)
    }

    if (sort.value.nameFilter === 'price' || sort.value.nameFilter === 'year') {
        data = sortBy(data, sort.value.nameFilter, sort.value.typeFilter);
    }

    if (search.value) {
        data = data.filter((book) => book.title.toLowerCase().includes(search.value.toLowerCase()));
    }

    return data
})
</script>