<template>
    <div>
      <h1>Books with ISBN > 1000</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
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

    onMounted(() => {
      fetchBooks();
    });

    return {
      books
    };
  }
};
</script>


<!-- <template>
    <div>
      <h1>Books with ISBN > 1000</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          <div v-if="!isEditing(book.id)">
            {{ book.name }} - ISBN: {{ book.isbn }}
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
          <div v-else>
            <input type="text" v-model="editingName" />
            <input type="number" v-model="editingIsbn" />
            <button @click="updateBook(book.id)">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from "../firebase/init";
  import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
      const editingId = ref(null);
      const editingName = ref('');
      const editingIsbn = ref('');
  
      const fetchBooks = async () => {
        try {
          const q = query(collection(db, 'books'), where('isbn', '>', 1000)); //1000
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
  
      const editBook = (book) => {
        editingId.value = book.id;
        editingName.value = book.name;
        editingIsbn.value = book.isbn;
      };
  
      const cancelEdit = () => {
        editingId.value = null;
        editingName.value = '';
        editingIsbn.value = '';
      };
  
      const updateBook = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await updateDoc(bookRef, {
            name: editingName.value,
            isbn: editingIsbn.value
          });
          fetchBooks(); // Refresh the list after update
          cancelEdit();
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      };
  
      const deleteBook = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await deleteDoc(bookRef);
          fetchBooks(); // Refresh the list after deletion
        } catch (error) {
          console.error('Error deleting book: ', error);
        }
      };
  
      const isEditing = (id) => {
        return editingId.value === id;
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        editingId,
        editingName,
        editingIsbn,
        isEditing,
        editBook,
        cancelEdit,
        updateBook,
        deleteBook
      };
    }
  };
  </script>
   -->

   