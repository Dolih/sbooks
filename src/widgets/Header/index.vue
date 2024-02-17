<template>
    <v-app-bar 
    :elevation="0"
    scroll-behavior="hide"
    color="brown-darken-1"
    >
        <v-app-bar-title
        class="text-h5 font-weight-bold cursor-pointer"
        @click="router.push('/')"

        >
            SBooks
        </v-app-bar-title>

        <v-btn 
        class="mr-lg-10 mr-md-4"
        prepend-icon="mdi-pencil" 
        variant="text"
        @click="router.push('/edit')"
        >
            <span v-if="!isMobile">Изменить</span>
        </v-btn>

        <v-btn
        class="text-brown-darken-1"
        prepend-icon="mdi-book" 
        variant="flat"
        color="white"
        @click="router.push('/cart')"
        >
            <span v-if="!isMobile">Корзина</span>
            <span><sup>({{ totalBooksInCart }})</sup></span>
        </v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {useRouter} from 'vue-router'
import { useDisplay } from 'vuetify'
import { useStore } from 'vuex';

const store = useStore();
const totalBooksInCart = computed(() => store.getters['cartModel/getTotalBooksCount']);

const router = useRouter()
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

</script>