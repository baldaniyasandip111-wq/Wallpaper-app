# Wallpaper.app — HANDOVER

> **Purpose:** This file is the source of truth for continuing the Wallpaper.app project across new ChatGPT chats.
>
> **CRITICAL CONTINUATION RULE:** In a new chat, the user may type only **START**. Read this file first, verify the current GitHub HEAD and production deployment, then continue from the latest checkpoint. Do **not** ask the user to repeat project history unless a genuinely missing credential/decision blocks the work.

## 1. Current project

- Project: **Wallpaper.app**
- GitHub: https://github.com/baldaniyasandip111-wq/Wallpaper-app
- Branch: `main`
- Vercel project: `wallpaper-app`
- Production: `https://wallpaper-app-one.vercel.app`
- Current GitHub HEAD: `7afba0a2e6ea6ccc6e91cd51bd6e09aca5a75df3`
- Latest verified production deployment:
  - Deployment: `dpl_AzpX6BKTaXBnLkMWA5kChgxmfWmy`
  - State: **READY**
  - Commit: `9c34ce360792c44aa4fd7cc43c67108e57de4bf8`
- Owner prefers simple Gujarati communication and does not want to manually code.

## 2. Current product status

### Static wallpapers
- **40 wallpapers** currently in the catalog.
- Categories: Nature, City, Abstract, Minimal.
- Search and category filters work.
- Favorites use browser localStorage.
- Recently Viewed uses browser localStorage and keeps the last 6.
- Wallpaper modal/preview exists.
- Share functionality exists.
- Download functionality exists through `/api/download?id=<id>`.
- Phone preview exists.
- Set Wallpaper guide exists.
- PWA install prompt exists.
- Service worker registration exists.
- Surprise Me exists.
- Category counts and contextual empty states exist.

### Duplicate-wallpaper rule — PERMANENT
Before adding or changing wallpapers:
1. Check every existing wallpaper ID for uniqueness.
2. Check every image URL for exact duplicates.
3. Check title/content mapping so one wallpaper is not accidentally represented twice.
4. Check the download API mapping against the catalog.
5. If a duplicate is found, **remove/replace it with a better new wallpaper in the same slot** rather than increasing the count with a duplicate.
6. Never say a wallpaper expansion is ready until the duplicate check is completed.

Latest duplicate verification before this handover:
- 40 wallpaper IDs / 40 unique IDs.
- 40 image URLs / 40 unique URLs.
- Exact duplicate URLs: **0**.
- Current download API contains IDs 1–40 aligned with the catalog.

### Privacy
Privacy is a core product requirement.
- Current web app uses localStorage for favorites and recently viewed.
- No analytics SDK, ad tracker, tracking pixel, or user-profile system was found in the current app audit.
- Privacy documentation exists:
  - `PRIVACY.md`
  - `public/privacy.html`
- Future features must follow data minimization, least privilege, clear disclosure, secure transport, and minimal retention.
- Do not add tracking/analytics casually.

### Live wallpapers — web
Live Wallpaper preview gallery exists:
- Aurora Flow
- Neon Nebula
- Ocean Motion
- Animated previews
- Pause/play
- Battery Saver visual mode
- Full live preview modal
- Native Android hint
- Visual polish was added to make previews brighter and less dark.

### Native Android live wallpaper
Native Android project exists under:
`android-live-wallpaper/`

Includes:
- Android Gradle project
- `WallpaperService`
- `LiveEngine`
- visibility-aware rendering
- battery-aware lower FPS
- live wallpaper manifest metadata
- MainActivity that opens Android live-wallpaper chooser
- GitHub Actions workflow:
  `.github/workflows/build-live-wallpaper.yml`
- Workflow is intended to build a debug APK artifact.

**IMPORTANT PENDING ITEM:** The native Android APK artifact has **not yet been conclusively verified**. A previous workflow-run lookup returned no runs. Do not claim the APK is ready until a real GitHub Actions run and artifact are verified.

The native renderer is currently a simple animated cosmic/radial-gradient renderer. It is not yet a full production implementation of the Aurora/Nebula/Ocean web designs.

## 3. Main files

- `app/page.tsx` — main wallpaper UI/catalog and interactions
- `app/globals.css` — styling and live wallpaper preview animation
- `app/api/download/route.ts` — download API and wallpaper URL mapping
- `android-live-wallpaper/` — native Android live wallpaper project
- `.github/workflows/build-live-wallpaper.yml` — Android build workflow
- `PRIVACY.md` — privacy principles
- `public/privacy.html` — public privacy page
- `HANDOVER.md` — this cross-chat source of truth
- `CHATGPT_PROJECT_INSTRUCTIONS.md` — reusable ChatGPT Project instructions

## 4. Product roadmap / full plan

### Phase A — Accuracy and catalog foundation
- Keep catalog duplicate-free.
- Maintain exact ID/title/category/image/download alignment.
- Add high-quality static wallpapers in controlled batches.
- Prefer replacing weak/duplicate entries instead of blindly increasing count.
- Add robust validation whenever the catalog changes.

### Phase B — Static wallpaper UX
- Improve browsing/search/filtering.
- Improve fullscreen preview and mobile experience.
- Improve download reliability and user feedback.
- Keep Favorites and Recently Viewed local by default.
- Add useful empty states and navigation.
- Keep performance fast on mobile.

