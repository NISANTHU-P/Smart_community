# 🎨 TAILWIND CSS CHEAT SHEET - Smart Community Project

## 📚 Complete Reference for All Classes Used in This Project

---

## 🎨 COLORS

### Background Colors
```
bg-white          → background-color: #ffffff;
bg-gray-50        → background-color: #f9fafb;
bg-gray-100       → background-color: #f3f4f6;
bg-gray-800       → background-color: #1f2937;
bg-blue-50        → background-color: #eff6ff;
bg-blue-600       → background-color: #2563eb;
bg-blue-700       → background-color: #1d4ed8;
bg-red-600        → background-color: #dc2626;
bg-red-700        → background-color: #b91c1c;
bg-green-600      → background-color: #16a34a;
bg-purple-600     → background-color: #9333ea;
```

### Text Colors
```
text-white        → color: #ffffff;
text-gray-400     → color: #9ca3af;
text-gray-500     → color: #6b7280;
text-gray-600     → color: #4b5563;
text-gray-700     → color: #374151;
text-gray-800     → color: #1f2937;
text-blue-600     → color: #2563eb;
text-red-600      → color: #dc2626;
text-green-600    → color: #16a34a;
```

---

## 📏 SPACING

### Padding (p = all sides, px = left/right, py = top/bottom)
```
p-2               → padding: 0.5rem;        (8px)
p-4               → padding: 1rem;          (16px)
p-6               → padding: 1.5rem;        (24px)
p-8               → padding: 2rem;          (32px)

px-3              → padding-left/right: 0.75rem;
px-4              → padding-left/right: 1rem;
px-6              → padding-left/right: 1.5rem;

py-2              → padding-top/bottom: 0.5rem;
py-3              → padding-top/bottom: 0.75rem;
py-4              → padding-top/bottom: 1rem;

pt-4              → padding-top: 1rem;
pb-4              → padding-bottom: 1rem;
pl-16             → padding-left: 4rem;
```

### Margin
```
m-4               → margin: 1rem;
mt-2              → margin-top: 0.5rem;
mt-4              → margin-top: 1rem;
mt-6              → margin-top: 1.5rem;
mt-8              → margin-top: 2rem;
mt-12             → margin-top: 3rem;
mb-2              → margin-bottom: 0.5rem;
mb-4              → margin-bottom: 1rem;
mb-6              → margin-bottom: 1.5rem;
mb-8              → margin-bottom: 2rem;
mr-3              → margin-right: 0.75rem;
mt-auto           → margin-top: auto;
```

### Gap (space between flex/grid items)
```
gap-2             → gap: 0.5rem;
gap-4             → gap: 1rem;
gap-6             → gap: 1.5rem;
space-y-2         → margin-top: 0.5rem; (for each child)
space-y-6         → margin-top: 1.5rem; (for each child)
```

---

## 📐 LAYOUT

### Display
```
flex              → display: flex;
block             → display: block;
hidden            → display: none;
```

### Flexbox
```
flex-col          → flex-direction: column;
flex-1            → flex: 1 1 0%;
items-center      → align-items: center;
items-start       → align-items: flex-start;
justify-center    → justify-content: center;
justify-between   → justify-content: space-between;
```

### Position
```
relative          → position: relative;
absolute          → position: absolute;
fixed             → position: fixed;
static            → position: static;

top-0             → top: 0;
top-4             → top: 1rem;
bottom-4          → bottom: 1rem;
left-0            → left: 0;
left-4            → left: 1rem;
right-0           → right: 0;
inset-0           → top/right/bottom/left: 0;
inset-y-0         → top/bottom: 0;
```

### Z-Index
```
z-40              → z-index: 40;
z-50              → z-index: 50;
```

---

## 📦 SIZING

### Width
```
w-5               → width: 1.25rem;
w-6               → width: 1.5rem;
w-64              → width: 16rem;
w-80              → width: 20rem;
w-full            → width: 100%;
max-w-md          → max-width: 28rem;
max-w-7xl         → max-width: 80rem;
min-w-full        → min-width: 100%;
```

