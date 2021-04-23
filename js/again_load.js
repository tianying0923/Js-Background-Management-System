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
    var bmsSelect = $('body').BmsSelect();
    /**表单-重置 */
    $('form input[type="reset"]').click(function() {
        bmsSelect.uncheckAll();
    });
    /**表单-提交 */
    $('form input[type="submit"]').click(function() {
        console.log(123);
        console.log($('form'))
            // for (var i of formC) {
            //     if ($(i).find('.form_lable').hasClass('required')) {
            //         $(i)
            //     }
            // }
            // .ch('.bms_form_item')
        return false;
    });
});