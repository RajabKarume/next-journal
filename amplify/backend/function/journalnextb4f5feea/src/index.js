const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  DeleteCommand,
  ScanCommand,
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
  };

  try {
    switch (event.httpMethod) {
      case "GET":
        const result = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = result.Items;
        break;
      case "POST":
        const requestBody = JSON.parse(event.body);
        const item = {
          id: requestBody.id, // Replace with your desired ID generation logic
          email: requestBody.email,
          newentry: requestBody.newentry,
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