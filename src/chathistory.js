// [{"user": "", "msg": ""}]
let chatHistory = [];

const GetChatHistory = () => {
    return chatHistory;
}

const AddMessage = (user, msg) => {
    let chatObj = {
        user,
        msg
    };
    chatHistory.push(chatObj);
    // Implement serverside logging
    console.log(chatHistory);
}

module.exports = {
    GetChatHistory,
    AddMessage
};