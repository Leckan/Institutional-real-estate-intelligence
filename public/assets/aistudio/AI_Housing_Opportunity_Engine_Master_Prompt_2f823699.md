# AI Housing Opportunity Engine — Master Development Prompt

**Tagline:** Discover opportunities. Predict markets. Build affordable communities.

## Product Overview

Build a beautiful, modern, AI-powered real estate investment intelligence platform called **AI Housing Opportunity Engine**.

The platform empowers real estate investors, affordable housing developers, property acquisition firms, community development organizations, and institutional investors to identify profitable affordable housing opportunities across the United States.

Aggregate and analyze publicly available real estate, demographic, economic, zoning, infrastructure, and housing datasets to identify emerging investment hotspots and underserved housing markets.

Use Google AI agents to analyze market conditions, predict regional investment opportunities, generate personalized property recommendations, and provide actionable investment intelligence.

The experience should combine the analytical depth of an institutional investment platform with the usability of a modern property search product. Build a production-oriented, responsive web application with realistic data architecture, working interactions, and scalable backend infrastructure.

---

## 1. Technology Stack

### Frontend
- Next.js with App Router.
- React.js and TypeScript.
- Tailwind CSS.
- shadcn/ui for reusable UI components.
- Lucide React for icons.
- Recharts for analytics and visualizations.
- Framer Motion for subtle animations.
- React Three Fiber or Three.js for optional advanced geographic visualizations.

### Backend and Infrastructure
- Google Cloud Firebase.
- Firebase Authentication for secure user authentication.
- Cloud Firestore for real-time database updates.
- Firebase Cloud Functions for backend business logic.
- Firebase Cloud Storage for property images and documents.
- Firebase App Check for application protection.
- Firebase Cloud Messaging for push notifications.

### AI and Machine Learning
- Google Gemini API through Google AI Studio or Vertex AI.
- Google Vertex AI for advanced predictive modeling and model deployment.
- Google Agent Development Kit (ADK) for multi-agent orchestration.
- BigQuery ML for predictive analytics where appropriate.
- Google Cloud Vision API for automated property image analysis.

### Mapping and Geospatial Intelligence
- Google Maps JavaScript API.
- Google Places API.
- Google Geocoding API.
- Google Maps visualization layers.
- GeoJSON for geographic boundaries.
- GIS datasets.

### Data Processing
- Python for data processing and predictive modeling.
- Pandas and NumPy.
- Scikit-learn.
- GeoPandas.
- BigQuery for large-scale public dataset analysis.

### Export
- CSV export.
- Excel XLSX export.
- PDF investment reports.
- GeoJSON export.
- Downloadable map images.
- API access for enterprise customers.

Use modular architecture, reusable components, secure API integrations, and environment-based configuration.

---

## 2. Design System and User Experience

Create a premium, modern financial intelligence dashboard. Prioritize clarity, usability, and information hierarchy.

### Visual Direction

Use a sophisticated light-mode theme as the default.

**Light mode**
- Background: `#F8FAFC`
- Primary surface: `#FFFFFF`
- Primary text: `#0F172A`
- Secondary text: `#64748B`
- Primary accent: `#2563EB`
- Success: `#16A34A`
- Warning: `#F59E0B`
- Critical: `#DC2626`
- Borders: `#E2E8F0`

**Dark mode**
- Background: `#0B1120`
- Surface: `#111827`
- Elevated surface: `#1E293B`
- Primary text: `#F8FAFC`
- Secondary text: `#94A3B8`
- Accent: `#60A5FA`

Use clean typography, generous whitespace, rounded cards, subtle shadows, clear data visualizations, consistent spacing, smooth transitions, minimal visual clutter, professional map interfaces, elegant loading skeletons, and helpful empty states.

Follow WCAG 2.2 AA accessibility principles. Support keyboard navigation, visible focus indicators, screen readers, and reduced-motion preferences.

### Responsive Layout

