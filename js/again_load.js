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
    $('body').JaGrid();
    $('body').JaSelect();
    const bodyOpts = $('body').find('option');
    // console.log(bodyOpts);
    // if (bodyOpts.length > 0) {
    //     for (const i of bodyOpts) {
    //         console.log(i)
    //         if ($(i).val() === '0') $(i).remove();
    //     }
    // }
});