### Height
```
h-5               → height: 1.25rem;
h-6               → height: 1.5rem;
h-screen          → height: 100vh;
min-h-screen      → min-height: 100vh;
max-h-96          → max-height: 24rem;
```

---

## 🔤 TYPOGRAPHY

### Font Size
```
text-xs           → font-size: 0.75rem;     (12px)
text-sm           → font-size: 0.875rem;    (14px)
text-base         → font-size: 1rem;        (16px)
text-lg           → font-size: 1.125rem;    (18px)
text-xl           → font-size: 1.25rem;     (20px)
text-2xl          → font-size: 1.5rem;      (24px)
text-3xl          → font-size: 1.875rem;    (30px)
```

### Font Weight
```
font-medium       → font-weight: 500;
font-semibold     → font-weight: 600;
font-bold         → font-weight: 700;
```

### Text Align
```
text-left         → text-align: left;
text-center       → text-align: center;
text-right        → text-align: right;
```

### Text Transform
```
uppercase         → text-transform: uppercase;
lowercase         → text-transform: lowercase;
capitalize        → text-transform: capitalize;
```

---

## 🎭 BORDERS & ROUNDED

### Border
```
border            → border: 1px solid;
border-2          → border: 2px solid;
border-t          → border-top: 1px solid;
border-b          → border-bottom: 1px solid;
border-gray-300   → border-color: #d1d5db;
border-gray-700   → border-color: #374151;
```

### Border Radius
```
rounded           → border-radius: 0.25rem;   (4px)
rounded-lg        → border-radius: 0.5rem;    (8px)
rounded-full      → border-radius: 9999px;    (circle)
```

---

## 🌈 EFFECTS

### Shadow
```
shadow            → box-shadow: 0 1px 3px rgba(0,0,0,0.1);
shadow-md         → box-shadow: 0 4px 6px rgba(0,0,0,0.1);
shadow-lg         → box-shadow: 0 10px 15px rgba(0,0,0,0.1);
shadow-xl         → box-shadow: 0 20px 25px rgba(0,0,0,0.1);
shadow-2xl        → box-shadow: 0 25px 50px rgba(0,0,0,0.25);
```

### Opacity
```
opacity-50        → opacity: 0.5;
bg-opacity-50     → background-color opacity: 0.5;
```

### Transitions
```
transition        → transition: all 0.15s ease;
duration-300      → transition-duration: 300ms;
ease-in-out       → transition-timing-function: ease-in-out;
```

### Transform
```
transform         → transform: translateX/Y/scale;
translate-x-0     → transform: translateX(0);
-translate-x-full → transform: translateX(-100%);
```

---

## 🎯 INTERACTIVE STATES

### Hover
```
hover:bg-blue-700     → background on hover
hover:bg-gray-700     → background on hover
hover:text-blue-800   → text color on hover
```

### Focus
```
focus:ring-2          → box-shadow ring on focus
focus:ring-blue-500   → ring color on focus
focus:border-transparent → remove border on focus
focus:outline-none    → remove outline on focus
```

