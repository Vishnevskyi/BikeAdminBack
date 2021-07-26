const {Schema, model} = require("mongoose");
const schema = new Schema({
    id: {type: Number, required: true, unique: true},
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    status: {type: String, required: true}
})
module.exports = model("Bikes", schema);