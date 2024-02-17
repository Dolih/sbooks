<template>
    <v-btn
        class="mb-4 w-75"
        prepend-icon="mdi-plus"
        color="brown-darken-1"
        variant="flat"
        size="large"
        @click:close="dialog = true"
    >
        Создать
        <EditBookCard
        :dialog="dialog"
        :book = null
        />
    </v-btn>
</template>
<script setup lang="ts">
import { EditBookCard } from '@/features/Book';
import { ref } from 'vue';

const dialog = ref(false)
</script>