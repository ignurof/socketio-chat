// Mongoose
// Create instance of account model
const Account = require("./models/account.js");

const FindUserByID = async(databaseObjectID) => {
    let user = await Account.findOne({ _id: databaseObjectID });
    if(user == null) return console.error("COULD NOT FIND USER BY ID");
    return user;
}

module.exports = {
    FindUserByID
};