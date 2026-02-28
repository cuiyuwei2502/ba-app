# 行为激活 · Behavior Activation App

基于行为激活疗法（Behavioral Activation）的卡片抽取工具。

---

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173

---

## 部署到 Vercel（推荐，免费）

### 方法一：通过 GitHub（推荐）

1. 在 [github.com](https://github.com) 新建一个仓库（可以设为 Private）
2. 把这个文件夹里的所有文件上传到仓库
3. 去 [vercel.com](https://vercel.com) 用 GitHub 账号登录
4. 点 **Add New Project** → 选择你的仓库
5. 框架会自动识别为 **Vite**，直接点 **Deploy**
6. 几分钟后得到链接，比如 `your-app.vercel.app`

### 方法二：通过 Vercel CLI

```bash
npm install -g vercel
vercel
```

按提示操作，部署完成后会给你一个链接。

---

## 文件结构

```
ba-app/
├── index.html          # 入口 HTML
├── vite.config.js      # Vite 配置
├── package.json        # 依赖
├── vercel.json         # Vercel 路由配置
└── src/
    ├── main.jsx        # React 入口
    └── App.jsx         # 主应用（全部逻辑在这里）
```

---

## 数据说明

用户数据（历史记录、自定义卡片、偏好设置）存储在浏览器 `localStorage`，不上传服务器。清除浏览器缓存会丢失数据。
