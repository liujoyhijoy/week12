const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});


const functions = require("firebase-functions");

exports.capitalizeBookData = functions.firestore
    .document("books/{bookId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const capitalizedData = {
        isbn: Number(data.isbn),
        name: data.name.toUpperCase(),
      };

      return admin.firestore()
          .collection("books")
          .doc(context.params.bookId)
          .update(capitalizedData)
          .then(() => {
            console.log("Book data capitalized successfully:", capitalizedData);
          })
          .catch((error) => {
            console.error("Error updating book data:", error);
          });
    });


exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();


      const books = [];
      snapshot.forEach((doc) => {
        books.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching all books:", error.message);
      res.status(500).send("Error fetching all books");
    }
  });
});


