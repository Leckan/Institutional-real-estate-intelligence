# AI Housing Opportunity Engine

> **Tagline:** Discover opportunities. Predict markets. Build affordable communities.

**AI Housing Opportunity Engine** is an institutional-grade real estate investment intelligence platform designed for real estate investors, affordable housing developers, property acquisition firms, community development financial institutions (CDFIs), and housing authorities.

The platform aggregates and analyzes publicly available real estate, demographic, economic, zoning, and housing datasets to identify high-cash-flow workforce and affordable housing investment opportunities across major United States metropolitan areas.

---

## 🌟 Key Capabilities & Features

### 1. Executive Overview Dashboard
- **8 Institutional KPIs:** Real-time metrics for total screened opportunities, emerging regional hotspots, average potential ROI, average property acquisition basis, affordable housing demand deficits, tracked submarkets, assets trading below replacement value, and gross rental yields.
- **Visual Analytics:** Quarterly screened deal absorption curves and regional capitalization rate benchmarks.
- **Live Deal & Hotspot Stream:** Real-time activity feed highlighting newly screened properties, municipal zoning changes, and valuation discounts.

### 2. Opportunity Explorer
- **Multi-Dimensional Deal Screening:** Search by address, city, state, ZIP code, neighborhood, or zoning designation.
- **Deep Financial & Physical Filters:**
  - Acquisition price ceiling and rehab budget ranges.
  - Minimum Cap Rate, Cash-on-Cash yield, and projected ROI thresholds.
  - Property classification: Duplex, Triplex, Fourplex, and Small Multifamily (5–20 units).
  - Area Median Income (AMI) target bands: 30%, 50%, 60%–80%, and Mixed-Income.
  - By-right Accessory Dwelling Unit (ADU) allowances and Transit-Oriented Development (TOD) eligibility.
- **Dual Display Modes:** Switch seamlessly between an asset card grid view and an institutional financial data table with tabular numeric alignment.

### 3. Interactive Market Heat Map
- **14 Switchable Geospatial Layers:**
  1. Investment Opportunity Score (0–100)
  2. Predicted ROI (%)
  3. Affordable Housing Demand
  4. Property Price Appreciation
  5. Gross Rental Yield (%)
  6. Housing Supply Gap (Units)
  7. Historical Sales Volume
  8. Population Growth Rate
  9. Employment Growth Rate
  10. Zoning & ADU Potential
  11. Distressed Property Concentration
  12. Transit Accessibility Score
  13. Infrastructure Development
  14. Neighborhood Affordability Gap
- **Geospatial Visualizations:** 5-tier institutional attractiveness color coding (Exceptional, Strong, Moderate, Elevated Risk, Low Attractiveness).
- **Regional Inspector Drawer:** Click on any metropolitan hub (Baltimore, Cleveland, Detroit, Philadelphia, Memphis, Atlanta, etc.) to examine median price per square foot, HUD rent benchmarks, and drill down directly to individual property pins.

### 4. Property Intelligence & Financial Modeling Engine
- **Underwriting Pro-Forma:** Dynamic calculations for Total Project Investment, Debt Service Amortization, Net Operating Income (NOI), Cap Rate, Cash-on-Cash Return, 5-Year and 10-Year IRRs, Debt Service Coverage Ratio (DSCR), and Break-Even Occupancy.
- **Sensitivity Scenarios:** Instant toggles between:
  - **Base Case:** Standard underwritten market assumptions.
  - **Best Case:** +8% gross rent, -5% operating expenses, lower vacancy.
  - **Worst Case:** -8% gross rent, +8% operating expenses, higher vacancy.
- **AI Vision Condition Inspector:** Property photo analysis assessing structural integrity, roofing condition, masonry weathering, and rehab contingency tier.
- **Comparable Market Sales (Comps):** Sortable table of recent nearby transactions with distance, layout, price per square foot, and similarity scores.

### 5. Zoning & Development Intelligence
- **Municipal Land-Use Catalog:** Comprehensive zoning details for codes such as Baltimore `R-8`, Cleveland `RA-2`, Detroit `R2`, Philadelphia `CMX-2`, Memphis `RU-3`, and Atlanta `MR-3`.
- **Development Strategy Filters:** Filter properties by by-right ADU construction, multifamily conversion, transit-oriented density bonuses, and historic tax credit rehabilitation.

### 6. Historical Market Analytics & Predictive Forecasting
- **Multi-Metro Comparison:** Compare historical performance between any two metropolitan statistical areas (MSAs) side-by-side.
- **Flexible Time Horizons:** Toggle across 6 Months, 1 Year, 3 Years, 5 Years, and 10 Years.
- **Machine Learning Projections:** Statistical regression and predictive forecasts with confidence intervals across 6M, 12M, 24M, and 5-year horizons.

### 7. Affordable Housing Opportunity Index (AHOI)
- Proprietary 12-dimension composite scoring framework balancing financial returns with workforce community impact.
- **Interactive Weight Customizer:** Drag sliders for demand gap, financial returns, market appreciation, zoning leeway, basis affordability, rental demand, and risk to trigger instant real-time market re-rankings.

