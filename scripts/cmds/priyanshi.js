.cmd install priyanshi.js module.exports = {
 config: {
 name: "priyanshi",
 version: "1.0",
 author: "Unknøwn",
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body.indexOf("priyanshi")==0 || event.body.indexOf("@Priyanshi Kaur")==0 || event.body.indexOf("Priyanshi")==0) {
 return message.reply({
 body: "𝐷𝑜𝑛'𝑡 𝐷𝑖𝑠𝑡𝑢𝑟𝑏 𝑀𝑦 𝑄𝑢𝑒𝑒𝑛 𝑃𝑟𝑖𝑦𝑎𝑛𝑠ℎ𝑖 𝐼𝑠 𝐵𝑢𝑠𝑦",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/9979yXA.gif")
 });
 }
 }
}
