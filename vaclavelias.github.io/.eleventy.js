const sass = require("sass");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const path = require("node:path");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = function (eleventyConfig) {

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy({
        "node_modules/lunr/lunr.min.js": "assets/scripts/lunr.min.js",
        "../../../../api-bureau/all-apis/src/ApiBureau.AllApis.Console/Program.cs": "Program3.cs"
    });

    eleventyConfig.exc

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
            cache: false,
        },
        compile: async function (inputContent, inputPath) {
            let parsed = path.parse(inputPath);

            let result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes
                ], style: "compressed"
            });

            return async (data) => {
                return result.css;
            };
        }
    });

    eleventyConfig.addFilter('jsonify', function (variable) {
        return JSON.stringify(variable);
    });

    eleventyConfig.addFilter('normalize_whitespace', function (text) {

        //Remove tabs
        text = text.replace(/\t/g, '');

        text = text.replace(/\r/g, '');

        //Remove big spaces and punctuation
        text = text.replace(/\n/g, ' ');

        //remove repeated spaces
        text = text.replace(/ +(?= )/g, '');

        return text;
    });

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        // Optional, default is "---"
        excerpt_separator: "<!-- excerpt -->"
    });

    eleventyConfig.addCollection('tagList', (collections) => {
        const uniqueTags = collections
            .getFilteredByTag('blog')
            .reduce((tags, item) => tags.concat(item.data.tags), [])
            .filter((tag) => !!tag)
            .filter((tag) => !!tag && !['page', 'blog', 'search'].includes(tag))
            .sort();
        return Array.from(new Set(uniqueTags));
    });

    eleventyConfig.addCollection('yearList', (collections) => {
        const uniqueyears = collections
            .getFilteredByTag('blog')
            .map((post) => post.date.getFullYear())
            .reverse();
        return Array.from(new Set(uniqueyears));
    });

    eleventyConfig.addFilter("md", function (content = "") {
        return markdownIt({ html: true }).render(content);
    });

    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
            symbol: "🔗",
            class: "direct-link"
        })
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    eleventyConfig.addPlugin(pluginRss);

    let url = "https://raw.githubusercontent.com/stride3d/stride/master/samples/Tutorials/CSharpIntermediate/CSharpIntermediate/CSharpIntermediate.Game/07_Animation/AnimationBasics.cs";

    EleventyFetch(url, {
        duration: "1d",
        type: "cs"
    });

    return {
        dir: {
            layouts: "_layouts"
        }
    };
};