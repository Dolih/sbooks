export const getAuthors = async () => {
    try{
        const response = await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/authors`)
        const data = await response.json()
        return data
    } catch(e){
        console.log(e)
        return null
    }
}

export const getGenres = async () => {
    try{
        const response = await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/genres`)
        const data = await response.json()
        return data
    } catch(e){
        console.log(e)
        return null
    }
}

export const getYears = async () => {
    try{
        const response = await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/years`)
        const data = await response.json()
        return data
    } catch(e){
        console.log(e)
        return null
    }
}

export const setAuthor = async (author: {id: number, name: string }) => {
    try{
        await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/authors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: author.id, name: author.name})
        })
        
        return true
    } catch(e){
        console.log(e)
        return false
    }
}

export const setGenre = async (genre: {id: number, name: string }) => {
    try{
        await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/genres`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: genre.id, name: genre.name})
        })
        
        return true
    } catch(e){
        console.log(e)
        return false
    }
}

export const setYear = async (year: {id: number, name: string }) => {
    try{
        await fetch(`https://crudcrud.com/api/${import.meta.env.VITE_BASE_API_ID}/years`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: year.id, name: year.name})
        })
        
        return true
    } catch(e){
        console.log(e)
        return false
    }
}