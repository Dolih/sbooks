<template>
    <v-dialog
    v-model="localDialog"
    activator="parent"
    width="auto"
    >
        <v-card
        class="px-5 py-4"
        width="350px"
        >
            <v-card-title
            v-if="!book">
                Создать новую книгу
            </v-card-title>
            <v-card-title
            v-else>
                Изменить текущую книгу
            </v-card-title>

            <v-text-field 
            label="Название книги" 
            variant="outlined"
            v-model="newBook.title"
            />

            <v-select
            label="Жанр"
            :items="geners"
            v-model="newBook.genre"
            item-title="name"
            item-value="id"
            variant="outlined"
            return-object
            ></v-select>

            <v-select
            label="Автор"
            :items="authors"
            v-model="newBook.author"
            item-title="name"
            item-value="id"
            variant="outlined"
            return-object
            ></v-select>

            <v-text-field 
            label="Год издания" 
            v-model="newBook.year"
            @keypress="filter"
            variant="outlined"
            density="compact"
            />

            <v-text-field 
            label="Цена" 
            v-model="newBook.price"
            @keypress="filter"
            variant="outlined"
            density="compact"
            />

            <v-card-actions>
                <v-btn
                :loading="isLoading"
                class="mx-auto"
                variant="tonal"
                @click="saveBook()"
                >
                    Сохранить
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed, watch, ref, Ref } from 'vue';
import type { IBook } from '@/entities/Book/model/types';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const authors = computed<{ name: string; id: number; }[]>(() => store.getters['FiltersModel/getAuthors']);
const geners = computed<{ name: string; id: number; }[]>(() => store.getters['FiltersModel/getGenres']);
const years = computed(() => store.getters['FiltersModel/getYears']);

const props = defineProps<{
    dialog: boolean,
    book: IBook | null
}>()

const isLoading = computed(() => store.state.booksModel.isLoading);


const filter = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  const key = event.key || '';

  let expect = target.value.toString() + key.toString();

  if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
    event.preventDefault();
  } else {
    return true;
  }
}

const localDialog = ref(false)

watch(() => props.dialog, () => {
    localDialog.value = props.dialog
})

const newBook = ref<any>({
    id: props.book ? props.book.id : -1,
    img: props.book ? props.book.img : -1,
    title: props.book ? props.book.title : '',
    genre: props.book ?props.book.genre : null,
    author: props.book ? props.book.author : null,
    year: props.book ? props.book.year.name : null,
    price: props.book ? props.book.price : 0,
})

const currentYear = new Date().getFullYear();
watch(() => newBook.value.year, (newVal, oldVal) => {
  if ((Number(newVal) > currentYear)|| (Number(newVal) < 0)) {
    newBook.value.year = String(currentYear);
  }
});

const saveBook = async () => {
    for(const key in newBook.value) {
        if (!newBook.value[key as keyof IBook]) {
            return
        }
    }

    const findYear = years.value.find((item: { name: string; }) => item.name === newBook.value.year.name)
    let year = {} as { id: number; name: string; }

    if(!findYear){
        year = {id: years.value.length + 1, name: String(newBook.value.year)}
        await store.dispatch('FiltersModel/addYear', {id: years.value.length + 1, name: newBook.value.year})
    } else {
        year = findYear
    }

    newBook.value.year = year

    if(props.book){
        await store.dispatch('booksModel/setEditedBook', {book: newBook.value, id: props.book._id})
    } else {
        const img = Math.floor(Math.random() * 5) + 1;
        newBook.value.img = img
        await store.dispatch('booksModel/addNewBook', newBook.value)
    }

    localDialog.value = false
    router.go(0)
}

</script>