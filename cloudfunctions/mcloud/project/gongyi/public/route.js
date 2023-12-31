/**
 * Notes: 路由配置文件
  * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * User: CC
 * Date: 2020-10-14 07:00:00
 */

module.exports = {
	'test/test': 'test/test_controller@test',

	'home/setup_get': 'home_controller@getSetup',

	'passport/login': 'passport_controller@login',
	'passport/phone': 'passport_controller@getPhone',
	'passport/my_detail': 'passport_controller@getMyDetail',
	'passport/my_info': 'passport_controller@getMyInfo',
	'passport/register': 'passport_controller@register',
	'passport/edit_base': 'passport_controller@editBase',

	// 收藏
	'fav/update': 'fav_controller@updateFav',
	'fav/del': 'fav_controller@delFav',
	'fav/is_fav': 'fav_controller@isFav',
	'fav/my_list': 'fav_controller@getMyFavList',

	'admin/home': 'admin/admin_home_controller@adminHome',
	'admin/clear_vouch': 'admin/admin_home_controller@clearVouchData',

	'admin/login': 'admin/admin_mgr_controller@adminLogin',
	'admin/mgr_list': 'admin/admin_mgr_controller@getMgrList',
	'admin/mgr_insert': 'admin/admin_mgr_controller@insertMgr',
	'admin/mgr_del': 'admin/admin_mgr_controller@delMgr',
	'admin/mgr_detail': 'admin/admin_mgr_controller@getMgrDetail',
	'admin/mgr_edit': 'admin/admin_mgr_controller@editMgr',
	'admin/mgr_status': 'admin/admin_mgr_controller@statusMgr',
	'admin/mgr_pwd': 'admin/admin_mgr_controller@pwdMgr',
	'admin/log_list': 'admin/admin_mgr_controller@getLogList',
	'admin/log_clear': 'admin/admin_mgr_controller@clearLog',

	'admin/setup_set': 'admin/admin_setup_controller@setSetup',
	'admin/setup_set_content': 'admin/admin_setup_controller@setContentSetup',
	'admin/setup_qr': 'admin/admin_setup_controller@genMiniQr',

	// 用户
	'admin/user_list': 'admin/admin_user_controller@getUserList',
	'admin/user_detail': 'admin/admin_user_controller@getUserDetail',
	'admin/user_del': 'admin/admin_user_controller@delUser',
	'admin/user_status': 'admin/admin_user_controller@statusUser',

	'admin/user_data_get': 'admin/admin_user_controller@userDataGet',
	'admin/user_data_export': 'admin/admin_user_controller@userDataExport',
	'admin/user_data_del': 'admin/admin_user_controller@userDataDel',


	// 内容  
	'home/list': 'home_controller@getHomeList',
	'news/list': 'news_controller@getNewsList',
	'news/view': 'news_controller@viewNews',

	'admin/news_list': 'admin/admin_news_controller@getAdminNewsList',
	'admin/news_insert': 'admin/admin_news_controller@insertNews',
	'admin/news_detail': 'admin/admin_news_controller@getNewsDetail',
	'admin/news_edit': 'admin/admin_news_controller@editNews',
	'admin/news_update_forms': 'admin/admin_news_controller@updateNewsForms',
	'admin/news_update_pic': 'admin/admin_news_controller@updateNewsPic',
	'admin/news_update_content': 'admin/admin_news_controller@updateNewsContent',
	'admin/news_del': 'admin/admin_news_controller@delNews',
	'admin/news_sort': 'admin/admin_news_controller@sortNews',
	'admin/news_status': 'admin/admin_news_controller@statusNews',
	'admin/news_vouch': 'admin/admin_news_controller@vouchNews',

	// 相册
	'album/list': 'album_controller@getAlbumList',
	'album/view': 'album_controller@viewAlbum',

	'admin/album_list': 'admin/admin_album_controller@getAdminAlbumList',
	'admin/album_insert': 'admin/admin_album_controller@insertAlbum',
	'admin/album_detail': 'admin/admin_album_controller@getAlbumDetail',
	'admin/album_edit': 'admin/admin_album_controller@editAlbum',
	'admin/album_update_forms': 'admin/admin_album_controller@updateAlbumForms',
	'admin/album_del': 'admin/admin_album_controller@delAlbum',
	'admin/album_sort': 'admin/admin_album_controller@sortAlbum',
	'admin/album_vouch': 'admin/admin_album_controller@vouchAlbum',
	'admin/album_status': 'admin/admin_album_controller@statusAlbum',

	// 登记
	'enroll/list': 'enroll_controller@getEnrollList',
	'enroll/view': 'enroll_controller@viewEnroll',
	'enroll/detail_for_join': 'enroll_controller@detailForEnrollJoin',
	'enroll/join': 'enroll_controller@enrollJoin',
	'enroll/join_edit': 'enroll_controller@enrollJoinEdit',
	'enroll/my_join_list': 'enroll_controller@getMyEnrollJoinList',
	'enroll/my_join_cancel': 'enroll_controller@cancelMyEnrollJoin',
	'enroll/my_join_detail': 'enroll_controller@getMyEnrollJoinDetail',

	'admin/enroll_list': 'admin/admin_enroll_controller@getAdminEnrollList',
	'admin/enroll_insert': 'admin/admin_enroll_controller@insertEnroll',
	'admin/enroll_detail': 'admin/admin_enroll_controller@getEnrollDetail',
	'admin/enroll_edit': 'admin/admin_enroll_controller@editEnroll',
	'admin/enroll_update_forms': 'admin/admin_enroll_controller@updateEnrollForms',
	'admin/enroll_clear': 'admin/admin_enroll_controller@clearEnrollAll',
	'admin/enroll_del': 'admin/admin_enroll_controller@delEnroll',
	'admin/enroll_sort': 'admin/admin_enroll_controller@sortEnroll',
	'admin/enroll_vouch': 'admin/admin_enroll_controller@vouchEnroll',
	'admin/enroll_status': 'admin/admin_enroll_controller@statusEnroll',
	'admin/enroll_join_list': 'admin/admin_enroll_controller@getEnrollJoinList',
	'admin/enroll_join_status': 'admin/admin_enroll_controller@statusEnrollJoin',
	'admin/enroll_cancel_join_all': 'admin/admin_enroll_controller@cancelEnrollJoinAll',
	'admin/enroll_join_del': 'admin/admin_enroll_controller@delEnrollJoin',
	'admin/enroll_join_data_get': 'admin/admin_enroll_controller@enrollJoinDataGet',
	'admin/enroll_join_data_export': 'admin/admin_enroll_controller@enrollJoinDataExport',
	'admin/enroll_join_data_del': 'admin/admin_enroll_controller@enrollJoinDataDel',


}