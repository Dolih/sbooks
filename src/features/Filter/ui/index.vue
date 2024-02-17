<template>
    <v-card
    class="mx-auto mt-3 mb-3 cursor-pointer"
    color="brown-darken-1"
    width="100vw"
    max-width="360px"
    >
        <v-toolbar
        color="transparent"
        flat
        @click="isActive = !isActive"
        >
            <v-toolbar-title
            class="font-weight-bold"
            >{{name}}</v-toolbar-title>

            <v-spacer/>

            <v-btn
            icon="mdi-magnify"
            @click="searchField.focus()"
            >
            </v-btn>
        </v-toolbar>

        <div v-if="isActive">
            <v-container
            >
                <v-row
                align="center"
                justify="start"
                >
                    <v-col
                    v-for="(selection, i) in selected"
                    :key="i"
                    cols="auto"
                    class="py-1 pe-0"
                    >
                        <v-chip
                            @click="selected.splice(i, 1)"
                        >
                            <v-icon
                            icon="mdi-label"
                            start
                            ></v-icon>

                            {{ selection.name }}
                        </v-chip>
                    </v-col>

                    <v-col
                    cols="12"
                    >
                        <v-text-field
                            ref="searchField"
                            v-model="search"
                            hide-details
                            label="Найти"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
                    
            <v-list
            class=""
            :style="{
                maxHeight: '200px',
                overflowY: 'auto'
            }"
            >
                <template v-for="item in list">
                    <v-list-item
                    v-if="!selected.includes(item)"
                    :key="item.id"
                    @click="selected.push(item)"
                    >
                        <template v-slot:prepend>
                            <v-icon
                            icon="mdi-home"
                            ></v-icon>
                        </template>

                        <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item>
                </template>
            </v-list>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { Ref, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { IFilter } from '@/entities/Filters/model/types';

const props = defineProps({
    name: String,
    listName: String,
})

const emits = defineEmits(['filtersList'])

const store = useStore()
const searchField: Ref<HTMLElement | any> = ref(null)
const isActive = ref(false)
const search = ref('')
const selected: Ref<IFilter[]> = ref([])


onBeforeMount(async () => {
    await store.dispatch(`FiltersModel/fetch${props.listName}`)
})

const list = computed(() => {
    const data = store.getters[`FiltersModel/get${props.listName}`]

    return data.filter((item: {name: string}) => {
        return item.name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1
    })
})

watch(selected.value, () => {
    emits('filtersList', selected.value)
})


</script>