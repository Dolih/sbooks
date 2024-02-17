const addr = '6db4eac5a3364f4cb27b842d34ecde4d'


const books = [
    {
        id:0,
        img: 1,
        title:"Война и мир",

        author:
        {
            id:1 ,
            name:"Толстой"
        }, 
        year:    {
            id:"1",
            name:"1900"
        },

        genre:
        {
            id:"1",
            name:"История"
        }, 
        price:"2100"
    },

    {
        id:1,
        img: 2,
        title:"Мастер и Маргарита", 
        author:
        {
            id:2 ,
            name:"Булгаков"
        }, 
        year:    {
            id:"2",
            name:"1963"
        }, 
        genre:
        {
            id:"2",
            name:"Роман"
        }, 
        price:"4300"
    },

    {
        id:2,
        img: 3,
        title:"Братья Карамазовы", 
        author:
        {
            id:3 ,
            name:"Достоевский"
        }, 
        year:    {
            id:"3",
            name:"1913"
        }, 
        genre:
        {
            id:"3",
            name:"Проза"
        }, 
        price:"1700"
    },

    {
        id:3,
        img: 4,
        title:"Ромео и Джульетта", 
        author:
        {
            id:4,
            name:"Шекспир"
        }, 
        year:    {
            id:"4",
            name:"1689"
        }, 
        genre:
        {
            id:"4",
            name:"Пьеса"
        }, 
        price:"889"
    },

        {
            id:4,
            img: 5,
            title:"Преступление и наказание", 
            author:
            {
                id:3 ,
                name:"Достоевский"
            }, 
            year:    {
                id: "5",
                name: "1886"
            }, 
            genre:
            {
                id:"2",
                name:"Роман"
            }, 
            price:"7123"
        },
]

const genres =[
    {
        id:"1",
        name:"История"
    },
    {
        id:"2",
        name:"Роман"
    },
    {
        id:"3",
        name:"Проза"
    },
    {
        id:"4",
        name:"Пьеса"
    },
]

const authors = [
    {
        id:"1",
        name:"Толстой"
    },
    {
        id:"2",
        name:"Булгаков"
    },
    {
        id:"3",
        name:"Достоевский"
    },
    {
        id:"4",
        name:"Шекспир"
    },
]

const years = [
    {
        id:"1",
        name:"1900"
    },
    {
        id:"2",
        name:"1963"
    },
    {
        id:"3",
        name:"1913"
    },
    {
        id:"4",
        name:"1689"
    },
    {
        id: "5",
        name: "1886"
    }
]


books.forEach(async book => {
    await fetch(`https://crudcrud.com/api/${addr}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
        .then(response => response.json())
        .then(data => console.log(data))
})

genres.forEach(async genre => {
    await fetch(`https://crudcrud.com/api/${addr}/genres`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(genre)
    })
        .then(response => response.json())
        .then(data => console.log(data))
})

authors.forEach(async author => {
    await fetch(`https://crudcrud.com/api/${addr}/authors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
    })
        .then(response => response.json())
        .then(data => console.log(data))
})

years.forEach(async year => {
    await fetch(`https://crudcrud.com/api/${addr}/years`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(year)
    })
        .then(response => response.json())
        .then(data => console.log(data))
})
