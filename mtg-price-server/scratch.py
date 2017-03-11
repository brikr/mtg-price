#!/usr/bin/env python

# for testing DynamoDB interactions in Python

import boto3
import decimal
import json
from boto3.dynamodb.conditions import Key, Attr

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

search = 'tar'

cards = json.load(open('cards.json'))
matches = dict((k, v) for k, v in cards.items() if k.lower().startswith(search.lower()))

print(matches)

table = boto3.resource('dynamodb').Table('mtg_price_cards')

results = list()

for name, sets in matches.iteritems():
    response = table.query(
        KeyConditionExpression=Key('name').eq(name)
    )
    results.extend(response[u'Items'])

print(json.dumps(results, cls=DecimalEncoder))

# response = table.put_item(
#     Item={
#         'name': 'Tarmogoyf',
#         'set': 'MM3',
#         'paper': decimal.Decimal('96.99'),
#         'online': decimal.Decimal('70.40'),
#         'time': 1489170621
#     }
# )
