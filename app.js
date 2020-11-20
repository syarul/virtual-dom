var h = require('./h');
var diff = require('./diff');
var patch = require('./patch');
var createElement = require('./create-element');

var count = 0
var tree
var rootNode

var hooks = []

var act = run => {
    hooks.push(run)
}

function render(count) {
    return h({
        elementName: 'div',
        attributes: {},
        children: [{
            elementName: 'span',
            attributes: {
                className: {
                    0: 'so',
                    1: 'stonk'
                },
                style: {
                    fontStyle: 'italic'
                }
            },
            children: ['this is italic style']
        }, {
            elementName: 'button',
            attributes: {
                className: ['foo', 'bar'],
                style: {
                    padding: '10px'
                },
                onclick: () => {
                    count++;
                    var newTree = render(count)
                    var patches = diff(tree, newTree)
                    console.log(patches)
                    patch(rootNode, patches)
                    tree = newTree
                }
            },
            children: ['count: ', String(count)]
        }]
    })
}

// document.getElementsById('app').innerHTML = ''

tree = render(count)            
rootNode = createElement(tree)
document.getElementById('app').appendChild(rootNode)

act(() => {
    count++
    var newTree = render(count)
    var patches = diff(tree, newTree)
    rootNode = patch(rootNode, patches)
    tree = newTree
})
