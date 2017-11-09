var casper = require('casper').create({
    waitTimeout: 60000
});
var server = require('webserver').create();
// use this line to get all the games from sanzar
//var matchSelector = '#fixturesAndResults';
// use this line to get the results from sanzar
//var matchSelector = '.results';
// use this line to get the match details from sanzar
var matchSelector = '#matchCentre';
var body = {};

console.log('running');

server.listen('127.0.0.1:9000', function(request, response) {
    var url = request.url.substr(request.url.indexOf('=') + 1);

    console.log('scraping: ' + url);

    casper.start(url).wait(5000).waitForSelector(matchSelector, function() {
        body = this.getElementsInfo(matchSelector);
    });

    casper.run(function() {
        response.statusCode = 200;
        response.write(JSON.stringify(body, null, null));
        response.close();
        console.log('scraping done');
        body = {};
    });
});