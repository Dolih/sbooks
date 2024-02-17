<template>
<v-card
    class="d-flex flex-column"
    height="150px"
    color="brown-darken-1"
>
    <v-card-title
        class="font-weight-bold text-white"
    >
        Итого: {{totalPrice}}₽
    </v-card-title>
    <v-spacer/>
    <v-card-actions
        class="mb-3"
    >
        <v-btn
            class="text-white w-70 mx-auto"
            variant="outlined"
        >
            Оформить заказ
        </v-btn>
        <v-spacer/>
        <v-btn
            variant="tonal"
            color="red darken-1"
            @click="deleteDialog = true"
        >
            <dialogWindow
                :title="'Отчистить корзину?'"
                :dialog="deleteDialog"
                @confirmAction="deleteBookInCart"
            />
            Очистить
        </v-btn>
    </v-card-actions>
</v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import dialogWindow from '@/shared/ui/dialogWindow/index.vue';
import { useStore } from 'vuex';

const store = useStore()
defineProps<{
    totalPrice: number
}>()

const deleteDialog = ref(false)
const deleteBookInCart = (type: boolean) => {
    if(type){
        store.dispatch('cartModel/deleteCart')
    }
    deleteDialog.value = false
}
</script>