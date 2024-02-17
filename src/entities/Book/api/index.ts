import type { IBook } from "../model/types"

export const getBooks = async () => {
    try{
        const response = await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/books`)
        const data = await response.json()
        return data
    } catch(e){
        console.log(e)
        return null
    }
}

export const setNewBook = async (book: IBook) => {
    try{
        await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        
        return true
    } catch(e){
        console.log(e)
        return false
    }
}

export const updateBook = async (book: IBook, id: number) => {
    delete book._id

    try{
        await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        
        return true
    } catch(e){
        console.log(e)
        return false
    }
}

export const removeBook = async (_id: number) => {
    try{
        await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/books/${_id}`, {
            method: 'DELETE'
        })
        
        return true
    } catch(e){
        console.log(e)
        return false
    }
}