- **Desktop:** Expandable left sidebar, main analytics workspace, and optional contextual right-side AI insights panel.
- **Tablet:** Collapsible navigation, responsive card grids, and expandable map and analytics panels.
- **Mobile:** Simplified navigation, stacked analytics, mobile-friendly map interactions, and touch-optimized controls.

Implement a persistent light/dark theme switcher.

---

## 3. Application Navigation

Create the following primary navigation sections:

1. Overview Dashboard
2. Opportunity Explorer
3. Interactive Market Map
4. Property Intelligence
5. Market Analytics
6. Affordable Housing Index
7. Zoning & Development
8. AI Investment Advisor
9. Watchlist & Alerts
10. Reports & Exports
11. Saved Searches
12. Settings

Use clear icons and descriptive labels.

---

## 4. Overview Dashboard

Build an executive dashboard that gives investors an immediate understanding of the affordable housing investment landscape.

### KPI Cards

- Total Investment Opportunities.
- Emerging Investment Hotspots.
- Average Potential ROI.
- Average Property Acquisition Price.
- Estimated Affordable Housing Demand.
- Underserved Housing Markets.
- Properties Below Market Value.
- Estimated Rental Yield.

Show percentage changes against previous periods when historical data is available.

### Dashboard Visualizations

Create:
- Investment opportunity trend chart.
- Regional affordability index.
- Housing supply versus demand chart.
- Average property prices by metropolitan area.
- Rental yield comparison.
- Emerging investment hotspots.
- Geographic opportunity distribution.
- Historical sales volume.
- Housing affordability trends.

Include a recent activity feed displaying:
- Newly identified opportunities.
- Changes in property valuation.
- Newly published zoning information.
- Market price movements.
- AI-generated investment recommendations.
- New hotspot alerts.

Allow users to customize dashboard widgets.

---

## 5. Opportunity Explorer

This is the primary discovery engine. Allow investors to search and discover potential affordable housing investment opportunities across the United States.

### Search Functionality

Support searches by:
- City.
- State.
- ZIP code.
- County.
- Metropolitan Statistical Area (MSA).
- Neighborhood.
- Street address.
- Geographic coordinates.

Integrate Google Places API for location autocomplete and neighborhood discovery.

### Opportunity Filters

**Location**
- State, city, county, ZIP code, and neighborhood.
- Radius from selected location.

**Financial**
- Minimum and maximum property price.
- Estimated acquisition cost.
- Potential ROI.
- Cash-on-cash return.
- Cap rate.
- Gross rental yield.
- Estimated rehabilitation cost.
- Projected operating expenses.
- Minimum equity requirement.

**Property Characteristics**
- Property type.
- Number of bedrooms and bathrooms.
- Building size and lot size.
- Year built.
- Occupancy status.
- Property condition.
- Number of units.

**Affordable Housing Indicators**
- Area Median Income (AMI).
- Percentage of cost-burdened households.
- Affordable housing supply gap.
- Rental affordability.
- Housing vacancy rates.
- Median household income.
- Housing demand growth.

**Market Trends**
- Historical sales volume.
- Median sale price growth.
- Rental price growth.
- Inventory changes.
- Days on market.
- Population growth.
- Employment growth.

**Zoning**
- Zoning classification.
- Residential zoning.
- Multifamily zoning.
- Mixed-use zoning.
- Maximum permitted density.
- Maximum building height.
- Accessory Dwelling Unit (ADU) eligibility.
- Transit-oriented development eligibility.
- Inclusionary zoning requirements.
- Permitted housing uses.

Allow users to save filter combinations as searches.

---

## 6. Interactive Investment Heat Maps

Build an advanced interactive geographic intelligence system using Google Maps API. This should be one of the application's most visually impressive features.

Display geographic opportunity heat maps covering cities, counties, ZIP codes, and metropolitan areas.

### Map Visualization Layers

Allow users to toggle between:

