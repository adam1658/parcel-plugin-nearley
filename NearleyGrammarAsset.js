const { Asset } = require('parcel-bundler');
const nearley = require('nearley');
const compile = require('nearley/lib/compile');
const generate = require('nearley/lib/generate');
const nearleyGrammar = require('nearley/lib/nearley-language-bootstrapped');

class NearleyGrammarAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
  }

  async parse(source) {
    // From https://nearley.js.org/docs/using-in-frontend
    // Parse the grammar source into an AST
    const grammarParser = new nearley.Parser(nearleyGrammar);
    grammarParser.feed(source);
    const grammarAst = grammarParser.results[0]; // TODO check for errors

    // Compile the AST into a set of rules
    const grammarInfoObject = compile(grammarAst, {});
    // Generate JavaScript code from the rules
    this.grammarRulesJavascript = generate(grammarInfoObject, 'grammar');
  }

  generate() {
    return [
      {
        type: 'js',
        value: this.grammarRulesJavascript,
      },
    ];
  }
}

module.exports = NearleyGrammarAsset;
