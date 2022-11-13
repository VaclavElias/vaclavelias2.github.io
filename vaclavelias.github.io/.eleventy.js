const sass = require("sass");
const path = require("node:path");

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets/img");

    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
        strictFilters: false
    });

    eleventyConfig.addTemplateFormats("scss");

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function (inputContent, inputPath) {
            let parsed = path.parse(inputPath);

            let result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes
                ]
            });

            return async (data) => {
                return result.css;
            };
        }
    });

    return {
        //dir: {
        //    layouts: "_layouts",
        //    includes: "_includes"
        //}
    }
};