1. Investment Opportunity Score.
2. Predicted ROI.
3. Affordable Housing Demand.
4. Property Price Appreciation.
5. Rental Yield.
6. Housing Supply Gap.
7. Historical Sales Volume.
8. Population Growth.
9. Employment Growth.
10. Zoning and Development Potential.
11. Distressed Property Concentration.
12. Transit Accessibility.
13. Infrastructure Development.
14. Neighborhood Affordability Index.

### Heat Map Behavior

Use geographic polygons and heat intensity to represent investment attractiveness.

Color coding:
- Dark green: Exceptional investment opportunity.
- Green: Strong investment opportunity.
- Yellow: Moderate opportunity.
- Orange: Elevated investment risk.
- Red: Low investment attractiveness.

Include a map legend and configurable data ranges.

When a user clicks a geographic region, display an interactive information panel containing:
- Location name.
- Investment opportunity score.
- Estimated ROI.
- Median property price.
- Median rent.
- Average cap rate.
- Historical transaction volume.
- Housing affordability gap.
- Population growth.
- Rental demand.
- Zoning characteristics.
- Estimated development potential.
- AI-generated investment recommendation.

Allow users to drill down from state to city, county, ZIP code, and individual properties.

Support map clustering, zoom controls, polygon selection, and drawing custom investment areas.

---

## 7. Property Intelligence

Create a comprehensive property discovery and analysis experience. Each property should have a dedicated detail page.

### Property Information

Display:
- Property address.
- Property images.
- Property type.
- Listing price.
- Estimated market value.
- Estimated acquisition price.
- Building size.
- Lot size.
- Number of units.
- Year built.
- Ownership and parcel information, where legally available.
- Current zoning.
- Historical sale records.
- Tax assessment information.
- Neighborhood statistics.

### Financial Analysis

Calculate:
- Acquisition cost.
- Closing costs.
- Rehabilitation costs.
- Total project investment.
- Estimated monthly rent.
- Gross annual rental income.
- Operating expenses.
- Net Operating Income (NOI).
- Capitalization rate.
- Cash-on-cash return.
- Internal Rate of Return (IRR).
- Projected appreciation.
- Break-even occupancy.
- Estimated cash flow.

Allow investors to customize financial assumptions. Include best-case, base-case, and worst-case projections.

Clearly distinguish between verified source data, estimated values, and AI-generated forecasts.

### Comparable Sales Analysis

Show comparable property sales based on:
- Geographic proximity.
- Property type.
- Building size.
- Bedroom and bathroom count.
- Transaction date.
- Historical sale prices.

Display comparable sales on the map and in a sortable table.

---

## 8. Zoning and Development Intelligence

Create a dedicated zoning intelligence module that aggregates publicly available zoning and land-use datasets.

Display:
- Current zoning designation.
- Permitted property uses.
- Residential development permissions.
- Multifamily development permissions.
- Maximum density.
- Floor Area Ratio (FAR).
- Building height restrictions.
- Lot coverage restrictions.
- Setback requirements.
- ADU permissions.
- Affordable housing incentives.
- Inclusionary housing requirements.
- Transit-oriented development opportunities.

Allow investors to filter properties based on their intended development strategy:
- Single-family conversion.
- Multifamily development.
- Small apartment buildings.
- Affordable housing development.
- Mixed-use development.
- ADU construction.
- Rehabilitation and preservation.

Include a zoning feasibility assessment.

Treat zoning interpretations as preliminary research, not legal determinations. Show the source, jurisdiction, effective date, and verification status of each zoning record.

---

## 9. Historical Market Analytics

Develop an advanced regional market analytics module. Analyze historical property sales and regional real estate performance.

Metrics should include:
- Total property transactions.
- Transaction volume.
- Median sales price.
- Average sales price.
- Price per square foot.
- Median rent.
- Rental growth.
- Vacancy rates.
- Housing inventory.
- Days on market.
- Foreclosure trends.
- Population growth.
- Household formation.
- Employment growth.
- Income growth.

Allow users to compare cities, counties, ZIP codes, neighborhoods, and metropolitan areas.

