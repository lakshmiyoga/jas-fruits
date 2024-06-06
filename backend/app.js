const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const  cookieParser = require('cookie-parser')
const cors = require('cors');
const path =require('path')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));


// const port = 3000;


// // MongoDB Connection

// const uri =
//   "mongodb+srv://yogalakshmi9496:JbXZvwrM8OsxdUa7@health-temp-db.jn5sij4.mongodb.net/ecomDb?retryWrites=true&w=majority&appName=Health-temp-db";
// // Remember to secure this information
// mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));


// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


const products = require('./routes/product')
const user = require('./routes/user');
const order = require('./routes/order');
const  payment  = require("./routes/payment");
const  enquiry  = require("./routes/enquiry");

app.use('/api/v1', products);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);
app.use('/api/v1',enquiry);


app.use(errorMiddleware);


module.exports = app;