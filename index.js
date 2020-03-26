const CleanCSS = require("clean-css");
const fs = require("fs");
const origin = "origin";
const out = "out";
const originSrc = fs
  .readdirSync(origin)
  .filter(file => /\.css/.test(file))
  .map(files => `${origin}/${files}`);
const outSrc = fs
  .readdirSync(out)
  .filter(file => /\.html/.test(file))
  .map(files => `${out}/${files}`);

const options = {
  format: {
    indentBy: 0,
    breaks: {
      afterAtRule: false, // controls if a line break comes after an at-rule; e.g. `@charset`; defaults to `false`
      afterBlockBegins: false, // controls if a line break comes after a block begins; e.g. `@media`; defaults to `false`
      afterBlockEnds: false, // controls if a line break comes after a block ends, defaults to `false`
      afterComment: false, // controls if a line break comes after a comment; defaults to `false`
      afterProperty: false, // controls if a line break comes after a property; defaults to `false`
      afterRuleBegins: false, // controls if a line break comes after a rule begins; defaults to `false`
      afterRuleEnds: false, // controls if a line break comes after a rule ends; defaults to `false`
      beforeBlockEnds: false, // controls if a line break comes before a block ends; defaults to `false`
      betweenSelectors: true // controls if a lin
    },
    spaces: {
      aroundSelectorRelation: true, // controls if spaces come around selector relations; e.g. `div > a`; defaults to `false`
      beforeBlockBegins: true, // controls if a space comes before a block begins; e.g. `.block {`; defaults to `false`
      beforeValue: true // controls if a space comes before a value; e.g. `width: 1rem`; defaults to `false`
    }
  }
};

let css = "";

for (let index = 0; index < originSrc.length; index++) {
  // after read files
  readFiles().then(function(resolveData) {
    let dragon = new CleanCSS({ options, returnPromise: true }).minify(
      originSrc
    );
    dragon.then(function(output) {
      fs.writeFile(outSrc[index], output);
    });
    // .then(function(output) {
    //   fs.writeFile(outSrc[index], output, (error, data) => {
    //     if (error) throw error;
    //     console.log("생성 완료");
    //   });
    // });
  });

  function readFiles() {
    return new Promise(function(resolve, reject) {
      fs.readFile(originSrc[index], "utf8", (error, data) => {
        if (error) throw error;
        console.log("읽기 완료");
        css = data;
        resolve(css);
      });
    });
  }
}
