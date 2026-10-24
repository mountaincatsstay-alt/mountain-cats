// Airbnbへのリンクを config.js のURLにそろえる
document.querySelectorAll(".js-airbnb").forEach((a) => {
  a.href = AIRBNB_URL;
});

// 公式LINEのURLが入っていれば、LINEのボタンを表示する
if (LINE_URL) {
  document.querySelectorAll(".js-line").forEach((el) => {
    (el.matches("a") ? el : el.querySelector("a")).href = LINE_URL;
    el.hidden = false;
  });
}

// スマホのメニュー
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", false);
  })
);

// 写真ギャラリー（拡大表示に出す順番）
const PHOTOS = [
  ["bedroom-1", "寝室"],
  ["bedroom-2", "寝室（鏡台つき）"],
  ["bedroom-4", "寝室（ソファつき）"],
  ["bedroom-3", "寝室"],
  ["living", "リビング"],
  ["living-2", "リビング（テレビ・キャットタワー）"],
  ["dining", "ダイニング・キッチン"],
  ["kitchen", "電子レンジ・トースター"],
  ["coffee", "コーヒーミル・ドリッパー"],
  ["lamp", "月のランプ"],
  ["mahjong", "全自動麻雀卓"],
  ["boxing", "ボクシンググローブ・ミット"],
  ["outdoor-gear", "キャンプ道具・クマよけスプレー"],
  ["washroom", "洗面所・洗濯機"],
  ["bath", "浴室"],
  ["toilet", "トイレ"],
  ["toilet-2", "トイレ"],
  ["amenities", "アメニティ"],
  ["amenities-2", "洗剤・歯ブラシなど"],
  ["exterior", "外観"],
  ["garden", "庭・ウッドデッキ"],
  ["exterior-side", "外観・駐車場"],
  ["balcony", "バルコニー"],
  ["cats", "ヒメ（黒猫）とコロ（はちわれ）"],
  ["cat-hime-2", "テーブルの下からのぞくヒメ"],
  ["cat-hallway", "パトロール中のコロ"],
];

// 最後の小さい写真に「+○枚」を重ねる
const moreItem = document.querySelector("[data-more]");
if (moreItem) {
  const shown = document.querySelectorAll(".gallery__item").length;
  const badge = document.createElement("span");
  badge.className = "gallery__more";
  badge.textContent = `+${PHOTOS.length - shown}枚`;
  (moreItem.querySelector(".ph") || moreItem).appendChild(badge);
}

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let current = 0;

function show(i) {
  current = (i + PHOTOS.length) % PHOTOS.length;
  const [name, caption] = PHOTOS[current];
  lbImg.src = `images/${name}.jpg`;
  lbImg.alt = caption;
  lbCap.textContent = `${caption}（${current + 1} / ${PHOTOS.length}）`;
}
function openLightbox(i) {
  show(i);
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-index]").forEach((el) =>
  el.addEventListener("click", () => openLightbox(Number(el.dataset.index)))
);
lb.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
lb.querySelector(".lightbox__prev").addEventListener("click", () => show(current - 1));
lb.querySelector(".lightbox__next").addEventListener("click", () => show(current + 1));
lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

// スマホでは左右のスワイプで写真を送る
let touchX = null;
lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
lb.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  touchX = null;
});
