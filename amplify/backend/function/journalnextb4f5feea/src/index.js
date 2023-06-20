const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "journaltable-dev";

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, DELETE",
  };

  try {
    const { id, email, newentry } = JSON.parse(event.body).formdata;
    const item = {
      id,
      email,
      newentry,
    };
    
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: item,
      })
    );

    body = item;
    statusCode = 201; // Created
    }catch (err) {
      statusCode = 400;
      body = err.message;
    }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
