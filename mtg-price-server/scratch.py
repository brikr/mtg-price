#!/usr/bin/env python

# for testing DynamoDB interactions in Python

import boto3
import decimal
from boto3.dynamodb.conditions import Key, Attr

table = boto3.resource('dynamodb').Table('mtg_price_cards')

search = 'Tarmo'

response = table.scan(
    FilterExpression=Key('name').begins_with(search)
)

print(response)

response = table.put_item(
    Item={
        'name': 'Tarmogoyf',
        'set': 'FUT',
        'paper': decimal.Decimal('169.99'),
        'online': decimal.Decimal('100.40'),
        'time': 1489170621
    }
)

print(response)
