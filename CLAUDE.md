# 诗词浏览器 (Poem Viewer)

随机展示中国古代诗词名句的单页应用。点「启卷」按钮随机显示一句。

**网址**: https://leebaichuan.github.io/poem-viewer/

## 诗人入口

| URL | 诗人 | 标题 | 句数 |
|-----|------|------|------|
| `/` 或 `index.html` | 辛弃疾（稼轩） | 稼轩词句 | 100 |
| `libai.html` | 李白（太白） | 太白诗选 | 100 |
| `bai-juyi.html` | 白居易（乐天） | 乐天诗选 | 61 |

## 文件结构

```
poem-viewer/
├── index.html          # 辛弃疾入口（设置 window.POET）
├── libai.html          # 李白入口
├── bai-juyi.html       # 白居易入口
├── style.css           # 共享样式（桌面大字号 + 移动端响应式）
├── app.js              # 共享逻辑（fetch JSON、加权随机、DOM 渲染）
├── data/
│   ├── xin-qiji.json   # 辛弃疾 100 句，青玉案·元夕 3 倍权重
│   ├── libai.json      # 李白 100 句，将进酒/蜀道难 3 倍权重
│   └── bai-juyi.json   # 白居易 61 句，长恨歌/琵琶行 2 倍权重
└── deploy.sh           # git add → commit → push 一键部署
```

## 添加新诗人

1. 创建 `data/<poet>.json`，格式参考已有文件
2. 创建 `<poet>.html`，复制任意入口，改 `window.POET` 值即可
3. 提交推送

**JSON 数据格式**：
```json
{
  "title": "太 白 诗 选",
  "buttonText": "点 此 启 卷",
  "weightedIndices": [0, 1, 2, 3],
  "weightMultiplier": 3,
  "verses": ["诗句一", "诗句二", ...]
}
```
- `weightedIndices` — 需要多倍权重的 verse 索引
- `weightMultiplier` — 这些 verse 的总出现倍数（1 = 不额外加权）

## 字体策略

- **桌面端** (>768px)：仅用系统楷体，不加载 Web Font
- **移动端** (≤768px)：加载霞鹜文楷（LXGW WenKai）via jsdelivr CDN
- 原因：Google Fonts 在国内被墙，jsdelivr CDN 国内可访问
- 字体 CSS 通过 `<link media="(max-width: 768px)">` 仅在移动端触发下载

## 部署

```bash
./deploy.sh "commit message"
```
或手动 `git push`。GitHub Pages 会自动部署 `main` 分支。
