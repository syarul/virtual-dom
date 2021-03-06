'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    if(tag === 'Locomotor.Fragment') {
        return 'locomotor-fragment'
    }

    if (tag === 'Locomotor.Provider') {
        return 'locomotor-provider'
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes = [], part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            if(Array.isArray(props.className)){
                classes = classes.concat(props.className);
            } else if(typeof props.className === 'object'){
                for(var attr in props.className) {
                    classes.push(props.className[attr]);
                }
            } else {
                classes.push(props.className);
            }
        }

        if(classes.length > 0){
            props.className = classes.join(' ') ;
        }

    }

    return props.namespace ? tagName : tagName.toUpperCase();
}
