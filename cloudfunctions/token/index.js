// 云函数入口文件
const cloud = require('wx-server-sdk')
const WXBizDataCrypt = require('./WXBizDataCrypt')
const requestSync = require('./requestSync')
cloud.init()

/*
该云函数需要传入的参数
{
  data:{
    js_code,
    encryptedData,
    iv
  }
}
*/
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const appid = wxContext.APPID;
	const encryptedData = event.encryptedData;
	const js_code = event.js_code;
	const iv = event.iv;
	const secret = 'e1fb0d66c80170e92534bba8992d8226'

	const url = {
		url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + js_code + '&grant_type=authorization_code'
	}
	const req = await requestSync(url);
	console.log('req', req)
	const session = JSON.parse(req);
	const sessionKey = session.session_key;

	const pc = new WXBizDataCrypt(appid, sessionKey);
	const data = pc.decryptData(encryptedData, iv);

	return {
		data,
		event,
		wxtext: wxContext,
		openid: wxContext.OPENID,
		appid,
		unionid: wxContext.UNIONID,
	}
}