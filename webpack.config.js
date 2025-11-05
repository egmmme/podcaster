import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isAnalyze = Boolean(process.env.ANALYZE);

    return {
        entry: './src/index.tsx',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction
                ? 'static/js/[name].[contenthash:8].js'
                : 'static/js/[name].js',
            chunkFilename: isProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : 'static/js/[name].chunk.js',
            clean: true,
            publicPath: '/',
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@app': path.resolve(__dirname, 'src/app'),
                '@domain': path.resolve(__dirname, 'src/domain'),
                '@services': path.resolve(__dirname, 'src/services'),
                '@presentation': path.resolve(__dirname, 'src/presentation'),
                '@shared': path.resolve(__dirname, 'src/shared'),
            }
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                } : false,
            }),
            isAnalyze && new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                openAnalyzer: true,
                analyzerPort: 8888,
                defaultSizes: 'gzip',
            }),
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 8192,
            }),
        ].filter(Boolean),

        devServer: {
            port: 3000,
            open: true,
            historyApiFallback: true,
            hot: true,
        },

        optimization: {
            minimize: isProduction,
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    // React vendor
                    reactVendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'react-vendor',
                        chunks: 'all',
                        priority: 40,
                    },
                    // Router vendor
                    routerVendor: {
                        test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
                        name: 'router-vendor',
                        chunks: 'all',
                        priority: 30,
                    },
                    // Resto de node_modules
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: 20,
                        reuseExistingChunk: true,
                    },
                    // Common chunks
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                },
            },
            // Runtime chunk separado
            runtimeChunk: {
                name: entrypoint => `runtime-${entrypoint.name}`,
            },
        },

        performance: {
            hints: isProduction ? 'warning' : false,
            maxEntrypointSize: 300000, // 300 KiB
            maxAssetSize: 300000, // 300 KiB
        },

        devtool: isProduction ? 'source-map' : 'eval-source-map',
    };
};