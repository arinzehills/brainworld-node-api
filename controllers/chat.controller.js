const Chat = require("../models/chat.model");

const sendMessage = async (
  { sendersid, receiverEmail, senderEmail, messageText },
  chatID
) => {
  // console.log("message Successfully", data.messageText);
  // console.log(receiverEmail);
  new Chat({
    sendersid: sendersid,
    sendersEmail: senderEmail,
    receiverEmail: receiverEmail,
    messageText: messageText,
    chatID: chatID,
  }).save();
};
module.exports = sendMessage;
