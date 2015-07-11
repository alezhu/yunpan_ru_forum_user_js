// ==UserScript==
// @name         yunpan.ru forum
// @namespace    https://raw.githubusercontent.com/alezhu/yunpan_ru_forum_user_js/
// @version      1.0
// @description  Some usefal function for forum
// @author       alezhu
// @match        http://yunpan.ru/*
// @include      http://yunpan.ru/*
// @source      https://raw.githubusercontent.com/alezhu/yunpan_ru_forum_user_js/master/yunpan.ru.user.js
// @updateURL   https://raw.githubusercontent.com/alezhu/yunpan_ru_forum_user_js/master/yunpan.ru.user.js
// @downloadURL https://raw.githubusercontent.com/alezhu/yunpan_ru_forum_user_js/master/yunpan.ru.user.js
// @grant        none
// ==/UserScript==


(function() {
	var LOG = 1;
	var authors = {};
	$(document).ready(function(){
		$("ul.topics li.row").each(function() {
			var li = $(this);
			var a = li.find("a[href^=http://yunpan.ru/member]");
			if(a.length) {
				var name = a.text();
				var topics = authors[name];
				if(!topics) topics = [];
				topics.push(li);
			}
		});
	});
})();
