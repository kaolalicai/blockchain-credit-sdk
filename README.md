# blockchain-credit-sdk

是以下的对接SDK
https://github.com/kaolalicai/blockchain-hackathon
提供一下功能：

```
    //上载征信借款数据
    function set(address provider, string idCardNo, string name, string bankCardNo, string phone,
        string loanid, uint amount, string loanTime, uint peroidDay, string repayStatus) public returns (bool) {}

    //获取通过 idCardNo 获取借款信息
    function get(address userAddr, string idCardNo, uint index)
        public view returns(address provider, string loanid, uint amount,
        string loanTime, uint peroidDay, string repayStatus) {}     

    //是否在黑名单
    function isInBlackList(string idCardNo) public view returns (bool) {}

    //添加黑名单
    function setBlackList(address provider, string idCardNo, string name, string bankCardNo, string phone)
        public returns(bool) {}

    //获取借款订单总数
    function getLoanCount(address userAddr, string idCardNo) public view returns (uint) {}



    //client confirm all loanorder
    //奖惩策略：provider 平台得到奖励
    function loanAllConfirm(string idCardNo) public returns (bool) {}   

``` 