### 8. Google AI Investment Advisor (Multi-Agent Architecture)
- Powered by **Google Gemini 3.8 Flash** via a server-side proxy (`/api/gemini/advisor`) with contextual grounding in the active market, property, and investor profile.
- **7 Specialized Agent Personas:**
  - *Chief Investment Strategy Agent*
  - *Market Research Agent*
  - *Property Discovery Agent*
  - *Financial Analysis Agent*
  - *Zoning Intelligence Agent*
  - *Affordable Housing Impact Agent*
  - *Predictive Analytics Agent*

### 9. Watchlist, Alerts & Export Center
- **Saved Watchlist:** Bookmark candidate properties for investment committee review.
- **Automated Alerts:** Configure trigger thresholds for cap rates, price drops, and zoning amendments.
- **Institutional Committee Memorandum:** Formatted printable PDF view.
- **Data Export Formats:** Instant client-side download of **CSV**, **GeoJSON** GIS boundaries, and **JSON** schemas.

### 10. Public Data Source Registry
- Automated synchronization status and attribution for:
  - **HUD Fair Market Rents (FMR)** & Income Limits (FY2026)
  - **U.S. Census Bureau American Community Survey (ACS)** 5-Year Estimates
  - **FHFA House Price Index (HPI)**
  - **Federal Reserve Bank of St. Louis (FRED)**
  - **Municipal GIS Open-Data Portals**

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Design System** | Tailwind CSS v4 (`@custom-variant dark`), Lucide React icons |
| **Data Visualizations** | Recharts (Area, Bar, Line charts), Responsive SVG GIS projections |
| **Backend & API** | Node.js, Express, `tsx` |
| **Artificial Intelligence** | `@google/genai` TypeScript SDK (Gemini 3.8 Flash), Gemini Vision API |
| **Fonts** | Plus Jakarta Sans (Brand & Display), JetBrains Mono (Financial & Tabular figures) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   git clone <repository-url>
   cd ai-housing-opportunity-engine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API Key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   APP_URL="http://localhost:3000"
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Project Architecture

```
├── .env.example              # Environment variables template
├── index.html                # Entry HTML with meta titles and Google Fonts
├── metadata.json             # AI Studio applet capabilities & metadata
├── package.json              # Project dependencies and full-stack scripts
├── server.ts                 # Express full-stack server & Gemini API proxy
├── src/
│   ├── App.tsx               # Root component & navigation state manager
│   ├── index.css             # Tailwind CSS v4 styling & dark variant
│   ├── main.tsx              # React DOM entry point
│   ├── components/
│   │   ├── Header.tsx                 # 3-zone navigation bar & theme switcher
│   │   ├── OverviewDashboard.tsx      # 8 KPIs, deal trends, and hotspot feed
│   │   ├── OpportunityExplorer.tsx    # Multi-attribute filter & table/grid views
│   │   ├── InteractiveMarketMap.tsx   # 14-layer GIS heat map & inspector drawer
│   │   ├── PropertyIntelligence.tsx   # Pro-forma model, scenario switcher & AI vision
│   │   ├── ZoningExplorer.tsx         # Municipal code catalog & ADU leeway
│   │   ├── MarketAnalytics.tsx        # Side-by-side metro analytics & ML forecasts
│   │   ├── AffordableHousingIndex.tsx # AHOI 12-dimension custom weight engine
│   │   ├── AIInvestmentAdvisor.tsx    # Multi-agent conversational Gemini advisor
│   │   ├── WatchlistAlerts.tsx        # Bookmarks, automated triggers & CSV export
│   │   ├── ReportsExports.tsx         # Investment committee memo & GeoJSON export
│   │   └── SettingsModal.tsx          # Investor profile editor & data source registry
│   ├── data/
│   │   └── mockData.ts       # Institutional seed data for Baltimore, Cleveland, etc.
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces and domain models
│   └── utils/
│       └── financials.ts     # Amortization, NOI, Cap Rate, IRR, and DSCR math
└── tsconfig.json             # TypeScript configuration
```

---

## 📊 Public Data Sources & Attribution

- **U.S. Department of Housing and Urban Development (HUD):** Fair Market Rents (FMR), Comprehensive Housing Affordability Strategy (CHAS).
- **U.S. Census Bureau:** American Community Survey (ACS) 5-Year Data (demographics, income, housing tenure).
- **Federal Housing Finance Agency (FHFA):** Master House Price Index series.
- **Federal Reserve Bank of St. Louis (FRED):** Regional labor, employment, and construction permit statistics.
- **Municipal GIS & Open Data:** City of Baltimore Department of Planning, City of Cleveland Planning Commission, City of Detroit BSEED, Philadelphia Department of Licenses & Inspections, Memphis and Shelby County Division of Planning, and City of Atlanta Department of City Planning.

---

## ⚖️ Legal & Financial Disclaimer

*The analysis, metrics, opportunity scores, and AI recommendations provided by the AI Housing Opportunity Engine are intended solely for preliminary research, deal screening, and analytical purposes. They do not constitute formal investment advice, legal land-use determinations, architectural endorsements, or underwriting commitments. Investors must conduct their own independent due diligence, title verification, environmental reviews, and structural inspections before acquiring or financing real property.*

---

## 📄 License

Apache-2.0
