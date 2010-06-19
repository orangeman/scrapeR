// Add an expand/collapse link and collapse by default
// with JavaSript disabled, user will see all

function changeText(el, newText) {
    // Safari work around
    if (el.innerText)
        el.innerText = newText;
    else if (el.firstChild && el.firstChild.nodeValue)
        el.firstChild.nodeValue = newText;
}
// zusammengeh. Ergänzungen: <tbody id="b[1...]">...
// dazugeh. Haupteintrag: <tbody id="h[1...]">...
// initial_state == 1: collapsed

function rt(tableId, initial_state, showText, hideText, showAllText, hideAllText, pics_dir) {
    if (! document.createElement) {     // bad browser
        return false;
    }
    var box = document.getElementById(tableId);
    if (!box) return false;

    var i;
    var th;
    var found = 0;
    for (i = 1; th = document.getElementById('h' + i); i++) {
        var tb = document.getElementById('b' + i);
        if (!tb) continue;
        found++;
        var tr = th.getElementsByTagName('tr')[0];
        if (!tr) continue;

        var td1 = tr.getElementsByTagName('td')[0];
        if (! td1) continue;
        var td = document.createElement('td');

        var a = document.createElement('a');
        a.href = '#' + i;
        a.id = 'l' + i;
        a.onclick = function() { t(this.id.substr(1), 0, showText, hideText, pics_dir); return false;} ;
        var img = document.createElement('img');
        if (initial_state == 1) {
            img.src = pics_dir + '/open.png';
            img.title = showText;
        } else {
            img.src = pics_dir + '/close.png';
            img.title = hideText;
        }
        img.border = 0;
        img.id = 'i' + i; 
        a.appendChild(img);
        td1.insertBefore(a,td1.firstChild);
        // td.appendChild(a);
        // tr.insertBefore(td,tr.firstChild);
    }
    max = i;
    if (found > 0) {
        // collapse all: 
        var thead = box.getElementsByTagName('thead')[0];
        if (! thead) return;
        var tr = thead.getElementsByTagName('tr')[0];
        if (! tr) return;

        var td1 = tr.getElementsByTagName('td')[0];
        if (!td1) return;
        
        var link = document.createElement('a');
        link.href = '#';
        link.onclick = function() {
            var i = 1;
            var im = this.firstChild;
            if (box.className == 'collapsed') { // show all
                for (i = 1; i < max; i++) { t(i, 1, showText, hideText, pics_dir); }
                if (im) {
                    im.alt = '-';
                    im.title = hideAllText;
                    im.src = pics_dir + '/aclose.png';
                }
                box.className = '';
            } else {                            // hide examples
                for (i = 1; i < max; i++) { t(i, -1, showText, hideText, pics_dir); }
                if (im) {
                    im.alt = '+';
                    im.title = showAllText;
                    im.src = pics_dir + '/aopen.png';
                }
                box.className = 'collapsed';
            }
            return false;
        }
        var aimg = document.createElement('img');
        aimg.src = pics_dir + (initial_state == 1 ? '/aopen.png' : '/aclose.png');
        aimg.border = 0;
        // aimg.id = 'i' + i; 
        aimg.alt = '-';
        aimg.title = hideAllText;

        link.appendChild(aimg);
        td1.insertBefore(link,td1.firstChild);
        // tbody.getElementsByTagName('tr')[0].appendChild(col);
        //tbody.insertBefore(row, tbody.firstChild);
    
        // And collapse!
        if (initial_state == 1)
            link.onclick();
    } 
    return true;
}

// what: 0 = toggle, 1 = uncollapse, -1 = collapse
function t (id, what, showText, hideText, pics_dir) {
    var el = document.getElementById('b' + id);
    if (! el) return false;

    var img = document.getElementById('i' + id);

    if      (what == 1) {
        el.className = '';
        if (img) {
            img.src = pics_dir + '/close.png';
            img.title = hideText;
        }
    } else if (what == -1) {
        el.className = 'collapsed';
        if (img) {
            img.src = pics_dir + '/open.png';
            img.title = showText;
        }
    } else if (el.className == 'collapsed') {
        el.className = '';
        if (img) {
            img.src = pics_dir + '/close.png';
            img.title = hideText;
        }
    } else {
        el.className = 'collapsed';
        if (img) {
            img.src = pics_dir + '/open.png';
            img.title = showText;
        }
    }
    return true;
}
