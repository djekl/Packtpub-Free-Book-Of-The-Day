var username = "user@example.com";
var password = "password";

// ------------------------------------------------------------

var casper = require('casper').create({
    clientScripts: [],
    pageSettings: {
        javascriptEnabled: true,
        loadImages: false,
        loadPlugins: false,
        localToRemoteUrlAccessEnabled: true,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5)",
        userName: null,
        password: null,
        XSSAuditingEnabled: false,
    },
    verbose: true,
    logLevel: "debug",
});
var fs = require('fs');
var utils = require('utils');
var url, html, latest_book, json_book;

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on('error', function(msg, backtrace) {
    this.echo("=========================");
    this.echo("ERROR:");
    this.echo(msg);
    this.echo(backtrace);
    this.echo("=========================");
});

casper.on("page.error", function(msg, backtrace) {
    this.echo("=========================");
    this.echo("PAGE.ERROR:");
    this.echo(msg);
    this.echo(backtrace);
    this.echo("=========================");
});

casper.on('resource.requested', function(requestData, request) {
    if ((/http(s?):\/\/.+?.css/gi).test(requestData['url']) || requestData['Content-Type'] == 'text/css') {
        request.abort();
    }
});

casper.start('https://www.packtpub.com', function() {
    this.evaluate(function() {
        $('#account-bar-form').show();
        $('#account-bar-form-login').show();
    });
});

casper.then(function() {
    this.fill('#packt-user-login-form', {
        email: username,
        password: password,
    }, true);
});

casper.thenOpen('https://www.packtpub.com/packt/offers/free-learning', function() {
    url = this.evaluate(function() {
        return 'https://www.packtpub.com' + $(".free-ebook a").attr('href');
    });

    casper.thenOpen(url);
});

casper.run();

