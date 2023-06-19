const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  DeleteCommand,
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
    switch (event.httpMethod) {
      case "GET":
        const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = result.Items;
        break;
      case "POST":
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
        break;
      case "DELETE":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.httpMethod} ${event.resource}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
