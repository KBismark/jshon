//Set app entries
[
    //Home entry
    {
        pathname:"/",
        src:"/home/index.js"
    },

    //Match pathnames with Regular expressions
    {
        //This reads; match pathnames starting with "/about/".
        //e.g. localhost:3003/about/me and localhost:3003/about/myfriends/john
        pathname:/^(\/about\/)/, 
        src:"/about/index.js"
    },
]