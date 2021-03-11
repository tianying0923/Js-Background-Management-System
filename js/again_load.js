$(function() {
    /**内容-全局下拉列表 */
    $('#content .dropdown_wrapper').Dropdown({
        method: 'click'
    });

    /**内容-选项卡*/
    $.swiper_tab({
        tabTitleWrapper: '#content .tab_title_wrapper',
        tabMainWrapper: '#content .tab_main_wrapper',
    });
    $.swiper_tab({
        tabTitleWrapper: '#content .dropdown_wrapper .tab_title_wrapper',
        tabMainWrapper: '#content .dropdown_wrapper .tab_main_wrapper'
    });
    $('body').ZmLayout();
});