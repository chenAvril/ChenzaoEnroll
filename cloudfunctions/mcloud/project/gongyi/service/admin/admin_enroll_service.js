/**
 * Notes: 登记后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-23 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const EnrollService = require('../enroll_service.js');
const AdminHomeService = require('../admin/admin_home_service.js');
const util = require('../../../../framework/utils/util.js');
const EnrollModel = require('../../model/enroll_model.js');
const EnrollJoinModel = require('../../model/enroll_join_model.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const exportUtil = require('../../../../framework/utils/export_util.js');

// 导出登记数据KEY
const EXPORT_ENROLL_JOIN_DATA_KEY = 'EXPORT_ENROLL_JOIN_DATA';

class AdminEnrollService extends BaseProjectAdminService {

	/** 推荐首页SETUP */
	async vouchEnrollSetup(id, vouch) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	/**取得分页列表 */
	async getAdminEnrollList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ENROLL_ORDER': 'asc',
			'ENROLL_ADD_TIME': 'desc'
		};
		let fields = 'ENROLL_TITLE,ENROLL_CATE_ID,ENROLL_CATE_NAME,ENROLL_EDIT_TIME,ENROLL_ADD_TIME,ENROLL_ORDER,ENROLL_STATUS,ENROLL_VOUCH,ENROLL_JOIN_CNT,ENROLL_MAX_CNT,ENROLL_START,ENROLL_END,ENROLL_START_TIME,ENROLL_END_TIME,ENROLL_COST,ENROLL_ADDRESS,ENROLL_EDIT_SET,ENROLL_CANCEL_SET,ENROLL_CHECK_SET,ENROLL_QR,ENROLL_OBJ';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [{
				ENROLL_TITLE: ['like', search]
			}, ];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.ENROLL_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.ENROLL_STATUS = Number(sortVal);
					break;
				}
				case 'vouch': {
					where.and.ENROLL_VOUCH = 1;
					break;
				}
				case 'top': {
					where.and.ENROLL_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'ENROLL_ADD_TIME');
					break;
				}
			}
		}

		return await EnrollModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**置顶与排序设定 */
	async sortEnroll(id, sort) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**首页设定 */
	async vouchEnroll(id, vouch) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**添加 */
	async insertEnroll({
		title,
		cateId,
		cateName,
		maxCnt,
		start,
		end,
		startTime,
		endTime,
		cost,
		address,
		checkSet,
		cancelSet,
		editSet,
		order,
		forms,
		joinForms,
	}) {

		let data = {
			ENROLL_TITLE: title,
			ENROLL_CATE_ID: cateId,
			ENROLL_CATE_NAME: cateName,
			ENROLL_MAX_CNT: maxCnt,
			ENROLL_START: timeUtil.time2Timestamp(start),
			ENROLL_END: timeUtil.time2Timestamp(end),
			ENROLL_START_TIME: timeUtil.time2Timestamp(startTime),
			ENROLL_END_TIME: timeUtil.time2Timestamp(endTime),
			ENROLL_COST: cost,
			ENROLL_ADDRESS: address,
			ENROLL_CHECK_SET: checkSet,
			ENROLL_CANCEL_SET: cancelSet,
			ENROLL_EDIT_SET: editSet,
			ENROLL_ORDER: order,
			ENROLL_FORMS: forms,
			ENROLL_JOIN_FORMS: joinForms
		}

		let id = await EnrollModel.insert(data);
		if (!id) return null;
		return {
			'id': id
		};
	}

	/**删除数据 */
	async delEnroll(id) {
		let where = {
			_id: id
		}

		let enroll = await EnrollModel.del(where);
		if (!enroll) return null;

		// 清空报名的数据
		return await EnrollJoinModel.del({
			ENROLL_JOIN_ENROLL_ID: id
		});

	}

	/**获取信息 */
	async getEnrollDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}

		let enroll = await EnrollModel.getOne(where, fields);
		if (!enroll) return null;

		return enroll;
	}

	// 更新forms信息
	async updateEnrollForms({
		id,
		hasImageForms
	}) {
		let where = {
			_id: id
		}

		let enroll = await EnrollModel.editForms(where, 'ENROLL_FORMS', 'ENROLL_OBJ', hasImageForms);
		if (!enroll) return null;

		return enroll;
	}


	/**更新数据 */
	async editEnroll({
		id,
		title,
		cateId, // 二级分类 
		cateName,
		maxCnt,
		start,
		end,
		startTime,
		endTime,
		cost,
		address,
		checkSet,
		cancelSet,
		editSet,
		order,
		forms,
		joinForms
	}) {
		let where = {
			_id: id
		}

		let data = {
			ENROLL_TITLE: title,
			ENROLL_CATE_ID: cateId,
			ENROLL_CATE_NAME: cateName,
			ENROLL_MAX_CNT: maxCnt,
			ENROLL_START: timeUtil.time2Timestamp(start),
			ENROLL_END: timeUtil.time2Timestamp(end),
			ENROLL_START_TIME: timeUtil.time2Timestamp(startTime),
			ENROLL_END_TIME: timeUtil.time2Timestamp(endTime),
			ENROLL_COST: cost,
			ENROLL_ADDRESS: address,
			ENROLL_CHECK_SET: checkSet,
			ENROLL_CANCEL_SET: cancelSet,
			ENROLL_EDIT_SET: editSet,
			ENROLL_ORDER: order,
			ENROLL_FORMS: forms,
			ENROLL_JOIN_FORMS: joinForms
		}

		let enroll = await EnrollModel.edit(where, data);
		if (!enroll) return null;

		return enroll;
	}

	/**修改状态 */
	async statusEnroll(id, status) {
		let where = {
			_id: id
		}

		let data = {
			ENROLL_STATUS: status
		}

		let enroll = await EnrollModel.edit(where, data);
		if (!enroll) return null;

		let fields = '*';
		let enrollDetail = await EnrollModel.getOne(where, fields);
		let service = new EnrollService();
		return {
			'statusDesc': service.getJoinStatusDesc(enrollDetail)
		};
	}


	//#############################
	/**登记分页列表 */
	async getEnrollJoinList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		enrollId,
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ENROLL_JOIN_LAST_TIME': 'desc'
		};
		let fields = '*';

		let where = {
			ENROLL_JOIN_ENROLL_ID: enrollId
		};
		if (util.isDefined(search) && search) {
			where['ENROLL_JOIN_FORMS.val'] = {
				$regex: '.*' + search,
				$options: 'i'
			};
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status':
					where.ENROLL_JOIN_STATUS = Number(sortVal);
					break;
			}
		}

		return await EnrollJoinModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**修改登记状态 
	 */
	async statusEnrollJoin(enrollJoinId, status, reason = '') {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/** 取消某项目所有记录 */
	async cancelEnrollJoinAll(enrollId, reason) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/** 清空 */
	async clearEnrollAll(enrollId) {
		let where = {
			ENROLL_JOIN_ENROLL_ID: enrollId
		};
		return await EnrollJoinModel.del(where);
	}


	/** 删除登记 */
	async delEnrollJoin(enrollJoinId) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	// #####################导出登记数据
	/**获取登记数据 */
	async getEnrollJoinDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_ENROLL_JOIN_DATA_KEY);
	}

	/**删除登记数据 */
	async deleteEnrollJoinDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_ENROLL_JOIN_DATA_KEY);
	}

	/**导出登记数据 */
	async exportEnrollJoinDataExcel({
		title,
		enrollId,
		status
	}) {

		// var data = [
		// 	['1111', '2222'],
		// 	['3333', '4444']
		// ];

		let where = {
			ENROLL_JOIN_ENROLL_ID: enrollId,
			ENROLL_JOIN_STATUS: Number(status)
		};

		let fields = '*';
		let orderBy = {
			'ENROLL_JOIN_LAST_TIME': 'desc'
		};
		let page = 1;
		let size = 9999;

		var result = await EnrollJoinModel.getList(where, fields, orderBy, page, size);
		var list = result.list;

		// if(list.length > 0){
		// 	var forms = list[0].ENROLL_JOIN_FORMS;
		// 	if(forms.length > 0){
		// 		var titles = [];
		// 		for(var form in forms){
		// 			titles.add();
		// 		}
		// 	}
		// }

		var data = [];
		result.list.forEach((item) => {
			var titles = [];
			var values = [];
			item.ENROLL_JOIN_FORMS.forEach((form) => {
				titles.push(form.title);
				values.push(form.val + '');
			});

			if (data.length == 0) {
				data.push(titles);
			}
			data.push(values);
		});

		var total = 0;
		if (data.length > 0) {
			total = data.length - 1;
		}
		return await exportUtil.exportDataExcel(EXPORT_ENROLL_JOIN_DATA_KEY, title, total, data);

	}

}

module.exports = AdminEnrollService;