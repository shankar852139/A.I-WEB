const axios = require('axios');

module.exports = {
  config: {
    name: "sd3",
    aliases: [""],
    version: "1.1",
    author: "Priyanshi Kaur",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: 'Image Prompt'
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("❓| Please provide a prompt.");
    }

    let prompt = text;
    // Remove cookie

    message.reply(`✅| Creating your Imagination...`, async (err, info) => {
      let ui = info.messageID;
      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      try {
        const response = await axios.post(`https://samirxpikachu.onrender.com/stablediffusion`, { prompt: prompt }, {
          responseType: 'arraybuffer'
        });
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        const images = [];
        for (let i = 0; i < 4; i++) {
          const imageBuffer = response.data[i];
          images.push(new Buffer(imageBuffer, 'binary').toString('base64'));
        }
        message.unsend(ui);
        message.reply({
          body: `🖼 [𝗕𝗜𝗡𝗚] \n━━━━━━━━━━━━\n\nPlease reply with the image number (1, 2, 3, 4) to get the corresponding image in high resolution.`,
          attachment: images.map(img => `data:image/png;base64,${img}`)
        }, async (err, info) => {
          if (err) return console.error(err);
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            imageBuffers: images.map(img => Buffer.from(img, 'base64'))
          });
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Error: ${error}`, event.threadID);
      }
    });
  },

  onReply: async function ({ api, event, Reply, args, message }) {
    const reply = parseInt(args[0]);
    const { author, imageBuffers } = Reply;
    if (event.senderID !== author) return;
    try {
      if (reply >= 1 && reply <= 4) {
        const imgBuffer = imageBuffers[reply - 1];
        message.reply({ attachment: `data:image/png;base64,${imgBuffer.toString('base64')}` });
      } else {
        message.reply("Invalid image number. Please reply with a number between 1 and 4.");
        return;
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`Error: ${error}`, event.threadID);
    }
    message.unsend(Reply.messageID); 
  },
};