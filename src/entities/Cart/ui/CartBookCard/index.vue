<template>
    <div v-if="!book"></div>
    <v-card 
    v-else
    height="150px"
    variant="outlined"
    >
        <v-row class="h-100" no-gutters>
            <v-col cols-4 height="100%">
                <v-img
                class="overflow-hidden"
                height="150px"
                
                cover
                :src="`/assets/img/${book.img}.jpg`"
                ></v-img>
            </v-col>
            <v-col cols="5">
                <v-card-title
                class=" font-weight-bold"
                >
                    {{book.title}}
                </v-card-title>
                <v-card-subtitle
                class=" font-weight-bold"
                >
                    {{book.genre.name}}
                </v-card-subtitle>
                <v-card-text class="d-flex flex-column">
                    <span>{{book.author.name}}, {{ book.year.name }}</span>
                    <span>{{ book.price }}₽</span>
                </v-card-text>
            </v-col>
            <v-col 
            class="d-flex flex-column my-3"
            cols="3">
            <v-row no-gutters>
                <v-col class="d-flex justify-end pr-2 font-weight-bold">
                    {{bookInCart.count * book.price}}₽
                </v-col>
            </v-row>
            <v-row no-gutters>
                <slot name="buttons"></slot>
            </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps<{
    bookInCart: {id: number, count: number},
}>()

const book = computed(() => store.getters['booksModel/getBookById'](props.bookInCart.id))


</script>