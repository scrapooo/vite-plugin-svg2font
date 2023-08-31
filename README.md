# vite-plugin-svg2font

> A [vite](https://vitejs.dev/) plugin to convert svg icons to iconfont。  
> Convert multiple SVG icons into a single font file and a CSS file, and CSS will be automatically imported into 'index. html'. Then use the svg file name as the class name for the icon (eg: react.svg: `<i class="icon-react"></i>`)

# Why

When working on a project, designers often provide us with icons in the form of SVG files. Using SVG as icons is not as convenient as using font icons. In the past, I would create a project on [iconfont](https://www.iconfont.cn/), upload the SVG files to my project, and then use the generated font icons via an online link. However, there were some issues with this approach. For example, when multiple developers were using the same iconfont project, the URL would change frequently, resulting in the need to changes to files referencing this URL many times. Additionally, the iconfont website now has an approval mechanism, which makes it less convenient to use.

To solve these problems, I developed this plugin. This plugin converts all SVG files in a specified directory into a single font file and a CSS file. The CSS file is automatically included in index.html, so developers can simply use `<i class="icon-add"></i>` to display an icon (where "icon-add" corresponds to the "add.svg" SVG file). Whenever there are changes in the SVG directory, the plugin will automatically compile and process all SVG files.

## Get started

1. Install vite and this plugin with your favorite package manager, here use npm as example:

   ```bash
   npm install vite vite-plugin-svg2font -D
   ```

2. Create a `vite.config.ts` file in your project root to config vite to actually use this plugin:

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

3. Tips：

- Please ensure that only '<svg>' tags are included in the svg file, and there is no need to include '<xml>', otherwise compilation errors may occur
- Please ensure that all SVG icons have the same size as，eg: `<svg width="32" height="32">....</ svg>`

# options

```typescript
interface Svg2FontOption {
  /**
   * SVG icon directory path, the plugin will convert all SVG files in this directory into a single font file, relative to the project root directory
   * SVG file name is use to icon className
   */
  svgPath: string;
  /**
   * Specify the name of the generated CSS file and font file. Please do not include the file extensions
   */
  fileName: string;
  /**
   * The location for storing CSS files and font files during the build.
   * relative to the target path (build.outDir). By default, it uses build.assetsDir."
   */
  targetPath?: string;
  /**
   * class prefix. default "icon"
   * eg. icon-react icon-vue
   */
  classPrefix?: string;
}
```

# Examples

See the examples folder.

### License

React is [MIT licensed](./LICENSE).
