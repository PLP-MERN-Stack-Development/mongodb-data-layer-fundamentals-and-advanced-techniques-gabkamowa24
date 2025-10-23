// queries.js - MongoDB queries and operations

const { MongoClient } = require('mongodb');

// MongoDB connection URI and database
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(' Connected to MongoDB');

    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // BASIC QUERIES 

    // 1. Find all books in a specific genre
    const fictionBooks = await books.find({ genre: 'Fiction' }).toArray();
    console.log('Books in Fiction Genre:', fictionBooks);

    // 2. Find books published after a certain year
    const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
    console.log('Books published after 2000:', recentBooks);

    // 3. Find books by a specific author
    const orwellBooks = await books.find({ author: 'George Orwell' }).toArray();
    console.log('Books by George Orwell:', orwellBooks);

    // 4. Update the price of a specific book
    const updateResult = await books.updateOne(
      { title: '1984' },
      { $set: { price: 15.99 } }
    );
    console.log('Updated Book Price:', updateResult.modifiedCount);

    // 5. Delete a book by its title
    const deleteResult = await books.deleteOne({ title: 'Moby Dick' });
    console.log('Deleted Book:', deleteResult.deletedCount);

    // ADVANCED QUERIES

    // 6. Find books that are both in stock and published after 2010
    const inStockRecent = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log('In-stock books published after 2010:', inStockRecent);

    // 7. Use projection to return only title, author, and price
    const projection = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log('Books (title, author, price only):', projection);

    // 8. Sorting by price (ascending)
    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    console.log('Books sorted by price (ascending):', sortedAsc);

    // 9. Sorting by price (descending)
    const sortedDesc = await books.find().sort({ price: -1 }).toArray();
    console.log('Books sorted by price (descending):', sortedDesc);

    // 10. Pagination - 5 books per page (Page 2 example)
    const page = 2;
    const perPage = 5;
    const paginatedBooks = await books.find().skip((page - 1) * perPage).limit(perPage).toArray();
    console.log(`Page ${page} Books (5 per page):`, paginatedBooks);

    // AGGREGATION PIPELINES 

    // 11. Average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log('Average price by genre:', avgPriceByGenre);

    // 12. Author with the most books
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('Author with the most books:', topAuthor);

    // 13. Group books by publication decade and count them
    const byDecade = await books.aggregate([
      {
        $group: {
          _id: { $floor: { $divide: ["$published_year", 10] } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          decade: { $multiply: ["$_id", 10] },
          count: 1,
          _id: 0
        }
      },
      { $sort: { decade: 1 } }
    ]).toArray();
    console.log('Books grouped by decade:', byDecade);

    // INDEXING 

    // 14. Create an index on the title field
    const titleIndex = await books.createIndex({ title: 1 });
    console.log('Index created on title:', titleIndex);

    // 15. Create a compound index on author and published_year
    const compoundIndex = await books.createIndex({ author: 1, published_year: 1 });
    console.log('Compound index created on author + published_year:', compoundIndex);

    // 16. Use explain() to show performance improvement
    const explainBefore = await books.find({ title: '1984' }).explain('executionStats');
    console.log('Query Execution with Index (title="1984"):', explainBefore.executionStats);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

main();
