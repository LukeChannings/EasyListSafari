# EasyList iOS 9

This is an attempt to port [EasyList](https://easylist.adblockplus.org) blocking rules to the [content blocking mechanism](https://developer.apple.com/library/prerelease/ios/releasenotes/General/WhatsNewInSafari/Articles/Safari_9.html#//apple_ref/doc/uid/TP40014305-CH9-SW9) introduced with iOS 9.

Currently about 55% of the rules have been translated (see ContentBlocker/generate.js).

Notes:

- Mobile Safari fails on URLs with non-latin characters in the if-domain trigger.
- If the JSON isn't exactly right the rules will be ignored and no errors will be given.