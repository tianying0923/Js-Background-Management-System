(function($) {
    'use strict';
    /**
     * @param navClicked                    选填，导航选中class
     * @param navDefaulIcon                 选填，导航默认右侧图标class
     * @param navClickIcon                  选填，导航点击后右侧图标class
     * @param navHDefaulIcon                选填，导航收起默认右侧图标class
     * @param navHClickIcon                 选填，导航收起选中右侧图标class
     * @param tabWrapper                 选填，点击右侧导航添加tab的父容名
     * @param tabClicked                    选填，tabs选中class
     */
    $.fn.Layout = function(options) {
        let opts = {
                openingSpeed: 400, // 打开菜单动画时间
                closingSpeed: 400, // 关闭菜单动画时间
                navClicked: 'nav_active' || options.navClick,
                navDefaulIcon: 'fa-angle-down' || options.navDefaulIcon,
                navClickIcon: 'fa-angle-up' || options.navClickIcon,
                navHDefaulIcon: 'fa-angle-right' || options.navHDefaulIcon,
                navHClickIcon: 'fa-angle-left' || options.navHDefaulIcon,
                tabWrapper: '.tabs_wrapper' || options.tabWrapper,
                tabClicked: 'tab_active' || options.tabClicked
            },
            navScroll, isHorizontal;
        opts = $.extend({}, opts, options);
        const that = this,
            /**初始化 */
            init = function() {
                $(that).children().find('.nav_sub_wrapper').show(); // 如不加此行代码会导致收起错位
                initEle();
                initVariable();
                initDynamicStyle($(that), 0);
                initDefaulStyle();
                initFunction();
            },
            /**初始化页面元素距左侧距离 */
            initEle = function() {
                window.navWrapW = $('#nav').width();
                $('#nav').css({
                    'padding': headerH + 'px 0 0 0'
                });
                $('#tabs').css({ // 设置tab宽度
                    'left': window.navWrapW,
                    'top': headerH
                });
                $('#content').css({
                    'padding': (headerH + tabsWrapH) + 'px 0 ' + footerH + 'px ' + window.navWrapW + 'px',
                });
                $('#footer').css({ // 设置footer宽度
                    'left': window.navWrapW
                });
                $('#header .dropdown_hide').css({
                    'top': headerH - 5
                });
            },
            /**初始化变量 */
            initVariable = function() {
                isHorizontal = $(that).parents().hasClass('horizontal');
            },
            /**初始化默认样式 */
            initDefaulStyle = function() {
                $(that).find('.nav_item').removeClass(opts.navClicked); // 清除所有li选中样式
                $(that).find('.nav_sub_wrapper').hide(); // 所有ul隐藏
                if (isHorizontal) {
                    $('.header_logo').css('width', '60px');
                    $('.logo_hide').show().siblings().hide();
                } else {
                    $('.header_logo').css('width', '224px');
                    $('.logo_hide').hide().siblings().show();
                    if ($(opts.tabWrapper).children().length > 1) {
                        const _html = formatAHtml($(opts.tabWrapper).children('.' + opts.tabClicked).children('a')); // 格式化a标签
                        sideNavStyle($(that), _html.eleTitle);
                    }
                }
            },
            /**初始化动态样式
             * @param ele 左侧导航父级
             * @param num 表示几级导航
             */
            initDynamicStyle = function(ele, num) {
                if (isHorizontal) {
                    $(ele).find('a').css({ 'padding': '0px 15px 0 0' });
                    $(ele).find('.nav_sub_wrapper').css({ 'left': $(ele).width() + 'px' });
                } else {
                    $(ele).find('a').css({ 'padding': '0 5px 0 ' + 20 * num + 'px' });
                }
                const navEleChild = $(ele).children(),
                    navEleChildLen = navEleChild.length;
                for (let i = 0; i < navEleChildLen; i++) {
                    navEleChild[i].count = num;
                    if ($(navEleChild[i]).children().is('.nav_sub_wrapper')) {
                        $(navEleChild[i]).children('.nav_sub_wrapper').siblings().find('span.icon').remove();
                        if (isHorizontal) $(navEleChild[i]).children('.nav_sub_wrapper').siblings().children().append('<span class="icon fa fa-angle-right"></span>'); // 添加导航右侧小箭头
                        else $(navEleChild[i]).children('.nav_sub_wrapper').siblings().children().append('<span class="icon fa fa-angle-down"></span>'); // 添加导航右侧小箭头
                        navEleChild[i].count++;
                        initDynamicStyle($(navEleChild[i]).children('.nav_sub_wrapper'), navEleChild[i].count);
                        continue;
                    }
                }
            },
            /**初始化事件 */
            initFunction = function() {
                $(that).find('.nav_item').off(); // 清除所有绑定事件
                $(that).find('.nav_item').on({
                    'click': navItemClick
                });
                if (isHorizontal) { // 侧边导航绑定事件
                    $(that).find('.nav_item').on({
                        'mouseover ': navItemMouseover,
                        'mouseout': navItemMouseout,
                    });
                }
            },
            /**初始化插件 */
            initPlugIn = function() {
                navScroll = new Swiper('#nav .swiper-container', { // 导航栏滚动条
                    direction: 'vertical',
                    roundLengths: true, // 宽和高取整(四舍五入)
                    slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量
                    freeMode: true,
                    scrollbar: { // 滚动条
                        el: '#nav .swiper-scrollbar',
                    },
                    mousewheel: true, // 鼠标滚动
                });
                navScroll.scrollbar.$el.css('width', '3px'); // 设置滚动条宽度
                navScroll.scrollbar.$dragEl.css('background', 'rgba(0,0,0,0.3)'); // 设置滚动条颜色
            },
            /**侧边导航：鼠标悬浮事件 */
            navItemMouseover = function() {
                $(this).children('.nav_sub_wrapper').show();
                $(this).children('div').find('span.icon').toggleClass(opts.navHClickIcon + ' ' + opts.navHDefaulIcon);
            },
            /**侧边导航：鼠标离开事件 */
            navItemMouseout = function() {
                $(this).children('.nav_sub_wrapper').hide();
                $(this).children('div').find('span.icon').toggleClass(opts.navHClickIcon + ' ' + opts.navHDefaulIcon);
            },
            /**侧边导航：鼠标点击事件 */
            navItemClick = function(event) {
                event.stopPropagation(); // 阻止冒泡
                if (isHorizontal) {
                    if ($(this).children('ul').is('.nav_sub_wrapper')) { // 子导航存在
                        return false; // 阻止跳转
                    } else { // 子导航不存在
                        if ($(this).parents('.nav_item').length)
                            $(this).parents('.nav_item').addClass(opts.navClicked).siblings().removeClass(opts.navClicked); // 给当前点击元素增加背景色
                        else $(this).addClass(opts.navClicked).siblings().removeClass(opts.navClicked); // 给当前点击元素增加背景色
                        navItemClickFun($(this).children('div'));
                    }
                } else {
                    $(that).find('.nav_item').removeClass(opts.navClicked); // 清除所有li元素的选中样式
                    $(this).siblings().find('span.icon').removeClass(opts.navClickIcon).addClass(opts.navDefaulIcon); // 切换箭头class
                    $(this).siblings().find('.nav_sub_wrapper').slideUp(opts.openingSpeed, function() { // 所有兄弟元素的ul隐藏
                        navScroll.update(); // 刷新导航滚动条
                    });
                    if ($(this).children('ul').is('.nav_sub_wrapper')) { // 子导航存在
                        if ($(this).children('.nav_sub_wrapper').is(':hidden')) { // 子导航隐藏时
                            $(this).children('ul').slideDown(opts.openingSpeed, function() {
                                setTimeout(function() {
                                    navScroll.update(); // 刷新导航滚动条
                                }, 500);
                            });
                            $(this).children('div').find('span.icon').toggleClass(opts.navDefaulIcon + ' ' + opts.navClickIcon); // 切换箭头class
                        } else { // 子导航未隐藏时
                            $(this).children('.nav_sub_wrapper').slideUp(opts.openingSpeed, function() {
                                navScroll.update(); // 刷新导航滚动条
                            });
                            $(this).children('div').find('span.icon').toggleClass(opts.navClickIcon + ' ' + opts.navDefaulIcon); // 切换箭头class
                        }
                        return false; // 阻止跳转
                    } else { // 子导航不存在
                        $(this).addClass(opts.navClicked); // 给当前点击元素增加背景色
                        navItemClickFun($(this).children('div'));
                    }
                }
            },
            /**封装：点击方法 */
            navItemClickFun = function(ele) {
                const eleA = $(ele).children('a'),
                    eleSpanHtml = $(ele).find('span').eq(0).html(),
                    eleAHref = $(eleA).attr('href');
                if (eleAHref == '#') layer.msg('顶部导航不支持href="#"的操作！！！</br>请检查代码！！！');
                else {
                    loadPage($(eleA));
                    addTabs(eleSpanHtml, eleAHref);
                }
            },
            /**加载页面
             * @param ele 点击元素的a标签
             */
            loadPage = function(ele) {
                const url = $(ele).attr('href'),
                    start = url.indexOf('#') + 1,
                    end = url.indexOf('?'),
                    _html = end > start ? url.substring(start, end) : url.substring(start);
                $('#content').load(_html + '.html');
            },
            /**顶部导航：添加
             * @param eleHtml 选中元素的html
             * @param eleHref 选中元素的href
             */
            addTabs = function(eleHtml, eleHref) {
                const start = eleHref.indexOf('id=') + 3,
                    end = eleHref.indexOf('&'),
                    _id = end > start ? eleHref.substring(start, end) : eleHref.substring(start);
                // 重复的不允许添加-S
                let addTabEleChild = $(opts.tabWrapper).children(),
                    addEleChildLen = addTabEleChild.length,
                    isAdd = true;
                for (let i = 0; i < addEleChildLen; i++) {
                    const tabEleChildOpts = formatAHtml($(addTabEleChild[i]).children('a'));
                    if (tabEleChildOpts.eleTitle == eleHtml && tabEleChildOpts.eleId === _id) {
                        isAdd = false;
                        break;
                    }
                }
                // 重复的不允许添加-E
                $(opts.tabWrapper).children().removeClass(opts.tabClicked);
                if (isAdd) {
                    const newSlide = '<li class="swiper-slide ' + opts.tabClicked + '"><a href="' + eleHref + '">' + eleHtml + ' ' + _id + '</a><i class="icon fa fa-times" aria-hidden="true"></i></li>';
                    window.tabsWrapper.appendSlide(newSlide);
                    addTabEleChild = $(opts.tabWrapper).children();
                    addEleChildLen = addTabEleChild.length;
                }
                for (let i = 0; i < addEleChildLen; i++) {
                    const tabEleChildOpts = formatAHtml($(addTabEleChild[i]).children('a'));
                    if (tabEleChildOpts.eleTitle == eleHtml && tabEleChildOpts.eleId === _id) {
                        $(addTabEleChild[i]).children('a').attr('href', eleHref); // 当前顶部tab的href=传入的href；
                        $(addTabEleChild[i]).addClass(opts.tabClicked);
                        window.tabsWrapper.slideTo(i, 1000, false); // 切换到某个slide，速度为1秒
                        return addTabEleChild[i];
                    }
                }
            },
            /**格式化a标签
             * @param ele 传进来的a标签
             * @returns eleTitle a标签标题 
             * @returns eleId a标签id 
             */
            formatAHtml = function(ele) {
                const eleHtml = $(ele).html(),
                    tEnd = eleHtml.indexOf(' '),
                    eleTitle = tEnd ? eleHtml.substring(0, tEnd) : eleHtml,
                    eleId = tEnd ? eleHtml.substring(tEnd + 1) : eleHtml;
                return { eleTitle: eleTitle, eleId: eleId };
            },
            /**顶部导航：点击事件
             * @param ele
             */
            tabItemClick = function(ele) {
                $(that).find('.nav_item').removeClass(opts.navClicked).find('span.icon').removeClass(opts.navClickIcon).addClass(opts.navDefaulIcon);
                $(that).find('ul').hide();
                $(ele).addClass(opts.tabClicked).siblings().removeClass(opts.tabClicked); // 顶部tab
                window.tabsWrapper.slideTo($(ele).index(), 1000, false); // 切换到某个slide，速度为1秒
                // 顶部导航没有hred属性不允许跳转-S
                if ($(ele).children('a').attr('href') == '#') layer.msg('顶部导航不支持href="#"的操作！！！</br>请检查代码！！！');
                else loadPage($(ele).find('a'));
                // 顶部导航没有hred属性不允许跳转-E
                const _html = formatAHtml($(ele).find('a')); // 格式化a标签
                sideNavStyle($(that), _html.eleTitle);
            },
            /**侧边方法封装 */
            sideNavStyle = function(ele, str) {
                str = str.trim();
                const navEleChild = $(ele).children(),
                    navEleChildLen = navEleChild.length;
                for (let i = 0; i < navEleChildLen; i++) {
                    if ($(navEleChild[i]).children('div').find('span').eq(0).html() == str) {
                        $(navEleChild[i]).addClass(opts.navClicked);
                        if ($(navEleChild[i]).parent().is(':hidden')) {
                            if (!isHorizontal) {
                                $(navEleChild[i]).parents().show(opts.openingSpeed, function() {
                                    setTimeout(function() {
                                        navScroll.update(); // 刷新导航滚动条
                                    }, 500);
                                });
                            }
                            $(navEleChild[i]).parents('.nav_item').children('div').find('span.icon').removeClass(opts.navDefaulIcon).addClass(opts.navClickIcon);
                        }
                    } else if ($(navEleChild[i]).children().is('ul')) {
                        sideNavStyle($(navEleChild[i]).children('ul'), str);
                    }
                }
            },
            /**顶部导航：删除事件 */
            removeTabs = function(ele, event) {
                event.stopPropagation(); // 阻止冒泡
                // 判断关闭的是否是默认的-S
                if ($(ele).parent().hasClass(opts.tabClicked))
                    tabItemClick($(ele).parent().prev());
                window.tabsWrapper.removeSlide($(ele).parent().index());
                // 判断关闭的是否是默认的-E
            },
            /**顶部导航：关闭全部 */
            removeTabsAll = function() {
                tabItemClick($(opts.tabWrapper).children().eq(0));
                for (let i = 1; i < $(opts.tabWrapper).children().length; i++) {
                    window.tabsWrapper.removeSlide(i);
                    i--;
                }
            },
            /**顶部导航：关闭其他 */
            removeTabsOther = function() {
                for (let i = 1; i < $(opts.tabWrapper).children().length; i++) {
                    if ($(opts.tabWrapper).children().eq(i).hasClass(opts.tabClicked))
                        continue;
                    window.tabsWrapper.removeSlide(i);
                    i--;
                }
            };
        initPlugIn();
        init();
        return {
            init: init,
            addTabs: addTabs,
            tabItemClick: tabItemClick,
            removeTabs: removeTabs,
            removeTabsAll: removeTabsAll,
            removeTabsOther: removeTabsOther,
        };
    };
})($);