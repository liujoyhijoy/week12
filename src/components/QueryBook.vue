<template>
    <div>
      <h1>Retrieve Books</h1>
      <div>
        <label for="isbnQuery">Minimum ISBN:</label>
        <input type="number" v-model="isbnQuery" id="isbnQuery" placeholder="Enter minimum ISBN" />
        
        <label for="nameQuery">Name:</label>
        <input type="text" v-model="nameQuery" id="nameQuery" placeholder="Enter book name" />
        
        <label for="limitQuery">Limit Records:</label>
        <input type="number" v-model="limitQuery" id="limitQuery" placeholder="Enter limit" />
        
        <button @click="fetchBooks">Search Books</button>
      </div>
  
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
  import db from "../firebase/init";

  
  export default {
    setup() {
      // Variables for query
      const isbnQuery = ref('');
      const nameQuery = ref('');
      const limitQuery = ref(10); // Default limit is 10 records
  
      const books = ref([]);

    //query from the 'books' collection
      const fetchBooks = async () => {
  try {
    let q = query(collection(db, 'books'));

    // query isbn use where
    if (isbnQuery.value) {
      q = query(q, where('isbn', '>=', Number(isbnQuery.value)));
    }

    // query name use where
    if (nameQuery.value) {
      // lowercase
      q = query(q, where('name', '==', nameQuery.value.trim().toLowerCase()));
    }

    // user orderby and limit
    q = query(q, orderBy('isbn', 'desc'), limit(Number(limitQuery.value)));

    // execute the query
    const querySnapshot = await getDocs(q);
    const booksArray = [];
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() });
    });
    books.value = booksArray;
  } catch (error) {
    console.error('Error fetching books: ', error);
  }
};

  
      return {
        isbnQuery,
        nameQuery,
        limitQuery,
        books,
        fetchBooks
      };
    }
  };
  </script>
  