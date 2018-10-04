/*
 *  Copyright © 2016-2017, RWTH Aachen University
 *  Authors: Richard Marston
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  A copy of the GNU General Public License is in the LICENSE file
 *  in the top level directory of this source tree.
 */

/*
 * Utility functions
 */

var startTag = function (name, attributes) {
  let tag = '<' + name
  for (let attr in attributes) {
    if (attributes[attr]['value'] != 'NO VALUE') {
      tag += ' ' + attributes[attr]['key'] + '=' + attributes[attr]['value']
    }
    else {
      tag += ' ' + attributes[attr]['key']
    }
  }
  return tag
}

var endTag = function (name) {
  return '</' + name + '>'
}

var depth = -1

print_with_endl_and_indent = function(front_indent, text, endl='') {
  process.stdout.write(front_indent + text + endl)
}

print_without_endl_or_indent = function(front_indent, text, endl='') {
  process.stdout.write(text)
}

var printTag = function(tag, readable=false) {
  var print_func
  if (readable) {
    print_func = print_with_endl_and_indent
  } else {
    print_func = print_without_endl_or_indent
  }
  var indent = '    '.repeat(++depth)
  var numberOfChildren = invalidOrZeroLength(tag.children) ? 0 : tag.children.length
  var emptyInside = tag.text === undefined || tag.text.length === 0
  print_func(indent, startTag(tag.name, tag.attributes))
  if (tag.name != 'div' && numberOfChildren === 0 && emptyInside) {
    print_func('', '/>', '\n')
    depth--
  } else {
    if (tag.text.length > 0) {
      print_func('', '>' + tag.text)
      print_func('', endTag(tag.name), '\n')
      indent = '    '.repeat(depth--)
    } else {
      print_func('', '>', '\n')
      for (let index in tag.children) {
        printTag(tag.children[index], readable)
      }
      indent = '    '.repeat(depth--)
      print_func(indent, endTag(tag.name), '\n')
    }
  }
}

var invalidOrZeroLength = function(array) {
  return ((array === undefined) || (array === null) || (array.length == 0))
}

var startJson = function(name, attributes) {
  let tag = name+':{'
  for (let attr in attributes) {
    tag += ' ' + attributes[attr]['key'] + '=' + attributes[attr]['value']
  }
  tag += '\n'
  return tag
}

var printTagJson = function(tag) {
  var indent = '    '.repeat(++depth)
  var numberOfChildren = invalidOrZeroLength(tag.children) ? 0 : tag.children.length
  var emptyInside = tag.text === undefined || tag.text.length === 0
  process.stderr.write(indent + startJson(tag.name, tag.attributes))
  for (let index in tag.children) {
    printTagJson(tag.children[index])
  }
  process.stderr.write(indent+'}\n')
  indent = '    '.repeat(depth--)
}

/*
 * This is the tag class that does most of the work
 */
function tag(name){
  this.attributes = []
  this.children = []
  this.text = ""
  this.name = name

  this.a = function(key, value) {
    this.attributes.push({ 'key': key, 'value': value })
    return this
  }
  this.c = function(tag) {
    this.children.push(tag)
    return this
  }
  this.t = function(words) {
    this.text = words
    return this
  }
}
var makeFileMenu = function (links) {
  let menu = new tag('div')
  menu.a('id', '"menu"').a('class', '"invisible"')
  links.forEach((link)=>{
    let div = new tag('div').a('id', link['name'])
    let a = new tag('a').t(link['text']).a('href', '"#"').a('class', '"button"').a('type', '"file"').a('onclick', link['action'])
    div.c(a)
    menu.c(div)
  });
  return menu;
}
var makeAccordionDiv = function(id, action) {
  return new tag('div').a('id', '"'+id+'"').c(new tag('div').a('id', '"'+id+'-accordion"').t(" "))
}
/*
 * global html tag
 */
var html = new tag('html')
var head = new tag('head')

