# Creative Inference — Image Prompts

All images for creativeinference.com. Generate via AI image tools (Midjourney, Google AI Studio, etc.) or create in Photoshop.

---

## 1. Hero Background

**File:** `img/hero-bg.jpg`  
**Dimensions:** 1920×1080  
**Target size:** < 200KB (JPEG 80-85% quality)  
**Notes:** Will have dark gradient overlay + white text on top. Do NOT bake text into the image.

**Prompt:**
> Dark, cinematic wide shot of an abstract technology workspace. Multiple translucent holographic displays floating in a deep black void, each showing different visualizations: a directed acyclic graph with glowing nodes, an AI neural network, a game interface, robotic arm schematics. Converging golden light streams connect the displays. Atmosphere is professional and futuristic, not cyberpunk. Color palette: deep black background, warm gold (#F59E0B) and cool white light accents. Photorealistic lighting with subtle lens flare. 16:9 aspect ratio.

---

## 2. BarDC Thumbnail

**File:** `img/bardc-thumb.jpg`  
**Dimensions:** 1200×675 (16:9)  
**Target size:** < 100KB

**Prompt:**
> Moody interior of a stylish cocktail bar in Washington DC at night. Dark wood bar top with amber-lit bottles behind. Subtle holographic AI data overlays float above the bar — event calendars, search queries, rating badges — rendered as translucent UI elements. Warm amber and gold ambient lighting. Shot from a slightly elevated angle. Cinematic depth of field. Professional and atmospheric, conveying "AI meets nightlife." 16:9 aspect ratio.

---

## 3. VProgs Thumbnail

**File:** `img/vprogs-thumb.jpg`  
**Dimensions:** 1200×675 (16:9)  
**Target size:** < 100KB

**Prompt:**
> Dark technical visualization of interconnected hexagonal program modules floating in space, connected by flowing streams of light. Each hexagonal module contains a tiny glowing game screen inside — cards, kingdoms, dice, crafting. The modules form a directed acyclic graph pattern. Color palette: deep black background with teal (#06B6D4) and cyan light streams, subtle gold accents. Clean, architectural feel. Conveys "programmable blockchain platform with playable demos." 16:9 aspect ratio.

---

## 4. BlockDAG Thumbnail

**File:** `img/blockdag-thumb.jpg`  
**Dimensions:** 1200×675 (16:9)  
**Target size:** < 100KB

**Prompt:**
> Technical visualization of a BlockDAG (directed acyclic graph) structure. Multiple parallel blocks connected by glowing edges forming a DAG pattern, viewed at a slight 3D perspective. Blocks glow in teal (#06B6D4) with gold (#F59E0B) connection lines on a deep black background. Clean, educational aesthetic — like a textbook diagram brought to life with volumetric lighting. Subtle grid pattern in the background. 16:9 aspect ratio.

---

## 5. DAGKnight Thumbnail

**File:** `img/dagknight-thumb.jpg`  
**Dimensions:** 1200×675 (16:9)  
**Target size:** < 100KB

**Prompt:**
> A medieval knight in dark ornate armor standing before a massive glowing DAG (directed acyclic graph) structure, sword planted in the ground. The DAG acts as a portal or gateway behind the knight, with teal and gold light emanating from its nodes. Faint green terminal text (like a BBS door game) floats in the air around the scene. Dark atmospheric setting. Fantasy meets blockchain technology. Color palette: black, dark steel, teal glow, gold accents. Cinematic composition. 16:9 aspect ratio.

---

## 6. RobotShares Thumbnail

**File:** `img/robotshares-thumb.jpg`  
**Dimensions:** 1200×675 (16:9)  
**Target size:** < 100KB

**Prompt:**
> Two autonomous machines facing each other in a dark industrial environment: a delivery drone hovering on the left and a charging station on the right. Between them, a glowing beam of golden light represents a machine-to-machine transaction — data packets and payment tokens flowing bidirectionally. Holographic identity badges (DID) float beside each machine. Dark steel and concrete setting with gold (#F59E0B) accent lighting. Professional, not sci-fi. Conveys "autonomous machine economy." 16:9 aspect ratio.

---

## 7. Open Graph Image

**File:** `img/og-image.jpg`  
**Dimensions:** 1200×630  
**Target size:** < 100KB  
**Notes:** Must be readable at small thumbnail sizes (social media cards).

**Prompt / Design (Photoshop recommended):**
> Dark black background (#000000). Creative Inference lightbulb logo centered at top. Below: "Creative Inference" in white Inter 800 weight. Below that: "Technology Studio" in gold (#F59E0B) Inter 600 weight, smaller size. Subtle abstract tech pattern in background (faint DAG nodes, circuit traces). Bottom edge has subtle gold gradient line. Clean, professional, minimal. Readable at 300px wide.

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
- `vprogs.png` (2.1MB!) → replace with `vprogs-thumb.jpg`