Support historical time ranges:
- 3 months.
- 6 months.
- 1 year.
- 3 years.
- 5 years.
- 10 years.

Use historical data to identify leading and lagging markets.

Do not imply that historical observations are real-time data. Display the latest available observation date and source for every dataset.

---

## 10. Affordable Housing Opportunity Index

Build a proprietary AI-powered **Affordable Housing Opportunity Index** to identify areas where investors can potentially achieve attractive financial returns while contributing to the availability of affordable housing.

Develop a configurable scoring framework using:

1. Housing Affordability Gap.
2. Rental Demand.
3. Property Acquisition Affordability.
4. Population Growth.
5. Employment Growth.
6. Rental Yield.
7. Property Appreciation Potential.
8. Housing Supply Constraints.
9. Zoning Feasibility.
10. Development Incentives.
11. Infrastructure Accessibility.
12. Market Risk.

Create an overall score from 0 to 100. Provide individual sub-scores and explain the underlying methodology.

Allow investors to customize the weighting of these dimensions.

**Example default weights:**
- Affordable housing demand: 20%.
- Financial attractiveness: 20%.
- Market growth: 15%.
- Zoning feasibility: 15%.
- Property affordability: 10%.
- Rental demand: 10%.
- Infrastructure accessibility: 5%.
- Risk assessment: 5%.

Display a visual scorecard with a breakdown of the factors contributing to each area's rating.

Distinguish between:
- Strong financial opportunity.
- Strong affordable housing impact.
- Strong combined investment and social impact.

Do not use protected characteristics as investment suitability criteria. Use neighborhood-level housing affordability, infrastructure, supply, and economic indicators responsibly.

---

## 11. Google AI Investment Advisor

Integrate Google Gemini and Google Cloud AI to power an intelligent investment research assistant.

The assistant should be available throughout the application. Create a conversational AI interface with contextual awareness of the user's current market, selected property, investment strategy, and saved preferences.

### AI Agent Capabilities

The assistant should:
1. Analyze regional property trends.
2. Identify emerging investment hotspots.
3. Predict potential property appreciation.
4. Estimate future rental demand.
5. Identify undervalued markets.
6. Evaluate affordable housing supply gaps.
7. Analyze zoning feasibility.
8. Compare potential investment markets.
9. Generate personalized property recommendations.
10. Evaluate investment risks.
11. Recommend investment strategies.
12. Generate property investment reports.
13. Answer natural-language questions about regional housing markets.

### Example Queries

- Find the top 10 emerging affordable housing investment markets in the United States.
- Identify ZIP codes with increasing rental demand and relatively affordable acquisition prices.
- Find multifamily properties with attractive cash-on-cash returns.
- Which neighborhoods have the largest gap between median household income and average rental costs?
- Identify areas where recent zoning changes could create new multifamily development opportunities.
- Compare investment opportunities in Baltimore, Maryland and Cleveland, Ohio.
- Find regions where population growth and housing shortages indicate strong future rental demand.
- Recommend five markets for an affordable housing development strategy with a $2 million investment budget.

### Multi-Agent Architecture

Implement specialized AI agents:

**Market Research Agent:** Analyzes historical and current regional real estate trends.

**Property Discovery Agent:** Identifies and ranks potential acquisition opportunities.

**Financial Analysis Agent:** Evaluates investment returns and financial projections.

**Zoning Intelligence Agent:** Interprets available zoning and land-use datasets and identifies potential development constraints.

**Affordable Housing Impact Agent:** Evaluates housing affordability gaps and potential housing supply impact.

**Predictive Analytics Agent:** Uses historical data and machine learning to forecast market indicators.

**Investment Strategy Agent:** Combines findings and generates personalized recommendations.

Agents should share structured outputs through a central orchestration layer.

Require source-backed findings, confidence indicators, and explanations for recommendations. AI agents must not fabricate market statistics, property listings, zoning regulations, or financial performance.

---

