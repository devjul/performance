Simple Performance Class Javascript
======

# Author
devjul - https://www.twitter.com/devjul

# Usage
## Script arguments

1. typeMarker, console or html call
2. moreParams, object with additional infos for html call

## JavaScript

```javascript
<script type="/path/performance.js"></script>
<script>
'use strict';

var performance = new Performance();
performance.run();
</script>
```

## RequireJS

```javascript
<script>
define(['path/performance'],
	function(Performance) {
        'use strict';
        var performance = new Performance();
        performance.run();
    }
);
</script>
```    