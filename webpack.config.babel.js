import path from 'path';
import paths from './paths'
import webpack from 'webpack';
const autoprefixer = require('autoprefixer');
import CleanWebpackPlugin from 'clean-webpack-plugin';
const packageJson = require('./package.json');

export default () => ({
    entry: {
        index: path.join(__dirname, 'src/index.js'),
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules, paths.appSrc, paths.appResources]
        ,
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
        plugins: [

        ],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: packageJson.name,
        libraryTarget: 'umd',
    },

    module: {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['es2015', 'transform-object-rest-spread', { modules: false }],
                                'react',
                            ],
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude : [paths.appNodeModules],
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
        ]
    },

    plugins: [
        // Clean dist folder
        new CleanWebpackPlugin(['dist/*.*']),

        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        //https://medium.com/@adamrackis/vendor-and-code-splitting-in-webpack-2-6376358f1923
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
});