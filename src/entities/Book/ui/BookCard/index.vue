<template>

    <v-card
    variant="outlined"
    >
    <v-img
        class="align-end text-white"
        cover
        height="250"
        gradient="to bottom, rgba(0,0,0,.0), rgba(0,0,0,.9)"
        :src="`/assets/img/${book.img}.jpg`"
    >
        <v-card-subtitle
        class="font-weight-bold"
        >
            {{ book.genre.name }}
        </v-card-subtitle>
        <v-card-title
        class=" font-weight-bold"
        >
            {{book.title}}
        </v-card-title>
    </v-img>

        <v-card-text>
            <v-row>
                {{ book.author.name }}, {{ book.year.name }}г.
            </v-row>

            <v-row>
                {{book.price}}₽
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-spacer/>
            <slot name="action"></slot>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { IBook } from '@/entities/Book/model/types';
import { useRoute } from 'vue-router';

const route = useRoute()
const isEditPath = () => {
    return route.path.includes('edit')
}
defineProps<{
    book: IBook
}>()


</script>