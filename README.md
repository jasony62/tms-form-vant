# tms-form-vant

## 设置

```
yarn install
```

### 运行演示程序

```
yarn serve
```

### 编译和打包

```
yarn build\build-lib
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 需要配置支持`jsx`

```
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props -D
```

修改 babel 配置文件（babel.config.js/.babelrc），如下：

```
module.exports = {
    presets: [
       ['@vue/app', {
           useBuiltIns: 'entry'
       }],
        ['@vue/babel-preset-jsx',
        {
            "injectH": false
        }]
    ]
};
```

参考：[vue/jsx](https://github.com/vuejs/jsx/tree/dev/packages/babel-preset-jsx)

# 支持过滤用户输入内容

初始化过滤规则，例如：允许包含图片

```javascript
import sanitizeHtml from 'sanitize-html'
sanitizeHtml.defaults.allowedTags.push('img')
```

参考：[sanitize-html](https://github.com/apostrophecms/sanitize-html#readme)

# 动态表单

## 单行填写题

## 多行填写题

## 单选题

## 多选题

## 图片题
