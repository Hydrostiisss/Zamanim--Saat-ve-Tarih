# ⏰ ClockWise

Modern ve kullanıcı dostu zaman yönetim platformu

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**[🔗 Canlı Demo](https://your-demo-link.com)**

---

## 📖 Proje Hakkında

ClockWise, modern web teknolojileri kullanılarak geliştirilmiş kapsamlı bir zaman yönetim platformudur. Öğrenciler, profesyoneller ve zaman takibi yapan herkes için tasarlanmış bu uygulama, saat gösterimi, takvim, kronometre, zamanlayıcı ve dünya saatleri gibi temel özellikleri tek bir arayüzde toplar.

### 🎯 Geliştirme Amacı

- Okullarda ve sınavlarda kullanılabilecek güvenilir bir zaman takip aracı sunmak
- Pomodoro tekniği ile verimli çalışma alışkanlığı kazandırmak
- Farklı zaman dilimlerinde çalışan kişiler için pratik bir saat dönüştürücü sağlamak
- Temiz, modern ve kullanıcı dostu bir arayüz deneyimi oluşturmak
- Performans odaklı, framework kullanmadan hafif bir web uygulaması geliştirmek

---

## ✨ Özellikler

### 🕐 Saat Modülü

**Dijital Saat**
- Gerçek zamanlı saat gösterimi (saat:dakika:saniye)
- Tam tarih bilgisi (gün, ay, yıl)
- Türkçe tarih formatı
- Animasyonlu saniye göstergesi

**Analog Saat**
- Klasik saat arayüzü
- Saat, dakika ve saniye ibreleri
- Smooth animasyonlar
- Hover efekti ile 3D görünüm

**Manuel Saat Ayarı**
- Özel saat, dakika ve saniye belirleme
- NTP API ile cihaz saati kontrolü
- Saat geriliği durumunda otomatik uyarı sistemi
- Senkronizasyon önerisi

### 📅 Takvim

- Ay bazlı interaktif takvim görünümü
- İleri/geri ok butonları ile kolay navigasyon
- Bugünün tarihini otomatik vurgulama
- Responsive grid düzeni
- Haftanın günlerini Pazartesi'den başlatma
- Önceki ve sonraki ayın günlerini soluk gösterme

### 🌍 Dünya Saatleri

- Görsel dünya haritası üzerinde interaktif zaman işaretleri
- Desteklenen şehirler:
  - 🇹🇷 İstanbul (GMT+3)
  - 🇬🇧 Londra (GMT+0)
  - 🇺🇸 New York (GMT-5)
  - 🇯🇵 Tokyo (GMT+9)
  - 🇦🇺 Sydney (GMT+10)
- Her dakika otomatik güncelleme
- Şehir kartları hover efekti
- Anlık saat ve tarih bilgisi

### ⚙️ Zaman Yönetim Araçları

**⏱️ Kronometre**
- Milisaniye hassasiyetinde ölçüm
- Başlat, durdur ve sıfırla kontrolleri
- Temiz ve okunabilir dijital gösterge
- Sınırsız kullanım

**⏳ Geri Sayım Sayacı**
- Saat, dakika ve saniye girişi
- Görsel geri sayım
- Süre bitiminde bildirim
- Pause ve devam etme özelliği
- Sınavlar ve toplantılar için ideal

**🍅 Pomodoro Tekniği**
- 25 dakika çalışma modu
- 5 dakika kısa mola
- 15 dakika uzun mola
- Mod geçiş butonları
- Otomatik süre ayarlama
- Tamamlanma bildirimi

**🔄 Saat Dönüştürücü**
- Farklı zaman dilimlerini karşılaştırma
- Kaynak ve hedef zaman dilimi seçimi
- Anlık dönüşüm hesaplama
- Uluslararası toplantı planlaması için pratik
- Saat giriş alanı ile manuel kontrol

### 🌤️ Ek Özellikler

- **Gün Doğumu/Batımı**: Güneş saatlerini gösterme (statik)
- **Hava Durumu**: Görsel hava durumu kartı (simüle edilmiş)

---

## 🛠️ Kullanılan Teknolojiler

### Frontend Teknolojileri

**HTML5**
- Semantik etiketler (`<header>`, `<section>`, `<main>`)
- Erişilebilirlik odaklı yapı
- SEO dostu işaretleme

**CSS3**
- CSS Grid Layout - Responsive grid sistemi
- Flexbox - Esnek kutu düzeni
- CSS Variables - Tema renk yönetimi
- Animations & Transitions - Akıcı geçişler
- Media Queries - Mobil uyumluluk
- Gradient Effects - Modern renk geçişleri
- Box Shadow - Derinlik efektleri

**JavaScript (ES6+)**
- Vanilla JavaScript (framework kullanılmadı)
- `setInterval` / `setTimeout` - Zamanlayıcı yönetimi
- `Date` API - Tarih ve saat işlemleri
- `toLocaleString` - Çoklu dil desteği
- `Intl.DateTimeFormat` - Uluslararası tarih formatı
- DOM Manipulation - Dinamik içerik güncelleme
- Event Listeners - Kullanıcı etkileşimleri
- Fetch API - NTP saat senkronizasyonu

### Harici Kaynaklar

- **Font Awesome v6.4.0** - İkon kütüphanesi
- **Google Fonts**
  - Poppins - Ana font ailesi
  - Orbitron - Dijital saat için monospace font
- **TimeAPI.io** - NTP protokolü ile zaman senkronizasyonu

### Tasarım Özellikleri

- Gradient renkler ve modern UI
- Card-based design pattern
- Hover animasyonları
- Smooth transitions
- Responsive breakpoints
- Mobile-first yaklaşım

---

## 📱 Responsive Tasarım

ClockWise, tüm cihazlarda kusursuz çalışacak şekilde tasarlanmıştır:

- **Desktop** (1200px+): Tam grid düzeni, yan yana kartlar
- **Tablet** (768px - 1200px): İki kolonlu düzen
- **Mobile** (< 768px): Tek kolon, touch-friendly butonlar

---

## 🎯 Kullanım Senaryoları

### 👨‍🎓 Öğrenciler İçin
- Sınav süresini takip etme
- Pomodoro tekniği ile ders çalışma
- Ödev için geri sayım ayarlama
- Farklı ülkelerdeki arkadaşlarla saat koordinasyonu

### 👔 Profesyoneller İçin
- Toplantı süresi yönetimi
- Uluslararası müşterilerle saat koordinasyonu
- Sprint ve deadline takibi
- Zaman dilimi farkı hesaplama

### 🏫 Eğitim Kurumları İçin
- Sınav süresi gösterimi (projeksiyon ile)
- Ders arası mola zamanlayıcısı
- Online eğitim senkronizasyonu
- Sunum süre kontrolü

---

## 📁 Proje Yapısı

clockwise/
├── index.html # Ana HTML yapısı ve içerik
├── style.css # Tüm CSS stilleri ve animasyonlar
├── script.js # JavaScript mantığı ve fonksiyonlar
└── README.md # Proje dokümantasyonu

## 🗺️ Gelecek Güncellemeler

### Planlanan Özellikler

- [ ] **Karanlık/Aydınlık Mod**: Toggle butonu ile tema değiştirme
- [ ] **LocalStorage**: Kullanıcı tercihlerini kaydetme
- [ ] **Alarm Sistemi**: Tekrarlayan ve özel alarmlar
- [ ] **Gerçek Hava Durumu**: OpenWeatherMap API entegrasyonu
- [ ] **PWA Desteği**: Offline çalışma ve ana ekrana ekleme
- [ ] **Çoklu Dil**: Türkçe, İngilizce, Almanca dil seçenekleri
- [ ] **Takvim Entegrasyonu**: Google Calendar senkronizasyonu
- [ ] **Sesli Bildirimler**: Zamanlayıcı bitiminde ses efekti
- [ ] **Klavye Kısayolları**: Hızlı erişim için hotkeys

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz:

1. Repository'yi fork edin
2. Yeni bir feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Branch'inizi push edin
5. Pull Request açın

Tüm katkılar değerlendirilir ve teşekkürle karşılanır!

---

## 📄 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

**Kısaca:**
- ✅ Ticari kullanım yapabilirsiniz
- ✅ Değiştirebilir ve dağıtabilirsiniz
- ✅ Özel projelerinizde kullanabilirsiniz
- ℹ️ Telif hakkı bildirimini korumalısınız

---

## 👨‍💻 Geliştirici

**[Utku Gökyer]**

- 🔗 GitHub: [@Hydrostiisss](https://github.com/Hydrostiisss)
- 🌐 Portfolio: [gokyer.xyz](https://gokyer.xyz)
- 📧 Email: utkugokyer1@gmail.com

---

<div align="center">

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with Utku Gökyer❤️

</div>
