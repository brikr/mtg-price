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


def card(event, context):
    cards = json.load(open('cards.json'))
    search = event['pathParameters']['name']

    matches = dict((k, v) for k, v in cards.items() if k.lower().startswith(search.lower()))

    table = boto3.resource('dynamodb').Table('mtg_price_cards')

    results = list()

    for name, sets in matches.iteritems():
        response = table.query(
            KeyConditionExpression=Key('name').eq(name)
        )
        results.extend(response[u'Items'])

    body = {
        'error': False,
        'cached': results,
        'matches': matches,
        'event': event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, cls=DecimalEncoder)
    }

    return response
