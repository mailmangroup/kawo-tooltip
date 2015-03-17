kawoTooltip
===========
[![kawo-tooltip version](https://img.shields.io/badge/kawo--tooltip-v1.0.3-brightgreen.svg)](https://github.com/mailmangroup/kawo-tooltip/) [![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)


We wanted a super simple, zero config options, declarative tooltip library with no dependencies. We couldn't find one, so we wrote our own.

# Installation

Just use bower to install.
```bash
$ bower install kawo-tooltip
```

### RequireJS
```javascript
require.config({
	paths: {
		kawoTooltip: '../bower_components/kawo-tooltip/dist/kawo-tooltip.min'
	}
});

require( [ 'kawoTooltip' ], function() {

});
```

### Basic Script Include
```html
<script src="./bower-components/kawo-tooltip/dist/kawo-tooltip.min.js"></script>
```


# Usage

Simply add the attribute `data-tooltip` to any element on which you wish to display a tooltip.
```html
<p data-tooltip="Text to display">This tooltip works on almost any HTML element.</p>
```


# Build Your Own

If you want to customise **kawo-tooltip** you can build your own minified version using `uglifyjs`.
```bash
$ uglifyjs kawo-tooltip.js -c -m -o dist/kawo-tooltip.min.js
```






