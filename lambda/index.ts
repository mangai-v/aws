import { APIGatewayProxyHandler } from 'aws-lambda';
 
export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Request event:', event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' }),
  };
};