const http = require("http");
const url = require("url");
const PORT = 3000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 设置允许跨域请求的头部信息
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const parsedUrl = url.parse(req.url, true);
  // 检查请求路径和方法
  if (parsedUrl.pathname === "/report") {
    if (req.method === "POST") {
      console.log("Request received");
      let data = "";

      // 接收请求数据
      req.on("data", (chunk) => {
        data += chunk.toString();
      });

      // 当接收完整数据后
      req.on("end", () => {
        try {
          // 在控制台输出接收到的数据
          console.log("Received data:", data);
          // 发送成功响应
          res.writeHead(204);
          res.end();
        } catch (error) {
          // 发送错误响应
          res.writeHead(400);
          res.end();
        }
      });
    } else if (req.method === "GET") {
      // 处理 GET 请求
      const queryParams = parsedUrl.query;
      // 在控制台输出接收到的查询参数
      console.log("Received query parameters:", queryParams);
      // 发送成功响应
      res.writeHead(204);
      res.end();
    } else if (req.method === "OPTIONS") {
      // 处理 OPTIONS 请求（跨域预检请求）
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*", // 允许所有来源访问
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS", // 允许的请求方法
        "Access-Control-Allow-Headers": "Content-Type", // 允许的请求头
        "Content-Length": "0", // 无需发送内容，设置内容长度为0
      });
      res.end();
    } else {
      // 发送 405 响应
      res.writeHead(405);
      res.end();
    }
  } else {
    // 发送 404 响应
    res.writeHead(404);
    res.end();
  }
});

// 监听指定端口
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
