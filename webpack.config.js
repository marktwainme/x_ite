const
   webpack = require ("webpack"),
   madge   = require ("madge"),
   path    = require ("path"),
   fs      = require ("fs")

const
   TerserPlugin           = require ("terser-webpack-plugin"),
   WebpackShellPluginNext = require ("webpack-shell-plugin-next"),
   MiniCssExtractPlugin   = require ("mini-css-extract-plugin"),
   CssMinimizerPlugin     = require ("css-minimizer-webpack-plugin")

module .exports = async () =>
{
   async function deps (filename)
   {
      const
         graph = await madge (filename),
         deps  = new Set ()

      for (const files of Object .values (graph .obj ()))
      {
         for (const file of files)
            deps .add (path .resolve (__dirname, "src", file))
      }

      return deps
   }

   const x_ite_deps = await deps ("./src/x_ite.js")

   const targets = [ ]

   targets .push ({
      entry: {
         "x_ite": "./src/x_ite.css",
      },
      output: {
         path: path .resolve (__dirname, "dist"),
      },
      mode: "production",
      module: {
         rules: [
            {
               test: /\.css$/,
               use: [
                  MiniCssExtractPlugin.loader,
                  {
                     loader: "css-loader",
                     options: {
                        url: false
                     },
                  },
               ],
            },
         ],
      },
      optimization: {
         minimize: true,
         minimizer: [
            new CssMinimizerPlugin ({
               parallel: true,
               minify: CssMinimizerPlugin .cssoMinify,
               exclude: /\.png$/,
               minimizerOptions: {
                  preset: [
                     "default",
                     {
                        discardComments: { removeAll: true },
                     },
                  ],
               },
            }),
         ],
      },
      plugins: [
         new MiniCssExtractPlugin ({
            filename: "[name].css",
         }),
         new WebpackShellPluginNext ({
            logging: false,
            onBuildEnd: {
               scripts: [
                  `perl -p0i -e 's|^|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite.css`,
               ],
               blocking: false,
               parallel: false,
            },
         }),
      ],
      stats: "errors-only",
   })

   targets .push ({
      entry: {
         "x_ite": "./src/x_ite.js",
         "x_ite.min": "./src/x_ite.js",
      },
      output: {
         path: path .resolve (__dirname, "dist"),
         filename: "[name].js",
      },
      mode: "production",
      optimization: {
         minimize: true,
         minimizer: [
            new TerserPlugin ({
               include: /\.min\.js$/,
               parallel: true,
               extractComments: true,
               terserOptions: {
                  compress: true,
                  mangle: true,
                  format: {
                     comments: false,
                  },
               },
            }),
         ],
      },
      plugins: [
         new webpack .ProvidePlugin ({
            $: "jquery",
            jQuery: "jquery",
            jquery_mousewheel: "jquery-mousewheel/jquery.mousewheel.js",
            libtess: "libtess/libtess.cat.js",
            opentype: "opentype.js/dist/opentype.js",
            pako: "pako/dist/pako_inflate.js",
            ResizeSensor: "css-element-queries/src/ResizeSensor.js",
         }),
         new WebpackShellPluginNext ({
            logging: false,
            onBuildStart: {
               scripts: [
                  `echo 'Bundling x_ite ...'`,
                  `perl -p0i -e 's/export default (?:true|false);/export default false;/sg' src/x_ite/DEBUG.js`,
               ],
               blocking: false,
               parallel: false,
            },
            onBuildEnd: {
               scripts: [
                  `perl -p0i -e 's/export default (?:true|false);/export default true;/sg' src/x_ite/DEBUG.js`,
                  `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/x_ite.js`,
                  `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/x_ite.min.js`,
                  `perl -p0i -e 's|^/\\*.*?\\*/|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite.js`,
                  `perl -p0i -e 's|^/\\*.*?\\*/|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite.min.js`,
                  // LICENSES
                  `cp LICENSE.md dist/LICENSE.md`,
                  `echo '\`\`\`' >> dist/LICENSE.md`,
                  `cat dist/x_ite.min.js.LICENSE.txt >> dist/LICENSE.md`,
                  `rm dist/x_ite.min.js.LICENSE.txt`,
                  `echo '\`\`\`' >> dist/LICENSE.md`,
               ],
               blocking: false,
               parallel: false,
            },
        }),
      ],
      stats: "errors-warnings",
      performance: {
         hints: "warning",
         maxEntrypointSize: 10_000_000,
         maxAssetSize: 10_000_000,
      },
   })

   const plugins = {
      RigidBodyPhysics: { },
      Texturing3D: { },
   }

   for (const filename of fs .readdirSync ("./src/assets/components/"))
   {
      const name = path .parse (filename) .name

      targets .push ({
         entry: {
            [name]: "./src/assets/components/" + filename,
            [name + ".min"]: "./src/assets/components/" + filename,
         },
         output: {
            path: path .resolve (__dirname, "dist/assets/components"),
            filename: "[name].js",
         },
         mode: "production",
         optimization: {
            minimize: true,
            minimizer: [
               new TerserPlugin ({
                  include: /\.min\.js$/,
                  parallel: true,
                  extractComments: false,
                  terserOptions: {
                     compress: true,
                     mangle: true,
                     format: {
                        comments: false,
                     },
                  },
               }),
            ],
         },
         plugins: [
            new webpack .ProvidePlugin (plugins [name] || { }),
            new WebpackShellPluginNext ({
               logging: false,
               onBuildStart: {
                  scripts: [
                     `echo 'Bundling ${name} ...'`,
                  ],
                  blocking: false,
                  parallel: false,
               },
               onBuildEnd: {
                  scripts: [
                     `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/assets/components/${name}.js`,
                     `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/assets/components/${name}.min.js`,
                     `perl -p0i -e 's|^/\\*.*?\\*/|/* X_ITE v'$npm_package_version' */|sg' dist/assets/components/${name}.js`,
                     `perl -p0i -e 's|^/\\*.*?\\*/|/* X_ITE v'$npm_package_version' */|sg' dist/assets/components/${name}.min.js`,
                  ],
                  blocking: false,
                  parallel: false,
               },
            }),
         ],
         externals: [
            function ({ context, request }, callback)
            {
               const filename = path .resolve (context, request)

               if (x_ite_deps .has (filename))
               {
                  const module = path .relative (path .resolve (__dirname, "src"), filename) .replace (/\.js$/, "")

                  return callback (null, `var window [Symbol .for ("X_ITE.X3D")] .require ("${module}")`)
               }

               return callback ()
            },
         ],
         resolve: {
            fallback: {
               path: false,
               fs: false,
            },
         },
         stats: "errors-warnings",
         performance: {
            hints: "warning",
            maxEntrypointSize: 10_000_000,
            maxAssetSize: 10_000_000,
         },
      })
   }

   targets .parallelism = 4

   return targets
}
