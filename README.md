# NCU BoltNut Robotics 官方網站

[NCU BoltNut Robotics](https://ncuboltnut.pages.dev) 是國立中央大學機械工程學系學生於 2025 年 4 月自主創立的機器人團隊。我們的名字來自機械工程最基本的緊固件——螺栓（Bolt）與螺帽（Nut），每一位成員都是不可缺少的一環，緊扣在一起，才能把機器人設計帶向任何想到達的地方。

> Bolt together, Nuts going anywhere.

從工程三館 129 教室的第一場招生說明會開始，我們陸續舉辦密集暑訓、招募跨系新血、投入國研盃智慧機械競賽備賽。2025 年 12 月，我們與陽明交通大學、清華大學及台灣師範大學跨校組成「Future Shark」隊伍，出戰東京威力科創機器人大賽（TEL Robot Combat），榮獲亞軍——寫下團隊成立以來第一座競賽獎盃。2026 年 3 月，我們帶著自製機器人「獵爪清道夫」登上國研盃智慧機械競賽舞台，持續累積實戰經驗與榮譽。

競賽成果、活動花絮與團隊沿革請見網站的[競賽成就](https://ncuboltnut.pages.dev/achievements)、[過往活動成果](https://ncuboltnut.pages.dev/activities)與[關於我們](https://ncuboltnut.pages.dev/about)頁面。

## 這個 Repository

這裡是官方網站的原始碼與內容——新聞、活動、競賽成就、成員、贊助商等所有公開內容，都以結構化檔案的形式存放在這個 repo 裡，是網站唯一的資料來源（single source of truth）。

**技術棧：** Astro + TypeScript，搭配 Vue 3 處理少數需要互動的區塊，內容以 Astro Content Collections（新聞／活動／成就）與結構化 TypeScript 資料（成員／屆別／贊助商／隊史）管理。

**部署：**

| 環境 | 網址 | 說明 |
| --- | --- | --- |
| 正式站 | https://ncuboltnut.pages.dev | Cloudflare Pages，唯一正式對外網址 |
| 預覽站 | https://ncuboltnut.github.io | GitHub Pages，供 `main` 分支即時預覽 |

Node.js 版本需求：見 `package.json` 的 `engines` 欄位。

貢獻規範與架構決策請見 [`CLAUDE.md`](./CLAUDE.md)。
