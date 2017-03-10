import json

def card(event, context):
    search = event['pathParameters']['name']

    response = table.scan(
        FilterExpression=Key('name').begins_with(search)
    )

    body = {
        'error': false,
        'matches': response[u'Items']
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
