const express = require("express");
const mysql = require("mysql");

const app = express();

//create db
//create db inside the code wite sql query if we dont create it in phpmyadmin directly
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE nodemysql";
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     res.send("db created!!");
//   });
// });

//before run this code at first we should delete database in above connect line and now run the server then open this route in browser http://localhost:3000/createdb to run this code and create db

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "advanced_express",
});

//connect to db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected!!!");
});

//create a table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255) , PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("post table created...");
  });
});

//add(insert) post1
app.get("/addpost1", (req, res) => {
  let post = { title: "post 1", body: "this is post 1" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log("post add");
    res.send("post one added to db");
  });
});

//select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("posts fetched...");
  });
});

//select just one post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post fetched...");
  });
});

//update  post
app.get("/update/:id", (req, res) => {
  let newTitle = "updated title";
  let sql = `UPDATE posts SET title= '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post updated...");
  });
});

//delete post
app.get("/delete/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("post delete...");
  });
});

app.listen("3000", () => {
  console.log("server is ok!");
});
