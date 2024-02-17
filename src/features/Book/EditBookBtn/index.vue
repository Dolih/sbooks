<template>
    <v-btn
        icon="mdi-pencil"
        color="brown-darken-1"
        variant="outlined"
        @click:close="dialog = true"
    >
        <v-icon icon="mdi-pencil"/>
        <EditBookCard
            :dialog="dialog"
            :book="book"
        />
    </v-btn>

    <v-btn
        icon="mdi-delete"
        variant="outlined"
        color="red-darken-1"
        @click="deleteDialog = true"
    >
        <v-icon icon="mdi-delete"/>
        <dialogWindow
            title="Удалить книгу?"
            :dialog="deleteDialog"
            @confirmAction="deleteBook"
        />
    </v-btn>
</template>
<script setup lang="ts">
import { IBook } from '@/entities/Book/model/types';
import { EditBookCard } from '@/features/Book';
import dialogWindow from '@/shared/ui/dialogWindow/index.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps<{
    book: IBook
}>()

const dialog = ref(false)
const deleteDialog = ref(false)

const deleteBook = (type: boolean) => {
    if(type){
        store.dispatch('booksModel/removeBook', props.book._id)
    }
        deleteDialog.value = false

}

</script>