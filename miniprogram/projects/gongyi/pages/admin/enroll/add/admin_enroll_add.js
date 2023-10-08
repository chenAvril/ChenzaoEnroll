const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const AdminEnrollBiz = require('../../../../biz/admin_enroll_biz.js');
const EnrollBiz = require('../../../../biz/enroll_biz.js');
const validate = require('../../../../../../helper/validate.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

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
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ENROLL_NAME + '-添加',
		});

		this.setData(AdminEnrollBiz.initFormData());
		this.setData({
			isLoad: true
		});
	},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	url: function (e) {
		pageHelper.url(e, this);
	},
	switchModel: function (e) {
		pageHelper.switchModel(this, e);
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;
		data = validate.check(data, AdminEnrollBiz.CHECK_FORM, this);
		if (!data) return;

		if (data.end < data.start) {
			return pageHelper.showModal('报名截止时间不能早于报名开始时间');
		}

		let forms = this.selectComponent("#cmpt-form").getForms(true);
		if (!forms) return;
		data.forms = forms;

		data.cateName = EnrollBiz.getCateName(data.cateId);

		try {

			// 创建
			let result = await cloudHelper.callCloudSumbit('admin/enroll_insert', data);
			let enrollId = result.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'enroll/', enrollId, 'admin/enroll_update_forms');

			let callback = async function () {
				wx.navigateBack();
			}
			pageHelper.showSuccToast('添加成功', 2000, callback);

		} catch (err) {
			console.log(err);
		}

	},

	bindJoinFormsCmpt: function (e) {
		this.setData({
			formJoinForms: e.detail,
		});
  },
  
  inputMoney: function (e) {
		const exp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		exp.test(e.detail.value)
		console.log(exp.test(e.detail.value))
		if (!exp.test(e.detail.value)) {
			pageHelper.showModal('请输入正确的金额');
			this.setData({
				formCost: ''
			})
		}
  },
  
  chooseLocation:function(e){
    let that = this
    wx.chooseLocation({
      latitude:that.data.formAddress.latitude,
      longitude:that.data.formAddress.longitude,
      success: function (res) {
        let address = {
          name:res.name,
          address:res.address,
          latitude:res.latitude,
          longitude:res.longitude,
        };
        that.setData({
          formAddress : address,
        })
      },
      fail:function(res){
          console.log(res)
      }
    })
  },
})