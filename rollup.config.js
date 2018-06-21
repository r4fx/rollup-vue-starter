// import path from 'path'
import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload'
import nodeGlobals from 'rollup-plugin-node-globals'

const isProduction = process.env.NODE_ENV === `production`;
const isDevelopment = process.env.NODE_ENV === `development`;

/*export default {
	input: 'src/main.js',
	output: {
		file: 'dist/main.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: false
	},
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
        vue({
            css: './dist/assets/css/app.css'
		}),
        replace({
            'process.env.NODE_ENV': '"development"'
        }),
		commonjs(), // converts date-fns to ES modules
        isProduction && uglify() // minify, but only in production
	]
};*/

let plugins = [
    alias({
        vue$: 'vue/dist/vue.common.js',
        //'@': path.resolve('./src/'),
        '@': './src/',
        resolve: ['.js', '.vue']
    }),
    vue({
        css: './dist/assets/css/app.css'
    }),
    resolve({
        jsnext: true,
        main: true
    }),
    copy({
        'src/index.html': 'dist/index.html',
        'src/assets': 'dist/assets',
        verbose: true
    }),
    commonjs(),
    nodeGlobals()
];

let config = {
    input: 'src/main.js',
    output: {
        file: 'dist/main.js',
        format: 'umd',
        sourcemap: true
    },
    plugins: plugins
};

if (isProduction) {
    config.output.sourcemap = false;
    config.plugins.push(
        replace({
            'process.env.NODE_ENV': '"production"'
        })
    );
    config.plugins.push(uglify);
}

if (isDevelopment) {
    config.plugins.push(livereload());
    config.plugins.push(
        serve({
            contentBase: './dist/',
            //port: 10001,
            open: true
        })
    )
}

export default config