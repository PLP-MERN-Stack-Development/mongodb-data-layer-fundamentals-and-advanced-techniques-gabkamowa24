MongoDB Fundamentals - Week 1 Assignment
Node.js Package Setup
Once Node.js is installed, open your terminal and navigate to your project folder, then run:
# Initialize a Node.js project
npm init -y
# Install the official MongoDB Node.js driver
npm install mongodb
This will create a package.json file and add the MongoDB dependency required to connect and interact with your database.
Assignment Overview
This assignment consists of two main scripts:
1.	insert_books.js: Populates your MongoDB collection with a list of sample books.
2.	queries.js: Runs MongoDB queries, updates, deletions, aggregations, and indexing tasks.
Each file uses the MongoDB Node.js driver to perform operations on the plp_bookstore database.
Getting Started
Step 1: Start Your MongoDB Server
Make sure your MongoDB server is running locally.
You can start it by running:
mongod
Or, if you are using MongoDB Compass, ensure it is connected to your local MongoDB instance.

Step 2: Insert Sample Data
Run the provided insert_books.js script to populate your database with book data.
node insert_books.js
This will:
•	Connect to your local MongoDB server
•	Create a database named plp_bookstore
•	Create a collection named books
•	Insert 12 sample book documents
•	Display a success message and list of inserted books

Step 3: Run the Queries Script
Now that your database is populated, run the queries.js script:
node queries.js
This will execute:
•	Basic Queries: Find books by genre, year, and author
•	Updates & Deletes: Modify or remove book records
•	Advanced Queries: Combine filters, projections, and sorting
•	Aggregation Pipelines: Analyze average prices, count books per decade, and find top authors
•	Indexing: Create single and compound indexes, then test performance using explain()

Files Included
File	Description
insert_books.js	Populates the MongoDB database with sample book data
queries.js	Contains CRUD, advanced queries, aggregation, and indexing operations
package.json	Manages dependencies and scripts for Node.js
README.md	Documentation for setup and usage


Requirements
•	Node.js v18+
•	MongoDB (Community Edition or Atlas)
•	MongoDB Shell (mongosh) or MongoDB Compass


