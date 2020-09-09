
var express = require("express");
var mongoose = require("mongoose");
var DB = require('./models/user.model');


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

var PORT = 3001;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
app.use(express.static("public"));

// Routes

app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});


//api to get the user bill 

app.post("/userBill", async (req,res)=>{
    try {

    let finalobject = [];

    for await (const doc of DB.user.find()) {
        let object = {};
        let noOfOrders = 0;
        let averageBillValue = 0;

        for await (const orderDoc of DB.order.find({userId:doc.userId})) {

            ++noOfOrders;
            averageBillValue = averageBillValue + orderDoc.subtotal;

           }
        object.userId = doc.userId;
        object.name = doc.name; 
        averageBillValue = parseInt(averageBillValue/noOfOrders);
        object.noOfOrders = noOfOrders;
        object.averageBillValue = averageBillValue;

        finalobject.push(object)
        
        }
         return  res.send(finalobject)

        
    } 
    catch (error) {
       return  res.send({status:false, message:"Technical error"})

    }
  });

// api to update the order of each user in user collect

  app.post("/updateUserOrders", async (req,res)=>{
    try {
            for await (const doc of DB.user.find()) {

            let noOfOrders = 0;
                for await (const orderDoc of DB.order.find({userId:doc.userId})) {

                    ++noOfOrders;
                }
                        
                    doc.NoOfOrders = noOfOrders;
                    doc.save();

            }
            
            return res.send({success:true,message:"Successfully updated"});

    } catch (error) {
       return  res.send({status:false, message:"Technical error"})

    }
})




// Start the server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + ".");
});




















