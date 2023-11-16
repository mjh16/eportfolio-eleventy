const markdownItIb = require("markdown-it-ib");
const markdownItFootnote = require("markdown-it-footnote");
const Image = require("@11ty/eleventy-img");
const markdownItEleventyImg = require("markdown-it-eleventy-img");

module.exports = function (eleventyConfig) {
    // Copy `src/style.css` to `_site/style.css`
    eleventyConfig.addPassthroughCopy("src/style.css");
    // Copy 'scr/img/' to '_site/img/'
    // eleventyConfig.addPassthroughCopy("src/img/");
    // Markdown It Plugins - Italics and Bold accessibility and Footnotes
    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItIb));
    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));
    // Add eleventyImg
    //eleventyConfig.amendLibrary("md", (mdLib) =>
    //    mdLib.use(markdownItEleventyImg, {
    //        imgOptions: {
    //            widths: [800, 600, 300],
    //            formats: ["avif", "webp", "jpeg"],
    //            urlPath: "./img/",
    //            outputDir: "_site/img/",
    //        },
    //        globalAttributes: {
    //            sizes: "100vw",
    //        },
    //    })
    //);
    eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
        let metadata = await Image(src, {
            widths: [400, 800, "auto"],
            formats: ["avif", "webp", "jpeg"],
            urlPath: "./img/",
            outputDir: "_site/img/",
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        };

        // You bet we throw an error on a missing alt (alt="" works okay)
        return Image.generateHTML(metadata, imageAttributes);
    });
    return {
        // When a passthrough file is modified, rebuild the pages:
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site",
        },
    };
};
