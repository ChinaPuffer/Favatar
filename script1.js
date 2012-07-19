var data = [
    {"amount": 3, "index": 6,  "necessity": true,  "name": "shape"},
    {"amount": 3, "index": 10, "necessity": true,  "name": "eyebrows"},
    {"amount": 3, "index": 11, "necessity": true,  "name": "eyes"},
    {"amount": 3, "index": 9,  "necessity": true,  "name": "nose"},
    {"amount": 3, "index": 8,  "necessity": true,  "name": "mouth"},
    {"amount": 3, "index": 5,  "necessity": true,  "name": "ears"},
    {"amount": 6, "index": 14, "necessity": false, "name": "hair / hat"},
    {"amount": 4, "index": 13, "necessity": false, "name": "beard"},
    {"amount": 3, "index": 7,  "necessity": false, "name": "miscellanies"},
    {"amount": 4, "index": 12, "necessity": false, "name": "glasses"},
    {"amount": 3, "index": 3,  "necessity": false, "name": "necklace"},
    {"amount": 4, "index": 2,  "necessity": true,  "name": "shirt"},
    {"amount": 3, "index": 4,  "necessity": false, "name": "jacket"},
    {"amount": 6, "index": 15, "necessity": false, "name": "gadget"},
    {"amount": 9, "index": 1,  "necessity": false, "name": "background"}
];

var thumbs = [];
var layers = [];

var preview = document.getElementById('preview');
var categories = document.getElementById('categories');
var components = document.getElementById('components');

data.forEach(function(datum, idx) {
    var category = document.createElement('span');
    category.innerHTML = datum.name;
    if(idx == 0) {
        category.className = 'active';
        if(!datum.necessity) {
            var cancel = document.createElement('img');
            cancel.src = 'thumb/remove.png';
            cancel.className = 'active';
            cancel.addEventListener('click', function(e) {
                components.getElementsByClassName('active')[0].className = '';
                cancel.className = 'active';
                thumbs[idx] = -1;
                layers[idx].src = 'img/remove.png';
            }, false);
            components.appendChild(cancel);
        }
        for(var i = 0; i < datum.amount; i++) {
            (function(id) {
                var component = document.createElement('img');
                component.src = 'thumb/' + (idx + 10).toString(36) + (id + 1) + '.png';
                if(datum.necessity && id == 0) {
                    component.className = 'active';
                }
                component.addEventListener('click', function(e) {
                    components.getElementsByClassName('active')[0].className = '';
                    component.className = 'active';
                    thumbs[idx] = id;
                    layers[idx].src = 'img/' + (idx + 10).toString(36) + (id + 1) + '.png';
                }, false);
                components.appendChild(component);            
            })(i);
        }
    }
    category.addEventListener('click', function(e) {
        categories.getElementsByClassName('active')[0].className = '';
        category.className = 'active';
        components.innerHTML = '';
        if(!datum.necessity) {
            var cancel = document.createElement('img');
            cancel.src = 'thumb/remove.png';
            if(thumbs[idx] == -1) {
                cancel.className = 'active';
            }
            cancel.addEventListener('click', function(e) {
                components.getElementsByClassName('active')[0].className = '';
                cancel.className = 'active';
                thumbs[idx] = -1;
                layers[idx].src = 'img/remove.png';
            }, false);
            components.appendChild(cancel);
        }
        for(var j = 0; j < datum.amount; j++) {
            (function(id) {
                var component = document.createElement('img');
                component.src = 'thumb/' + (idx + 10).toString(36) + (id + 1) + '.png';
                if(id == thumbs[idx]) {
                    component.className = 'active';
                }
                component.addEventListener('click', function(e) {
                    components.getElementsByClassName('active')[0].className = '';
                    component.className = 'active';
                    thumbs[idx] = id;
                    layers[idx].src = 'img/' + (idx + 10).toString(36) + (id + 1) + '.png';
                }, false);
                components.appendChild(component);            
            })(j);
        }
    }, false);
    categories.appendChild(category);
    layers[idx] = document.createElement('img');
    layers[idx].style.zIndex = datum.index * 100;
    if(datum.necessity) {
        thumbs[idx] = 0;
        layers[idx].src = 'img/' + (idx + 10).toString(36) + '1.png'
    } else {
        thumbs[idx] = -1;
        layers[idx].src = 'img/remove.png'
    }
    preview.appendChild(layers[idx]);
});