## 12. Predictive Market Analysis

Implement predictive analytics for regional investment intelligence.

Develop models for:
- Property price forecasting.
- Rental price forecasting.
- Housing demand forecasting.
- Regional investment hotspot detection.
- Sales volume forecasting.
- Market appreciation trends.
- Housing inventory projections.

Use historical observations, demographic changes, employment indicators, housing supply, and economic conditions as model features.

Start with explainable statistical and machine-learning baselines before deploying more complex models. Evaluate predictive performance using historical backtesting.

Display:
- Forecasted values.
- Confidence intervals.
- Historical observations.
- Model update date.
- Forecast horizon.
- Model performance metrics.

Allow users to select forecasting periods:
- 3 months.
- 6 months.
- 12 months.
- 24 months.
- 5 years.

Clearly identify projections as estimates rather than guaranteed outcomes.

---

## 13. Automated Alerts and Notifications

Create an intelligent alert engine that continuously monitors saved investment markets and properties.

### Alert Types

- New investment hotspot detected.
- Significant property price decline.
- Rental demand increase.
- New multifamily development opportunity.
- New property listing matching saved criteria.
- Significant increase in historical sales volume.
- Favorable zoning changes.
- New affordable housing incentives.
- Changes in property valuation.
- Attractive ROI threshold reached.
- Housing affordability gap increased.

### Notification Channels

- In-app notifications.
- Email notifications.
- Browser push notifications.
- Mobile push notifications through Firebase Cloud Messaging.

### Alert Configuration

Allow users to specify:
- Geographic area.
- Property type.
- Minimum investment score.
- Minimum projected ROI.
- Price range.
- Rental yield threshold.
- Zoning criteria.
- Notification frequency.

Create an alerts dashboard with active alerts, notification history, and alert performance.

Prevent duplicate alerts and provide controls for frequency and notification preferences.

---

## 14. Public Data Integrations

Build a modular data ingestion architecture to connect multiple public data providers.

### Housing and Property
- HUD datasets.
- HUD CHAS.
- HUD Fair Market Rents.
- HUD income limits.
- U.S. Census Bureau ACS.
- Census Building Permits Survey.
- FHFA House Price Index.
- FRED economic datasets.
- Local county assessor records.
- Public county recorder transaction records.
- Municipal property and parcel datasets.

### Economic and Demographic
- Census population estimates.
- Census household statistics.
- Bureau of Labor Statistics.
- BEA regional economic accounts.
- Local employment and wage datasets.

### Geographic and Infrastructure
- TIGER/Line shapefiles.
- Local GIS open-data portals.
- Public transit datasets.
- Municipal infrastructure datasets.
- FEMA flood hazard data.

### Zoning
- Municipal zoning GIS datasets.
- County land-use datasets.
- City planning department open-data portals.
- Public zoning ordinance documents.

Build a source registry that records:
- Dataset name.
- Provider.
- API endpoint.
- Geographic coverage.
- Update frequency.
- Last successful synchronization.
- Data freshness.
- Licensing restrictions.
- Source attribution.

Implement automated scheduled data synchronization.

Use BigQuery for analytics and large-scale historical data processing.

Public datasets are not necessarily updated in real time. Refresh each source according to its actual publication schedule and display its last-updated timestamp.

---

## 15. Google Maps and Google Places Integration

Implement Google Maps as the primary geographic exploration interface.

Features:
- Property location markers.
- Investment opportunity heat maps.
- Geographic boundaries.
- Neighborhood search.
- Nearby amenities.
- Schools and public transportation.
- Hospitals and essential services.
- Custom geographic search radius.
- Property clustering.
- Draw-to-search functionality.
- Street-level exploration where available.

Google Places should power location autocomplete, neighborhood discovery, and nearby amenity searches.

Show relevant neighborhood amenities and transportation accessibility without treating proximity as a guarantee of investment performance.

---

## 16. Google Cloud Vision API

Implement automated property image analysis using Google Cloud Vision API.

