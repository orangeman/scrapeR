// misc JS functions for dings.cgi
function s(a) {
	var speak = window.open(a.href, 'speak', 'status=no,resizable=yes,scrollbars=no,toolbar=no,location=no,menubar=no,width=240,height=280');
	// speak.focus();
	if (! speak) return true;
	if (top.dict_search) {
	    top.dict_search.document.formular.query.select();
	} else {
    	window.document.formular.query.select();
	}
	return false;
}
function u(text) {
	window.status = text;
	return true;
}
function undock(a) {
	var w = window.open(a.href,
	'querybox',
	'status=no,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,width=240,height=400');
	return (w ? false : true);
}
function mini(id) {
	var w = window.open(id.href,
	'beolingus_mini',
	'status=no,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,width=300,height=400');
    if (w) w.focus();
	return (w ? false : true);
}
function sel_query() {
    if (this.document.formular && this.document.formular.query) {
		this.document.formular.query.select();
		this.document.formular.query.focus();
	}
}
function del_query() {
    if (this.document.formular && this.document.formular.query) {
        this.document.formular.query.value='';
		this.document.formular.query.focus();
	}
    wm_d();
}
function del_escape() {
    if ((! document.getElementById('sugg')) ||
        document.getElementById('sugg').style.visibility == 'hidden')
            del_query();
    wm_d();
}

function addchar(c) {
    document.formular.query.value += c;
    document.formular.query.focus();
}
function inschar(c) {
    el = document.formular.query;
    el.focus();
    if (typeof document.selection != 'undefined') { // IE+Opera
        var range = document.selection.createRange();
        var insText = range.text;
        range.text = c;
        if (navigator.appName != "Opera") {
            range = document.selection.createRange();
            if (range.text.length != 0) range.move('character', 1);
            range.select();
        }
    } else if (typeof el.selectionStart != 'undefined') { // Gecko
        var start = el.selectionStart;
        var end = el.selectionEnd;
        var selectedtext = el.value.substring(start, end);
        el.value = el.value.substr(0, start) + c + el.value.substr(end);
        el.selectionStart = start + 1;
        el.selectionEnd = start + 1;
    } else {  // others = add at end
        el.value += addtext;
    }
}

// IE :hover bug
function setupDatarows() {
if (navigator.appName.indexOf("Explorer") != -1) {
  var z = document.getElementsByTagName("tr");
  for (var kn = 0; kn < z.length; kn++) {
    if (z[kn].className.indexOf("s1") != -1 || z[kn].className.indexOf("s2") != -1) {
    // if (z[kn].id.indexOf("row") != -1) {
      z[kn].onmouseout = switchClass;
      z[kn].onmouseover = switchClass;
      z[kn].oldClass = z[kn].className + "hover";
    }
  }
}
}
function switchClass() {
  var x = this.className;
  this.className = this.oldClass;
  this.oldClass = x;
}

function bmservice(service) {
    url = encodeURIComponent('http://dict.tu-chemnitz.de/');
    title = encodeURIComponent('BEOLINGUS Dictionary / Wörterbuch');
    switch(service) {      
        case 'delicious':
            window.open('http://del.icio.us/post?url='+url+'&title='+title);
            break;
        case 'mrwong':
            window.open('http://www.mister-wong.de/index.php?action=addurl&bm_url='+url+'&bm_description='+title);
            break;
        case 'digg':
            window.open('http://digg.com/submit?phase=2&url='+url+'&title='+title);
            break;
        case 'linkarena':   
            window.open('http://linkarena.com/bookmarks/addlink/?url='+url+'&title='+title+'&desc=&tags=');
            break;
        case 'webnews':         
            window.open('http://www.webnews.de/einstellen?url='+url+'&title='+title);
            break;
        case 'yigg':
            window.open('http://yigg.de/neu?exturl='+url+'&exttitle='+title);
            break;  
        case 'google':      
            window.open('http://www.google.com/bookmarks/mark?op=add&hl=de&bkmk='+url+'&title='+title);
            break;
        case 'oneview':      
            window.open('http://www.oneview.de/quickadd/neu/addBookmark.jsf?URL='+url+'&title='+title);
            break;
    }
    return false;   
}

// change dict-group (tab)
function ch_group (group) {
    if (! document.formular.query || document.formular.query.value == '')
        return true;
    document.formular.service.options[document.formular.service.selectedIndex].value = group;
    document.formular.submit();
    return false;
}

// word menu
function wm_d () {
    wm = document.getElementById('wm');
    if (wm) {
       wm.parentNode.removeChild(wm);
    }
    wmb = document.getElementById('wmb');
    if (wmb) {
       a = wmb.firstChild;
       a.className = '';
       wmb.parentNode.replaceChild(wmb.firstChild,wmb);
       // wmb.parentNode.removeChild(wmb);
    }
    return false;
}
var m_timer = null;
function m(text, id, l) {
    m_timer = window.setTimeout(function(){md(text,id,l,1);}, 200);
    return false;
}

function d(id) {
    window.clearTimeout(m_timer);
    m_timer = null;
    // alert(id.href);
    window.location.href = id.href;
    return true;
}
function g(id) {
    m_timer = window.setTimeout(function(){
        if (m_timer == null) return;
        window.location.href = id.href;}, 200);
    return false;
}
function d2(text, id, l) {
    window.clearTimeout(m_timer);
    m_timer = null;
    md(text, id, l, 0);
    return false;
}

