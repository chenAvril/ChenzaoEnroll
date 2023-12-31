const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const EnrollBiz = require('../../../../biz/enroll_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ENROLL_NAME + '-管理',
		});
		this.setData({
			ENROLL_NAME: projectSetting.ENROLL_NAME
		});

		//设置搜索菜单
		this._getSearchMenu();

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

  watchLocation: function(e){
    wx.openLocation({
      latitude:e.currentTarget.dataset.location.latitude,
      longitude:e.currentTarget.dataset.location.longitude,
      name:e.currentTarget.dataset.location.name,
      address:e.currentTarget.dataset.location.address,
    })
  },

	bindJoinMoreTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let itemList = ['填报名单管理', '导出名单Excel表格', '清空填报数据'];

		let enrollId = pageHelper.dataset(e, 'id');
		let title = encodeURIComponent(pageHelper.dataset(e, 'title'));

		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: {
						let checkSet = encodeURIComponent(pageHelper.dataset(e, 'check'));
						wx.navigateTo({
							url: '../join_list/admin_enroll_join_list?enrollId=' + enrollId + '&title=' + title + '&checkSet=' + checkSet,
						});
						break;
					}
					case 1: {
						wx.navigateTo({
							url: '../export/admin_enroll_export?enrollId=' + enrollId + '&title=' + title,
						});
						break;
					}
					case 2: {
						this._clear(e);
						break;
					}
				}
			},
			fail: function (res) {}
		})
	},

	_clear: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '处理中'
				}
				await cloudHelper.callCloudSumbit('admin/enroll_clear', params, opts).then(res => {
					let node = {
						'ENROLL_JOIN_CNT': 0,
					}
					pageHelper.modifyPrevPageListNodeObject(id, node, 1);

					pageHelper.showSuccToast('清空完成');
				});
			} catch (err) {
				console.log(err);
			}
		}
		pageHelper.showConfirm('确认清空所有数据？清空后不可恢复', callback);

	},

	bindStatusMoreTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let itemList = ['启用', '停用 (不显示)', '删除当前报名'];
		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: { //启用
						e.currentTarget.dataset['status'] = 1;
						await this._setStatus(e);
						break;
					}
					case 1: { //停止 
						e.currentTarget.dataset['status'] = 0;
						await this._setStatus(e);
						break;
					}
					case 2: { //删除
						await this._del(e);
						break;
					}
				}
			},
			fail: function (res) {}
		})
	},

	_setSort: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;

		let id = pageHelper.dataset(e, 'id');
		let sort = pageHelper.dataset(e, 'sort');
		if (!id) return;

		let params = {
			id,
			sort
		}

		try {
			await cloudHelper.callCloudSumbit('admin/enroll_sort', params).then(res => {
				pageHelper.modifyListNode(id, this.data.dataList.list, 'ENROLL_ORDER', sort);
				this.setData({
					dataList: this.data.dataList
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (err) {
			console.log(err);
		}
	},

	_setVouch: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;

		let id = pageHelper.dataset(e, 'id');
		let vouch = pageHelper.dataset(e, 'vouch');
		if (!id) return;

		let params = {
			id,
			vouch
		}

		try {
			await cloudHelper.callCloudSumbit('admin/enroll_vouch', params).then(res => {
				pageHelper.modifyListNode(id, this.data.dataList.list, 'ENROLL_VOUCH', vouch);
				this.setData({
					dataList: this.data.dataList
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (err) {
			console.log(err);
		}
	},

	_del: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/enroll_del', params, opts).then(res => {
					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (err) {
				console.log(err);
			}
		}
		pageHelper.showConfirm('确认删除？删除后用户记录数据将一并删除且不可恢复', callback);

	},

	_setStatus: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');
		let status = Number(pageHelper.dataset(e, 'status'));
		let params = {
			id,
			status
		}

		try {
			await cloudHelper.callCloudSumbit('admin/enroll_status', params).then(res => {

				console.log('res', res)
				pageHelper.modifyListNode(id, this.data.dataList.list, 'ENROLL_STATUS', status, '_id');
				pageHelper.modifyListNode(id, this.data.dataList.list, 'statusDesc', res.data.statusDesc, '_id');
				this.setData({
					dataList: this.data.dataList
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (err) {
			console.log(err);
		}
	},

	_getSearchMenu: function () {
		let cateIdOptions = EnrollBiz.getCateList();

		let sortItem1 = [{
			label: '分类',
			type: '',
			value: 0
		}];
		sortItem1 = sortItem1.concat(cateIdOptions);

		let sortItem2 = [{
				label: '排序',
				type: '',
				value: 0
			},
			{
				label: '按报名人数',
				type: 'sort',
				value: 'ENROLL_JOIN_CNT|desc'
			},
			{
				label: '按报名开始时间',
				type: 'sort',
				value: 'ENROLL_START|desc'
			},
			{
				label: '按报名截止时间',
				type: 'sort',
				value: 'ENROLL_END|desc'
			},
		];

		let sortItems = [];
		if (sortItem1.length > 2) sortItems.push(sortItem1);
		sortItems.push(sortItem2);

		let sortMenus = [{
				label: '全部',
				type: '',
				value: ''
			},
			{
				label: '正常',
				type: 'status',
				value: 1
			},
			{
				label: '停用',
				type: 'status',
				value: 0
			},
			// { label: '最新', type: 'sort', value: 'new' },
		]
		this.setData({
			search: '',
			cateIdOptions,
			sortItems,
			sortMenus,
			isLoad: true
		})
	}

})