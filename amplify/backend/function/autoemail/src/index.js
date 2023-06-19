const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const AWS = require("aws-sdk");
const ses = new AWS.SES();

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "journaltable-dev";

exports.handler = async (event, context) => {
  try {
    // Retrieve data from DynamoDB
    const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
    const items = result.Items;

    const updatedItems = items.map(entry => {
      const otherItems = items.filter(e => e.email !== entry.email);
      const randomEntry = otherItems[Math.floor(Math.random() * otherItems.length)];
    
      return {
        ...entry,
        newentry: randomEntry !== undefined ? randomEntry.newentry : entry.newentry
      };
    });
    
    updatedItems.forEach(async updatedItem => {
      const { email, newentry } = updatedItem;
      await sendEmail(email, newentry);
    });

    return {
      statusCode: 200,
      body: "Emails sent successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Error sending emails",
    };
  }
};

async function sendEmail(email, newentry) {
  console.log("Sending email to", email, newentry);
  const params = {
    Source: "dev.tests.karume@gmail.com", 
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { Data: newentry },
      },
      Subject: { Data: "New Entry from Journal" },
    },
  };
  console.log(params);
  return ses.sendEmail(params).promise();
}
