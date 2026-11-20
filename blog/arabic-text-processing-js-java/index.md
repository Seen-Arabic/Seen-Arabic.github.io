# معالجة النصوص العربية في JavaScript و Java بمكتبة arabic-services

Author: عبدالرحمن بيومي

Published: 2026-11-19

Hijri date: 9 جمادى الآخرة 1448هـ

عند بناء محرك بحث عربي، أو نظام فهرسة للمحتوى، أو أداة لتحليل النصوص، يواجه المبرمجون غالباً مجموعة من التحديات المتكررة: الكلمة التي بها تشكيل لا تطابق الكلمة التي بدون تشكيل في قاعدة البيانات، وعلامة التطويـــــل (الكشيدة `ـ`) تكسر مطابقة الكلمات، كما أن كتابة تعبيرات نمطية (Regex) سريعة غالباً ما تترك حالات استثنائية (`Edge Cases`) في النصوص العربية.

يوفر فريق **س - Seen** مكتبة **`arabic-services`** (خدمات اللغة العربية) مفتوحة المصدر بلغتي **JavaScript / TypeScript** و **Java** لمعالجة النصوص العربية بشكل مباشر ومختبر، مع إمكانية تجربة نفس الدوال مباشرة في المتصفح عبر صفحة [خدمات اللغة العربية](/Arabic-Services/).

### التثبيت السريع

#### في JavaScript و TypeScript (Node.js والمتصفح)

تعمل المكتبة بدون أي اعتماديات تشغيلية خارجية (`zero runtime dependencies`)، وتدعم ES Modules و CommonJS و UMD:

```bash
npm install arabic-services
```

وإذا أردت استخدامها مباشرة في المتصفح بدون أداة حزم (Bundler)، يمكنك تحميلها عبر CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/arabic-services@1/dist/umd/arabic-services.umd.js"></script>
```

#### في Java (Maven و Gradle)

أضف التبعية التالية إلى ملف `pom.xml` في مشاريع Maven:

```xml
<dependency>
    <groupId>io.github.seen-arabic</groupId>
    <artifactId>arabic-services</artifactId>
    <version>1.0.1</version>
</dependency>
```

أو في `build.gradle` لمشاريع Gradle:

```groovy
implementation 'io.github.seen-arabic:arabic-services:1.0.1'
```

---

### أمثلة عملية لأهم الوظائف

#### 1. إزالة التشكيل (`removeTashkeel`)

تزيل هذه الدالة جميع حركات التشكيل (الفتحة، الضمة، الكسرة، الشدة، السكون، والتنوين) لتوحيد صيغة الكلمات قبل تخزينها أو البحث فيها.

في **JavaScript / TypeScript**:

```javascript
import { removeTashkeel } from 'arabic-services';

console.log(removeTashkeel('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
```

وفي **Java**:

```java
import io.github.seen_arabic.arabic_services.ArabicServices;

String result = ArabicServices.removeTashkeel("الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني");
```

> **الناتج:** الخيل والليل والبيداء تعرفني

#### 2. إزالة التطويـــــل (`removeTatweel`)

تنظّف النص العربي من علامة التطويل (الكشيدة `ـ`) حتى لا تعيق البحث أو مطابقة الكلمات.

في **JavaScript / TypeScript**:

```javascript
import { removeTatweel } from 'arabic-services';

console.log(removeTatweel('كن جميـــلا ترى الوجــود جميـــــلا'));
```

وفي **Java**:

```java
String result = ArabicServices.removeTatweel("كن جميـــلا ترى الوجــود جميـــــلا");
```

> **الناتج:** كن جميلا ترى الوجود جميلا

#### 3. التحويل إلى الرسم العربي القديم (`toOldArabic`)

تحول هذه الدالة النص العربي إلى صورته المجردة قبل وضع النقاط على الحروف، مع إزالة التشكيل والهمزات تلقائياً (ويمكنك قراءة الخلفية التاريخية لهذا التطور في مقال [تاريخ الخط العربي منذ ظهور الإسلام](/blog/arabic-script-history/)).

في **JavaScript**:

```javascript
import { toOldArabic } from 'arabic-services';

console.log(toOldArabic('الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني'));
```

وفي **Java**:

```java
String oldScript = ArabicServices.textToOldArabic("الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني");
```

> **الناتج:** الحىل واللىل والٮىدا ٮعرڡٮى

#### 4. التمويه البصري للنص الكامل (`tashfeer`)

تستبدل دالة `tashfeer` الحروف العربية بحروف ورموز مشابهة لها في الشكل بحيث يظل النص مقروءاً للعين البشرية:

```javascript
import { tashfeer } from 'arabic-services';

console.log(tashfeer('هذا النص مشفر'));
```

وفي **Java**:

```java
String obfuscated = ArabicServices.tashfeer("هذا النص مشفر");
```

> **مثال للمخرجات:** هـڏן اݪـڼص مشـڤـړ

#### 5. تشفير الكلمات المحظورة فقط (`tashfeerBannedWords`)

تعتمد هذه الدالة على قائمة كلمات محظورة شائعة؛ فإذا وُجدَت أي كلمة منها داخل الجملة تقوم بتمويهها وتشفيرها بصرياً فقط مع الإبقاء على بقية كلمات الجملة كما هي:

```javascript
import { tashfeerBannedWords } from 'arabic-services';

console.log(tashfeerBannedWords('جيش العدو يقتل الأطفال'));
```

وفي **Java**:

```java
String filtered = ArabicServices.tashfeerBannedWords("جيش العدو يقتل الأطفال");
```

> **مثال للمخرجات:** چـېـݭ ⴶلـݟـڊۅ يـٯـݖـڵ الأطفال

#### 6. تفكيك الكلمة إلى حروفها (`wordToLetters`)

تحوّل الكلمة العربية إلى أسماء حروفها المنطوقة بشكل واضح:

```javascript
import { wordToLetters } from 'arabic-services';

console.log(wordToLetters('شجرة'));
```

وفي **Java**:

```java
String letters = ArabicServices.wordToLetters("شجرة");
```

> **الناتج:** شين جيم راء تاء_مربوطة

#### 7. إزالة اللواحق العربية (`removeArabicAffixes`)

تقص السوابق واللواحق الشائعة (مثل "الـ" والتاء المربوطة) من الكلمة العربية للوصول إلى أصل أقرب، بالاعتماد على قواعد تقريبية وليس تحليلاً صرفياً كاملاً:

```javascript
import { removeArabicAffixes } from 'arabic-services';

console.log(removeArabicAffixes('المدرسة'));
```

وفي **Java**:

```java
String stem = ArabicServices.removeArabicAffixes("المدرسة");
```

> **الناتج:** مدرس

---

### جرّب الدوال الآن أو تصفّح الشيفرة المصدرية

- لتجربة كل هذه الوظائف مباشرة داخل المتصفح دون تثبيت: [خدمات اللغة العربية](/Arabic-Services/)
- مستودع JavaScript / TypeScript: [Arabic-Services-JavaScript](https://github.com/Seen-Arabic/Arabic-Services-JavaScript)
- مستودع Java: [Arabic-Services-Java](https://github.com/Seen-Arabic/Arabic-Services-Java)
