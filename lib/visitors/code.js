'use strict'

var lescape = require('escape-latex')

module.exports = code

var lineFeed = '\n'
var space = ' '

// Stringify code.
// Creates indented code when:
//
// - No language tag exists
// - Not in `fences: true` mode
// - A non-empty value exists
//
// Otherwise, GFM fenced code is created:
//
// ````markdown
// ```js
// foo();
// ```
// ````
//
// When in ``fence: `~` `` mode, uses tildes as fences:
//
// ```markdown
// ~~~js
// foo();
// ~~~
// ```
//
// Knows about internal fences:
//
// `````markdown
// ````markdown
// ```javascript
// foo();
// ```
// ````
// `````
function code(node, parent) {
  var self = this
  var value = node.value
  var options = self.options
  var marker = options.fence
  var info = node.lang || ''
  var fence

  if (info && node.meta) {
    info += space + node.meta
  }
  if (info == 'c++' || info == 'cpp') info = 'cppcode'

  info = self.encode(self.escape(info, node))

  // Without (needed) fences.
  if (info == 'text' || (!info && !options.fences && value)) {
    info = 'text'
  }

  // fence = repeat(marker, Math.max(streak(value, marker) + 1, 3))

  if (info != 'cppcode') return `\\begin{minted}{${info}}` + lineFeed + (value) + lineFeed + `\\end{minted}`
  else return `\\begin{cppcode}` + lineFeed + (value) + lineFeed + `\\end{cppcode}`
}
