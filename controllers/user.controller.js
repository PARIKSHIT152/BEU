
var DB = require('../models/user.model');
var properties = require('../config/config');



//user bill

exports.userBill = async (req,res)=>{
    try {
 

       await DB.user.find().then((users)=>{
            if(!users){
                return  res.send({status:false, message:"Technical Error"})
            }else{
                let finalobject = [];

                finalobject =  users.map(async(item,index)=>{
                let object = {};

                     orders = await DB.order.find({userId:item.userId})

                        let noOfOrders = 0;
                        let BillValue = 0;
                        let averageBillValue = 0;

                      orders.map((childItem,index)=>{

                            ++noOfOrders;
                            BillValue = BillValue + childItem.subtotal;

                        })
                        object.userId = item.userId;
                        object.name = item.name; 
                        averageBillValue = parseInt(BillValue/noOfOrders);
                        object.noOfOrders = noOfOrders;
                        object.averageBillValue = averageBillValue;

                        return object;
                     

                })

                Promise.all(finalobject).then((data)=>{
                    return res.json(data);

                })
             



            }
        })
    } catch (error) {
       return  res.send({status:false, message:"Technical Erkjhoror"})

    }
}
// update  users orders

exports.updateUserOrders = async (req,res)=>{
    try {
 

       await DB.user.find().then((users)=>{
            if(!users){
                return  res.send({status:false, message:"Technical Error"})
            }else{
            

                users.map((item,index)=>{
                
                     DB.order.find({userId:item.userId}).then((orders)=>{
                        var noOfOrders = 0;
                        orders.map((item,index)=>{
                            ++noOfOrders;

                        })
                        item.NoOfOrders = noOfOrders;
                        item.save();

                     })




                })
               return res.send({success:true,message:"Successfully updated"});



            }
        })
    } catch (error) {
       return  res.send({status:false, message:"Technical error"})

    }
}
