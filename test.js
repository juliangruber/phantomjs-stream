var phantom = require('./');
var test = require('tape');

test('execute', function(t){
  var browser = phantom();

  browser.on('data', function(l){
    browser.kill();
    t.ok(l);
    t.end();
  });

  browser.end('console.log(window.location)');
});
