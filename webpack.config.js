/**
 * Created by VLER on 2017/3/10.
 */
module.exports = {
    entry: './index.js',
    output: {
        path: './build', // 图片和 JS 会到这里来
        publicPath: 'http://mycdn.com/', // 这个用来成成比如图片的 URL
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // 用 ! 来连接多个人 loader
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
        ]
    }
};