When property images are uploaded or retrieved from permitted sources, analyze:
- Exterior property condition.
- Interior property condition.
- Visible structural deterioration.
- Roof condition indicators.
- Landscaping.
- Property type.
- Visible amenities.
- Potential renovation indicators.

Use image classification and object detection to organize property imagery.

Create a property image intelligence panel showing:
- Identified visual features.
- Potential maintenance indicators.
- Image quality.
- Confidence score.
- AI-generated image summary.

Never claim that image analysis establishes structural integrity, code compliance, or a professional property inspection.

Allow users to upload additional property photographs for analysis.

---

## 17. Reports and Cross-Platform Data Export

Create a dedicated reporting center.

Allow users to export:
- Property investment analyses.
- Regional market comparisons.
- Investment hotspot reports.
- Affordable housing opportunity rankings.
- Zoning analysis reports.
- Property watchlists.
- Geographic opportunity datasets.
- Financial projections.

### Supported Export Formats

- PDF.
- CSV.
- XLSX.
- JSON.
- GeoJSON.

Reports should include:
- Executive summary.
- Selected investment market.
- Data sources.
- Financial assumptions.
- Opportunity score.
- Market trends.
- Risk assessment.
- Zoning observations.
- AI recommendations.
- Report generation timestamp.

Create clean, professional report templates suitable for investment committees, real estate partners, lenders, and development organizations.

Ensure exported datasets preserve appropriate geographic identifiers and metadata.

---

## 18. User Authentication and Personalization

Implement secure authentication through Firebase Authentication.

Support:
- Google sign-in.
- Email and password.
- Password reset.
- Email verification.
- User profile management.

Create personalized investor profiles.

During onboarding, allow users to specify:
- Investment budget.
- Preferred geographic markets.
- Property types.
- Investment strategy.
- Target ROI.
- Risk tolerance.
- Preferred investment horizon.
- Affordable housing objectives.

Use these preferences to personalize AI recommendations.

Support:
- Saved properties.
- Saved markets.
- Saved searches.
- Investment watchlists.
- Custom alerts.
- Recently viewed properties.

Implement Firestore security rules to ensure users can only access their authorized private data.

Never expose API keys or privileged service credentials in client-side code.

---

## 19. Database Architecture

Create a scalable Firestore data model with collections such as:

- `users`
- `investor_profiles`
- `properties`
- `property_images`
- `property_valuations`
- `comparable_sales`
- `geographic_areas`
- `market_indicators`
- `housing_affordability`
- `zoning_records`
- `investment_opportunities`
- `opportunity_scores`
- `market_forecasts`
- `saved_properties`
- `saved_searches`
- `watchlists`
- `alerts`
- `notifications`
- `ai_recommendations`
- `investment_reports`
- `data_sources`
- `data_sync_logs`

Use BigQuery for historical datasets, complex geographic analytics, and large-scale forecasting workloads.

Avoid storing large analytical datasets directly in Firestore.

Implement pagination, indexing, caching, and data retention policies.

---

## 20. Core Application Pages

### A. Landing Page
Create an elegant landing page explaining the platform's value proposition.

Include:
- Hero section.
- Interactive product preview.
- Key platform capabilities.
- How it works.
- AI-powered investment intelligence.
- Affordable housing impact.
- Feature highlights.
- Call-to-action.
- Pricing section.

### B. Overview Dashboard
Show the investor's personalized investment intelligence.

### C. Opportunity Explorer
Provide advanced search, filtering, ranking, and opportunity discovery.

### D. Market Intelligence Map
Provide full-screen interactive geographic heat maps.

### E. Property Details
Display property intelligence and financial analysis.

### F. Regional Market Profile
Provide comprehensive market statistics and investment forecasts.

### G. Zoning Explorer
Display zoning classifications, regulations, and development opportunities.

### H. AI Investment Advisor
Provide a conversational interface and AI-generated research.

### I. Alerts Center
Manage hotspot notifications and property alerts.

