# vite-plugin-svg2font

> 将多个 svg 图标转换为单个字体文件和一个 css 文件，css 会被自动引入`index.html`中。然后使用 svg 文件名作为图标的类名(eg: react.svg : `<i class="icon-react"></i>`)来使用对应的图标

# 为什么开发这个插件

做项目开发时设计人员会给开发提供图标，通常是以svg文件方式提供。使用 svg 作为图标没有字体图标使用方便，以前我在[iconfont](https://www.iconfont.cn/)上创建项目，将 svg 上传至我的项目中，然后使用在线连接访问转换后的字体图标。但是由于一些原因如多个开发人员共同使用此 iconfont 项目导致 url 随时变化（频繁改动引用这个 url 的文件）;iconfont 网站现在也有审核机制导致使用不方便。为了解决上述所说的这些问题便开发了此插件。

此插件会将指定目录的所有 svg 文件转换为单个字体文件和一个 css 文件。css 会被自动引入到`index.html`，开发人员只需使用类名如：`<i class="icon-add"></i>`即可使用图标（icon-add 对应 add.svg 这个 svg 文件）。当 svg 目录有变化插件会自动编译处理所有 svg 文件。

## Get started

1. 安装插件

   ```bash
   npm install vite vite-plugin-svg2font -D
   ```

2. 配置：

   ```ts
   import { defineConfig } from "vite";
   import svg2font from "vite-plugin-svg2font";

   export default defineConfig({
     plugins: [
       svg2font({
         svgPath: "src/assets/svg-icons",
         fileName: "iconfont",
         targetPath: "assets",
       }),
     ],
   });
   ```

3. 注意：

- 请保证 svg 文件中只有`<svg>`tag，不需要包含`<xml>`,否则编译可能编译出错
- 请保证所有 svg 图标的尺寸一样 如：`<svg width="32" height="32">...</svg>`

# 插件选项

```typescript
interface Svg2FontOption {
  /**
   * 存放svg图标文件的目录，插件会将此文件夹下的所有svg文件转为一个字体文件和css文件。（相对于项目根目录）
   * svg的文件名称将作为图标类名：如add.svg对应的类名为：${classPrefix}-add
   */
  svgPath: string;
  /**
   * 指定生成的字体文件和css文件的名称，请不要包含扩展名
   */
  fileName: string;
  /**
   * 存储生成的字体文件和css文件的路径。只有在生产环境打包时生效
   * 此路径是相对于vite配置 (build.outDir)的路径.默认使用vite配置：build.assetsDir
   */
  targetPath?: string;
  /**
   * 图标类名前缀，默认：icon
   * eg. icon-react icon-vue
   */
  classPrefix?: string;
}
```

# Examples

请运行 example 目录

### License

[MIT licensed](./LICENSE).
