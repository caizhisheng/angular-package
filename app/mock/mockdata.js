/************************
  auth：mike,
  desc: mock数据模拟,
  date: 2016/12/06 
************************/

Mock.mock(
        'http://mockjs1', [{
            "ID": "10000001",    
            "Title": "测试消息1",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
        {
            "ID": "10000002",    
            "Title": "测试消息2",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
        {
            "ID": "10000003",    
            "Title": "测试消息3",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
        {
            "ID": "10000004",    
            "Title": "测试消息4",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
        {
            "ID": "10000009",    
            "Title": "测试消息9",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        }
        ]
    );

Mock.mock(
        'http://mockjs2', [{
            "ID": "10000005",    
            "Title": "测试消息5",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
        {
            "ID": "10000006",    
            "Title": "测试消息6",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
        {
            "ID": "10000007",    
            "Title": "测试消息7",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
        {
            "ID": "10000008",    
            "Title": "测试消息4",
            "Content": "消息内容...",
            "CreatData": "2016-12-7" 
        },
         {
            "ID": "10000010",    
            "Title": "测试消息10",
            "Content": "消息内容10...",
            "CreatData": "2016-12-7" 
        }
        ]
    );


 Mock.mock(
        'http://mock/role', [{
            "roleName": "系统管理员",    
            "roleDes": "查看系统所有信息，修改所有可配置选项"
        },
        {
            "roleName": "管理员",    
            "roleDes": "仅能查看和管理本部门相关信息，包括消息模板，供应商账户等信息"
        }
        ]
    );


  Mock.mock(
        'http://mock/sendlog', [{
            "pch": "PCH-00000001",    
            "tplName": "双蛋抢购活动",
            "tplType": "营销",    
            "msgCount": "1000",
            "createBy": "管理员",    
            "createAt": "2017-01-03",
            "sendConfig": "立即发送",
            "sendStatus": "已发送",     
            "sendResult": "成功：9800;失败：99"
        },
        {
            "pch": "PCH-00000002",    
            "tplName": "双蛋抢购活动",
            "tplType": "营销",    
            "msgCount": "1000",
            "createBy": "管理员",    
            "createAt": "2017-01-03",
            "sendConfig": "立即发送",
            "sendStatus": "已发送",     
            "sendResult": "成功：9800;失败：99"
        }
        ]
    );


  Mock.mock(
        'http://mock/sendlogmore', [{
            "pch": "PCH-00000001",    
            "lsh": "LSH-00000001",
            "tplName": "双蛋抢购活动",
            "tplType": "营销", 
            "msgContent": "尊敬的李四女士：为庆祝双十二活动...",
            "msgZs": "20", 
            "createBy": "管理员",    
            "createAt": "2017-01-03",  
            "sendResult": "成功：9800;失败：99",
            "sendDetail": "成功通道信息：漫道科技，md_acct3"
        },
        {
            "pch": "PCH-00000002",    
            "lsh": "LSH-00000003",
            "tplName": "双蛋抢购活动",
            "tplType": "营销", 
            "msgContent": "尊敬的李四女士：为庆祝双十二活动...",
            "msgZs": "20", 
            "createBy": "管理员",    
            "createAt": "2017-01-03",  
            "sendResult": "成功：9800;失败：99",
            "sendDetail": "成功通道信息：漫道科技，md_acct3"
        }
        ]
    );

   Mock.mock(
        'http://mock/channel', [{
            "accountId": "账户1",
            "userName": "wwtl_account1",
            "createAt": "2017-01-05"
        },
        {
            "accountId": "账户2",
            "userName": "wwtl_account2",
            "createAt": "2017-01-05"
        },
        {
            "accountId": "账户3",
            "userName": "wwtl_account3",
            "createAt": "2017-01-05"
        }
        ]
    );
   
   Mock.mock(
        'http://mock/channel1', [{
            "msgType": "营销短信",
            "canUse": "漫道科技/md_acct1;微网通联/md_acct2",
            "isAuto": "是"
        },
        {
            "msgType": "消息通知",
            "canUse": "漫道科技/md_acct1;微网通联/md_acct2",
            "isAuto": "是"
        },
        {
            "msgType": "营销短信",
            "canUse": "漫道科技/md_acct1;微网通联/md_acct2",
            "isAuto": "是"
        }
        ]
    );

      Mock.mock(
        'http://mock/appsendtpl', [{
            "ID": "00000001",
            "sendTitle": "放款通知",
            "sendType": "我的消息",
            "updateAt": "2017-02-24",
            "sendContent": "通知内容XXXXXXXXXXXXXXXXXXX"
        },
        {
           "ID": "00000002",
            "sendTitle": "放款通知",
            "sendType": "我的消息",
            "updateAt": "2017-02-24",
            "sendContent": "通知内容XXXXXXXXXXXXXXXXXXX"
        },
        {
            "ID": "00000003",
            "sendTitle": "放款通知",
            "sendType": "我的消息",
            "updateAt": "2017-02-24",
            "sendContent": "通知内容XXXXXXXXXXXXXXXXXXX"
        }
        ]
    );

    
      Mock.mock(
        'http://mock/appsendlogs', [{
            "ID": "00000001",
            "sendTitle": "放款通知",
            "sendType": "我的消息",
            "sendPerson": "全部用户",
            "sendAt": "2017-02-24",
            "sendForIos": "800/1000",
            "sendForAndroid": "900/1000"
        },
        {
            "ID": "00000002",
            "sendTitle": "放款通知",
            "sendType": "我的消息",
            "sendPerson": "全部用户",
            "sendAt": "2017-02-24",
            "sendForIos": "800/1000",
            "sendForAndroid": "900/1000"
        },
        {
            "ID": "00000003",
            "sendTitle": "放款通知",
            "sendType": "我的消息",
            "sendPerson": "全部用户",
            "sendAt": "2017-02-24",
            "sendForIos": "800/1000",
            "sendForAndroid": "900/1000"
        }
        ]
    );

      Mock.mock(
        'http://mock/appsenduser', [{
            "excelName": "至少交易2次的客户",
            "startTime": "2017-02-27",
            "personCount": "800"
        },
        {
           "excelName": "至少交易2次的客户",
            "startTime": "2017-02-27",
            "personCount": "800"
        },
        {
            "excelName": "至少交易2次的客户",
            "startTime": "2017-02-27",
            "personCount": "800"
        }
        ]
    );

       Mock.mock(
        'http://mock/appsendchart', [{
            "createAt": "2017-02-27",
            "platformName": "IOS",
            "sendCount": "800",
            "clickCount": 600
        },
        {
           "createAt": "2017-02-27",
            "platformName": "IOS",
            "sendCount": "800",
            "clickCount": 600
        },
        {
           "createAt": "2017-02-27",
            "platformName": "IOS",
            "sendCount": "800",
            "clickCount": 600
        }
        ]
    );

