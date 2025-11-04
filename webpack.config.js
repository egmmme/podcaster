import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.tsx',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction
                ? 'static/js/[name].[contenthash:8].js'
                : 'static/js/[name].js',
            clean: true,
            publicPath: '/',
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@app': path.resolve(__dirname, 'src/application'),
                '@domain': path.resolve(__dirname, 'src/domain'),
                '@presentation': path.resolve(__dirname, 'src/presentation'),
                '@services': path.resolve(__dirname, 'src/services'),
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
                minify: isProduction,
            }),
        ],

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
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },

        devtool: isProduction ? 'source-map' : 'eval-source-map',
    };
};