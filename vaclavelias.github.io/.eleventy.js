const sass = require("sass");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const path = require("node:path");

module.exports = function (eleventyConfig) {

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addPassthroughCopy("assets/img");

    //eleventyConfig.addCollection("posts", (collection) => {
    //    return collection.getFilteredByTag("blog");
    //});

    //eleventyConfig.addWatchTarget("./assets/css");
    //eleventyConfig.addWatchTarget("./assets/css");

    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
        strictFilters: false
    });

    eleventyConfig.addTemplateFormats("scss");

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compileOptions: {
            cache: false
        },
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

    eleventyConfig.addFilter('jsonify', function (variable) {
        return JSON.stringify(variable);
    });

    return {
        //dir: {
        //    layouts: "_layouts",
        //    includes: "_includes"
        //}
    }
};