head.c(new tag('title').t('Pintura'))
head.c(new tag('link').a('rel', '"stylesheet"').a('href', '"css/svg.css"'))
head.c(new tag('link').a('rel', '"stylesheet"').a('href', '"css/layout.css"'))
head.c(new tag('link').a('rel', '"stylesheet"').a('href', '"css/colours.css"'))
head.c(new tag('link').a('rel', '"stylesheet"').
                       a('href', '"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"').
                       a('crossorigin', '"anonymous"').
                       a('type', '"text/css"').t(" "))
head.c(new tag('link').a('rel', '"apple-touch-icon"').a('sizes', '"180x180"').a('href', '"/images/apple-touch-icon.png"'))
head.c(new tag('link').a('rel', '"icon"').a('type', '"image/png"').a('sizes', '"32x32"').a('href', '"/images/favicon-32x32.png"'))
head.c(new tag('link').a('rel', '"icon"').a('type', '"image/png"').a('sizes', '"16x16"').a('href', '"/images/favicon-16x16.png"'))
head.c(new tag('link').a('rel', '"manifest"').a('href', '"/images/site.webmanifest"'))
head.c(new tag('link').a('rel', '"mask-icon"').a('href', '"/images/safari-pinned-tab.svg"').a('color', '"#5bbad5"'))
head.c(new tag('link').a('rel', '"shortcut icon"').a('href', '"/images/favicon.ico"'))
head.c(new tag('meta').a('nam', '"msapplication-TileColor"').a('content', '"#da532c"'))
head.c(new tag('meta').a('nam', '"msapplication-config"').a('content', '"/images/browserconfig.xml"'))
head.c(new tag('meta').a('nam', '"theme-color"').a('content', '"#ffffff"'))

var body = new tag('body')

const MenuLinks = [
    {
        'text':   'File',
        'name':   '"filemenu"',
        'action': 'currentCimsvg().populateFileLinks()',
        'type':   '"hidden"'
    },
    {
        'text':   'Diagrams',
        'name':   '"diagrammenu"',
        'action': 'currentCimsvg().populateDiagramLinks()',
        'type':   '"hidden"'
    },
    {
        'text':   'x',
        'name':   '"closemenu"',
        'action': 'currentCimsvg().hideMainMenu()',
        'type':   '"hidden"'
    }
];

var svg = new tag('svg').a('id', '"svg"').
	          a('xmlns', '"http://www.w3.org/2000/svg"').
	          a('xmlns:xlink','"http://www.w3.org/1999/xlink"').
	          c(new tag('rect').
                      a('class', '"backing"').
                      a('onclick', '"currentCimsvg().checkComponentReadyToAdd(evt)"')).
	          c(new tag('g').a('class', '"grid"')).
	          c(new tag('g').a('class', '"diagrams"'))

var radio_input = function(onchange, name, id, text, checked=false) {
    var input = new tag('input').
	              a('type', '"radio"').
                      a('onchange', onchange).
                      a('name', name).
                      a('id', id)

    var label = new tag('label').
	              a('class', '"dark-font panel-button"').
	              a('for', id).t(text)

    if (checked) {
        input.a('checked', 'NO VALUE')
    }

    return new tag('a').c(input).c(label)
};

var floating_panel_header = function(floating_panel_id, close_button_action, component_add_action) {
    let header = new tag('div').
	                   a('class', '"wide-row list-title"').
	                   c(new tag('span').
                               a('id', '"' + floating_panel_id + '-component-name"').
                               a('class', '"floating-panel-title button row-left"').
                               t("title goes here")).
                       c(spacer()).
                       c(new tag('span').
                               a('class', '"button row-right panel-button"').
                               a('onclick', close_button_action).
                               t("<b>&times;</b>"))
    if (component_add_action !== undefined) {
        header.c(new tag('span').
                       a('class', '"button row-right panel-button"').
                       a('onclick', component_add_action).
                       t("<b>&plus;</b>"))
    }
    return header;
};

