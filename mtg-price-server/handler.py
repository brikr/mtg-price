import boto3
import decimal
import json
import random
import time
from boto3.dynamodb.conditions import Key, Attr

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def now():
    return decimal.Decimal(time.time())


def update(card):
    card['time'] = now()
    card['paper'] = decimal.Decimal(random.randrange(1, 100))
    card['online'] = decimal.Decimal(random.randrange(1, 100))
    return card


def query(event, context):
    search = event['pathParameters']['name']
    cards = json.load(open('cards.json'))

    matches = dict((k, v) for k, v in cards.items() if k.lower().startswith(search.lower()))

    table = boto3.resource('dynamodb').Table('mtg_price_cards')

    results = list()
    ts = now()

    for name, sets in matches.iteritems():
        response = table.query(
            KeyConditionExpression=Key('name').eq(name)
        )

        # cache hits
        for i in response[u'Items']:
            if ts - i['time'] < 120: # less than two minutes old
                sets.remove(i['set'])
                results.append(i)
            else: # stale
                sets.remove(i['set'])
                fresh = update(i)
                table.put_item(Item=fresh) # update table
                results.append(fresh)

        # not in cache
        for s in sets:
            fresh = update({ 'name': name, 'set': s })
            table.put_item(Item=fresh)
            results.append(fresh)

    body = {
        'error': False,
        'matches': results,
        'event': event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, cls=DecimalEncoder)
    }

    return response
