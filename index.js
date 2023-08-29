const AWS = require('aws-sdk');
const mqtt = require('mqtt');

const iot = new AWS.Iot();
const clientId = 'light-source'; 
const topic = 'light-status';

exports.handler = async (event) => {
  const { lightStatus } = JSON.parse(event.body);

  const params = {
    thingName: clientId,
  };

  const iotData = new AWS.IotData({ endpoint: process.env.IOT_ENDPOINT });

  const payload = JSON.stringify({
    lightStatus
  });

  const publishParams = {
    topic,
    payload,
    qos: 1,
  };

  try {
    const publishResponse = await iotData.publish(publishParams).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: `Light status set to ${lightStatus}` }),
    };
    return response;
  } catch (error) {
    console.error('Error:', error);

    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error changing light status' }),
    };
    return response;
  }
};
