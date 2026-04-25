# 📚 README - Kitapevi Online Satış Sistemi

**Proje Adı:** Bookstore Inventory Dashboard  
**Sürüm:** 1.0  
**Tarih:** 25 Nisan 2026  
**Durum:** ✅ Production Ready (Demo)

---

## 🎯 Proje Özeti

Bu proje, **bozulmuş verileri temizleyerek sistemi "Golden State"e dönüştüren** bir pazarlama demo uygulamasıdır.

### Ana Senaryo:

1. **Temiz Durum:** Sistem 20 adet yazarı doğru, fiyatı mantıklı kitapla başlar
2. **Bozuk Durum:** Test ekibi 50+ adet saçma, hatalı veri ekler
3. **Reset Mekanizması:** Admin tek tuşla **"Sistemi Sıfırla"** → 20 temiz kitaba dönüş

---

## ✨ Temel Özellikler

### ✅ Kullanıcı Paneli (index.html)

- 📋 20 kitabın temiz listesi
- 📊 İstatistik kartları (Toplam Kitap, Gelir, Ort. Fiyat)
- 📈 Aylık satış grafiği (Chart.js)
- 🎨 Modern ve responsive tasarım

### ✅ Admin Paneli (admin.html)

- ➕ Yeni kitap ekleme
- ✏️ Mevcut kitabı düzenleme
- 🗑️ Kitap silme
- 🔄 Sistem sıfırlama (Reset)
- 🧪 Test veri ekleme (Bozuk veri simülasyonu)

### ✅ Gizli Kısayollar

- `Ctrl + Shift + R` → Sistem Sıfırla

### ✅ Veri Yönetimi

- 💾 LocalStorage (Backend yok, hızlı)
- 📄 Golden Data (golden-data.json - Değişmez)
- 🔐 Reset = Golden Data'dan restore

### ✅ Toast Bildirim Sistemi

- ✅ Success (Yeşil)
- ❌ Error (Kırmızı)
- ⚠️ Warning (Turuncu)
- ℹ️ Info (Mavi)

---

## 🛠 Teknoloji Stack

| Katman           | Teknoloji                    | Sürüm       |
| ---------------- | ---------------------------- | ----------- |
| **Frontend**     | HTML5, CSS3, JavaScript ES6+ | -           |
| **UI Framework** | Bootstrap 5                  | 5.3.0 (CDN) |
| **İkonlar**      | Font Awesome                 | 6.x (CDN)   |
| **Grafikler**    | Chart.js                     | 3.x (CDN)   |
| **Storage**      | LocalStorage API             | Native      |
| **Backend**      | ❌ Yok (Demo)                | -           |

---

## 📁 Proje Yapısı

```
bookstore-dashboard/
├── README.md                    # Bu dosya
├── PLAN.md                      # Proje planı
├── ARCHITECTURE.md              # Teknik mimari
├── SETUP.md                     # Kurulum rehberi
├── DATA-STRUCTURE.md            # Veri yapısı
├── DEVELOPMENT.md               # Geliştirme rehberi
├── TEST.md                      # Test senaryoları
├── .gitignore                   # Git ignore list
├── index.html                   # Kullanıcı Dashboard
├── admin.html                   # Admin Paneli
├── css/
│   └── style.css                # Tüm stiller
├── js/
│   ├── app.js                   # Ana uygulama
│   ├── data.js                  # Veri yönetimi
│   └── toast.js                 # Bildirim sistemi
└── data/
    └── golden-data.json         # 20 temiz kitap
```

---

## 🚀 Hızlı Başlangıç

### 1️⃣ Repository Klonla

```bash
git clone https://github.com/KULLANICI/bookstore-dashboard.git
cd bookstore-dashboard
```

### 2️⃣ Dosyaları Kontrol Et

```
✅ index.html
✅ admin.html
✅ css/style.css
✅ js/app.js, data.js, toast.js
✅ data/golden-data.json
```

### 3️⃣ Çalıştır (3 Seçenek)

**Seçenek A: VS Code Live Server**

```
1. Dosyayı VS Code'da aç
2. index.html'e sağ tıkla
3. "Open with Live Server" seç
```

**Seçenek B: Python HTTP Server**

```bash
python -m http.server 8000
# Tarayıcı: http://localhost:8000
```

**Seçenek C: Node.js**

```bash
npx http-server
# Tarayıcı: http://localhost:8080
```

### 4️⃣ Demo Yap

```
1. Sayfayı aç → 20 kitap görmeli
2. Admin butonuna tıkla
3. "Test Veri Ekle" 5 kez tıkla
4. "Sistemi Sıfırla" butonuna tıkla
5. 20 kitaba dönüldüğünü gözle ✅
```

---

## 📖 Kullanım Rehberi

### Kullanıcı Paneli

**Giriş Sayfası (index.html)**

- ✅ 20 kitabın tam listesi
- 📊 İstatistikler (Toplam Kitap, Gelir, vb)
- 📈 Aylık satış grafiği

### Admin Paneli

**Yönetim Sayfası (admin.html)**

#### Yeni Kitap Ekle

```
1. "Yeni Kitap Ekle" butonuna tıkla
2. Form doldur:
   - Kitap Adı: Min 3 karakter
   - Yazar: Zorunlu
   - Fiyat: 0-999.99 arası
   - Kategori: Dropdown'dan seç
   - Kapak Resmi: Geçerli URL
3. "Ekle" butonuna tıkla
4. Toast: "Kitap başarıyla eklendi" ✅
```

#### Kitap Düzenle

```
1. Tablodaki "Düzenle" ikonuna tıkla
2. Form önceki değerlerle doldurulur
3. Değişiklikleri yap
4. "Güncelle" butonuna tıkla
```

#### Kitap Sil

