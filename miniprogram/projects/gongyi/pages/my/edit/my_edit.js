const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const validate = require('../../../../../helper/validate.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const setting = require('../../../../../setting/setting.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: true,

		userRegCheck: projectSetting.USER_REG_CHECK,
		mobileCheck: setting.MOBILE_CHECK
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		await this._loadDetail();


		// https://blog.csdn.net/weixin_33557724/article/details/89601716
		// wx.login({
		// 	success(res) {
		// 		console.log('1', res);
		// 		if (res.code) {
		// 			let sessionKey = res.code

		// 			// 已经授权，可以直接调用 getUserInfo 获取头像昵称
		// 			wx.getUserInfo({
		// 				success: async function (res) {
		// 					console.log('2', res)
		// 					let encryptedData = res.encryptedData
		// 					let iv = res.iv

		// 					wx.cloud.callFunction({
		// 						name: 'token',
		// 						data: {
		// 							js_code: sessionKey, //传入参数js_code
		// 							encryptedData: encryptedData, //传入参数encryptedData
		// 							iv: iv //传入参数iv
		// 						},
		// 						success: function (res) {
		// 							console.log('success', res); //查看云函数返回的内容。
		// 						},
		// 						fail: function (err) {
		// 							console.log('Err: ' + JSON.stringify(err))
		// 						}
		// 					})
		// 				}
		// 			})
		// 		} else {
		// 			console.log('登录失败！' + res.errMsg)
		// 		}
		// 	}
		// })


	},

	_loadDetail: async function (e) {

		let opts = {
			title: 'bar'
		}
		let user = await cloudHelper.callCloudData('passport/my_detail', {}, opts);
		if (!user)
			return wx.redirectTo({
				url: '../reg/my_reg'
			});

		this.setData({
			isLoad: true,
			isEdit: true,

			user,

			fields: projectSetting.USER_FIELDS,

			formName: user.USER_NAME,
			formMobile: user.USER_MOBILE,
			formForms: user.USER_FORMS
		})
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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	bindGetPhoneNumber: async function (e) {
		await PassportBiz.getPhone(e, this);
	},


	bindSubmitTap: async function (e) {
		try {
			let data = this.data;
			// 数据校验 
			data = validate.check(data, PassportBiz.CHECK_FORM, this);
			if (!data) return;

			let forms = this.selectComponent("#cmpt-form").getForms(true);
			if (!forms) return;
			data.forms = forms;

			let opts = {
				title: '提交中'
			}
			await cloudHelper.callCloudSumbit('passport/edit_base', data, opts).then(res => {
				let callback = () => {
					wx.reLaunch({
						url: '../index/my_index'
					});
				}
				pageHelper.showSuccToast('修改成功', 1500, callback);
			});
		} catch (err) {
			console.error(err);
		}
	}
})