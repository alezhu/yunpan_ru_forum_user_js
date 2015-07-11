// ==UserScript==
// @name         yunpan.ru forum
// @namespace    https://github.com/alezhu/yunpan_ru_forum_user_js
// @version      1.0
// @description  Some useful function for forum
// @author       alezhu
// @match        http://yunpan.ru/*
// @include      http://yunpan.ru/*
// @source      https://raw.githubusercontent.com/alezhu/yunpan_ru_forum_user_js/master/yunpan.ru.user.js
// @updateURL   https://raw.githubusercontent.com/alezhu/yunpan_ru_forum_user_js/master/yunpan.ru.user.js
// @downloadURL https://raw.githubusercontent.com/alezhu/yunpan_ru_forum_user_js/master/yunpan.ru.user.js
// @grant        none
// ==/UserScript==


(function() {
    var LOG = 0;
    var authors = {};
    var spamers = [];
    var spamers_str = localStorage["alezhu.spamers"];
    if(spamers_str)spamers = spamers_str.split("\n");

    $(document).ready(function(){
        if(LOG)console.log("Ready");
        $("ul.topics li.row").each(function() {
            if(LOG)console.log("topic");
            var li = $(this);
            var a = li.find("dt a[href^='http://yunpan.ru/member']");
            if(a.length) {
                var name = a.eq(0).text();
                if($.inArray(name,spamers) < 0) {
                    var topics = authors[name];
                    if(!topics){ 
                        topics = [];
                        authors[name] = topics;
                    }
                    topics.push(li);  
                    $("<a href='#'>&nbsp;[Spamer!]</a>").click(function(event) {
                        event.preventDefault( );
                        var name = $(this).data("author")
                        spamers.push(name);
                        var spamers_str = spamers.join("\n");
                        localStorage["alezhu.spamers"] = spamers_str;
                        var topics = $( authors[name] );
                        topics.each(function() {
                            $(this).remove( );
                        });
                        return false;
                    }).insertAfter(a).data("author",name);
                } else {
                    li.remove( );
                }
            }
        });

    });
})();
