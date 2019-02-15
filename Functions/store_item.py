

import json
import boto3 
import uuid


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    workshop_table = dynamodb.Table('workshop-table')
    
    item = event
    item['id'] = str(uuid.uuid4())
    
    workshop_table.put_item(Item=item)
    
    return event