# 📊 DATA-STRUCTURE - Veri Yapısı Tanımlaması

**Son Güncelleme:** 25.04.2026

---

## 📋 Book Object (Kitap Nesnesi)

### Şema (Schema)

```javascript
{
  id: Number,           // Benzersiz ID (1, 2, 3, ...)
  title: String,        // Kitap Adı
  author: String,       // Yazar Adı
  price: Number,        // Fiyat (USD, €, TL vb)
  category: String,     // Kategori (Roman, Bilim, Aşçılık vb)
  cover: String,        // Kapak Resmi URL
  sales: Array[Number]  // 12 aylık satış verileri
}
```

### Örnek Veri

```json
{
  "id": 1,
  "title": "Suç ve Ceza",
  "author": "Fyodor Dostoyevski",
  "price": 45.0,
  "category": "Roman",
  "cover": "https://via.placeholder.com/80x120?text=Suç+ve+Ceza",
  "sales": [120, 135, 140, 155, 148, 165, 172, 180, 195, 210, 225, 240]
}
```

### Alan Açıklamaları

| Alan       | Tip     | Gerekli | Aralık/Format  | Açıklama                               |
| ---------- | ------- | ------- | -------------- | -------------------------------------- |
| `id`       | Integer | ✅      | 1+             | Benzersiz tanımlayıcı (auto-increment) |
| `title`    | String  | ✅      | 3-100 karakter | Kitap başlığı                          |
| `author`   | String  | ✅      | 2-50 karakter  | Yazar adı                              |
| `price`    | Number  | ✅      | 0.01 - 999.99  | Fiyat (2 ondalık)                      |
| `category` | String  | ✅      | Dropdown list  | Kategori seçeneği                      |
| `cover`    | String  | ✅      | Valid URL      | Kapak resmi bağlantısı                 |
| `sales`    | Array   | ✅      | 12 integers    | Aylık satış (Ocak-Aralık)              |

---

## 🏪 Kategoriler (Sabit Liste)

```javascript
const CATEGORIES = [
  "Roman",
  "Bilim Kurgu",
  "Tarih",
  "Biyografi",
  "Aşçılık",
  "Bilim",
  "Çocuk",
  "Şiir",
  "Öykü",
  "İş/Ekonomi",
];
```

---

## 💾 LocalStorage Yapısı

### Key-Value Pairs

```
Key: "bookstore_books"
Value: [
  {id: 1, title: "...", author: "...", ...},
  {id: 2, title: "...", author: "...", ...},
  ...
]
Type: JSON String (localStorage'da her şey string)
```

### JSON Serileştirme

```javascript
// Yazma (Save)
const books = [...];
localStorage.setItem('bookstore_books', JSON.stringify(books));

// Okuma (Load)
const booksJSON = localStorage.getItem('bookstore_books');
const books = JSON.parse(booksJSON || '[]');
```

---

## 📁 Golden Data Structure (JSON Dosyası)

### Dosya: `data/golden-data.json`

```json
[
  {
    "id": 1,
    "title": "Suç ve Ceza",
    "author": "Fyodor Dostoyevski",
    "price": 45.0,
    "category": "Roman",
    "cover": "https://via.placeholder.com/80x120?text=Suç+ve+Ceza",
    "sales": [120, 135, 140, 155, 148, 165, 172, 180, 195, 210, 225, 240]
  },
  {
    "id": 2,
    "title": "Beyaz Gemi",
    "author": "Cengiz Aytmatov",
    "price": 38.5,
    "category": "Roman",
    "cover": "https://via.placeholder.com/80x120?text=Beyaz+Gemi",
    "sales": [110, 125, 135, 145, 155, 160, 168, 175, 185, 200, 215, 230]
  }
  // ... 18 daha
]
```

### İçerik Özellikleri

- ✅ **20 adet kitap** (tam liste)
- ✅ **Türkçe ve İngilizce başlıklar**
- ✅ **Gerçekçi yazarlar**
- ✅ **Mantıklı fiyatlar** (€ veya $)
- ✅ **Geçerli kategori değerleri**
- ✅ **Gerçekçi satış verileri** (artan trend)

---

## ✅ Validasyon Kuralları

### Add / Edit Book Form

| Alan       | Rule                 | Hata Mesajı                          |
| ---------- | -------------------- | ------------------------------------ |
| `title`    | Min 3 char, Required | "Kitap adı en az 3 karakter olmalı"  |
| `author`   | Min 2 char, Required | "Yazar adı gerekli"                  |
| `price`    | > 0, Max 999.99      | "Fiyat 0 ile 999.99 arasında olmalı" |
| `category` | Dropdown, Required   | "Kategori seçimi gerekli"            |
| `cover`    | Valid URL            | "Geçerli bir resim URL'si gir"       |

