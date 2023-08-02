// Import the 'openDB' function from the 'idb' library
import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create an object store named 'jate' with auto-incrementing key 'id'
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

  // Open the 'jate' database
  const jateDb = await openDB('jate', 1);
  
  // Start a readwrite transaction and access the 'jate' object store
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Put the provided content into the object store with an auto-generated ID
  const request = store.put({ id: 1, value: content });
  const result = await request;

  // Log a success message
  console.log('Your text has been saved to the database, HURRAY!', result);

  return result;
};

// Method to retrieve all content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

  // Open the 'jate' database
  const jateDb = await openDB('jate', 1);
  
  // Start a readonly transaction and access the 'jate' object store
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Get all records from the object store
  const request = store.getAll();
  const result = await request;

  // Log the retrieved data
  console.log('result.value', result);

  return result.value;
};

// Initialize the database when the module is imported
initdb();

