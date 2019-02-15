import json
import boto3



def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    workshop_table = dynamodb.Table('workshop-table')
    
    response = workshop_table.scan()
    
    return response['Items']