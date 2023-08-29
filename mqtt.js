const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
  keyPath: '/home/drashti/MQTT/0ff0fdb64ea3cf09a6379cf3e9546941756ce3ba9ab3aaeb2c26ddd41db7a9be-private.pem.key',
  certPath: '/home/drashti/MQTT/0ff0fdb64ea3cf09a6379cf3e9546941756ce3ba9ab3aaeb2c26ddd41db7a9be-certificate.pem.crt',
  caPath: '/home/drashti/MQTT/AmazonRootCA1.pem',
  clientId: 'light-source',
  host: 'a987ew7legg0z-ats.iot.ap-south-1.amazonaws.com',
});

device.on('connect', () => {
  console.log('Connected to AWS IoT');
  // device.publish('light-status', JSON.stringify({ status: 'on' }));
  device.subscribe('light-status');
  
});

device.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
});

device.on('error', (error) => {
  console.error('Error:', error);
});