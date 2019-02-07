const fs = require('fs');
const assertBundle = require('parcel-assert-bundle-tree');
const Bundler = require('parcel-bundler');
const path = require('path');
const nearleyPlugin = require('../index');

const readFilePromise = p =>
  new Promise((resolve, reject) =>
    fs.readFile(p, (err, data) => (err ? reject(err) : resolve(data))),
  );

describe('NearleyGrammarAsset', () => {
  it('should ouput compiled nearley grammar rules', async () => {
    // Init bundler
    const bundler = new Bundler(path.join(__dirname, './grammar.ne'), {
      outDir: path.join(__dirname, '../test-dist'),
      watch: false,
      cache: false,
    });
    // Register plugin
    nearleyPlugin(bundler);

    // Bundle everything
    const bundle = await bundler.bundle();
    assertBundle(bundle, {
      type: 'js',
      name: 'grammar.js',
    });

    // Check asset content
    expect({
      bundleContent: (await readFilePromise(bundle.name)).toString(),
    }).toEqual({
      bundleContent: expect.stringContaining('ParserStart: "main"'),
    });
  });
});
