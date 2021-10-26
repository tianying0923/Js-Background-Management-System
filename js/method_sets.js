/**需要挂在某一个元素上 */
(function($) {
    'use strict';
    $.fn.extend({
        /**主体
         * @param {String} [navClicked = 'nav_active']  选填，导航选中class
         * @param {String} [navDefaulIcon = 'fa-angle-down']    选填，导航默认右侧图标class
         * @param {String} [navClickIcon = 'fa-angle-up']   选填，导航点击后右侧图标class
         * @param {String} [navHDefaulIcon = 'fa-angle-right' ] 选填，导航收起默认右侧图标class
         * @param {String} [navHClickIcon = 'fa-angle-right'] 选填，导航收起选中右侧图标class
         * @param {String} [tabWrapper = '.tabs_wrapper'] 选填，点击右侧导航添加tab的父容名
         * @param {String} [tabClicked = 'tab_active'] 选填，tabs选中class
         */
        BmsLayout: function(options) {
            let navScroll, isHorizontal;
            const defOpts = {
                    openingSpeed: 400, // 打开菜单动画时间
                    closingSpeed: 400, // 关闭菜单动画时间
                    navClicked: 'nav_active',
                    navDefaulIcon: 'fa-angle-down',
                    navClickIcon: 'fa-angle-up',
                    navHDefaulIcon: 'fa-angle-right',
                    navHClickIcon: 'fa-angle-left',
                    tabWrapper: '.tabs_wrapper',
                    tabClicked: 'tab_active'
                },
                opts = $.extend({}, defOpts, options),
                that = this,
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
                    window.navWrapW = $('#bms_nav').width();
                    $('#bms_nav').css({
                        'padding': headerH + 'px 0 0 0'
                    });
                    $('#bms_tabs').css({ // 设置tab宽度
                        'left': window.navWrapW,
                        'top': headerH
                    });
                    $('#bms_content').css({
                        'margin': (headerH + tabsWrapH + 10) + 'px 10px ' + (footerH + 10) + 'px ' + (window.navWrapW + 10) + 'px',
                    });
                    $('#bms_footer').css({ // 设置footer宽度
                        'left': window.navWrapW
                    });
                    $('#bms_header .dropdown_hide').css({
                        'top': headerH - 10
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
                    const _html = formatAHtml($(opts.tabWrapper).children('.' + opts.tabClicked).children('a')); // 格式化a标签
                    if (isHorizontal) {
                        $('.header_logo').css('width', '60px');
                        $('.logo_hide').show().siblings().hide();
                        for (const i of $(that).find('.nav_item')) {
                            if ($(i).children('div').find('span').eq(0).html() === _html.eleTitle) {
                                navItemClickFun($(i));
                                break;
                            }
                        }
                    } else {
                        $('.header_logo').css('width', '224px');
                        $('.logo_hide').hide().siblings().show();
                        if ($(opts.tabWrapper).children().length > 1) {
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
                        $(ele).find('a').css({ 'padding': '6px 15px 5px 0' });
                        $(ele).find('.nav_sub_wrapper').css({ 'left': $(ele).width() + 'px' });
                    } else {
                        $(ele).find('a').css({ 'padding': '16px 5px 16px ' + 20 * num + 'px' });
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
                            'mouseenter ': navItemMouseenter,
                            'mouseleave': navItemMouseleave,
                        });
                    }
                },
                /**初始化插件 */
                initPlugIn = function() {
                    navScroll = new Swiper('#bms_nav .swiper-container', { // 导航栏滚动条
                        direction: 'vertical',
                        roundLengths: true, // 宽和高取整(四舍五入)
                        slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量
                        freeMode: true,
                        scrollbar: { // 滚动条
                            el: '#bms_nav .swiper-scrollbar',
                        },
                        mousewheel: true, // 鼠标滚动
                    });
                    navScroll.scrollbar.$el.css('width', '3px'); // 设置滚动条宽度
                    navScroll.scrollbar.$dragEl.css('background', 'rgba(0,0,0,0.3)'); // 设置滚动条颜色
                },
                /**侧边导航：鼠标悬浮事件 */
                navItemMouseenter = function() {
                    $(this).children('.nav_sub_wrapper').show();
                    $(this).children('div').find('span.icon').toggleClass(opts.navHClickIcon + ' ' + opts.navHDefaulIcon);
                },
                /**侧边导航：鼠标离开事件 */
                navItemMouseleave = function() {
                    $(this).children('.nav_sub_wrapper').hide();
                    $(this).children('div').find('span.icon').toggleClass(opts.navHClickIcon + ' ' + opts.navHDefaulIcon);
                },
                /**侧边导航：鼠标点击事件 */
                navItemClick = function(event) {
                    event.stopPropagation(); // 阻止冒泡
                    if (isHorizontal) {
                        // 子导航存在
                        if ($(this).children('ul').is('.nav_sub_wrapper')) event.preventDefault(); // 取消超链接
                        // 子导航不存在 
                        else navItemClickFun($(this));
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
                            event.preventDefault(); // 取消超链接
                        } else { // 子导航不存在
                            navItemClickFun($(this));
                        }
                    }
                },
                /**封装：点击方法 */
                navItemClickFun = function(ele) {
                    const eleA = $(ele).children('div').children('a'),
                        eleSpanHtml = $(ele).children('div').find('span').eq(0).html(),
                        eleAHref = $(eleA).attr('href');
                    if (eleAHref == '#') layer.msg('顶部导航不支持href="#"的操作！！！</br>请检查代码！！！');
                    else {
                        if (isHorizontal) {
                            // 给当前点击元素增加背景色
                            if ($(ele).parents('.nav_item').length) $(ele).parents('.nav_item').addClass(opts.navClicked).siblings().removeClass(opts.navClicked);
                            // 给当前点击元素增加背景色
                            else $(ele).addClass(opts.navClicked).siblings().removeClass(opts.navClicked);
                        } else $(ele).addClass(opts.navClicked); // 给当前点击元素增加背景色
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
                    $('#bms_content').load((_html.indexOf('/') >= 0 ? '.' : '') + _html + '.html');
                    // 需要重新加载的js
                    $.getScript('./js/again_load.js');
                },
                /**顶部导航：添加
                 * @param eleHtml 选中元素的html
                 * @param eleHref 选中元素的href
                 */
                addTabs = function(eleHtml, eleHref) {
                    const start = eleHref.indexOf('id=') + 3,
                        end = eleHref.indexOf('&'),
                        _id = start > 2 ? end > start ? eleHref.substring(start, end) : eleHref.substring(start) : '';
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
        },
        /** 
         * 下拉列表
         * @method BmsDropdown
         * @param {String} [method = 'mouseleave'] 选填，事件
         */
        BmsDropdown: function(options) {
            const defOpts = {
                    method: 'mouseleave',
                },
                opts = $.extend({}, defOpts, options),
                that = this,
                /**初始化 */
                init = function() {
                    initFunction();
                },
                /**初始化事件 */
                initFunction = function() {
                    $(that).off();
                    if (opts.method === 'click') {
                        $(that).on({
                            'click ': dropdownMouseenter,
                            'mouseleave': dropdownMouseleave
                        });
                    } else {
                        $(that).on({
                            'mouseenter ': dropdownMouseenter,
                            'mouseleave': dropdownMouseleave
                        });
                    }
                },
                dropdownMouseenter = function() {
                    $(this).find('.dropdown_hide').stop();
                    let childrenHeightSum = 0;
                    const childrenHeight = $(this).find('.dropdown_hide').children();
                    for (const i of childrenHeight) childrenHeightSum += $(i).height();
                    $(this).find('.dropdown_hide').animate({
                        'height': childrenHeightSum + 'px'
                    });
                },
                dropdownMouseleave = function() {
                    $(this).find('.dropdown_hide').stop();
                    $(this).find('.dropdown_hide').animate({
                        'height': '0'
                    });
                };
            init();
        },
    });

})($);

/**不用挂，就是全局 */
jQuery.extend({
    /** tab选项卡切换
     * @method bms_swiper_tab
     * @param tabTitleWrapper 选项卡头
     * @param tabMainWrapper 选项卡内容
     */
    bms_swiper_tab: function(options) {
        let opts = {
                effect: options.effect || 'fade',
            },
            tabTitle, tabMain;
        opts = $.extend({}, opts, options);
        /**初始化 */
        const init = function() {
                initPlugIn();
                initFunction();
            },
            /**初始化事件 */
            initFunction = function() {
                // 上一步
                $(opts.tabMainWrapper).find('.btn_prev').click(function() {
                    var activeNavIndex = $(opts.tabTitleWrapper + ' .' + opts.tabClicked).index() - 1;
                    tabMain.slideTo(activeNavIndex);
                    event.stopPropagation(); // 阻止冒泡
                    return false;
                });
                // 下一步
                $(opts.tabMainWrapper).find('.btn_next').click(function() {
                    var activeNavIndex = $(opts.tabTitleWrapper + ' .' + opts.tabClicked).index() + 1;
                    tabMain.slideTo(activeNavIndex);
                    event.stopPropagation(); // 阻止冒泡
                    return false;
                });
            },
            /**初始化插件 */
            initPlugIn = function() {
                tabTitle = new Swiper(opts.tabTitleWrapper, {
                    slidesPerView: 'auto',
                    allowSlideNext: false, // 禁止向右或下滑动
                    allowSlidePrev: false, // 禁止向左或上滑动
                });
                tabMain = new Swiper(opts.tabMainWrapper, {
                    autoHeight: true, // 自动高度
                    effect: opts.effect, // 淡入淡出
                    simulateTouch: false, // 鼠标拖动无效
                    observer: true,
                    observeSlideChildren: true, // 子slide更新时，swiper更新
                    observeParents: true, // 当Swiper的祖先元素变化时，例如window.resize，Swiper更新
                    fadeEffect: {
                        crossFade: true, // 开启淡出效果
                    },
                    thumbs: {
                        swiper: tabTitle
                    }
                });
            };
        init();
    },
    /** 
     * 栅格
     * @method bms_grid
     */
    bms_grid: function() {
        const init = function() {
            for (const i of $('.bms_row')) { // 获取页面带有class=bms_row的元素，循环
                const rowAttrStr = $(i).attr('class');
                let colSpaceVal = rowAttrStr.match(/\d+/); // 正则匹配获取子元素左右边距
                if (colSpaceVal) {
                    colSpaceVal = colSpaceVal[0].match(/^\d{1,2}/);
                    $(i).children().css({
                        'padding': '0 ' + colSpaceVal / 2 + 'px',
                    });
                }
                for (const j of $(i).children()) { // 获取页面带有class=bms_row的子元素，循环
                    // 先判断屏幕大小，然后再决定用哪个？
                    const colAttrStr = $(j).attr('class'),
                        md = colAttrStr.match(/md\d/),
                        lg = colAttrStr.match(/lg\d/),
                        xl = colAttrStr.match(/_xl\d/),
                        def = colAttrStr.match(/col\d+/);
                    let colVal = def; // 正则匹配获取子元素宽度
                    if (windowW < 1200) {
                        colVal = md || lg || xl || def; // md
                    } else if (windowW < 1600) colVal = lg || xl || def; // lg
                    else if (windowW < 1600) colVal = xl || def; // xl 
                    if (colVal) {
                        if (colVal[0].match(/\d{1,2}/) > 12) colVal = colVal[0].match(/^\d{1}/);
                        else colVal = colVal[0].match(/\d{1,2}/);
                    } else {
                        if (!$(j).siblings().length) colVal = 12;
                        else colVal = 1;
                    }
                    $(j).css({
                        'flex': '0 0' + 100 / 12 * colVal + '%',
                        'max-width': 100 / 12 * colVal + '%',
                    });
                }
            }
        };
        init();
    },
    /**
     * 下拉框-select 
     * @method bms_select
     * @param {String} [placeholder = '请选择'] 选填，默认提示
     * @param {Boolean} [showClear = false] 选填，是否展示清空按钮
     * @param {Boolean} [filter = false] 选填，是否允许搜索/过滤
     * @param {Boolean} [filterGroup = false] 选填，是否允许搜索/过滤分组
     * @param {Boolean} [selectAll = false] 选填，是否允许全选按钮；注：仅用于多选分组
     * @return {Method = uncheckAll}  清空下拉框
     */
    bms_select: function() {
        const defOpts = {
                placeholder: '请选择',
                showClear: false,
                filter: false,
                filterGroup: false,
                selectAll: false
            },
            single = $('.form_select_single'), // 单选
            multiples = $('.form_select_multiple'), // 多选
            init = function() {
                for (const i of single) {
                    $(i).multipleSelect({
                        single: true,
                        width: '100%',
                        showClear: $(i).data("showclear") || defOpts.showClear, // 清空按钮
                        filter: $(i).data("filter") || defOpts.filter, // 搜索/过滤
                        placeholder: $(i).data("placeholder") || defOpts.placeholder, // 提示/占位符
                        formatNoMatchesFound: function() { // 格式化
                            return '未找到匹配项'
                        }
                    });
                }
                for (const j of multiples) {
                    $(j).multipleSelect({
                        width: '100%',
                        showClear: $(j).data("showclear") || defOpts.showClear, // 清空按钮
                        filter: $(j).data("filter") || defOpts.filter, // 搜索/过滤
                        filterGroup: $(j).data("filtergroup") || defOpts.filterGroup, // 搜索/过滤分组
                        placeholder: $(j).data("placeholder") || defOpts.placeholder, // 提示/占位符
                        selectAll: !$(j).data("selectall") || defOpts.selectAll, // 全选按钮
                        ellipsis: true, // 超出宽度省略号
                        minimumCountSelected: 1000, // 超出宽度省略号
                        formatSelectAll: function() { // 格式化
                            return '全选'
                        },
                        formatAllSelected: function() { // 格式化
                            return '全选'
                        },
                        formatNoMatchesFound: function() { // 格式化
                            return '未找到匹配项'
                        },
                    });
                }
            },
            uncheckAll = function() {
                single.multipleSelect('uncheckAll');
                multiples.multipleSelect('uncheckAll');
            };
        init();
        return {
            uncheckAll: uncheckAll
        };
    }
});