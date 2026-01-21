# QUICK FIX FOR BUILD ERROR

## THE PROBLEM
Next.js treats `src/pages/` as route pages and tries to pre-render them.
Your components need Redux/i18n context which doesn't exist during build.

## THE SOLUTION (2 minutes)

### Method 1: Rename Folder (RECOMMENDED)

1. **STOP all terminals** (npm run dev, build, etc.)

2. **Rename folder:**
   ```
   src/pages  →  src/features
   ```

3. **Run the update script:**
   ```powershell
   cd C:\jett-visa\jett-visa
   .\RENAME-SCRIPT.ps1
   ```

4. **Update tsconfig paths** (if exists):
   Edit `tsconfig.json`, replace:
   ```json
   "@pages/*": ["./src/pages/*"]
   ```
   with:
   ```json
   "@features/*": ["./src/features/*"]
   ```

5. **Build:**
   ```bash
   npm run build
   ```

---

### Method 2: Disable Static Generation (Alternative)

If you can't rename, add to `src/app/layout.tsx`:
```typescript
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
```

Then rebuild:
```bash
rm -rf .next
npm run build
```

---

## WHY THIS FIXES IT

✅ **Before:** Next.js sees `src/pages/` → tries to pre-render as routes  
✅ **After:** Components in `src/features/` → just normal components

The build will succeed because Next.js only pre-renders:
- `src/app/page.tsx` ✓ (has metadata, SSR-ready)
- `src/app/*/page.tsx` ✓ (actual routes)

NOT:
- `src/features/**/*` ✓ (just components, client-side only)

---

## TEST IT WORKS

```bash
npm run build
npm start
# Visit http://localhost:3000
# Check "View Page Source" - you should see full HTML with metadata
```

---

## IF STILL FAILS

The components are importing something that requires browser APIs during build.

Add to the TOP of any failing component:
```typescript
"use client";
```

And make sure it doesn't export anything that triggers static generation.
