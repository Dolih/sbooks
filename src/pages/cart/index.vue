<template>
    <v-container>
        <v-row
        >
            <v-col 
            cols="12"
            sm="12"
            md="7"
            lg="6"

            >
                <v-row  v-for="book in booksInCart">
                    <v-col>                
                        <CartBookCard :bookInCart="book">
                            <template v-slot:buttons>
                                <CountControl :bookInCart="book" />
                            </template>
                        </CartBookCard>
                    </v-col>
                </v-row>

            </v-col>
            <v-spacer/>
            <v-col
            cols="12"
            sm="12"
            md="5"
            lg="6"
            >
                <CartControl 
                    :totalPrice="totalPrice"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import {useStore} from 'vuex';
import {computed} from 'vue';
import {CartBookCard, CartControl} from '@/entities/Cart';
import {CountControl} from '@/features/Cart'

const store = useStore();

const booksInCart = computed(() => store.getters['cartModel/getBooksInCart'])
const books = computed(() => store.getters['booksModel/getBooks'])

const totalPrice = computed(() => {
  let sum = 0;

  if (booksInCart.value && books.value) {
    booksInCart.value.forEach((bookInCart: any) => {
      const findBook = books.value.find((book:any) => book.id === bookInCart.id);
      if (findBook) {
        sum += findBook.price * bookInCart.count;
      }
    });
  }

  return sum;
});
</script>
