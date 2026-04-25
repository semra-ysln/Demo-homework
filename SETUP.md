# 🔧 SETUP - Kurulum & Çalıştırma Kılavuzu

**Son Güncelleme:** 25.04.2026

---

## 🚀 Hızlı Başlangıç (5 Dakika)

### 1️⃣ Dosyaları İndir

```bash
git clone https://github.com/KULLANICI/bookstore-dashboard.git
cd bookstore-dashboard
```

### 2️⃣ Dosya Yapısını Kontrol Et

```
✅ index.html
✅ admin.html
✅ css/style.css
✅ js/app.js
✅ js/data.js
✅ js/toast.js
✅ data/golden-data.json
✅ *.md dosyaları
```

### 3️⃣ Çalıştır

```bash
# Seçenek 1: VS Code Live Server
# (VS Code'da sağ tıkla → "Open with Live Server")

# Seçenek 2: Python SimpleHTTPServer
python -m http.server 8000
# Sonra: http://localhost:8000

# Seçenek 3: Node.js http-server
npx http-server
# Sonra: http://localhost:8080
```

### 4️⃣ Demo Yap

1. http://localhost:8000 açıldığında 20 kitap görünür
2. Sağ üst köşede "Admin" butonuna tıkla
3. "Test Veri Ekle" ile saçma veriler ekle
4. "Sistemi Sıfırla" butonuna bas
5. 20 kitaba dönüldüğünü gözle ✅

---

## 📋 Sistem Gereksinimleri

| Gereksinim       | Minimum                  | Önerilen     |
| ---------------- | ------------------------ | ------------ |
| **Tarayıcı**     | Chrome 60+ / Firefox 55+ | Chrome 100+  |
| **localStorage** | 5MB                      | 10MB+        |
| **Internet**     | Sadece CDN için          | Stabil       |
| **OS**           | Windows/Mac/Linux        | Herhangi bir |

---

## 🛠️ Geliştirme Ortamı (Dev Setup)

### Opsiyonel: Daha Hızlı Geliştirme

```bash
# 1. Node.js yükle (https://nodejs.org)

# 2. Basit web server kur
npm install -g http-server

# 3. Projeye git
cd bookstore-dashboard

# 4. Server başlat
http-server -c-1
# -c-1 = cache'i devre dışı bırak (her yükleme yeni dosya çeksin)
```

### VS Code Extensions (Opsiyonel)

- Live Server (Ritwick Dey)
- Prettier (Code Formatter)
- ESLint (Lint)

---

## 🔍 Browser Developer Tools Kullanımı

### Console'da Test

```javascript
// localStorage'ı kontrol et
console.log(localStorage.getItem("bookstore_books"));

// BookStore objesini kontrol et (app.js'den erişim)
console.log(bookStore.getBooks());

// Tüm localStorage temizle
localStorage.clear();

// Toast göster
Toast.show("Test mesajı", "success");
```

### LocalStorage Explorer

1. DevTools → Application → LocalStorage
2. http://localhost:8000 seç
3. `bookstore_books` key'ine bakın

---

## 📁 Proje Açılması

### VS Code

```bash
code .
# Live Server'ı başlatmak için: Sağ tıkla → Open with Live Server
```

### Sublime Text / Atom

```bash
# VS Code favori, başka editör de olur
subl .
atom .
```

---

## ⚙️ Konfigürasyon

### LocalStorage Key

Değiştirmek istersen (js/data.js'de):

```javascript
const STORAGE_KEY = "bookstore_books"; // Değiştir
```

### Golden Data Path

Golden data başka yerde ise (js/data.js'de):

```javascript
const GOLDEN_DATA_URL = "./data/golden-data.json"; // Değiştir
```

### Bootstrap CDN (İsteğe bağlı)

index.html / admin.html'de:

```html
<!-- CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

---

## 🐛 Sorun Giderme

### Problem: "CORS hatası aldım"

**Çözüm:** Local file:// protokolü ile CORS sorunu yaşarsınız. HTTP server kullanın:

```bash
npx http-server
```

### Problem: "golden-data.json yüklenmiyor"

**Kontrol listesi:**

1. ✅ data/golden-data.json dosyası var mı?
2. ✅ Yolu doğru mu? (`./data/golden-data.json`)
3. ✅ JSON syntax doğru mu? (JSON validator kullan)
4. ✅ Server çalışıyor mı?

### Problem: "Reset butonu çalışmıyor"

**Debug:**

1. Browser DevTools Console aç
2. Hata mesajı var mı?
3. `localStorage.clear()` manuel çalıştırırsan?

```javascript
// Console'da
localStorage.clear();
location.reload();
```

### Problem: "Ctrl+Shift+R çalışmıyor"

**Sebep:** Tarayıcı kısayolu olabilir (Cache clear).
**Çözüm:** app.js'de farklı kısayol ayarla:

```javascript
// Ctrl+Shift+R yerine Ctrl+Alt+R kullan
if (e.ctrlKey && e.altKey && e.key === "r") {
  resetData();
}
```

---

## 🚢 Deployment (GitHub Pages)

### Adım 1: GitHub'a Yükle

```bash
git init
git add .
git commit -m "Initial commit: Bookstore Dashboard"
git branch -M main
git remote add origin https://github.com/KULLANICI/bookstore-dashboard.git
git push -u origin main
```

### Adım 2: GitHub Pages Etkinleştir

1. GitHub repo ayarlarına git
2. Pages → Source → main branch seç
3. Kaydet
4. 1-2 dakika sonra: `https://KULLANICI.github.io/bookstore-dashboard/`

---

## ✅ Deployment Checklist

- [ ] Tüm dosyalar GitHub'da mı?
- [ ] .gitignore var mı?
- [ ] README.md dolu mu?
- [ ] golden-data.json erişilebilir mi?
- [ ] HTML dosyalarında mutlak path yok mu? (hep relative: `./js/app.js`)
- [ ] Browser DevTools'da hata yok mu?

---

## 🔄 Development Workflow

### Dosya Değişikliği Yaptığında

```bash
# 1. Dosyayı düzenle (VS Code / editör)

# 2. Tarayıcıda F5 (refresh)
#    Veya Live Server otomatik yenile

# 3. DevTools Console'da hata kontrol et

# 4. Git'e commit at
git add .
git commit -m "Feature: Add reset button"
git push
```

---

## 📞 İletişim & Destek

- **Hata buldu:** GitHub Issues
- **Soru sordu:** Discussion açın
- **E-mail:** semra@university.edu

---

**Sonraki Adım:** DATA-STRUCTURE.md ile veri yapısı tanımı