```
1. Tablodaki "Sil" ikonuna tıkla
2. Onay klic
3. Kitap tablodan çıkar
```

#### Sistem Sıfırla

```
1. "Sistemi Sıfırla" butonuna tıkla
2. Onay dialog'da "EVET" seç
3. Toast: "Sistem başarıyla sıfırlandı" ✅
4. 20 temiz kitap geri döner
```

#### Test Veri Ekle

```
1. "Test Veri Ekle" butonuna tıkla
2. Rasgele saçma verilerle kitap eklenir
3. Tekrarla 5-10 kez sistem bozulsun
4. Reset'e bas ve temizlen
```

---

## 🎮 Gizli Özellikler

### Keyboard Shortcuts

| Kısayol            | Fonksiyon      |
| ------------------ | -------------- |
| `Ctrl + Shift + R` | Sistem Sıfırla |

### Developer Console Commands

```javascript
// Tüm kitapları gör
bookStore.getBooks();

// Test kitabı ekle
bookStore.addBook({
  title: "Test",
  author: "Test",
  price: 10,
  category: "Roman",
  cover: "url",
  sales: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
});

// localStorage temizle
localStorage.clear();

// Toast göster
Toast.show("Test", "success");
```

---

## 📊 Veri Yapısı

### Kitap Nesnesi

```json
{
  "id": 1,
  "title": "Suç ve Ceza",
  "author": "Fyodor Dostoyevski",
  "price": 45.0,
  "category": "Roman",
  "cover": "https://via.placeholder.com/80x120?text=Kitap",
  "sales": [120, 135, 140, 155, 148, 165, 172, 180, 195, 210, 225, 240]
}
```

### Kategoriler (Sabit)

- Roman
- Bilim Kurgu
- Tarih
- Biyografi
- Aşçılık
- Bilim
- Çocuk
- Şiir
- Öykü
- İş/Ekonomi

---

## ✅ Demo Senaryosu (Sınavda Kullanılacak)

```
0:00 - Sayfayı aç
"Gördüğünüz gibi, 20 temiz kitap var. Bu Golden State."

0:30 - Admin panele tıkla
"Admin panelinde CRUD işlemleri yapabiliriz."

1:00 - "Test Veri Ekle" 10 kez tıkla
"Şimdi sistem 50+ kitapla dolu ve bozuk."

2:00 - Ctrl+Shift+R tuşla
"Aynı kısayol ile de reset yapabilirim."

2:30 - "Sistemi Sıfırla" butonuna tıkla
"Tek tuşla sistem temizlenir."

3:00 - Onay dialog'da EVET seç
"Bozuk veriler kaldırılır..."

3:30 - Reset tamamlandı
"Yine 20 temiz kitabımız var! ✅"

4:00 - Demo tamamlandı
"Teşekkür ederim!"
```

**Toplam Süre:** ~4 dakika

---

## 🧪 Test & QA

### Manual Testing

```bash
# Console test commands için bkz: TEST.md
# Full test scenarios: TEST.md
# Keyboard shortcut: Ctrl+Shift+R
# Responsive test: F12 → Device Toolbar
```

### Kontrol Listesi

- ✅ İlk yükleme: 20 kitap
- ✅ Ekle: Yeni kitap ekleniyor
- ✅ Düzenle: Kitap güncelleniyor
- ✅ Sil: Kitap kaldırılıyor
- ✅ Reset: 20 kitapa dönüyor
- ✅ Kısayol: Ctrl+Shift+R çalışıyor
- ✅ Responsive: Mobil/Tablet/Desktop
- ✅ Veri Persist: Sayfa yenile → Veri kalıcı

---

## 📱 Responsive Design

| Device      | Support       |
| ----------- | ------------- |
| **Desktop** | ✅ 1920x1080+ |
| **Laptop**  | ✅ 1366x768   |
| **Tablet**  | ✅ 768x1024   |
| **Mobile**  | ✅ 375x667    |

---

## 🔐 Güvenlik Notları

- ⚠️ LocalStorage = Tarayıcı içinde (Public demo için ok)
- ⚠️ Production'da: Backend API + Database gerekir
- ⚠️ Input validation: Client-side (Demo)
- ✅ CORS: Yok (Local/CDN kaynakları)

---

## 🐛 Troubleshooting

### "golden-data.json yüklenmiyor"

```bash
# Seçenek 1: HTTP server kullan
npx http-server

# Seçenek 2: VS Code Live Server kullan
```

### "Reset çalışmıyor"

```javascript
// Console'da debug et
console.log(localStorage.getItem("bookstore_books"));
localStorage.clear();
location.reload();
```

### "Chart görünmüyor"

- Bootstrap CDN yüklü mü?
- Chart.js CDN yüklü mü?
- Satış verileri 12 ay mı?

---

## 📞 İletişim & Destek

- **Geliştirici:** Semra
- **E-mail:** semra@university.edu
- **GitHub:** https://github.com/KULLANICI/bookstore-dashboard
- **Issue:** GitHub Issues sekmesinden rapor et

---

## 📄 Lisans

MIT License - Özgür kullanım

---

## 🙏 Teşekkürler

- Bootstrap 5 Team
- Chart.js Community
- Font Awesome Icons

---

## 📝 Değişim Geçmişi

| Sürüm | Tarih      | Değişiklik  |
| ----- | ---------- | ----------- |
| 1.0   | 25.04.2026 | İlk Release |

---

## ⏰ Önemli Tarih

**Deadline:** 28 Nisan 2026 22:00  
**Demo:** 29 Nisan 2026 (Uygulama Dersi)

---

**Daha Fazla Bilgi:** PLAN.md, ARCHITECTURE.md, SETUP.md, TEST.md dosyalarına bakınız.

---

**✅ PROJE HAZIR! GOD LUCK! 🚀**
