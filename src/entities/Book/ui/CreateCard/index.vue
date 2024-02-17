<template>
    <v-card
        class="h-100"
        min-height="350px"
        max-width="400px"
        color="grey-lighten-2"
    >
        <v-card-title
            class="d-flex justify-center text-brown-darken-1"
        >
            <h3>Добавить книгу</h3>
        </v-card-title>

        <v-card-actions
            class="h-100 d-flex flex-column justify-center align-center"
        >
            <slot name="CreateBookBtn"></slot>
            <slot name="TestBookBtn"></slot>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">

</script>