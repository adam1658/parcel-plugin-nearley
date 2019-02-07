module.exports = function(bundler) {
  bundler.addAssetType('ne', require.resolve('./NearleyGrammarAsset.js'));
};
