/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    // this line is added to each sass file so that
    // we don't have to write an import each time
    // you can add more imports here, if you want
    prependData: `@use "@/app/styles/mixins" as *;`,
  },
};

module.exports = nextConfig;