var diagram = new tag('div').a('id', '"diagram-display"').a('class', '"row-right"').c(svg)

var contextmenu = new tag('nav').
                      a('id', '"context-menu"').
                      a('class', '"context-menu"').
                      a('onmouseup', '"onBodyMouseUp()"').
                      c(new tag('ul').
                          a('class', '"context-menu-items"').
                          c(new tag('li').
                              a('class', '"context-menu-item"').
                              c(new tag('a').
                                  a('class').a('onclick', '"currentCimsvg().getContextMenu().removeComponent()"').
                                  t("Delete Component"))))

var main = new tag('div').a('id', '"main"')
var cornerSwitches = new tag('div').a('id', '"corner-switches"')
var columnPanels = new tag('div').a('id', '"column-panels"')

const CornerButtons = [
    {
        'name':     '"barmenu-switch"',
        'position': 'topleft',
        'action':   '"currentCimsvg().toggleMainMenuVisible();"',
        'icon':     '"fa fa-bars"',
    },
    {
        'name':     '"all-components-switch"',
        'position': 'bottomright',
        'action':   '"currentCimsvg().populateAllComponents();"',
        'icon':     '"fa fa-gears"',
    },
    {
        'name':     '"diagram-components-switch"',
        'position': 'bottomleft',
        'action':   '"currentCimsvg().populateDiagramLinks();"',
        'icon':     '"fa fa-cubes"',
    }
];

var make_corner_menu = function(cb) {
    return new tag('span').a('id', cb.name).
                         a('class', '"switch button row-right ' + cb.position + '"').
                         a('onclick', cb.action).
                         c(new tag('span').a('class', cb.icon).t(" "))
}

const ColumnPanels = [
    {
        'name':     'diagrams-panel',
    },
    {
        'name':     'components-panel',
    },
    {
        'name':     'attributes-panel',
    },
    {
        'name':     'raw-components-panel',
    },
];

var make_column_panel = function(cp) {
    let listTag = new tag('div').a('class', '"floating-menu-list"').t(" ")
    let panelTag = new tag('div').
	                     a('class', '"' + cp.name + '"').
                         c(new tag('div').a('class', '"floating-panel-table invisible"').
                         c(spacer()).
                         c(listTag))
    return panelTag;
}

var spacer  = function() {
    return new tag('div').a('class', '"spacer"');
}
var makeMainMenu = function() {
    let header = makeFileMenu(MenuLinks);
    let listTag = new tag('div').a('class', '"floating-menu-list"').t(" ")
    let panelTag = new tag('div').
	           a('id', '"main-menu"').
               a('class', '"row-left dialog-over-diagram"').
               c(new tag('div').a('class', '"header-panel invisible"').
                       c(header).c(listTag)
                )
    return panelTag;
}

main.c(contextmenu).c(diagram).c(cornerSwitches).c(makeMainMenu()).c(spacer().a('order', '"1"')).c(columnPanels);

body.c(main)
body.c(new tag('script').a('type', '"text/javascript"').a('src', '"html/libcimsvg.js"').t(" "))
body.c(new tag('script').a('type', '"text/javascript"').a('src', '"index.js"').t(" "))
html.c(head)
html.c(body)

ColumnPanels.forEach((cp)=>{
    let columnPanel = make_column_panel(cp)
    columnPanels.c(columnPanel);
});

CornerButtons.forEach((cb)=>{
    let cornerButton = make_corner_menu(cb);
    cornerSwitches.c(cornerButton);
});

console.log(`<!--
    Copyright © 2016-2017, RWTH Aachen University
    Authors: Richard Marston

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    A copy of the GNU General Public License is in the LICENSE file
    in the top level directory of this source tree.
-->
<!DOCTYPE HTML>
<meta charset="utf-8"/>`)
//printTagJson(html)
if (process.argv[2] == 'debug') {
    printTag(html, true)
}
else {
    printTag(html)
}
