const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ZipWebpackPlugin = require('zip-webpack-plugin');
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const packageInfo = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const fileExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "eot",
    "otf",
    "svg",
    "ttf",
    "woff",
    "woff2"
];

var alias = {};

module.exports = {
    entry: {
        popup: path.resolve("src/pages/popup/components/index.tsx"),
        options: path.resolve("src/pages/options/components/index.tsx"),
        background: path.resolve("src/pages/background/background.ts"),
        contentScript: path.resolve("src/pages/contentScript/contentScript.ts"),
        newtab: path.resolve("src/pages/newtab/components/index.tsx"),
        devtools: path.resolve("src/pages/devtools/index.ts"),
        panel: path.resolve("src/pages/panel/components/index.tsx")
    },

    module: {
        rules: [
            {
                // look for ".ts" or ".tsx" files in the "src" directory
                use: "ts-loader",
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/
            },

            {
                // look for ".js" or ".jsx" files in the "src" directory
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "source-map-loader"
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },

            {
                // look for "".css" or "".scss" files in the "src" directory
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader", // postcss loader needed for tailwindcss
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [tailwindcss, autoprefixer]
                            }
                        }
                    }
                ]
            },

            {
                // look for assets in the "src" directory
                type: "assets/resource",
                // test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
                test: new RegExp(`\\.(${fileExtensions.join('|')})$`),
                exclude: /node_modules/
            },

            {
                // look for ".html" files in the "src" directory
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve("src/static"),
                to: path.resolve("dist")
            }]
        }),
        ...getHtmlPlugins([
            "popup",
            "options",
            "newtab",
            "devtools",
            "panel"
        ]),
        new ZipWebpackPlugin({
            filename: `${packageInfo.name}-${packageInfo.version}.zip`,
            path: path.join(__dirname, "./zip")
        })
    ],

    resolve: {
        alias: alias,
        extensions: fileExtensions
            .map((extension) => '.' + extension)
            .concat([".tsx", ".ts", ".jsx", ".js", ".css"])
    },

    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "dist"),
        clean: true
    },

    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'pages', chunk, 'index.html'),
        filename: `${chunk}.html`,
        chunks: [chunk],
        cache: false,
    }))
}