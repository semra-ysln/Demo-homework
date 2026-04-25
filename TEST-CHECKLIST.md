# 📋 Bookstore Dashboard - Testing Checklist

## Server Status

- Port: 8080 (http://127.0.0.1:8080)
- Files ready: index.html, admin.html, golden-data.json, style.css

## Pre-Flight Checks ✅

### File Integrity

- [x] index.html exists and is valid
- [x] admin.html replaced with clean version
- [x] golden-data.json has 20 books with array-format sales
- [x] style.css exists (styling shared between pages)
- [x] No corrupted SQL-related code remaining

### Data Format Verification

- [x] All 20 books in golden-data.json have:
  - id (1-20)
  - title (Turkish/International)
  - author (string)
  - price (number, 10-50)
  - category (valid from enum)
  - cover (URL)
  - sales (array of 12 numbers: [120, 135, 140, ...])

### Code Structure

- [x] BookStore class (init, getBooks, addBook, updateBook, deleteBook, resetData)
- [x] Toast notification system (show messages with types)
- [x] localStorage integration (persistent storage)
- [x] Modal forms (Edit modal in admin)
- [x] Keyboard shortcut handler (Ctrl+Shift+R for reset)

---

## Test Scenarios

### Scenario 1: Fresh Load

1. Open http://127.0.0.1:8080/index.html
   - [ ] Dashboard loads without errors
   - [ ] 20 books visible in table
   - [ ] Stats cards show: Total Books=20, Revenue calculated, Avg Price calculated
   - [ ] Monthly Revenue chart renders
   - [ ] Toast shows "Dashboard loaded"

### Scenario 2: Navigation

2. From index.html, click "Admin Panel" button
   - [ ] Navigates to admin.html
   - [ ] Admin page loads with 20 books in management table
   - [ ] Sidebar shows both pages
   - [ ] Back button works

### Scenario 3: Add Test Data

3. On admin.html, click "Add Test Data" button
   - [ ] 3 broken books added (random prices, bad names)
   - [ ] Table updates to show 23 total books
   - [ ] Toast shows success message
   - [ ] Return to index.html → shows 23 books

### Scenario 4: Reset System

4. On admin.html, click "Reset System" button
   - [ ] Confirmation dialog appears (Turkish text)
   - [ ] After confirming, table resets to 20 books
   - [ ] Toast shows "System reset to golden state"
   - [ ] Return to index.html → shows 20 books again

### Scenario 5: Keyboard Shortcut

5. On admin.html, press Ctrl+Shift+R
   - [ ] Confirmation dialog appears
   - [ ] After confirming, system resets
   - [ ] Toast shows success

### Scenario 6: Edit Book

6. On admin.html, click Edit (pencil icon) on any book
   - [ ] Edit modal opens
   - [ ] Form pre-fills with current book data
   - [ ] Modify title/author/price/category/cover
   - [ ] Click Save
   - [ ] Table updates, toast shows success
   - [ ] Change persists (refresh page, book still has new values)

### Scenario 7: Delete Book

7. On admin.html, click Delete (trash icon) on any book
   - [ ] Confirmation dialog appears
   - [ ] After confirming, book removed from table
   - [ ] Toast shows "Book deleted"
   - [ ] Refresh page → book still deleted (localStorage persists)

### Scenario 8: Data Persistence

8. Add test data, then close browser completely
   - [ ] Reopen http://127.0.0.1:8080/index.html
   - [ ] Test data still present (localStorage saved it)
   - [ ] Reset system → back to 20 books
   - [ ] Close and reopen → still 20 books (golden state persisted)

### Scenario 9: Form Validation

9. On admin.html, try to edit a book with:
   - [ ] Empty title → error shown
   - [ ] Price > 999.99 → error shown
   - [ ] Invalid URL → error shown
   - [ ] Missing category → error shown

### Scenario 10: Multiple Test Cycles

10. Repeat steps 3-4 multiple times

- [ ] Adding/resetting works consistently
- [ ] No data corruption
- [ ] No console errors

---

## Console Checks (F12)

After each major action, check browser console for:

- ✅ No red errors (except network 404s for broken images)
- ✅ BookStore logs appear (✅ Loaded X books, ✅ Reset to golden state)
- ✅ No NaN values in revenue calculations

---

## Final Verification

**Demo Ready Checklist:**

- [ ] Can load 20 books on first visit
- [ ] Can add test (broken) data
- [ ] Can reset to clean golden state
- [ ] Can edit individual books
- [ ] Can delete individual books
- [ ] Can switch between user (index) and admin (admin) pages
- [ ] Keyboard shortcut Ctrl+Shift+R triggers reset
- [ ] Data persists across page reloads
- [ ] No console errors
- [ ] UI looks professional (Bootstrap styling works)

---

## Files to Remove (Temporary)

- admin-CLEAN.html (backup, can delete)
- admin-new.html (old SQLite version)
- admin-new-fixed.html (old backup)
- index-new.html (old SQLite version)
- fix.html (intermediate file)
- js-data.js (old unused file)

After cleanup, only keep:

```
bookstore-dashboard/
├── index.html
├── admin.html
├── style.css
├── golden-data.json
└── README.md (+ other docs)
```

---

## Issues to Watch For

1. **Port 8080 not working**: User mentioned server on 8080, not 8000
   - Status: ✅ Confirmed server runs on 8080

2. **Books not loading**: Old format mismatch (object vs array)
   - Status: ✅ Fixed all golden-data.json entries to use array format

3. **Buttons not working**: Mixed code from SQLite migration
   - Status: ✅ Replaced with clean, minified index.html and admin.html

4. **Keyboard shortcut broken**: Handler needed for Ctrl+Shift+R
   - Status: ✅ Both index.html and admin.html have handler

5. **Reset not working**: localStorage not clearing
   - Status: ✅ BookStore.resetData() clears localStorage and reloads golden-data.json

---

## Success Criteria

✅ **PASS**: All 10 scenarios work without errors
✅ **PASS**: Data persists across page reloads
✅ **PASS**: Reset mechanism works 100% (returns to exactly 20 books)
✅ **PASS**: No console errors during normal operation
✅ **PASS**: Demo can be shown to class on 29.04

---

_Last Updated: Phase 7 - Final Testing_
_Status: Ready for End-to-End Validation_
