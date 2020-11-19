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
        elementName: 'button',
        attributes: {
            style: {
                padding: '10px'
            },
            onclick: () => {
                count++;
                var newTree = render(count)
                var patches = diff(tree, newTree)
                rootNode = patch(rootNode, patches)
                tree = newTree
            }
        },
        children: ['count: ', String(count)]
    })
}

document.body.innerHTML = ''

tree = render(count)            
rootNode = createElement(tree)
document.body.appendChild(rootNode)

act(() => {
    count++
    var newTree = render(count)
    var patches = diff(tree, newTree)
    rootNode = patch(rootNode, patches)
    tree = newTree
})
