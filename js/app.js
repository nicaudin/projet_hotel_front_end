const lang = {
	'en': { // Traduction Anglaise
		'site-lang': 'en',
		'head-title': 'Hotelia - Home'
	}
};

/*Plugin pour déterminer si l'élément est dans le champs visuel du terminal */
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// Gestion des cookies
createCookie = function(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

deleteCookie = function(name) {
    createCookie(name,"",-1);
}

// Ajout d'une méthodes de traductions dans jQuery
translate = function(langDic) {

	/*
	const lang = {
		'en': {
			'head-title': 'Hotelia - Home'	
		}
	};
	*/
	const siteLang = readCookie('site-lang');
	// Boucle sur tous les elements du DOM
	if (siteLang !== null) {
		$('html *').each(function(e){
			const key = $(e).data($(e).data);
			$(e).html(lang[siteLang][key])
		});
	}
	else{
		createCookie('site-lang', $('html').attr('lang'));
	}

};

// Changement de langue
$('.change-lang').on('click', function(){
	
	if ($(this).data('lang') === 'fr') {
		window.location.reload(true);
		return;
	}

	translate(lang);
})