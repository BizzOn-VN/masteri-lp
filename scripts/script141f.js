

// JavaScript Document
(function($){
    $(document).ready(function(){
        var $window = $(window),
            hd = $('#header'),
            hh = hd.outerHeight(),
            wh = $(window).outerHeight(),
            wst = $(window).scrollTop();



        // FIXED HEADER
        /*-----------------------------------------------------------------*/
            var ah = $('<div class="afterHeader"> ');
            //hd.after(ah.height(hh));
                        
            function headerScrollUpDown() {   
                var panel = 0,
                    intro = $('.sec-intro').outerHeight();

                $(window).scroll(function(event){
                    if ($(window).scrollTop() > panel) $('#header').addClass('sticky');
                    else $('#header').removeClass('sticky');     
                    //                   
                   // var st = $(this).scrollTop();
                   // $('body').addClass('stickyBody');
                   // if (st >= lastScrollTop){
                   //     $('body').removeClass('stickyUp').addClass('stickyDown');
                   // } else  {
                   //    $('body').removeClass('stickyDown').addClass('stickyUp');
                   // }
                   // lastScrollTop = st;

                   if(intro){

                    if ($(window).scrollTop() > (intro - 110)) $('body').addClass('end-banner');
                    else $('body').removeClass('end-banner');                      

                    }
                });
                
            }

            headerScrollUpDown();
        // EFFECT
        /*-----------------------------------------------------------------*/

        function efSpanText() {  
            $(".efSpanText").each(function () {
                var str = $(this).html(),curved = '',space,
                    c = $(this).data('class');
                if(!c) c = 'child';
                for (var i = 0, len = str.length; i < len; i++) {
                    if(str[i]==' ') space = ' '; else space = '';
                    curved += '<span class="'+c+'-'+(i+1)+'">'+str[i]+'</span>'+space+'';
                }

                if(!$(this).hasClass('done')){
                    $(this).html(curved);
                    $(this).addClass('done');
                }
                


            });  
        } 

        function efSpanTextNone() {
            $(".efSpanText").each(function () {
                var text = $(this).data('text');
                $(this).html(text);
                $(this).removeClass('done');
            }); 
        }

        if($window.width() > 767){
            efSpanText();
        }

        if($("#fullpage").length>0){
            $('body').addClass('fullscreen');
        }else {
            $('body').addClass('default');
        }


            $("#fullpage .entry-content>p").each(function () {
                var index = $(this).index() + 1;
                $(this).addClass('ef-img-t efch-'+index);
            }); 
            $("ul.menu-category > li").each(function () {
                var index = $(this).index() + 1;
                $(this).addClass('ef-img-l efch-'+index);

                if($(this).hasClass('children')){
                    $(this).children('span').click(function(){
                        $(this).parent().toggleClass('active');
                    }); 
                }

            }); 


        // TOGGLECLASS
        /*-----------------------------------------------------------------*/
            $(".toggleClass > .toggle").each(function () {
                $(this).click(function(){
                    $(this).parent().toggleClass('active');
                }); 
            });             

            //myModal
            $(".myModal").each(function () {
                $('#wrapper').append($(this));
                var over = $('<span class="btnModal overlay"></span>'),
                    close = $('<span class="btnModal btn-close"><i class="icon-close"> </i></span>'),
                    c = $(this).children('.container '),
                    hc = c.children('.contentModal').outerHeight() + 80;            
                $(this).prepend(over);
                $(this).find('.contentModal').prepend(close);
                if($(window).outerHeight()>hc){c.addClass('middle');}
            }); 
            $(".btnModal").each(function () {
                $(this).click(function(e){
                    e.preventDefault();
                    var id = $(this).data('modal');
                    var pr = $(this).parents('.myModal');
                    $('body').toggleClass('showModal');
                    if(pr.length>0) {
                        pr.removeClass('active');
                    }else {
                        $('div#'+id).toggleClass('active');
                    }
                }); 
            }); 
 

        // MENU MOBILE 
        /*-----------------------------------------------------------------*/


        $('.menu-btn-mb').click(function(){
            $('body').toggleClass('showMenu'); 
            $('.wrap-menu-mb').toggleClass('loaded'); 
        }); 
        $('.menu-btn-pc').click(function(){
            $(this).toggleClass('active'); 
            $('.wrap-menu-header').toggleClass('show'); 
        }); 


        $('.wrap-menu-mb a').click(function(){
            $('body').toggleClass('showMenu'); 
            $('.wrap-menu-mb').toggleClass('loaded'); 
        }); 


        function toggleSlideSub(li,sub) {    
            if(li.hasClass('parent-showsub')){
                sub.slideUp(300,function(){
                    li.removeClass('parent-showsub');
                });                           
            }else{
                var next= li.parent().children('li');
                next.removeClass('parent-showsub');
                next.children('ul').slideUp();
                sub.slideDown(300,function(){
                    li.addClass('parent-showsub');
                });                           
            }  
        }
        function ClickToggleSlide(span,a,li,sub) {    
            span.click(function(){
                toggleSlideSub(li,sub);
            }); li.prepend(span);
            a.click(function(e){
                e.preventDefault();
                toggleSlideSub(li,sub); 
            });
        }

        $('ul.menu-top-header ul').each(function(){
            var li = $(this).parent(),
                a = li.children('a[href="#"]'),
                btn = $('<span>',{'class':'showsubmenu icon-arrow-2 ib', text : '' });
                $(this).wrap('<div class="wrapul"></div>');
                var wrapul = li.children('.wrapul');

            ClickToggleSlide(btn,a,li,wrapul);           
        })


            
            
        var wrapmb = $('.wrap-menu-mb'),
            smb = wrapmb.data('style');
            wrapmb.find('li[class*="children"]').each(function(){
                var 
                p = $(this),
                idli = p.attr('id'),
                ul = p.children('ul'),
                a = p.children('a[href="#"]'),
                btn = $('<span>',{'class':'showsubmenu icon-arrow-2 ib', text : '' });
                p.children('ul').children('li').children('ul').attr("data-parent",idli);
                //a.addClass('outactive').attr("data-parent",id);
                if(smb == 2){
                    btn.click(function(){
                        p.toggleClass('activesubmenu'); 
                        wrapmb.toggleClass('activesubmenu'); 
                    }); p.prepend(btn);
                    var text = p.children('a').html();
                    var head = $('<div class="menu-head"><h3 class="back"><i class="icon-arrow-2 ix"></i> '+text+'</h3></div>');

                    ul.wrap('<div class="wrapul"></div>');

                    p.children('.wrapul').prepend(head);                    
                    $('.back').click(function(){
                        $(this).parent().parent().parent().removeClass('activesubmenu');
                        wrapmb.removeClass('activesubmenu');
                    });  
                }else if(smb == 3){
                    var text = p.children('a').html();
                    var head = $('<div class="menu-head"><h3 class="back"><i class="icon-arrow-2 ix"></i> '+text+'</h3></div>');

                    id = p.attr('id');

                    ulp = ul.data('parent');
                    ul.wrap('<div id="w-'+id+'" data-parent="w-'+ulp+'"  class="wrapul"></div>');
                    var wrap = p.children('.wrapul');
                    wrap.prepend(head);  
                    

                    wrapmb.append(wrap);

                    btn.click(function(){
                        id = $(this).parent().attr('id');
                        a = p.closest(".wrapul");
                        if (a.hasClass('outactive')){
                            a.removeClass('outactive').addClass('outactive2');
                        }else{
                            a.addClass('outactive');
                        }
                        wrapmb.children('#w-'+id+'').addClass('outactive');
                    }); p.prepend(btn);
                    
             
                    $('.back').click(function(){
                        pr = $(this).parent().parent();
                        id = pr.data('parent');
                        pr.removeClass('outactive');
                        a = wrapmb.children('#'+id+'');
                        if (id=='w-undefined'){
                            $('.wrapul.main').removeClass('outactive');
                        }else{
                            a.addClass('outactive').removeClass('outactive2');
                        }                        
                        
                    });  
                } else {  
                    ClickToggleSlide(btn,a,p,ul);
                }

            });    // append - prepend - after - before


        // EQUAL HEIGHT
        /*-----------------------------------------------------------------*/
            // equalHeight
            function equal() {
                $(".equalHeight").each(function () {
                    var $this = $(this),
                        $equal = $this.find(".equal");
                    var padding = $this.attr('data-padding');                    
                    if(!padding)   padding = 0 ;
                    if ($this.length > 0) {
                      $equal.imagesLoaded(function () {
                        equalHeight($equal, parseInt(padding));
                      });
                    }
                });    
            }   
 

            /* Equal Height good*/
            function equalHeight(className, padding) {
              var tempHeight = 0;
              $(className).each(function () {
                current = $(this).height();
                if (parseInt(tempHeight) < parseInt(current)) {
                  tempHeight = current;
                }
              });
              $(className).css("height", tempHeight + padding + "px");
            }

        // CLICK SCROLL
        /*-----------------------------------------------------------------*/
            var saaa = 0;
            if ($(window).width() < 768) {
                var saaa = hh;
            }
            // Click scroll a
          $("a.scrollspy").click(function (event) {
            
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('html, body').animate({
              scrollTop: $(id).offset().top - saaa //hh
              }, 1000)
            event.preventDefault();
          });

            // Back-top
            $(window).scroll(function() {
                if ($(this).scrollTop() > 100) {
                    $('#back-top').addClass('show');
                } else {
                    $('#back-top').removeClass('show');
                }
            });
            $('.back-top').click(function() {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

            $(".scroll-content").each(function () {
                var  top = $(this).offset().top;
                $('html, body').animate({
                  scrollTop: $(this).offset().top - 60 //hh
                  }, 300)                
            }); 



            

        // THEME
        /*-----------------------------------------------------------------*/


        function cttab() {   
            $("[class*='cttab'] .tab-menu > div").each(function () {
                $(this).click(function () {
                    var index = $(this).data('index'),
                        menu = $(this).parent(),
                        content = menu.parent().children('.tab-content');
                    if(index>=0){
                    }else{index = $(this).index();}
                    menu.children().removeClass('active');
                    content.children().removeClass('active');
                    $(this).addClass('active');
                    content.children(':eq('+index+')').addClass('active');
            
                });
            });   
        }
       
        cttab();






        $(".page-news-detail .entry-content img").each(function () {
            $(this).parent('p').addClass('full-img');

        });   
        $(".wrap-menu-mb ul.menu>li").each(function () {
            var index = $(this).index() + 1;
            $(this).addClass('ef-img-l efch-'+index);
        }); 



        $(".list-contact .item").each(function () {
            $(this).click(function () {
                var m = $(this).data('map');
                console.log(m);
                $('.page-contact .wrap-maps iframe').attr('src',m);
            }); 
        }); 

        $(".wrap-menu-category").each(function () { 
            var t = $(this).find('ul.menu-category li.active a').html();
            if(!t){
                t = $(this).find('ul.menu-category li:first-child a').html();
            }
            $(this).children('.title').children('span').html(t);
        }); 

        $(".wrap-menu-category ul.menu-category a").each(function () {
            $(this).click(function () {
                var t = $(this).html();
                console.log(t);
                $(this).parent().addClass('active').siblings().removeClass('active');
                $(this).closest('.wrap-menu-category').children('.title').children('span').html(t);
            });
        }); 
        /////
        $(".wrap-menu-category2").each(function () { 
            var t = $(this).find('ul.menu-category2 li.active a').html();
            if(!t){
                t = $(this).find('ul.menu-category2 li:first-child a').html();
            }
            $(this).children('.title').children('span').html(t);
        }); 

        $(".wrap-menu-category2 ul.menu-category2 a").each(function () {
            $(this).click(function () {
                var t = $(this).html();
                console.log(t);
                $(this).parent().addClass('active').siblings().removeClass('active');
                $(this).closest('.wrap-menu-category2').children('.title').children('span').html(t);
            });
        });         



                            var csync1 = $(".sec-milestone .owl-carousel"),
                            csync3 = $(".sec-milestone .tab-content");
                            csync1.on("click", ".item", function(e){
                                e.preventDefault();
                                var index = $(this).parent().index();
                                //csync1.data('owl.carousel').to(index, 300, true);
                                csync1.find('.item').removeClass('active');
                                $(this).addClass('active');
                                csync3.children(':eq('+index+')').addClass('active').siblings().removeClass('active');
                            });

                            var csync1_1 = $(".sec-milestone-mb .owl-carousel"),
                            csync3_1 = $(".sec-milestone-mb .tab-content");
                            csync1_1.on("click", ".item", function(e){
                                e.preventDefault();
                                var index_1 = $(this).parent().index();
                                //csync1.data('owl.carousel').to(index, 300, true);
                                csync1_1.find('.item').removeClass('active');
                                $(this).addClass('active');
                                csync3_1.children(':eq('+index_1+')').addClass('active').siblings().removeClass('active');
                            });


            //Auto toggleHeight
            function toggleAutoHeight() {
              $(".toggleAutoHeight").each(function () {  
                var e = $(this),
                    h = e.data('height'),
                    p = e.data('position'),
                    tm = e.data('more'),
                    tl = e.data('less'),
                    i = e.data('i'),
                    content = e.children('.tgh-content'),
                    first = content.children('.tgh-first'),
                    c = content.outerHeight();
                if(!tm) tm = 'Show more';
                if(!tl) tl = 'Show less';
                var btn = $('<span class="showmore"><span class="text">'+tm+'</span> <i class="'+i+'"></i></span>');

                if(first.length>0){
                    h=0;
                    first.each(function () {
                        h += $(this).outerHeight();
                    });                
                }
                    
                if(c>h){
                    content.wrap('<div  class="wtgh"></div>');
                    var wtgh = e.children('.wtgh');
                    wtgh.css('height',h+'px');
                    btn.click(function(){
                        if(e.hasClass('active')) {
                            hh=h;
                            btn.children('.text').html(tm);
                        }
                        else {
                            hh=c;
                            btn.children('.text').html(tl);
                        }
                        wtgh.animate( { height:hh+"px" }, { queue:false, duration:300 });
                        e.toggleClass('active');
                    }); 
                    if(p=='top')e.prepend(btn);else e.append(btn);          
                }
              });  
            }  
            toggleAutoHeight(); 


            $(".wrap-menu-mb .nav-tabs a").each(function () {
                $(this).click(function(){
                    $('body').removeClass('showMenu');
                }); 
            });  

            // iframe video
            var getVideoUrl = function(id,v){
              return 'https://www.youtube.com/embed/' + id + '?' + v + '&disablekb=1&hl=en&loop=1&modestbranding=1&showinfo=0&autohide=0&color=white&iv_load_policy=3&theme=light&rel=0&enablejsapi=1';
            }

            $(".sec-video .btnModal").each(function () {
                $(this).click(function () {
                  $('#videoHomeModal video').get(0).play();


                  $('#myVideo').get(0).pause();
                }); 
            });         

            $(window).bind("load", function() {
                $(".myModal .btnModal").on('click',function(){
                    $('#videoModal .img').html('');
                });  

                $("#videoHomeModal .btnModal").on('click',function(){
                    $('#videoHomeModal video').get(0).pause();
                    $('#myVideo').get(0).play();


                });                     
            });     




        // LAZYLOAD
        /*-----------------------------------------------------------------*/

            var BJLL_options = BJLL_options || {},
                BJLL = {
                    _ticking: !1,
                    check: function() {
                        if (!BJLL._ticking) {
                            BJLL._ticking = !0, void 0 === BJLL.threshold && (void 0 !== BJLL_options.threshold ? BJLL.threshold = parseInt(BJLL_options.threshold) : BJLL.threshold = 200);
                            var e = document.documentElement.clientHeight || body.clientHeight,
                                t = !1,
                                n = document.getElementsByClassName("lazy-hidden");
                            [].forEach.call(n, function(n, a, i) {
                                var s = n.getBoundingClientRect(),
                                    offset = parseFloat(n.getAttribute('offset'));
                                if(offset) o = 0 - offset;
                                else o = 0;
                                e - s.top + o > 0 && (BJLL.show(n), t = !0)
                            }), BJLL._ticking = !1, t && BJLL.check()
                        }
                    },
                    show: function(e) {
                        e.className = e.className.replace(/(?:^|\s)lazy-hidden(?!\S)/g, ""), e.addEventListener("load", function() {
                            e.className += " loaded", BJLL.customEvent(e, "lazyloaded");
                        }, !1);
                        var t = e.getAttribute("data-lazy-type");
                        e.className += ' loaded';

                        if(e.classList.contains('onepage')){

                          if(e.classList.contains('active')){
                          }else{
                            $('.onepage').removeClass('active');
                            e.classList.add("active");
                            // i = $(this).attr('id');
                            // $('.nav-tabs li').removeClass('active');                
                            // $('.nav-tabs a[href="#'+i+'"]').parent().addClass('active');
                          }

                        }         

                        if ("image" == t) null != e.getAttribute("data-lazy-srcset") && e.setAttribute("srcset", e.getAttribute("data-lazy-srcset")), null != e.getAttribute("data-lazy-sizes") && e.setAttribute("sizes", e.getAttribute("data-lazy-sizes")), e.setAttribute("src", e.getAttribute("data-lazy-src"));

                        else if ("bg" == t) {
                            var n = e.getAttribute("data-lazy-src");
                            e.style.backgroundImage = 'url(' + n + ')';
                            
                        }
                        else if ("iframe" == t) {
                            var n = e.getAttribute("data-lazy-src"),
                                a = document.createElement("div");
                            a.innerHTML = n;
                            var i = a.firstChild;
                            e.parentNode.replaceChild(i, e);
                        }
                        else if ("mp4" == t) {
                            var n = e.getAttribute("data-lazy-src"),
                                a = '<source src="'+n+'" type="video/mp4">';
                            e.innerHTML += a;
                        }

               
                    
                    },
                    customEvent: function(e, t) {
                        var n;
                        document.createEvent ? (n = document.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (n = document.createEventObject()).eventType = t, n.eventName = t, document.createEvent ? e.dispatchEvent(n) : e.fireEvent("on" + n.eventType, n)
                    }
                };
            window.addEventListener("load", BJLL.check, !1), window.addEventListener("scroll", BJLL.check, !1), window.addEventListener("resize", BJLL.check, !1), document.getElementsByTagName("body").item(0).addEventListener("post-load", BJLL.check, !1);


        // RESPONSIVE
        /*-----------------------------------------------------------------*/
        
        $window.bind("load", function() {
            //headerScrollUpDown(); 
            equal();
        });        

        // isRes = function(){return $window.width() > 767};
        // $window.resize(function(){
        //     if(isRes()){ 
        //         efSpanText();
        //     }else{
        //         efSpanTextNone();

        //     }

        //     equal(); 
        // });

   //
   $(document).ready(function() {
    $(".fancybox").fancybox({
        openEffect	: 'none',
        closeEffect	: 'none',
    });
    });
    //
    // $(window).scroll(function(){
    //     if ($(window).scrollTop() >= 50) {
    //         $('header').addClass('sticky');
    //     }
    //     else {
    //         $('header').removeClass('sticky');
    //     }
    // });



    }); 

})(jQuery); 
