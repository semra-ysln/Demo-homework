# 🏗️ ARCHITECTURE - Teknik Mimari

**Son Güncelleme:** 25.04.2026

---

## 📦 Sistem Bileşenleri

```
┌─────────────────────────────────────────────────────┐
│               BROWSER (Frontend)                     │
├─────────────────────────────────────────────────────┤
│  HTML (index.html, admin.html)                      │
│         ↓                                            │
│  CSS (style.css)  ← Bootstrap 5 CDN                 │
│         ↓                                            │
│  JavaScript (ES6+)                                  │
│  ┌──────────────────────────────────────────────┐  │
│  │  app.js (Main Application)                   │  │
│  │  ├─ Event Listeners                          │  │
│  │  ├─ DOM Manipulation                         │  │
│  │  └─ Chart.js Rendering                       │  │
│  ├──────────────────────────────────────────────┤  │
│  │  data.js (Data Management)                   │  │
│  │  ├─ BookStore Class                          │  │
│  │  ├─ LocalStorage Operations                  │  │
│  │  └─ Golden Data Management                   │  │
│  ├──────────────────────────────────────────────┤  │
│  │  toast.js (Notifications)                    │  │
│  │  └─ Toast Singleton                          │  │
│  └──────────────────────────────────────────────┘  │
│                     ↓                               │
│         ┌───────────────────────┐                  │
│         │  localStorage API     │                  │
│         │  (Runtime Data)       │                  │
│         └───────────────────────┘                  │
│                     ↓                               │
│         ┌───────────────────────┐                  │
│         │  golden-data.json     │                  │
│         │  (Reset Source)       │                  │
│         └───────────────────────┘                  │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Veri Akışı (Data Flow)

### 1. **İlk Yükleme (Page Load)**

```
Page Load
    ↓
data.js → init()
    ↓
localStorage kontrol et
    ├─ BOŞSA: golden-data.json oku → localStorage'a yazı
    └─ DOLUYSA: localStorage'dan oku
    ↓
app.js → render()
    ↓
UI güncelle (Table + Chart)
```

### 2. **Kitap Ekleme**

```
User: Add Book Form Submit
    ↓
Validasyon (Empty, Price < 0)
    ├─ BAŞARILI: data.js → addBook()
    │   ↓
    │   localStorage güncelle
    │   ↓
    │   app.js → render()
    │   ↓
    │   Toast: "Kitap eklendi" (success)
    │
    └─ BAŞARISIZ: Toast: "Hata" (error)
```

### 3. **Sistem Reset**

```
User: Reset Button / Ctrl+Shift+R
    ↓
Confirm Dialog
    ├─ EVET:
    │   ↓
    │   data.js → resetData()
    │   ├─ localStorage.clear()
    │   ├─ golden-data.json tekrar oku
    │   └─ localStorage'a yazı
    │   ↓
    │   app.js → render()
    │   ↓
    │   Toast: "Sistem sıfırlandı" (success)
    │
    └─ HAYIR: İşlem iptal
```

---

## 📊 Modül Sorumlulukları

| Modül              | Dosya           | Görev                                |
| ------------------ | --------------- | ------------------------------------ |
| **Data Layer**     | `js/data.js`    | LocalStorage yönetimi, CRUD, Reset   |
| **UI Logic**       | `js/app.js`     | DOM, Event handlers, Chart render    |
| **Notifications**  | `js/toast.js`   | Toast mesajlar                       |
| **User Dashboard** | `index.html`    | Kitap listesi, statler, grafikler    |
| **Admin Panel**    | `admin.html`    | Ekle, Düzenle, Sil, Reset, Test veri |
| **Styling**        | `css/style.css` | Layout, animasyonlar, responsive     |

---

## 🔑 Anahtar Sınıflar & Fonksiyonlar

### `BookStore` Class (data.js)

```javascript
class BookStore {
  constructor()
  init()                    // Golden data yükle
  getBooks()               // Tüm kitapları getir
  addBook(bookData)        // Kitap ekle
  updateBook(id, bookData) // Kitap güncelle
  deleteBook(id)           // Kitap sil
  resetData()              // Golden state'e dön
  exportData()             // Debug için export
}
```

### `Toast` Singleton (toast.js)

```javascript
class Toast {
  show(message, type, duration)  // type: success|error|warning|info
}
```

### Event Handlers (app.js)

- `addBookForm.onsubmit`
- `editBookForm.onsubmit`
- `deleteBookBtn.onclick`
- `resetBtn.onclick`
- `testDataBtn.onclick`
- `window.onkeydown` → Ctrl+Shift+R

---

## 💾 Veri Yapısı

### Golden Data Format (JSON)

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

### LocalStorage Yapısı

```
Key: "bookstore_books"
Value: [
  { id: 1, title: "...", ... },
  { id: 2, title: "...", ... },
  ...
]
```

---

## 🔐 Reset Mekanizması

1. **Trigger Noktaları:**
   - Admin panelinde "Sistemi Sıfırla" butonu
   - Keyboard: `Ctrl + Shift + R`

2. **Adımlar:**
   - Onay dialog göster
   - localStorage temizle
   - golden-data.json oku
   - localStorage'a yaz
   - UI yenile

3. **Başarı Göstergesi:**
   - Kitap sayısı = 20
   - Toast: "Sistem başarıyla sıfırlandı"

---

## 🎨 UI States

| State         | Açıklama       | Renklendirilme                |
| ------------- | -------------- | ----------------------------- |
| **Golden**    | 20 temiz kitap | ✅ Yeşil (Demo Ready)         |
| **Dirty**     | 20+ kitap      | ⚠️ Kırmızı (Test Data)        |
| **Corrupted** | Hatalı veri    | 🔴 Gri (Resetlemeyi bekliyor) |

---

## 📱 Responsive Breakpoints

```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

---

## ⚙️ Teknoloji Stack

| Katman  | Teknoloji                | Amaç              |
| ------- | ------------------------ | ----------------- |
| HTML    | HTML5                    | Struktur          |
| CSS     | CSS3 + Bootstrap 5 (CDN) | Stil + Responsive |
| JS      | ES6+ Vanilla JS          | Mantık            |
| Icons   | Font Awesome 6 (CDN)     | UI İkonları       |
| Charts  | Chart.js (CDN)           | Grafikler         |
| Storage | LocalStorage API         | Veri Depolaması   |

---

## 🚀 Performance Hedefleri

- ⏱️ İlk Yükleme: < 2 saniye
- 📊 Chart Render: < 500ms
- 🔄 Reset İşlemi: < 1 saniye
- 💾 LocalStorage Size: < 1MB

---

## 🔒 Güvenlik Notları

- ✅ localStorage = Tarayıcı içinde (XSS var ama public demo)
- ✅ İnput Sanitization: Temel validation
- ⚠️ Production'da: Backend API gerekir

---

**Sonraki Adım:** SETUP.md ile kurulum talimatları
