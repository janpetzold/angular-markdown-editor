angular-markdown-editor
=======================

A simple markdown editor with an instant preview and HTML code view. The idea was to have a very simple webapp with two views where the [Markdown](http://daringfireball.net/projects/markdown/) is entered on the left-hand side and the HTML output is instantly rendered on the right-hand side. So everybody can easily learn Markdown!

You can use the build of this project online at

<http://janpetzold.github.io/angular-markdown-editor>

Features:

* simple, responsive layout
* full [Markdown](http://daringfireball.net/projects/markdown/) support
* integrated syntax help that showing the most important formatting options
* HTML code output so you can export the generated HTML
* there is a resize button to dynamically adjust the width of both views

The sourcecode is very compact, I made use of [Angular directives](http://docs.angularjs.org/guide/directive) and the fabulous [showdown library](https://github.com/coreyti/showdown)  to convert between Markdown and HTML. Also, [zepto.js](http://zeptojs.com/) is used for the DOM manipulation.

I tested this in Chrome and Firefox. I kept the implementation very basic, basically all input is converted after every keypress. Even with bigger documents this never took more than 30ms on my machine, so I didn't notice it. Your mileage may vary.

Wishlist:

* It would be great to integrate PDF export. I looked at [jsPDF](https://github.com/MrRio/jsPDF), but that doesn't support hyperlinks and images. Maybe doxument would be an option.
* Integration of [WebWorkers](https://developer.mozilla.org/de/docs/Web/Guide/Performance/Using_web_workers) would be helpful to decouple the HTML conversion from everything else
* Integration of [localStorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage) to add simple load/save functionality