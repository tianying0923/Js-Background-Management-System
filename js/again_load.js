$(function() {
    /**内容-全局下拉列表 */
    $('#bms_content .dropdown_wrapper').BmsDropdown({
        method: 'click'
    });

    /**内容-选项卡*/
    $.bms_swiper_tab({
        tabTitleWrapper: '#bms_content .tab_title_wrapper',
        tabMainWrapper: '#bms_content .tab_main_wrapper',
    });
    $.bms_swiper_tab({
        tabTitleWrapper: '#bms_content .dropdown_wrapper .tab_title_wrapper',
        tabMainWrapper: '#bms_content .dropdown_wrapper .tab_main_wrapper'
    });
    $('body').BmsGrid();
    $('body').BmsSelect();
    // const bodyOpts = $('body').find('option');
    // console.log(bodyOpts);
    // if (bodyOpts.length > 0) {
    //     for (const i of bodyOpts) {
    //         console.log(i)
    //         if ($(i).val() === '0') $(i).remove();
    //     }
    // }
});