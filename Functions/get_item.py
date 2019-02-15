import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    workshop_table = dynamodb.Table('workshop-table')
    
    id = event['pathParameters']['id']

    response = workshop_table.get_item(
        Key={
            'id': id
        }
    )
    
    if 'Item' in response:
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item'])
        }
        
    return {
        'statusCode': 404,
        'body': json.dumps('Not found')
    }

