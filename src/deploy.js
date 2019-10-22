const CoreStackSDK = require('core-stack-sdk');

const produce = async broker => {
  try {
    const producer = await broker.producer();

    try {
      const tx = await producer.send({
        chainId: '4',
        call: {
          contract: 'Counter',
          method: 'constructor()',
        },
        gas: 2000000,
        from: '0x7e654d251da770a068413677967f6d3ea2fea9e4',
      });
      console.log('Message sent: ', tx);
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }
};

const consume = async broker => {
  try {
    const consumer = await broker.consumer();

    const consume = consumer.consume();

    consume.on('message', message => {
      console.log('Message consumed: ', message);
    });
    
    consume.on('error', error => {
      console.error(error);
    });
    
    consume.on('offsetOutOfRange', error => {
      console.error(error);
    });
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  try {
    const CoreStack = new CoreStackSDK();
    const broker = CoreStack.broker('localhost:9092');

    consume(broker);
    produce(broker);
  } catch (e) {
    console.error(e);
  }
})();