### Client-Side Validation (JavaScript)

```javascript
function validateBook(bookData) {
  const errors = [];

  if (!bookData.title || bookData.title.length < 3) {
    errors.push("Title must be at least 3 characters");
  }

  if (!bookData.author || bookData.author.length < 2) {
    errors.push("Author name required");
  }

  if (bookData.price <= 0 || bookData.price > 999.99) {
    errors.push("Price must be between 0 and 999.99");
  }

  if (!CATEGORIES.includes(bookData.category)) {
    errors.push("Invalid category");
  }

  if (!isValidURL(bookData.cover)) {
    errors.push("Invalid image URL");
  }

  return errors;
}
```

---

## 🔄 CRUD Operasyonları

### CREATE (Ekle)

**Input:**

```javascript
const newBook = {
  title: "Yeni Kitap",
  author: "Yazarı",
  price: 29.99,
  category: "Roman",
  cover: "https://...",
  sales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
```

**Output:**

```javascript
// ID otomatik oluşur
{
  id: 21,  // Golden data'dan sonraki ID
  ...newBook
}
```

### READ (Oku)

**Tüm Kitaplar:**

```javascript
const allBooks = bookStore.getBooks();
// Return: Book[]
```

**Belirli Kitap:**

```javascript
const book = bookStore.getBooks().find((b) => b.id === 1);
// Return: Book | undefined
```

### UPDATE (Güncelle)

**Input:**

```javascript
const updatedData = {
  title: "Yeni Başlık",
  price: 35.99,
  // Sadece değişen alanları gönder
};

bookStore.updateBook(1, updatedData);
```

### DELETE (Sil)

**Input:**

```javascript
bookStore.deleteBook(1); // ID göre sil
```

### RESET (Sıfırla)

```javascript
bookStore.resetData();
// localStorage temizle
// golden-data.json tekrar yükle
// UI yenile
```

---

## 📊 İstatistikler (Computed Fields)

### Total Books

```javascript
books.length;
```

### Total Revenue (Tüm satışlar)

```javascript
books.reduce((sum, book) => {
  const monthlyRevenue = book.sales.reduce((a, b) => a + b, 0) * book.price;
  return sum + monthlyRevenue;
}, 0);
```

### Average Price

```javascript
books.reduce((sum, book) => sum + book.price, 0) / books.length;
```

### Total Sales (Tüm birimler)

```javascript
books.reduce((sum, book) => {
  return sum + book.sales.reduce((a, b) => a + b, 0);
}, 0);
```

### Monthly Revenue (Tarih bazlı)

```javascript
const monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
books.forEach((book) => {
  book.sales.forEach((sales, month) => {
    monthlyData[month] += sales * book.price;
  });
});
// monthlyData: [revenue_jan, revenue_feb, ...]
```

---

## 🧪 Test Veri Oluşturma (Bad Data)

### Rastgele Kitap Oluşturma

```javascript
function generateTestBook() {
  const testTitles = ["xxxxxx", "!!!???", "@#$%^&", "SPAM SPAM SPAM", "12345"];

  const testAuthors = ["Unknown Author", "Test Writer", "Robot"];

  return {
    title: testTitles[Math.floor(Math.random() * testTitles.length)],
    author: testAuthors[Math.floor(Math.random() * testAuthors.length)],
    price: Math.random() * 9999, // 0 - 9999
    category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
    cover: "https://via.placeholder.com/80x120?text=ERROR",
    sales: Array(12)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100)),
  };
}
```

---

## 🔐 Data Integrity

### Constraints (Kısıtlamalar)

1. ✅ **Unique ID:** Her kitabın benzersiz ID'si olmalı
2. ✅ **No Null:** Gerekli alanlar null olamaz
3. ✅ **Type Consistency:** Veri tipleri tutarlı olmalı
4. ✅ **Range Validation:** Sayılar aralık içinde

### Backup Strategy

- ✅ golden-data.json = Yedek kopya
- ✅ localStorage = Runtime veri
- ✅ Reset = golden-data.json'dan restore

---

## 📈 Veri Boyutu Tahmini

```
Single Book: ~400 bytes
20 Books: ~8 KB
50 Books (Test): ~20 KB
100 Books (Stress): ~40 KB
LocalStorage Limit: 5-10 MB (Uygun)
```

---

**Sonraki Adım:** DEVELOPMENT.md ile geliştirme rehberi
