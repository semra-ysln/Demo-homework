# 📖 DEVELOPMENT - Geliştirme Rehberi

**Son Güncelleme:** 25.04.2026

---

## 🎯 Geliştirici Özeti

Bu dokümantasyon, yeni bir geliştirici veya ekip üyesi için rehber sağlar.

---

## 🏁 Başlangıç Kontrol Listesi

- [ ] PLAN.md oku
- [ ] ARCHITECTURE.md inceleden
- [ ] SETUP.md adımlarını takip et
- [ ] DATA-STRUCTURE.md veri formatını anla
- [ ] TEST.md test senaryolarını gözden geçir
- [ ] Projede hiç bir hata varsa çöz

---

## 🔨 Kod Yazarken Uyulması Gerekenler

### Dosya Organizasyonu

```
✅ DOĞRU:
js/
├── app.js          (Ana uygulama)
├── data.js         (Veri yönetimi)
└── toast.js        (Bildirimler)

❌ YANLIŞ:
js/
├── app.js
├── utils.js
├── config.js
└── helpers.js
(Gereksiz dosya çoğalması)
```

### Kod Stili

#### 1. **Naming Convention**

```javascript
// ✅ Camel Case (Değişkenler)
const maxBooks = 100;
const isValidPrice = true;

// ✅ PascalCase (Sınıflar)
class BookStore {}
class Toast {}

// ✅ CONSTANT (Sabitler)
const STORAGE_KEY = "bookstore_books";
const MAX_PRICE = 999.99;

// ❌ YANLIŞ
const max_books = 100;
const book_store = {};
```

#### 2. **Comments (Yorum)**

```javascript
// ✅ DOĞRU - Ne için açıkla
// Initialize books from localStorage or use golden data
const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// ✅ Kompleks logic'i açıkla
// Filter books with price over 50 and sort by sales
const premiumBooks = books
  .filter((b) => b.price > 50)
  .sort(
    (a, b) => b.sales.reduce((a, b) => a + b) - a.sales.reduce((a, b) => a + b),
  );

// ❌ YANLIŞ - Açık olan şeyi açıklama
// Get length of array
const length = books.length;

// ❌ Türkçe comment mi İngilizce mi karıştırma
// Kitapları al // Get books (İkisi birden)
```

#### 3. **ES6+ Özellikler Kullan**

```javascript
// ✅ Arrow functions
const addBook = (book) => { ... };

// ✅ Destructuring
const { title, author, price } = book;

// ✅ Ternary (basit durumlarda)
const status = price > 0 ? 'valid' : 'invalid';

// ✅ Template literals
const message = `Kitap "${title}" başarıyla eklendi`;

// ❌ Eski style
var addBook = function(book) { ... };
```

#### 4. **Error Handling**

```javascript
// ✅ Try-catch
try {
  const booksJSON = localStorage.getItem(STORAGE_KEY);
  const books = JSON.parse(booksJSON);
} catch (error) {
  console.error("JSON parse hatası:", error);
  Toast.show("Veri yüklenemedi", "error");
}

// ❌ Hiç error handling yok
const books = JSON.parse(localStorage.getItem(STORAGE_KEY));
```

---

## 🔄 Coding Workflow

### 1. Özellik Eklerken

```
Step 1: Test case yaz (TEST.md'de)
        ↓
Step 2: HTML/Form oluştur (index.html)
        ↓
Step 3: Event listener ekle (app.js)
        ↓
Step 4: Data layer logic (data.js)
        ↓
Step 5: Styling (style.css)
        ↓
Step 6: Test et (Browser + Console)
        ↓
Step 7: Commit & Push
```

### 2. Hata Düzeltme (Debugging)

```javascript
// Console kullan
console.log("books:", books); // Veriyi gör

// Debugger kullan
debugger; // Kodu buraya durdur

// try-catch + error log
try {
  // risky code
} catch (e) {
  console.error("Error details:", e);
}
```

### 3. Git Workflow

```bash
# 1. Feature branch oluştur
git checkout -b feature/add-book

# 2. Kod yaz, test et
# (dosyaları düzenle)

# 3. Commit et
git add .
git commit -m "Feature: Add book functionality"

# 4. Push et
git push origin feature/add-book

# 5. Pull request aç (GitHub'da)
```

---

## 🎨 CSS Yazarken

### Organization

```css
/* ✅ DOĞRU - Grouped ve organized */
/* Typography */
body { font-family: ...; }

/* Layout */
.container { display: flex; }

/* Components */
.btn { padding: ...; }

/* Responsive */
@media (max-width: 768px) { ... }

/* ❌ YANLIŞ - Karışık */
body { ... }
.container { ... }
a { ... }
.btn { ... }
p { ... }
```

### Bootstrap Sınıfları Öncelik

```html
<!-- ✅ Bootstrap sınıflarını kullan -->
<button class="btn btn-primary btn-lg">Click me</button>

<!-- ⚠️ Gerekli durumlarda custom CSS ekle -->
<button class="btn btn-primary btn-lg custom-shadow">Click me</button>

<!-- ❌ Bootstrap'i yok say -->
<button style="padding: 10px; background: blue; color: white;">Click me</button>
```

