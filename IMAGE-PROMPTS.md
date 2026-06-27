# Creative Inference — Image Prompts

All images for creativeinference.com. Generate via AI image tools (Midjourney, Google AI Studio, etc.) or create in Photoshop.

---

## 1. Hero Background

**File:** `img/hero-bg.jpg`  
**Dimensions:** 1920×1080  
**Target size:** < 200KB (JPEG 80-85% quality)  
**Notes:** Will have dark gradient overlay + white text on top. Do NOT bake text into the image.

**Prompt:**
> Dark, cinematic wide shot of an abstract AI technology workspace. Multiple translucent holographic displays floating in a deep black void, each showing different visualizations: an AI neural network, a conversational search interface, a multi-agent automation flowchart, data curation dashboards. Converging golden light streams connect the displays. Atmosphere is professional and futuristic, not cyberpunk. Color palette: deep black background, warm gold (#F59E0B) and cool white light accents. Photorealistic lighting with subtle lens flare. 16:9 aspect ratio.

---

## 2. BarDC Thumbnail

**File:** `img/bardc-thumb.jpg`  
**Dimensions:** 1200×675 (16:9)  
**Target size:** < 100KB

**Prompt:**
> Moody interior of a stylish cocktail bar in Washington DC at night. Dark wood bar top with amber-lit bottles behind. Subtle holographic AI data overlays float above the bar — event calendars, search queries, rating badges — rendered as translucent UI elements. Warm amber and gold ambient lighting. Shot from a slightly elevated angle. Cinematic depth of field. Professional and atmospheric, conveying "AI meets nightlife." 16:9 aspect ratio.

---

## 3. Open Graph Image

**File:** `img/og-image.jpg`  
**Dimensions:** 1200×630  
**Target size:** < 100KB  
**Notes:** Must be readable at small thumbnail sizes (social media cards).

**Prompt / Design (Photoshop recommended):**
> Dark black background (#000000). Creative Inference lightbulb logo centered at top. Below: "Creative Inference" in white Inter 800 weight. Below that: "AI Technology Studio" in gold (#F59E0B) Inter 600 weight, smaller size. Subtle abstract tech pattern in background (faint neural-network nodes, circuit traces). Bottom edge has subtle gold gradient line. Clean, professional, minimal. Readable at 300px wide.

---

## Image Optimization Checklist

After generating each image:
1. Resize to specified dimensions
2. Export as JPEG at 80-85% quality
3. Verify file size is under the target
4. Test on a dark background (the site is black)
5. For hero: verify text is readable when overlaid
6. For thumbnails: verify they look good at 340px card width

### Existing images to replace
- `ci-hero.jpeg` → replace with `hero-bg.jpg` (update reference in index.html when ready)
- `bardc-logo.jpg` → replace with `bardc-thumb.jpg`
