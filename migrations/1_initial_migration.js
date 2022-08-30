const KyAToken = artifacts.require("KyAToken");

module.exports = function (deployer) {
  deployer.deploy(KyAToken);
};
