/** @type {import('next').NextConfig} */
const path = require("path")

require(path.join(__dirname, "./load-env.js"))
require(path.join(__dirname, "./verify-env.js"))

const nextConfig = {}

module.exports = nextConfig
