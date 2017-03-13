var apiConfig = {
	"user": "/api/user/search/find",
	"useradd": "/api/user",
	"template": "/sms-app/api/smsTemplate/search/find?sort=id,desc",
	"templateQuery": "/sms-app/template/query",
	//"messagerecords": "/sms-app/api/messageRecords/search/findBySmsTemplate_SystemCode",
	"channelInfoes": "/sms-app/channelInfo/query",//"/sms-app/api/channelInfoes?sort=id,desc"
	"channelAddUser": "/sms-app/api/channelAccounts",
	"routerRules": "/sms-app/routerRule/find?sort=id,desc",
	"profileRules": "/sms-app/api/profile",
	"msgdetaillist": "/mdp-app/message/batch/detaillist",
	"messagerecords": "/sms-app/record/find",

	"pushtpl": "/push-app/template/list",
	"pushtpladd": "/push-app/template/create",
	"pushtplupdate": "/push-app/template/update" 
}; 
export {apiConfig};
