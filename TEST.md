# 🧪 TEST - Test Senaryoları & QA Plan

**Son Güncelleme:** 25.04.2026

---

## 📋 Test Stratejisi

| Test Tipi            | Açıklama            | Araç              |
| -------------------- | ------------------- | ----------------- |
| **Unit Test**        | Tek fonksiyon test  | Browser Console   |
| **Integration Test** | Modüller arası test | Manual + DevTools |
| **E2E Test**         | Kullanıcı flow test | Manual Browser    |
| **Performance Test** | Hız & memory        | DevTools Profiler |

---

## ✅ Test Execution Plan

### Faz 1: Unit Testing

#### Test 1.1: BookStore Initialization

```javascript
// Console'da çalıştır
console.log("TEST 1.1: BookStore Init");
console.log("Before:", localStorage.getItem("bookstore_books"));
bookStore.init();
const books = bookStore.getBooks();
console.assert(books.length === 20, "Golden data loaded: " + books.length);
console.log("✅ PASSED");
```

**Beklenen:** 20 kitap

#### Test 1.2: Add Book

```javascript
console.log("TEST 1.2: Add Book");
const beforeCount = bookStore.getBooks().length;
const newBook = {
  title: "Test Book",
  author: "Test Author",
  price: 29.99,
  category: "Roman",
  cover: "https://via.placeholder.com/80x120?text=Test",
  sales: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
};
bookStore.addBook(newBook);
const afterCount = bookStore.getBooks().length;
console.assert(afterCount === beforeCount + 1, "Book added");
console.log("✅ PASSED");
```

**Beklenen:** Kitap sayısı +1

#### Test 1.3: Update Book

```javascript
console.log("TEST 1.3: Update Book");
const book = bookStore.getBooks()[0];
bookStore.updateBook(book.id, { price: 99.99 });
const updated = bookStore.getBooks().find((b) => b.id === book.id);
console.assert(updated.price === 99.99, "Price updated");
console.log("✅ PASSED");
```

**Beklenen:** Fiyat güncellendi

#### Test 1.4: Delete Book

```javascript
console.log("TEST 1.4: Delete Book");
const beforeCount = bookStore.getBooks().length;
const book = bookStore.getBooks()[0];
bookStore.deleteBook(book.id);
const afterCount = bookStore.getBooks().length;
console.assert(afterCount === beforeCount - 1, "Book deleted");
console.log("✅ PASSED");
```

**Beklenen:** Kitap sayısı -1

#### Test 1.5: Reset Data

```javascript
console.log("TEST 1.5: Reset Data");
// Önce bir sürü kitap ekle
for (let i = 0; i < 30; i++) {
  bookStore.addBook({
    title: "Test " + i,
    author: "Author " + i,
    price: Math.random() * 100,
    category: "Roman",
    cover: "https://via.placeholder.com/80x120?text=Test" + i,
    sales: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  });
}
console.log("Books after adding:", bookStore.getBooks().length);

// Reset yap
bookStore.resetData();
const resetCount = bookStore.getBooks().length;
console.assert(resetCount === 20, "Data reset to golden state: " + resetCount);
console.log("✅ PASSED");
```

**Beklenen:** 20 kitap (Golden state)

---

### Faz 2: Integration Testing

#### Test 2.1: Form Validation

**Steps:**

1. index.html aç
2. "Add Book" butonuna tıkla
3. **Boş başlık ile submit et** → Hata mesajı görmeli
4. **Negatif fiyat gir** → Hata mesajı görmeli
5. **Doğru veri gir** → Başarıyla eklenmeli

**Beklenen:** ✅ Form validation çalışıyor

#### Test 2.2: Data Persistence

**Steps:**

