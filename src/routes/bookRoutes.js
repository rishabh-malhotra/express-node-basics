//using mongodb
const express = require("express");
const bookRouter = express.Router();
const { MongoClient,ObjectID } = require("mongodb");
const debug = require("debug")("app:bookRoutes");

function router(nav) {
  const books = [
    {
      title: "War and Peace",
      genre: "Historical Fiction",
      author: "Lev Nikolayevich Tolstoy",
      read: false
    },
    {
      title: "Les Misérables",
      genre: "Historical Fiction",
      author: "Victor Hugo",
      read: false
    },
    {
      title: "The Time Machine",
      genre: "Science Fiction",
      author: "H. G. Wells",
      read: false
    },
    {
      title: "A Journey into the Center of the Earth",
      genre: "Science Fiction",
      author: "Jules Verne",
      read: false
    },
    {
      title: "The Dark World",
      genre: "Fantasy",
      author: "Henry Kuttner",
      read: false
    },
    {
      title: "The Wind in the Willows",
      genre: "Fantasy",
      author: "Kenneth Grahame",
      read: false
    },
    {
      title: "Life On The Mississippi",
      genre: "History",
      author: "Mark Twain",
      read: false
    },
    {
      title: "Childhood",
      genre: "Biography",
      author: "Lev Nikolayevich Tolstoy",
      read: false
    }
  ];
  bookRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "LibraryApp";
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected successfully to the server");
        const db = client.db(dbName);
        const col = await db.collection("books");
        const books = await col.find().toArray();
        res.render("bookListView", {
          nav,
          title: "Library",
          books
        });
      } catch (err) {
        debug(err.stack);
      }
    })();
  });

  bookRouter.route("/:id").get((req, res) => {
    const { id } = req.params;
    const url = "mongodb://localhost:27017";
    const dbName = "LibraryApp";
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected successfully to the server");
        const db = client.db(dbName);
        const col = await db.collection("books");
        const book = await col.findOne({_id:new ObjectID(id)})
        debug(book)
        res.render("bookView", {
        nav,
        title: "Library",
        book
    });
  }catch(err){
    debug(err);
  }
  }())
  });
  return bookRouter;
}

module.exports = router;

//using sql server
// const express = require("express");
// const bookRouter = express.Router();
// const sql = require("mssql");
// const debug = require("debug")("app:bookRoutes");
// function router(nav) {
//   const books = [
//     {
//       title: "War and Peace",
//       genre: "Historical Fiction",
//       author: "Lev Nikolayevich Tolstoy",
//       read: false
//     },
//     {
//       title: "Les Misérables",
//       genre: "Historical Fiction",
//       author: "Victor Hugo",
//       read: false
//     },
//     {
//       title: "The Time Machine",
//       genre: "Science Fiction",
//       author: "H. G. Wells",
//       read: false
//     },
//     {
//       title: "A Journey into the Center of the Earth",
//       genre: "Science Fiction",
//       author: "Jules Verne",
//       read: false
//     },
//     {
//       title: "The Dark World",
//       genre: "Fantasy",
//       author: "Henry Kuttner",
//       read: false
//     },
//     {
//       title: "The Wind in the Willows",
//       genre: "Fantasy",
//       author: "Kenneth Grahame",
//       read: false
//     },
//     {
//       title: "Life On The Mississippi",
//       genre: "History",
//       author: "Mark Twain",
//       read: false
//     },
//     {
//       title: "Childhood",
//       genre: "Biography",
//       author: "Lev Nikolayevich Tolstoy",
//       read: false
//     }
//   ];

//   bookRouter.route("/").get((req, res) => {
//     (async function query() {
//       const request = new sql.Request();
//       const {recordset} = await request.query("select * from books");
//       res.render("bookListView", {
//         title: "Library",
//         nav,
//         books: recordset
//       });
//     })();
//   });
//   bookRouter.route("/:id")
//   .all((req,res,next)=>{
//     const { id } = req.params;
//     (async function query(){
//       const request=new sql.Request();
//       const {recordset} = await request.query(`select * from books where id=${id}`);
//       req.book=recordset[0];
//       next();
//     })();
//   })
//   .get((req, res) => {
//       res.render("bookView", { title: "Library", nav, book: req.book })
//     });
//   return bookRouter;
// }

// module.exports = router;
