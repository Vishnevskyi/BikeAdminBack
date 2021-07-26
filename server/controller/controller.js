const mongoose = require("mongoose");
const config = require("../config/config.json");
const Bike = require("../models/bike");
////Connect to Mongoose/////////////////////////////
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("Db has been connected"))
    .catch((err) => console.log(`Mongo error: ${err}`))
///////////Insert Bike to DB/////////////////////////////////////////////
exports.insertBike = async (req, res) => {
    const { name, type, color, price, size, description, id } = req.body;
    const bike = new Bike({ id: id, name: name, type: type, color: color, price: price, size: size, description: description, status: "Available" })
    await bike.save((err) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: "Помилка" });
        }
        else {
            res.status(200).json({ message: "Good" })
        }
    });
}
/////////////////////Get Bikes From DB//////////////////////////
exports.getBikes = async (req, res) => {
    let AvailableBikes = 0;
    let BookedBikes = 0;
    await Bike.find(async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Помилка" })
        }
        else {
            for (let i = 0; i < result.length; i++)
            {
                if (result[i].status === "Available")
                {
                    AvailableBikes++;                    
                }
                else if (result[i].status === "Busy")
                {
                    BookedBikes++;                    
                }
            }
            res.status(200).json({ bikes: result, Total: result.length, Available: AvailableBikes, Booked: BookedBikes });
        }
    })
}
/////////////////////Delete Bike From DB//////////////////////////
exports.deleteBike = async (req,res) => {
    await Bike.deleteOne({id: req.body.id},(err)=>{
        if (err) 
        {
            console.log(err);
            res.status(500).json({message:"Помилка"})
        }
        else
        {
            res.status(200).json({message:"Успішно"})
        }
    })
}
/////////////////////Change Bike`s status//////////////////////////
exports.changeStatus = async (req,res)=>{
    await Bike.updateOne({id: req.body.id},{status: req.body.status},(err)=>{
      if (err) {console.log(err); res.status(500).json({message: "Помилка"})}
      else {res.status(200).json({message: "Успішно"})}  
    })
}