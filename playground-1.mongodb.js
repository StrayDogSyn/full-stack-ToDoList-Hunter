/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') }
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04T00:00:00Z'), $lt: new Date('2014-04-05T00:00:00Z') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred on April 4th, 2014.`);

// Run an aggregation to summarize sales data in 2014 and group by item.
db.getCollection('sales').aggregate([
  // Match sales that occurred in 2014.
  { 
    $match: { 
      date: { 
        $gte: new Date('2014-01-01T00:00:00Z'), 
        $lt: new Date('2015-01-01T00:00:00Z') 
      } 
    }
  },
  // Group total sales per item.
  { 
    $group: { 
      _id: '$item', 
      totalSaleAmount: { 
        $sum: { $multiply: [ '$price', '$quantity' ] } 
      } 
    } 
  },
  // Sort the items by total sales amount in descending order.
  { $sort: { totalSaleAmount: -1 } }
]);
