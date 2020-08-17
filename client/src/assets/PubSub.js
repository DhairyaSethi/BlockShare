const PubNub = require('pubnub')

const credentials = {
    publishKey:  'pub-c-cbb2d2e8-4a99-4290-b715-4a0631800f0b',
    subscribeKey: 'sub-c-30a49234-d2eb-11ea-9485-d6b39d8ad52f',
    secretKey: 'sec-c-ZmJhMTVlYjMtYWY2NC00YjFlLWI5ODctNDc5YmJlYzVjMmZm'
};

class PubSub {
  constructor(channel) {

    this.lastMessage = ""

    this.pubnub = new PubNub(credentials)
    this.pubnub.subscribe({ channel: channel})
    this.pubnub.addListener(this.listener())

  }

  sendMessage(senderId, message, channel) {

    const message_block = {
      sender: senderId,
      contents: message
    }
    this.publish({
      channel: channel,
      message: JSON.stringify(message_block)
    });
    
  }

  subscribeToChannel(channel) {
    var channels = [channel]

    this.pubnub.subscribe({
      channels: channels
    });
  }

  listener() {

    return {
      message: messageObject => {
        const { channel, message } = messageObject;
        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        const parsedMessage = JSON.parse(message);
        this.lastMessage = parsedMessage
      }
    }
  }

  publish({ channel, message }) {
    this.pubnub.publish({ message, channel });
  }

 
}

module.exports = PubSub;