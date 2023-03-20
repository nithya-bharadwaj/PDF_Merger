const express = require('express')
const path = require('path')
    //multer is a middleware for handling multipart/form-data, which is primarily used for uploading files and is designed for use with Express and Ndoe.js
    //It makes it easy to handle file uploads by providing a convenient API for handling multipart/form-data.
const multer = require('multer')
    //here mergepdfs is being exported as an object so curly braces and require is taking the path to get or extract the object mergepdfs
const { mergepdfs } = require('./merger.js')
const upload = multer({
    dest: 'upload/'
})
const app = express()
app.use('/static', express.static('public'))
const port = 3000
app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "template/index.html"))
    })
    //post function is used to handle http post requests. it takes two or more arguments.
    //the first arguments is the route of path for which the function will be executed,and this can be a string or a regular expression
    //the second arguments is a callback function that will be executed when post tequest is made to the above specified route. and this function takes two argumetnts req and res the teq contains info about the incoming request such as headers or url parameters and res is used go send a response back to client
    //if middleware functions need to be used,additonal arguments can be used


// The req.files object is an object that contains one or more properties, where each property represents a file that was uploaded

// When the user submits the form, the files that were selected in the file input field with the name "pdfs" will be uploaded to the server and can be accessed through req.files.
//in upload finction a second argument which is maximum number of files a user can upload can also be mentioned but since i'm doing it for multiple files, i have skipped that part
app.post('/merge', upload.array('pdfs'), async(req, res, next) => {
        // req.files is a property of the request object in Express that contains information about files that were uploaded as part of a multipart / form - data request.It is only available
        // if you are using a middleware such as multer to handle file uploads
        //The req.files object is an object that contains one or more properties, where each property represents a file that was uploaded


        //In Express, the next function is a callback function that is passed to middleware functions and is used to pass control to the next middleware function in the chain.

        // When a post request is made to a route that has middleware functions, the request is first passed to the first middleware function in the chain. This function can then modify the request or response objects, or perform some other action, before passing control to the next middleware function in the chain using the next function.
        const files = req.files;
        //now files is having all uploaded file details
        const filepaths = files.map((file) => {
            return path.join(__dirname, file.path);
        });

        // The goal of the map() function is to extract the path of each uploaded file from the req.files array and store it in a new array. This is done using an arrow function that takes a single argument, which represents the current element of the original array (file), and returns the path of the file (file.path).

        // req.files is the original array containing information about the uploaded files.
        // The map()
        // function is called on req.files.
        // The arrow
        // function takes a single argument(file) that represents the current element of the req.files array.
        // The arrow
        // function calls the path.join()
        // function to join the directory name of the current file(__dirname) with the file path(file.path).This creates the full path to the uploaded file.
        // The arrow
        // function returns the full path to the uploaded file.
        // The map()
        // function creates a new array by calling the arrow
        // function on each element of req.files and populating the new array with the returned values.
        // The new array is assigned to the variable files.

        //console.log(filepaths);
        let p = await mergepdfs(filepaths);





        res.redirect(`http://localhost:3000/static/${p}.pdf`)

        // next()
    }
    // ,

    // (req, res) => {
    // console.log("success")

    // }
);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})