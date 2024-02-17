<template>
    <v-col class="d-flex justify-end pr-2">
        <v-icon 
        class="cursor-pointer"
        icon="mdi-minus"
        @click="changeCount(false)"
        />
        <span class="px-2">{{ bookInCart.count }}</span>
        <v-icon 
        class="cursor-pointer"
        icon="mdi-plus"
        @click="changeCount(true)"
        />
        <v-icon
            class="ml-2 cursor-pointer"
            icon="mdi-delete"
            color="red-darken-1"
            @click="deleteFromCart()"
        />
    </v-col>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps<{
    bookInCart: {
        id: number,
        count: number
    }
}>()

const changeCount = (isAdd: boolean) => {
    if(isAdd){
        store.dispatch('cartModel/setBookInCart', props.bookInCart.id)
    } else {
        store.dispatch('cartModel/reduceCountBookInCart', props.bookInCart.id)
    }
}

const deleteFromCart = () => {
    store.dispatch('cartModel/deleteFromCart', props.bookInCart.id)
}
</script>