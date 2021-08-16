# babel-plugin-replace

## 介绍

替换js全局变量的babel插件

## 安装

```
yarn add babel-plugin-replace --dev
```

```
npm install babel-plugin-replace -D
```

## 使用

**.babelrc**

With options:

```json
{
  "plugins": [
    ["babel-plugin-replace", {{
      "objNameMap": {
        "wx": "tt",
      },
      "variableStartsWith": "$$Variable",
      "variable": {
        "Debug": true,
        "Version": "1.2.3",
      },
    }]
  ]
}
```

转换前

```js
const debug = '$$VariableDebug'
const version = '$$VariableVersion'

wx.getUser()
wx.getLocation()
applicationCache.wx.set()
```

转换后

```js
const debug = true
const version = "1.2.3"

tt.getUser()
tt.getLocation()
applicationCache.wx.set()
```