<template>
    <v-btn
        class="float-right"
        variant="outlined"
        @click="addToCart()"
    >
        В корзину <span v-if="countBooksInCart"><sup>({{ countBooksInCart }})</sup></span>
    </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps<{
    id: number
}>()

const countBooksInCart = computed(() => store.getters['cartModel/getBookInCartById'](props.id))

const addToCart = () => {
    store.dispatch('cartModel/setBookInCart', props.id)
}
</script>