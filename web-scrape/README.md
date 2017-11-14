# Camunda with Jsoup

Installs Camunda with `deployment-aware = false` and with Jsoup (jsoup.org).
Use Jsoup to perform HTTP requests:


Nashorn Javascript usage.  Example usage inside of a Script Implementation in a Camunda task/event/listener/input/output
```javascript
with (new JavaImporter(org.jsoup))
{

  // var body = {
  //   "myKey1": "myValue1",
  //   "myKey2": "myValue2",
  //   "myKey3": {
  //     "internal1":"internalV1",
  //     "internal2":"internalV2"
  //     },
  //   "myKey4": [
  //     1,2,3,4,5
  //     ]
  // }

  var doc = Jsoup.connect('http://date.jsontest.com')
                  .method(Java.type('org.jsoup.Connection.Method').GET)
                  // .method(Java.type('org.jsoup.Connection.Method').POST)
                  .header('Accept', 'application/json')
                  .header('Content-Type', 'application/json')
                  // .data('filterABC', 'subgroup1')
                  // .requestBody(JSON.stringify(body))
                  .timeout(30000)
                  .ignoreContentType(true) // This is used because Jsoup "approved" content-types parsing is enabled by default by Jsoup
                  .execute()

  var resBody = doc.body()
  var resStatusCode = doc.statusCode()
  var resStatusMessage = doc.statusMessage()
  var resContentType = doc.contentType()
  var resCharSet = doc.charset()

}

function spinify(body)
{
  var parsed = JSON.parse(body)
  var stringified = JSON.stringify(parsed)
  var spin = S(stringified)
  return spin
}

execution.setVariable('responseBodyString', spinify(resBody))
```

See: https://forum.camunda.org/t/replacing-http-connector-with-jsoup-usage/5291 for more details

# Install

To install run: `docker-compose up -d`


# Web Scape usage

```javascript
function getUrlAsXhtmlString(url)
{
  with (new JavaImporter(org.jsoup))
  {
    var doc = Jsoup.connect(url).get();
    doc.outputSettings().syntax(Java.type("org.jsoup.nodes.Document.OutputSettings.Syntax").xml);
    doc.outputSettings().charset('UTF-8');

    var docString = doc.html();

    return docString;
  }
}

function generateSpinVariables(xHtmlString)
{
  var htmlSpin = S(xHtmlString);
  return htmlSpin;
}

function scrape(url)
{
  var xHtmlString = getUrlAsXhtmlString(url);
  return generateSpinVariables(xHtmlString);
}

var xhtml = scrape('http://myurl');

var links = xhtml.xPath('//main//ul/li/a/@href').attributeList();
```
