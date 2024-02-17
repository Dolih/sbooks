<template>
    <MainLayout
    >
        <template v-slot:header>
            <TheHeader/>
        </template>
    </MainLayout>
</template>
<script setup lang="ts">
import MainLayout from '@/shared/ui/layouts/mainLayout.vue'
import TheHeader from '@/widgets/Header/index'
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

onMounted(async () => {
    await store.dispatch('booksModel/setBooks')
})



</script>

<style>
</style>