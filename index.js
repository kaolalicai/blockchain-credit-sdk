// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
const objectId = require("bson-objectid")
const md5 = require('md5')

import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import simpleStorage_artifacts from '../../build/contracts/SimpleStorage.json'
import BloggerCoin_artifacts from '../../build/contracts/BloggerCoin.json'
// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var SimpleStorage = contract(simpleStorage_artifacts);
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var providerAccount;

function getBigNumber(bigNumber) {
    // console.log('bigNumber ==>', bigNumber)
    return bigNumber.c[0]
}

module.exports = {
    start: function() {
        var self = this;
        // Bootstrap the MetaCoin abstraction for Use.
        SimpleStorage.setProvider(web3.currentProvider);
        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            accounts = accs;
            account = accounts[0];
            console.log('account ==>', account)
            console.log('coinbase ==>', web3.eth.coinbase)
            providerAccount = accounts[1];
            document.getElementById("accountAddr").value = providerAccount
            document.getElementById("checkAccountAddr").value = providerAccount
                // self.refreshBalance();
        });
    },
    md5Test: function() {
        console.log('123')
        var temp = md5('123')
        console.log(temp)
    },
    balanceInit: function() {
        SimpleStorage.deployed().then(function(contractInstance) {
            console.log('web3.eth.coinbase===============>', web3.eth.coinbase)
            contractInstance.transferF(web3.eth.coinbase, web3.eth.coinbase, 100).then(function() {
                    // console.log('balance =>', getBigNumber(balance));
                })
                // contractInstance.transfer(accounts[2], 10000)
        })
    },
    sendBlacklist: function() {
        var self = this;
        var bankCardNo = document.getElementById("bankCardNo").value;
        var name = document.getElementById("name").value;
        var idCardNo = document.getElementById("idCardNo").value;
        var phone = document.getElementById("phone").value;
        var amount = parseInt(document.getElementById("amount").value);
        var repayStatus = document.getElementById("repayStatus").value;
        var loanId = objectId().toString();
        var peroidDay = document.getElementById("peroidDay").value;
        // var blackIdcardMd5 = md5(blackIdcard)
        // console.log(blackIdcard)
        // console.log(blackIdcardMd5)
        console.log('loanId ==>', loanId)
        console.log('coinbase ==>', web3.eth.coinbase)
        console.log('account ==>', account)
            // var providerAccount = accounts[1]
        document.getElementById("accountAddr").value = providerAccount
        SimpleStorage.deployed().then(function(contractInstance) {
            // contractInstance.sayHello({gas: 140000, from: web3.eth.accounts[0]})
            // loanTime
            // peroidDay =
            contractInstance.set(providerAccount, idCardNo, name, bankCardNo, phone, loanId, amount, new Date().toString(), peroidDay, repayStatus, { gas: 1400000, from: web3.eth.coinbase }).then(function(ret) {
                console.log('ret ==>', ret)
                contractInstance.balanceOf(providerAccount).then(function(balance) {
                    //set done
                })
            })
        }).then(function() {
            console.log('ok');
        }).catch(function(e) {
            console.log('err =>', e);
        });
    },
    getBlacklistByIdcard: function() {
        var idcard = document.getElementById("idCardNoCheck").value;
        console.log(idcard)
        var userAccount = accounts[1]
        var loanBuff = [];
        SimpleStorage.deployed().then(function(contractInstance) {
            contractInstance.getLoanCount(userAccount, idcard, { from: web3.eth.accounts[0] }).then(function(loanCount) {
                console.log('loanCount ==>', loanCount)
                var loans = getBigNumber(loanCount)
                console.log('loans ==>', loans)
                if (loans) {
                    for (var i = 0; i < loans; i++) {
                        contractInstance.get(userAccount, idcard, i, { from: web3.eth.accounts[0] }).then(function(ret) {
                            console.log('ret ==>', ret)
                            contractInstance.balanceOf(userAccount).then(function(balance) {
                                console.log(userAccount, 'balance =>', getBigNumber(balance));
                            })
                        })
                    }
                }
            })
        }).then(function() {
            console.log('ok');
        }).catch(function(e) {
            console.log('err =>', e);
        });
    },
};