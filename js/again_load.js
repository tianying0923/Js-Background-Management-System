$(function() {
    /**内容-全局下拉列表 */
    $('#bms_content .dropdown_wrapper').BmsDropdown({
        method: 'click'
    });

    /**内容-选项卡-样式1 */
    $.bms_swiper_tab({
        tabTitleWrapper: '#bms_content .tab_title_wrapper',
        tabMainWrapper: '#bms_content .tab_main_wrapper',
    });

    /**内容-选项卡-样式2 */
    $.bms_swiper_tab({
        tabTitleWrapper: '#bms_content .dropdown_wrapper .tab_title_wrapper',
        tabMainWrapper: '#bms_content .dropdown_wrapper .tab_main_wrapper'
    });

    /**栅格*/
    $.bms_grid();

    var bmsSelect = $.bms_select();

    /**表单-重置 */
    $('form input[type="reset"]').click(function() {
        $(this).parents('form').find('.required_info').removeClass('show');
        bmsSelect.uncheckAll();
    });

    /**表单-提交 */
    $('form input[type="submit"]').click(function() {
        var formChildren = $(this).parents('form').children();
        for (var i of formChildren) {
            if ($(i).find('.form_lable').hasClass('required') && (!$(i).find('.required_info').prev().val() || $(i).find('.required_info').prev().val() == ''))
                $(i).find('.required_info').addClass('show');
        }
        return false;
    });
});