### Disabled
```
disabled:opacity-50   → opacity when disabled
disabled:cursor-not-allowed → cursor when disabled
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
```
sm:   → @media (min-width: 640px)   - Mobile landscape
md:   → @media (min-width: 768px)   - Tablet
lg:   → @media (min-width: 1024px)  - Desktop
xl:   → @media (min-width: 1280px)  - Large desktop
```

### Usage Examples
```
lg:hidden         → Hide on desktop (≥1024px)
lg:block          → Show on desktop
lg:flex           → Flex on desktop
lg:static         → Static position on desktop
lg:translate-x-0  → No transform on desktop
lg:pl-6           → Padding-left on desktop
lg:text-xl        → Larger text on desktop
```

---

## 🎨 GRADIENTS

```
bg-gradient-to-br     → gradient bottom-right
from-blue-500         → gradient start color
to-purple-600         → gradient end color
```

---

## 🔧 UTILITY CLASSES

### Overflow
```
overflow-hidden       → overflow: hidden;
overflow-y-auto       → overflow-y: auto;
overflow-x-auto       → overflow-x: auto;
```

### Cursor
```
cursor-pointer        → cursor: pointer;
cursor-not-allowed    → cursor: not-allowed;
```

### Whitespace
```
whitespace-nowrap     → white-space: nowrap;
```

### Divide (borders between children)
```
divide-y              → border-top on children
divide-gray-200       → border color
```

---

## 📋 COMMON PATTERNS IN THIS PROJECT

### Card Component
```jsx
<div className="bg-white rounded-lg shadow p-6">
  // White background, rounded corners, shadow, padding
</div>
```

### Button Primary
```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
  // Blue button with hover effect
</button>
```

### Button Danger
```jsx
<button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
  // Red button for delete/logout
</button>
```

### Status Badge
```jsx
<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
  // Small rounded badge with color
</span>
```

### Input Field
```jsx
<input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
  // Full width input with border and focus effect
</input>
```

### Table Header
```jsx
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
  // Table header styling
</th>
```

### Modal Overlay
```jsx
<div className="fixed inset-0 bg-black bg-opacity-50 z-50">
  // Full screen dark overlay
</div>
```

---

## 🎯 HOW TO MODIFY STYLES

### Change Colors
```
bg-blue-600  →  bg-red-600     (Change to red)
bg-blue-600  →  bg-green-600   (Change to green)
text-gray-800 → text-blue-800  (Change text color)
```

### Change Sizes
```
p-4  →  p-8        (More padding)
text-xl → text-3xl (Larger text)
w-64 → w-80        (Wider)
```

### Change Spacing
```
mb-4 → mb-8        (More bottom margin)
gap-2 → gap-6      (More gap between items)
```

### Add Hover Effects
```
bg-blue-600  →  bg-blue-600 hover:bg-blue-700
text-gray-600 → text-gray-600 hover:text-gray-800
```

---

## 💡 QUICK TIPS

1. **Spacing Scale**: 1 = 0.25rem (4px), 2 = 0.5rem (8px), 4 = 1rem (16px)
2. **Colors**: 50 = lightest, 900 = darkest
3. **Responsive**: Add `lg:` prefix for desktop-only styles
4. **Hover**: Add `hover:` prefix for hover effects
5. **Focus**: Add `focus:` prefix for focus states

---

## 🔍 DEBUGGING

**To see what CSS a Tailwind class generates:**
1. Open browser DevTools (F12)
2. Inspect the element
3. Look at the Styles panel
4. See the actual CSS generated

**Example:**
```
className="bg-blue-600 p-4 rounded"

Generates:
.bg-blue-600 { background-color: #2563eb; }
.p-4 { padding: 1rem; }
.rounded { border-radius: 0.25rem; }
```

---

## 📝 NOTES FOR YOUR SIR

- Tailwind is just **shorthand CSS**
- Each class = one CSS property
- Faster than writing separate CSS files
- Industry standard (used by Google, Netflix, etc.)
- Easy to modify - just change the class name
- Responsive by default with `lg:`, `md:`, `sm:` prefixes

**Example Explanation:**
```jsx
<div className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700">
```

**Means:**
- `bg-blue-600` = Blue background
- `text-white` = White text
- `p-4` = Padding 16px all sides
- `rounded` = Rounded corners
- `hover:bg-blue-700` = Darker blue on hover

**Same as writing:**
```css
.my-div {
  background-color: #2563eb;
  color: white;
  padding: 1rem;
  border-radius: 0.25rem;
}
.my-div:hover {
  background-color: #1d4ed8;
}
```

---

**END OF CHEAT SHEET** ✅
