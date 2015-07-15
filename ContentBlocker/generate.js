#!/usr/bin/env node

var fs = require('fs')

var adlist = fs.readFileSync('./adlist.txt', 'utf-8');

var rules = [], unused = [];

adlist.split('\n').forEach(function addRule(RULE) {

	// skip comments and rules with non-latin characters (Safari can't handle it ATM.)
	if ( RULE.charAt(0) === '!' || /[^\u0000-\u007F]+/.test(RULE) ) {
		return;

	// selector block
	} else if ( RULE.indexOf('##') === 0 ) {
		var selector = RULE.slice(2);
		rules.push({
			"action": {
				"selector": selector,
				"type": "css-display-none"
			},
			"trigger": {
				"url-filter": ".*"
			}
		})
	} else if ( ~ RULE.indexOf('#@#') || RULE.indexOf('##') !== 0 && RULE.indexOf('##') !== -1 ) {

		var _RULE = ~ RULE.indexOf('#@#') ? RULE.split('#@#') : RULE.split('##')
		  , domains = _RULE[0].split(',')
		  , selector = _RULE[1];

		rules.push({
			"action": {
				"selector": selector,
				"type": "css-display-none"
			},
			"trigger": {
				"if-domain": normalizeDomains(domains),
				"url-filter": ".*"
			}
		})
	} else {
		unused.push(RULE)
	}

})

function normalizeDomains(domains) {
	return (
		domains
			.map(function(domain) { return domain.indexOf('www.') !== 0 ? ['www.' + domain, domain] : [domain] })
			.reduce(function(a, b) { return a.concat(b) })
	);
}

console.log(rules.length + ' rules out of ' + (unused.length + rules.length) + ' used. ' + unused.length + ' unused.')

fs.writeFileSync('blockerList.json', JSON.stringify(rules, null, '  '));