function md(text, id, l, m) {
    if (m == 1 && m_timer == null) return;
    wm_d();
    wmb = document.createElement('span');
    wmb.setAttribute('id', 'wmb');
    id.parentNode.replaceChild(wmb, id);
    wmb.appendChild(id);
    id.className = 'hl';
    
    wm = document.createElement('span');
    wmb.appendChild(wm);
    wm.setAttribute('id', 'wm');
    wm.innerHTML = mc(text, l);
    wm.style.visibility = "visible";
    
    o = document.getElementById('word');
    o.onmouseover = wm_d;

    wm.focus();
    return false;
}
// inline = iframe für Weitersuche
function im (id) {
    im_d = document.getElementById('inline_more');
    im_f = document.getElementById('im_frame');
    im_d.style.width = '25em';
    im_d.style.height = '30em';
    im_f.style.width = '25em';
    im_f.style.height = '28.7em';
    im_f.src = id.href;
    im_d.style.visibility = 'visible';
    //alert('im ' + id.href);
    wm_d();
    return false;
}

// Vokabeltrainer übernehmen
function vi (v1, v2, q, l1, l2, el) {
    if (!phase6insert(v1, v2, q, l1, l2, el)) 
	    el.firstChild.src = pics_dir + '/vi.png';
    return false;
}

// Sende Feedback
/* herkoemmlich mit Popup
function c(href) {
	var co = window.open(href, 'comment', 'status=no,resizable=yes,scrollbars=no,toolbar=no,location=no,menubar=no,width=240,height=180');
	if (! co) return true;
		return false;
}
*/
// mit dojo
function c(url) {
    if (document.formular.query) {
        url = url + ';query=' + escape(document.formular.query.value);
    }
	var request = dojo.io.bind({
			url: url,
			transport: "XMLHTTPTransport", 
			encoding: "iso-8859-1",
			method: "GET",
			load: function(type, data, evt){
                cf = document.getElementById('comment');
                if (cf) {
                    cf.style.height='16px';
                     document.getElementById('demail').style.display='none';
                    cf.value = data;
                    window.setTimeout("cf.value=''", 2000);
                }
			},
			error: function(type, data, evt){
				alert("ERROR " + type + '. ' + data);
			},
			mimetype: "text/plain"
	});
	return false;
}
function set_options(form) {
    var f = document.getElementById(form);
    if (!f) return;
    
    var opts = '';
    if (f.service2) {
        if (opts) opts += '&';
        opts += 'service=' + f.service2.options[f.service2.selectedIndex].value;
    }
    if (f.sugg) {
        if (opts) opts += '&';
        opts += 'sugg=' + f.sugg.options[f.sugg.selectedIndex].value;
    }
    if (f.optcase) {
        if (opts) opts += '&';
        opts += 'optcase=' + f.optcase.options[f.optcase.selectedIndex].value;
    }
    if (f.opterrors2) {
        if (opts) opts += '&';
        opts += 'opterrors=' + f.opterrors2.options[f.opterrors2.selectedIndex].value;
    }
    if (f.wm) {
        if (opts) opts += '&';
        opts += 'wm=' + f.wm.options[f.wm.selectedIndex].value;
    }
    if (f.optpro2) {
        if (opts) opts += '&';
        opts += 'optpro=' + f.optpro2.options[f.optpro2.selectedIndex].value;
    }
    if (f.optfold) {
        if (opts) opts += '&';
        opts += 'optfold=' + f.optfold.options[f.optfold.selectedIndex].value;
    }
    if (f.optshape) {
        if (opts) opts += '&';
        opts += 'optshape=' + f.optshape.options[f.optshape.selectedIndex].value;
    }
    if (f.scroll) {
        if (opts) opts += '&';
        opts += 'scroll=' + f.scroll.options[f.scroll.selectedIndex].value;
    }
    if (f.hints) {
        if (opts) opts += '&';
        opts += 'hints=' + f.hints.options[f.hints.selectedIndex].value;
    }
    if (f.optv) {
        if (opts) opts += '&';
        opts += 'optv=' + f.optv.options[f.optv.selectedIndex].value;
    }
    if (f.style) {
        if (opts) opts += '&';
        opts += 'style=' + f.style.options[f.style.selectedIndex].value;
    }
    // alert(opts);
    if (opts)
        return set_cookie('options=' + opts);
}

// Set single option
function set_opt(option, value) {
    c_val = option + '=' + escape(value);
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf('options=');
        if (c_start != -1) {
            c_start += 8;
            c_end = document.cookie.indexOf(";",c_start);
            if (c_end == -1) c_end = document.cookie.length;
            o_start = document.cookie.indexOf(option + '=', c_start);
            if (o_start == -1) {
                c_val = document.cookie.substring(c_start, c_end) + '&' + c_val;
            } else {
                c_val = document.cookie.substring(c_start, o_start) + option + '=' + escape(value);
                o_end = document.cookie.indexOf('&', o_start);
                if (o_end != -1) c_val += document.cookie.substring(o_end, c_end);
            }
        }
    }
    set_cookie('options=' + c_val);
	return false;
}
function set_cookie(s) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);
    document.cookie = s  + ';expires=' + exdate.toGMTString() + ';path=/';
}
// go back in history and reload this page ... a hack
function back_reload() {
    if (document.referrer) 
        window.location.href = document.referrer + '?tmp=' + Math.random(); 
    else 
        history.back(); // no chance to raload
}

document.onclick = function(e) { wm_d();}