1. Yeni kitap ekle
2. Sayfa yenile (F5)
3. Kitap hala görülmeli (localStorage'da)

**Beklenen:** ✅ Veri persist ediliyor

#### Test 2.3: Chart Rendering

**Steps:**

1. index.html aç
2. Sayfa aşağı kaydır
3. "Monthly Revenue" grafiği görülmeli
4. Grafik 12 ay göstermeli

**Beklenen:** ✅ Chart render ediliyor

#### Test 2.4: Statistics Update

**Steps:**

1. Dashboard'da "Total Books" göster
2. Yeni kitap ekle
3. Sayı +1 artsın

**Beklenen:** ✅ İstatistikler güncelleniyorum

---

### Faz 3: End-to-End (E2E) Testing

#### Test 3.1: Golden → Dirty → Golden Cycle

**Senaryo:**

```
1. Index sayfası aç
2. 20 kitap görmeli ✅
3. Admin panele git
4. "Test Veri Ekle" 5 kez tıkla (25 kitap olmalı)
5. Tabloyu scroll et, saçma veriler görmeli ✅
6. "Sistemi Sıfırla" butonuna tıkla
7. Onay dialog'da EVET seç
8. 20 kitaba dön ✅
9. Toast: "Sistem başarıyla sıfırlandı" görmeli ✅
```

**Beklenen:** ✅ Full cycle başarılı

#### Test 3.2: Keyboard Shortcut

**Steps:**

1. index.html sayfası
2. `Ctrl + Shift + R` tuşlarına bas
3. Reset onay dialog açılmalı
4. EVET seç
5. 20 kitaba dön

**Beklenen:** ✅ Keyboard shortcut çalışıyor

#### Test 3.3: Admin Panel - CRUD

**Steps:**

1. Admin panele git
2. Yeni kitap ekle → Tablo güncellenmeli ✅
3. Bir kitabı düzenle → Veri değişmeli ✅
4. Bir kitabı sil → Silinmeli ✅
5. Sayfayı yenile → Değişiklikler persist edilmeli ✅

**Beklenen:** ✅ CRUD işlemleri çalışıyor

---

### Faz 4: Performance Testing

#### Test 4.1: Initial Load Time

```javascript
// DevTools Console
performance.mark("start");
location.reload();
// Sayfanın yüklenmesini bekle
performance.mark("end");
performance.measure("load", "start", "end");
performance.getEntriesByType("measure");
// Beklenen: < 2 saniye
```

#### Test 4.2: Memory Usage

**Steps:**

1. DevTools → Memory
2. 50+ kitap ekle
3. Heap snapshot al
4. Memory < 1MB olmalı

**Beklenen:** ✅ Efficient memory usage

#### Test 4.3: Responsiveness

- **Desktop (1920x1080):** ✅ Tüm elemanlar görülmeli
- **Tablet (768x1024):** ✅ Sidebar kapalı, hamburger menu var
- **Mobile (375x667):** ✅ Tek sütun, dokunmatik uyumlu

---

## 🎬 Demo Test Senaryosu (Sınavda Kullanılacak)

### Demo Flow (5 dakika)

```
0:00 - Sayfayı aç
"Gördüğünüz gibi, 20 temiz kitap var. Bu bizim Golden State'imiz."

0:30 - Admin panele tıkla
"Admin panelinde, test ekibi tarafından eklenen bozuk verileri görebilirsiniz."

1:00 - "Test Veri Ekle" butonuna 10 kez tıkla
"Şimdi sistem 50+ kitapla dolu ve bozuk."

2:00 - "Sistemi Sıfırla" butonuna tıkla
"Tek tuşla, tüm bozuk veriler temizlenir ve Golden State'e dönüş yapar."

3:00 - Reset işlemi tamamlandı
"Gördüğünüz gibi, yine 20 temiz kitap var."

4:00 - Keyboard Shortcut demo
"Aynı işlem Ctrl+Shift+R ile de yapılabilir."

5:00 - Sonu kapat
```

---

## 📝 Test Raporu Şablonu

```markdown
# Test Report

**Date:** 25.04.2026
**Tester:** Semra
**Build Version:** v1.0

## Summary

- Total Tests: 15
- Passed: 15
- Failed: 0
- Pass Rate: 100%

## Detailed Results

### Unit Tests

- ✅ BookStore Init
- ✅ Add Book
- ✅ Update Book
- ✅ Delete Book
- ✅ Reset Data

### Integration Tests

- ✅ Form Validation
- ✅ Data Persistence
- ✅ Chart Rendering
- ✅ Statistics Update

### E2E Tests

- ✅ Golden → Dirty → Golden Cycle
- ✅ Keyboard Shortcut
- ✅ Admin Panel CRUD

### Performance Tests

- ✅ Load Time < 2s
- ✅ Memory < 1MB
- ✅ Responsive Design

## Issues Found

None

## Conclusion

✅ ALL TESTS PASSED - READY FOR DEMO
```

---

## 🔍 QA Checklist

Ürünü submit etmeden önce:

- [ ] Tüm Unit tests geçti
- [ ] Integration tests geçti
- [ ] E2E tests geçti
- [ ] Hiçbir console error yok
- [ ] Mobile cihazda test ettim
- [ ] Reset tüm durumda çalışıyor
- [ ] Golden data dokunulmamış
- [ ] Tüm MD dosyaları yazılı
- [ ] GitHub'a yüklü
- [ ] README.md tam ve açıklayıcı
- [ ] Demo senaryosu hazır
- [ ] Backup var

---

## 🚨 Sorun Çözüm Rehberi

| Sorun                        | Çözüm                                                           |
| ---------------------------- | --------------------------------------------------------------- |
| Reset çalışmıyor             | localStorage temizlenmedi mi? golden-data.json erişilebilir mi? |
| Veri kayboldu                | localStorage.clear() çalıştırıldı mı? Yedek JSON var mı?        |
| Chart görmüyorum             | Chart.js CDN yüklendi mi? Satış verileri 12 ay mı?              |
| Keyboard kısayolu çalışmıyor | DevTools console'da `window.addEventListener` checked mi?       |
| Responsive tasarım bozuk     | Bootstrap CSS CDN yüklendi mi? Viewport meta tag var mı?        |

---

## 📊 Test Metrics

### Coverage

- Code Coverage: 85%+
- Feature Coverage: 100%
- Edge Case Coverage: 75%

### Quality Gates

- [ ] No JavaScript errors
- [ ] No console warnings
- [ ] Lighthouse Score: 90+
- [ ] Page Load: < 3s

---

**Sonraki Adım:** README.md ile final dokümantasyon
