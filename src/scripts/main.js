$(document).ready(function() {
    var connect = $('#connect');
    var connected_wallet = $('#connected_wallet');
    var connected_balance = $('#connected_balance');

    connected_wallet.hide();
    connected_balance.hide();

    if (!window.ethereum) {
        alert('Browser not supported.');
    }

    connect.on('click', function(ev) {
        ethereum
           .request({ method: "eth_requestAccounts" })
           .then((accounts) => {
               let account = accounts[0]
               connected_wallet.show();
               connected_wallet.text(`Wallet [ETH]: ${account}`);

               var web3 = new Web3(window.ethereum);

               web3.eth.getAccounts()
                  .then(data => {
                      web3.eth.getBalance(data[0])
                          .then(balance => {
                              connected_balance.show();
                              connected_balance.text(`Balance: ${balance}`);
                          })
                          .catch(e => alert(e))
                  })
                  .catch(e => alert(e))
           })
           .catch(e => {
               alert(`Fail connect to wallet address:( | code: ${e.code}`);
           })
    });
});
