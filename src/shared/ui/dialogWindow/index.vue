<template>
    <v-dialog
        persistent
        v-model="localDialog"
        width="300px"
    >
        <v-card>
            <v-card-title
            class="mx-auto"
            >
                {{title}}
            </v-card-title>

            <v-card-actions>
                <v-btn
                @click="confirmAction(false)"
                >
                    Отмена
                </v-btn>

                <v-spacer/>

                <v-btn
                    color="red"
                    @click="confirmAction(true)"
                >
                    Подтвердить
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'

    const props = defineProps<{
        title: string,
        dialog: boolean
    }>()
    const emits = defineEmits(['confirmAction'])

    const localDialog = ref(props.dialog)
    watch(() => props.dialog, () => {
        localDialog.value = props.dialog
    })

    const confirmAction = (type: boolean) => {
        localDialog.value = false
        emits('confirmAction', type)
    }
</script>