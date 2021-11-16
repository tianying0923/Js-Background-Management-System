/** ---------- S-内部页面跳转 ---------- */
$(document).on({
    click: function() {
        const addTabEleChild = window.layout.addTabs($(this).html(), $(this).attr('href'));
        window.layout.tabItemClick($(addTabEleChild));
    }
}, '.jump_page');
/** ---------- E-内部页面跳转 ---------- */

$(function() {
    /** ---------- S-收放左侧导航按钮 ---------- */
    $('.header_btn').click(function() {
        $('#bms_nav').toggleClass('horizontal');
        $(this).children().toggleClass('fa-indent fa-outdent');
        layout.init();
        layout.tabsWrapper.update(); // 顶部导航
    });
    /** ---------- E-收放左侧导航按钮 ---------- */

    /** ---------- S-全屏按钮 ---------- */
    $('.screenfull_btn').click(function() {
        if (screenfull.enabled) {
            $(this).children().toggleClass('fa-arrows-alt fa-undo');
            screenfull.toggle();
        }
    });
    /** ---------- E-全屏按钮 ---------- */

    /** ---------- S-下拉选项卡 ---------- */
    $('.dropdown_wrapper').BmsDropdown();
    $.bms_swiper_tab({
        tabTitleWrapper: '#bms_header .dropdown_wrapper .tab_title_wrapper',
        tabMainWrapper: '#bms_header .dropdown_wrapper .tab_main_wrapper'
    });
    /** ---------- E-下拉选项卡 ---------- */

    /** ---------- S-清除缓存 ---------- */
    $('.clear_cache').click(function() {
        localStorage.clear();
        window.location.reload()
    });
    /** ---------- E-清除缓存 ---------- */

    /** ---------- S-TAB点击效果 ---------- */
    $('#bms_tabs').on('click', '.swiper-slide', function() {
        layout.tabItemClick($(this));
    });
    /** ---------- E-TAB点击效果 ---------- */

    /** ---------- S-TAB选中效果 ---------- */
    $('#bms_tabs').on('click', '.swiper-slide .icon', function(event) {
        layout.removeTabs($(this), event);
    });
    /** ---------- E-TAB选中效果 ---------- */

    /** ---------- S-关闭其他 ---------- */
    $('.close_other').on('click', function() {
        layout.removeTabsOther();
    });
    /** ---------- E-关闭其他 ---------- */

    /** ---------- S-关闭所有 ---------- */
    $('.clost_all').on('click', function() {
        layout.removeTabsAll();
    });
    /** ---------- E-关闭所有 ---------- */

    /** ---------- S-电脑屏幕小于1400时左侧导航自动收起 ---------- */
    if (windowW <= 1400) $('.header_btn').click();
    /** ---------- E-电脑屏幕小于1400时左侧导航自动收起 ---------- */

});