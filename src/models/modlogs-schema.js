
  const mongoose = require("mongoose");

const logschema = mongoose.Schema({
  GuildID: String,
  ChannelID: String,
});

module.exports = mongoose.model("channelmodels", logschema);