### J. Reports Center
Generate and export professional investment reports.

### K. Settings
Manage investor preferences, authentication, theme, integrations, and notifications.

---

## 21. Application Performance and Security

Implement:
- Server-side rendering where appropriate.
- Next.js server components.
- Lazy loading.
- Optimized images.
- API rate limiting.
- Secure server-side API integrations.
- Firebase Authentication.
- Firestore security rules.
- Firebase App Check.
- Input validation.
- Error boundaries.
- Audit logging.
- Secure secrets management.
- Data source attribution.
- API usage monitoring.

Respect third-party API terms, data licensing, property listing restrictions, and privacy requirements.

Implement observability for backend jobs, data synchronization, AI calls, and forecasting workflows.

---

## 22. MVP Development Priorities

Build the platform incrementally.

### Phase 1: Core MVP
- Authentication.
- Dashboard.
- Opportunity Explorer.
- Google Maps integration.
- Basic geographic heat maps.
- Property intelligence.
- Financial ROI calculator.
- Basic public dataset integration.
- Saved properties.
- Light and dark modes.

### Phase 2: AI Intelligence
- Gemini AI integration.
- AI Investment Advisor.
- Affordable Housing Opportunity Index.
- Personalized property recommendations.
- Predictive analytics.
- Market comparison.

### Phase 3: Advanced Intelligence
- Multi-agent AI orchestration.
- Zoning intelligence.
- Historical sales analytics.
- Google Cloud Vision integration.
- Automated hotspot detection.
- Automated notifications.

### Phase 4: Enterprise Capabilities
- Advanced reporting.
- Cross-platform data exports.
- Portfolio analytics.
- Multi-user workspaces.
- API access.
- Enterprise subscriptions.

---

## 23. Expected Deliverables

Build a complete working application, not just static mockups.

Deliver:
1. Fully responsive Next.js application.
2. Complete light-mode and dark-mode design systems.
3. Firebase authentication.
4. Firestore database integration.
5. Interactive Google Maps experience.
6. Google Places-powered location search.
7. Google Gemini-powered investment advisor.
8. AI opportunity scoring engine.
9. Predictive market analytics.
10. Zoning and historical sales filters.
11. Real-time or source-scheduled data updates.
12. Automated investment alerts.
13. Google Cloud Vision property image analysis.
14. Interactive charts and geographic heat maps.
15. PDF, Excel, CSV, JSON, and GeoJSON exports.
16. Secure backend architecture.
17. Seed data for demonstration.
18. Environment configuration template.
19. Setup and deployment documentation.

---

## 24. Final Product Quality Requirements

The application should feel like a premium institutional-grade real estate intelligence platform.

Prioritize:
- Beautiful and intuitive user experience.
- Accurate, traceable public data.
- Actionable investment intelligence.
- Transparent financial calculations.
- Explainable AI recommendations.
- High-performance geographic visualizations.
- Secure user data.
- Modular and maintainable architecture.

All primary navigation elements, search filters, charts, map interactions, export actions, notifications, and AI assistant controls must work.

Where external API credentials are unavailable, build realistic integration adapters and clearly labeled demonstration data rather than pretending that live data is available.

Do not hardcode fake live market data.

The final result should position AI Housing Opportunity Engine as a leading AI-powered platform for discovering profitable real estate opportunities while helping address the affordable housing shortage in the United States.

## Implementation Guidance

Before implementation:
1. Inspect the existing repository and identify its framework, conventions, and current functionality.
2. Propose a concise implementation plan and architecture.
3. Identify required Google Cloud and Firebase credentials and document them in an `.env.example` file.
4. Define the data contracts and source freshness rules.
5. Build the application in phases, keeping each major feature functional and testable.
6. Add tests for financial calculations, opportunity scoring, access control, data transformations, and key user flows.
7. Document setup, local development, deployment, and integration configuration.

Do not claim an integration is live until it has been configured and tested successfully. Clearly label simulated data and unavailable integrations.
