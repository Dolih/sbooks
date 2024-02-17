export interface IBook {
    id: number
    img: number,
    _id?: number
    title: string
    author: IBookAuthor
    genre: IBookGenre
    year: IBookYear
    price: number | string
}

interface IBookAuthor {
    id: number
    name: string
}

interface IBookGenre {
    id: number
    name: string
}

interface IBookYear {
    id: number
    name: string
}

