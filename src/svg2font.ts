import { existsSync, watch } from "fs";
import path, { join } from "path";
import { readFile } from "fs/promises";
import { parse } from "url";
import { PluginOption, ResolvedConfig, ViteDevServer } from "vite";
import svgtofont from "svgtofont";

interface Svg2FontOption {
  /**
   * SVG icon directory path, the plugin will convert all SVG files in this directory into a single font file。relative to the project root directory
   * SVG filename is use to icon className
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

  /**
   * enable svgtofont log
   */
  log?: boolean;
}

const cacheDir = path.join(process.cwd(), "node_modules/.svg2font");

const production = process.env.NODE_ENV === "production";

export default function svg2font(options: Svg2FontOption): PluginOption {
  let changed = false;
  let config: ResolvedConfig | null;

  const generateIconfont = async () => {
    const buildDist = path.join(
      process.cwd(),
      config.build.outDir,
      options.targetPath ?? config.build.assetsDir
    );

    const dist = production ? buildDist : cacheDir;

    // @ts-ignore
    await svgtofont({
      src: path.join(process.cwd(), options.svgPath),
      dist: dist,
      css: {
        include: /\.css$/,
      },
      fontName: options.fileName,
      classNamePrefix: options.classPrefix || "icon",
      log: options.log ?? false,
    });
  };

  return {
    name: "svg2font",
    configResolved(_config) {
      config = _config;
    },
    buildStart() {
      if (!production) {
        generateIconfont();
        watch(options.svgPath, { recursive: true }, () => {
          changed = true;
        });
      }
    },

    configureServer(server: ViteDevServer) {
      const baseUrl = config.base;
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (changed) {
            await generateIconfont();
          }

          const url = req.originalUrl;

          if (url.startsWith(`${joinUrl(baseUrl, options.fileName)}`)) {
            const pathname = parse(url).pathname;

            const filepath = join(cacheDir, trimStart(pathname, baseUrl));

            if (existsSync(filepath)) {
              const content = await readFile(filepath);
              res.write(content);
            }
          }
          next();
        });
      };
    },
    async transformIndexHtml(html: string) {
      if (production) {
        await generateIconfont();
      }

      const baseUrl = config.base;

      const cssUrl = joinUrl(
        baseUrl,
        production ? options.targetPath ?? config.build.assetsDir : "",
        options.fileName
      );

      const newScript = `<link rel="stylesheet"  href="${cssUrl}.css?t=${Date.now()}" >`;
      return html.replace("</head>", `${newScript}</head>`);
    },
  };
}

const trimStart = (str: string, trimStr: string) => {
  return str.replace(new RegExp(`^${trimStr}`), "");
};

const joinUrl = (...strs: string[]) => {
  return strs.join("/").replace(/\/+/g, "/").replace(/:\//, "//");
};
