var phantom = require('./');
var test = require('tape');
var concat = require('concat-stream');

test('execute', function(t){
  var browser = phantom();

  browser.on('data', function(l){
    browser.kill();
    t.ok(l);
    t.end();
  });

  browser.end('console.log(window.location)');
});

test('exit event', function(t){
  var browser = phantom();

  browser.on('exit', function(code){
    t.equal(code, 0);
    t.end();
  });

  browser.end('phantom.exit()');
});

test('uncaught error', function(t){
  var browser = phantom();

  browser.pipe(concat(function(data){
    var out = data.toString();
    t.ok(out.indexOf('Error') > -1);
    t.ok(out.indexOf('foo') > -1);
    t.ok(out.indexOf('bar') > -1);
    t.ok(out.indexOf(':1') > -1);
    t.end();
  }));

  browser.write('setTimeout(phantom.exit);');
  browser.end('(function foo(){throw new Error(\'bar\')})()');
});
