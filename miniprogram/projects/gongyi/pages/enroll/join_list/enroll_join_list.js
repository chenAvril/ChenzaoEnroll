const AdminBiz = require('../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../helper/cache_helper.js');
const helper = require('../../../../../helper/helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');

const CACHE_CANCEL_REASON = 'ENROLL_JOIN_CANCEL_REASON';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isAllFold: true,

		parentDayIdx: 0,
		parentTimeIdx: 0,

		menuIdx: 0,

		enrollId: '',

		title: '',
		titleEn: '',

		cancelModalShow: false,
		cancelAllModalShow: false,
		formReason: '',
		curIdx: -1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (!AdminBiz.isAdmin(this, false, false)) return;

		// 附加参数 
		if (options && options.enrollId) {


			this.setData({
				enrollId: options.enrollId,
				_params: {
					enrollId: options.enrollId,
					sortType: "sort",
					sortVal: "new",
				},
			}, () => {
				this.setData({
					isLoad: true
				});

				this._getSearchMenu();
			});
		}

		if (options && options.title) {
			let title = decodeURIComponent(options.title);
			this.setData({
				title,
				titleEn: options.title
			});
			wx.setNavigationBarTitle({
				title: '名单 - ' + title
			});
		}

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {

		if (helper.isDefined(e.detail.search))
			this.setData({
				search: '',
				sortType: '',
			});
		else {
			let dataList = e.detail.dataList;
			if (dataList) {
				for (let k = 0; k < dataList.list.length; k++) {
					dataList.list[k].fold = this.data.isAllFold;
				}
			}

			this.setData({
				dataList,
			});
			if (e.detail.sortType)
				this.setData({
					sortType: e.detail.sortType,
				});
		}

	},

	// 修改与展示状态菜单
	_getSearchMenu: function () {
		let sortItems = [];
		let sortMenus = [];
		this.setData({
			sortItems,
			sortMenus
		})
	},

	bindClearReasonTap: function (e) {
		this.setData({
			formReason: ''
		})
	}
})