### Phase C — Native Android live wallpaper
- Verify GitHub Actions build.
- Produce a real APK artifact.
- Install/test on Android.
- Implement multiple live wallpaper scenes corresponding to Aurora, Nebula, and Ocean.
- Add lifecycle-aware rendering.
- Add battery-friendly FPS/quality profiles.
- Stop or reduce rendering when the wallpaper is not visible.
- Avoid unnecessary background services.
- Use only permissions that are strictly required.
- Add an Android picker/settings flow where appropriate.
- Test on low/mid/high-end Android devices.

### Phase D — Battery intelligence
- Normal mode.
- Battery Saver mode.
- Reduced FPS when appropriate.
- Reduced particle/effect count when appropriate.
- Visibility-aware rendering.
- Avoid needless wakeups/timers.
- Profile CPU/GPU usage and memory.
- Never claim battery savings without testing/measurement.

### Phase E — Privacy/security
- Keep user preferences local where possible.
- Avoid collecting identifiers without a real product need.
- No analytics/ad SDK unless explicitly decided and clearly disclosed.
- No precise location, contacts, microphone, camera, SMS, or unrelated permissions for wallpaper functionality.
- Secure network requests.
- Validate all download IDs server-side.
- Avoid exposing secrets in client code.
- Review privacy docs whenever a data-related feature changes.

### Phase F — Quality/performance
- Verify production build after every meaningful change.
- Test mobile layout.
- Check broken image URLs.
- Check duplicate wallpapers.
- Check download API alignment.
- Check runtime errors where available.
- Check Vercel deployment status.
- Keep UI polished and responsive.
- Prefer simple, maintainable code over unnecessary complexity.

### Phase G — Future intelligent features
Potential future ideas, only after core stability:
- smarter wallpaper discovery/search
- personalized local recommendations without uploading private user data
- mood/theme filters
- color/theme search
- collections
- offline caching
- better native live scenes
- wallpaper scheduling, if implemented with privacy-first local controls
- quality/source validation

Do not add a feature merely because it sounds intelligent. It must improve the product, remain privacy-safe, and be testable.

## 5. Required workflow for every future task

1. **Read HANDOVER.md first.**
2. Inspect the current GitHub HEAD.
3. Inspect the relevant current files before editing.
4. If adding wallpapers, run duplicate checks first.
5. Make the smallest safe change that achieves the goal.
6. Verify code consistency and related mappings.
7. Verify build/CI where possible.
8. Check Vercel deployment status after web changes.
9. Check Android workflow/artifact after Android changes.
10. If anything is pending, explicitly say what is pending.
11. Never say READY before verification.
12. Update this HANDOVER.md checkpoint before the conversation becomes too long.

## 6. Cross-chat handover protocol

The user wants a rolling handover so that even if several chats become long, they can open another chat and type only **START**.

### When a chat is getting long
Before the chat ends, update `HANDOVER.md` with:
- current date/time
- current GitHub HEAD
- latest relevant commits
- current Vercel deployment and state
- current Android workflow/run/artifact state
- what was completed
- what is pending
- exact next action
- any newly discovered bugs/constraints
- duplicate-check result if catalog changed

### When a new chat starts
If the user says only **START**:
1. Read `HANDOVER.md`.
2. Verify GitHub HEAD.
3. Verify current production deployment.
4. Verify any pending CI/workflow item.
5. Resume from the exact checkpoint.
6. Do not repeat the whole history to the user unless useful.
7. Do not ask “what should I do?” when the next action is already in the handover.

### Important
The handover must describe the **latest verified state**, not an old plan. If the repository and handover disagree, inspect the repository and deployment first and update the handover.

## 7. User communication rules

The user prefers simple Gujarati.

Use concise status blocks such as:
- 🔧 Code
- 🔍 Accuracy
- 🚀 Vercel
- 📱 Android
- 🟢 READY
- 🟡 PENDING
- 👤 તમારે શું કરવાનું છે

Always tell the user exactly what they need to do. If nothing is required, say:
**“તમારે અત્યારે કંઈ કરવાનું નથી.”**

Do not claim work is complete without verification.

## 8. Current next priorities

Priority order:
1. **Verify native Android GitHub Actions build + APK artifact.**
2. If build fails, fix it and re-run/verify.
3. Improve native live wallpaper renderer beyond the current simple cosmic gradient.
4. Keep static wallpaper additions going in parallel, with strict duplicate checks.
5. Continue battery-friendly optimization.
6. Continue privacy-first improvements.
7. Keep every production deployment verified before declaring READY.

## 9. Session checkpoint

This handover was created/updated from the verified state at:
- GitHub HEAD: `7afba0a2e6ea6ccc6e91cd51bd6e09aca5a75df3`
- Production deployment: `dpl_AzpX6BKTaXBnLkMWA5kChgxmfWmy`
- Production state: **READY**
- Static catalog: **40 unique wallpapers**
- Duplicate image URLs: **0**
- Native Android APK: **NOT YET VERIFIED**
- Latest native renderer commit: `7afba0a2e6ea6ccc6e91cd51bd6e09aca5a75df3`
- Native renderer now has Aurora, Nebula, and Ocean scenes with battery-aware frame timing.
- Immediate next action: **verify Android Actions run/artifact, then test/fix native build if needed.**