---

## 🧪 Testing Sırasında

### Console Test Commands

```javascript
// Veriyi kontrol et
localStorage.getItem("bookstore_books");

// BookStore test et
bookStore.getBooks().length;

// Kitap ekle
bookStore.addBook({
  title: "Test",
  author: "Test",
  price: 10,
  category: "Roman",
  cover: "url",
  sales: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
});

// Reset et
bookStore.resetData();

// Toast göster
Toast.show("Test message", "success");
```

### Manual Testing Checklist

- [ ] Sayfa yüklendiğinde 20 kitap var mı?
- [ ] Kitap ekle formu açılıyor mu?
- [ ] Validasyon çalışıyor mu? (Boş alan, negatif fiyat vb)
- [ ] Kitap eklendikten sonra tablo güncelleniyorMu?
- [ ] Düzenle butonu çalışıyor mu?
- [ ] Sil butonu çalışıyor mu?
- [ ] Reset butonu 20 kitabına geri döndürüyor mu?
- [ ] Ctrl+Shift+R kısayolu çalışıyor mu?
- [ ] Toast mesajları gösteriliyor mu?
- [ ] Responsive tasarım çalışıyor mu? (Tarayıcıyı küçült)

---

## 📚 Referans Linkler

### JavaScript

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ES6 Features](https://es6.io/)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Frontend

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Chart.js Documentation](https://www.chartjs.org/)

### Git & GitHub

- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Guides](https://guides.github.com/)

---

## 💡 İyi Pratikler (Best Practices)

### 1. **DRY (Don't Repeat Yourself)**

```javascript
// ❌ Tekrarlayan kod
function addBook1() { ... }
function addBook2() { ... }
function addBook3() { ... }

// ✅ Tek fonksiyon
function addBook(bookData) { ... }
```

### 2. **KISS (Keep It Simple, Stupid)**

```javascript
// ❌ Karmaşık
const result = arr
  .map((x) => x * 2)
  .filter((x) => x > 10)
  .reduce((a, b) => a + b, 0);

// ✅ Okunaklı
const doubled = arr.map((x) => x * 2);
const filtered = doubled.filter((x) => x > 10);
const sum = filtered.reduce((a, b) => a + b, 0);
```

### 3. **Performance**

```javascript
// ❌ Döngü içinde DOM işlemi
for (let book of books) {
  document.querySelector("table").innerHTML += `<tr>...</tr>`; // Yavaş!
}

// ✅ Bir kez güncelle
let html = "";
for (let book of books) {
  html += `<tr>...</tr>`;
}
document.querySelector("table").innerHTML = html; // Hızlı!
```

---

## 🚀 Performans Optimizasyonu

### 1. LocalStorage Cache

```javascript
let booksCache = null;

function getBooks() {
  if (!booksCache) {
    booksCache = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }
  return booksCache;
}

// Cache'i güncelle
function invalidateCache() {
  booksCache = null;
}
```

### 2. Event Delegation

```javascript
// ❌ Her buton için listener
document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", deleteBook);
});

// ✅ Parent'e bir listener
document.querySelector("tbody").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteBook(e.target.dataset.id);
  }
});
```

---

## 🐛 Yaygın Hatalar

### 1. **localStorage Veri Kaybı**

```javascript
// ❌ YANLIŞ
localStorage.setItem("data", books); // Nesne olarak?

// ✅ DOĞRU
localStorage.setItem("data", JSON.stringify(books));
```

### 2. **Promise/Async Unutmak**

```javascript
// ❌ YANLIŞ - Dosya yüklenmesi asynchron
fetch("data.json").then((r) => r.json());
// İşlem sonra execute edilir

// ✅ DOĞRU
fetch("data.json")
  .then((r) => r.json())
  .then((data) => {
    // Burada güvenli
    console.log(data);
  });
```

### 3. **Global Değişken Pollüsyon**

```javascript
// ❌ YANLIŞ
var books = [];
var users = [];
// Global namespace polluted

// ✅ DOĞRU
const app = {
  books: [],
  users: [],
  init() { ... }
};
```

---

## 📝 Commit Mesajları

### Format

```
<type>: <subject>

<body>

<footer>
```

### Örnekler

```bash
git commit -m "feat: Add book deletion functionality"
git commit -m "fix: Reset button not working"
git commit -m "style: Update sidebar colors"
git commit -m "refactor: Extract validation logic"
git commit -m "docs: Update README with examples"
```

---

## ✅ Pre-Commit Kontrol

Commit etmeden önce kontrol et:

- [ ] Kod çalışıyor mu?
- [ ] Test geçmiş mi?
- [ ] console.log() kaldırıldı mı?
- [ ] Gereksiz dosya yok mu?
- [ ] .gitignore güncellendi mi?

---

**Sonraki Adım:** TEST.md ile test senaryoları
