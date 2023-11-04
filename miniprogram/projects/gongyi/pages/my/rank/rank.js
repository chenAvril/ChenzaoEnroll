// projects/gongyi/pages/my/rank/rank.js
const AdminBiz = require('../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../helper/cache_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../public/project_setting.js');

const CACHE_USER_CHECK_REASON = 'CACHE_USER_CHECK_REASON';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		//设置搜索菜单
		await this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	_getSearchMenu: async function () {

		let cateList = projectSetting.ENROLL_CATE;

		let sortMenus = [];
		cateList.forEach((item) => {
			switch (item.id) {
				case 1:
					sortMenus.push({
						label: item.title,
						type: 'sort',
						value: 'USER_POINT_LUYANG|asc'
					}, );
					break;
				case 2:
					sortMenus.push({
						label: item.title,
						type: 'sort',
						value: 'USER_POINT_LUYANG|desc'
					}, );
					break;
				case 3:
					sortMenus.push({
						label: item.title,
						type: 'sort',
						value: 'USER_POINT_LUYANG|asc'
					}, );
					break;
			}


		});

		this.setData({
			search: '',
			sortMenus,
			isLoad: true,
			_params: {
				sortType: "sort",
				sortVal: "USER_POINT_LUYANG|asc",
			},
		})


	}
})