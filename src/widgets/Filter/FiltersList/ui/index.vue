<template>
    <v-btn
    icon="mdi-filter-variant"

        style="position: absolute; left: 20px;"
        color="brown-darken-1"
        @click.stop="drawer = !drawer"
    >
        <v-badge
        :content="countFilters"
        color="red-darken-3"
        floating
        >
        <v-icon icon="mdi-filter-variant"/>
        </v-badge>
    </v-btn>

    <v-navigation-drawer
    
    width="auto"
    height="100vh"
    class="px-2 border-none"
    v-model="drawer"
    temporary
    >
        <div 
        class="d-flex gap-2 align-center justify-space-between mt-2 mb-6">
            <h2 class="font-weight-bold text-brown-darken-1">Фильтры:</h2>
            <v-btn
            icon="mdi-close"
            color="brown-darken-1"
            @click.stop="drawer = !drawer"
        />
        </div>

        <Filter
        :name="'Авторы'"
        :listName = "'Authors'"
        @filtersList=AuthorsFiltersList
        />
        <Filter
        :name="'Жанры'"
        :listName="'Genres'"
        @filtersList=GenresFiltersList
        />
        <Filter
        :name="'Год'"
        :listName="'Years'"
        @filtersList=YearsFiltersList
        />
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { Filter } from '@/features/Filter'
import { ref } from 'vue';
import { IFilter } from '@/entities/Filters/model/types';
import { computed } from 'vue';

const drawer = ref(false)
const authorsFilterCount = ref(0)
const genresFilterCount = ref(0)
const yearsFilterCount = ref(0)

const countFilters = computed(() => yearsFilterCount.value + genresFilterCount.value + authorsFilterCount.value)
const emits = defineEmits(['authorsFiltersList', 'genresFiltersList', 'yearsFiltersList'])

const AuthorsFiltersList = (data: IFilter[]) => {
    authorsFilterCount.value = data.length
    emits('authorsFiltersList', data)
}

const GenresFiltersList = (data: IFilter[]) => {
    genresFilterCount.value = data.length
    emits('genresFiltersList', data)
}

const YearsFiltersList = (data: IFilter[]) => {
    yearsFilterCount.value = data.length

    emits('yearsFiltersList', data)
}
</script>