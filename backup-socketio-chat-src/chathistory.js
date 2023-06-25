// [{"user": "", "msg": ""}]
let chatHistory = [];

const GetChatHistory = () => {
    return chatHistory;
}

const AddMessage = (user, msg, rows) => {
    let chatObj = {
        user,
        msg,
        rows
    };
    chatHistory.push(chatObj);
    // Implement serverside logging
    console.log(chatHistory);
}

module.exports = {
    GetChatHistory,
    AddMessage
};