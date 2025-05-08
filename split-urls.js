#!/usr/bin/env node
const config = require('./ave-html/config.json');
const urls = Object.keys(config);

const categories = {
  'Drain Unblocking & Jetting': u =>
    /drains?|jet/i.test(u) &&
    !/cctv|ultra|mega|pressure|tunnel|sweep|survey|pump|gully/i.test(u),
  'CCTV Drain Surveys': u => /cctv|wincan|survey/i.test(u),
  'Ultra-High-Pressure Water Jetting (UHPWJ)': u =>
    /uhpwj|ultra|highpressure|hydropressure/i.test(u),
  'Liquid Waste Disposal': u =>
    /(liquid|waste)/i.test(u) &&
    !/hazard|interceptor|tanker|storage|emergency|body|logistics|tunnel|sweep|gully|drill|uv|hcl/i.test(
      u
    ),
  'Hazardous Liquid Waste Disposal': u => /hazard/i.test(u),
  'Emergency Liquid & Bulk Storage': u =>
    /(storage|tank|float|bulk)/i.test(u) && !/sewage|digest/i.test(u),
  'Interceptor Cleaning & Maintenance': u =>
    /interceptor|petrol|diesel|fuel/i.test(u),
  'Pump Station Services & Hire': u =>
    /pump|station/i.test(u) && !/sewage/i.test(u),
  'Sewer & Tunnel Cleaning (Inc. Crossrail / Tideway)': u =>
    /tunnel|sewage|sewer|cross|tideway|subway/i.test(u),
  'Road Sweeper Hire & Sweeper Waste': u =>
    /sweep|sweeper/i.test(u) && !/gully/i.test(u),
  'Gully Cleaning & Gully Gulper': u => /gully/i.test(u),
  'Digester & Anaerobic Tank Cleaning': u => /digester|anaerobic/i.test(u),
  'Drilling Slurry & Mud Disposal': u => /drilling|mud|slurry/i.test(u),
  'Septic & Cesspit Services': u => /septic|cesspit/i.test(u),
  'Flood Cleanup & Water Damage Control': u => /flood|damage/i.test(u),
  'Confined-Space Work & Rescue': u => /confined|rescue|space/i.test(u),
  'Construction & Event Site Cleaning': u =>
    /construction|event|festival|carpark/i.test(u),
  'Sanitising & Disinfecting': u =>
    /disinfect|sanitiz|clean/i.test(u) &&
    !/hydro|drain|pump|sweep|gully|tunnel/i.test(u),
  'Groundwater & Environmental Water Recycling': u =>
    /ground|environmental|water|recycl/i.test(u) &&
    !/sweep|waste|tank/i.test(u),
  'Tanker Hire & Bulk Logistics': u =>
    /tanker|bulk/i.test(u) && !/waste|sweep/i.test(u),
  'Commercial Bodywork & Fleet Services': u =>
    /bodywork|fleet|commercial|hcl/i.test(u) && !/waste|sweep|pump/i.test(u),
  'Waste Haulage & Logistics': u => /logistics|haulage/i.test(u),
  'UV Pipe Lining': u => /uv|lining/i.test(u),
  'Emergency Waste Removal': u => /emergency-waste-removal/i.test(u),
  'General Hydro-Cleansing Services': u => /hydro|cleansing/i.test(u),
};

// Add detailed FAQ Q&A based on user-provided categories
const faqs = {
  'Drain Unblocking & Jetting': [
    {
      question: 'What are the warning signs of a blocked drain?',
      answer:
        'Slow sinks, gurgling toilets, bad odours, or surface flooding mean a blockage is forming.',
    },
    {
      question: 'How fast can Hydro Cleansing attend?',
      answer:
        'We run a 24/7 control room and aim to be on-site within 60 minutes across London & the South-East.',
    },
    {
      question: 'What methods do you use to clear drains?',
      answer:
        'High-pressure water jetting, mechanical cutting, and vacuum extraction—safe for both clay and plastic pipes.',
    },
    {
      question: 'Will unblocking damage my pipework?',
      answer:
        'No. Our equipment is pressure-regulated and operated by trained engineers to prevent pipe erosion or cracks.',
    },
    {
      question: 'Can you provide a post-clearance report?',
      answer:
        'Yes, we can follow up with a CCTV survey and digital report showing the pipe condition.',
    },
    {
      question: 'Do you offer preventative maintenance?',
      answer:
        'We can schedule quarterly or annual cleans to keep commercial and domestic drains flowing freely.',
    },
  ],
  'CCTV Drain Surveys': [
    {
      question: 'Why would I need a CCTV survey?',
      answer:
        'To locate hidden defects, verify new pipework, or satisfy insurance/home-buyer requirements.',
    },
    {
      question: 'What technology do you use?',
      answer:
        'HD pan-and-tilt cameras with laser defect measurement and WinCan reporting software.',
    },
    {
      question: 'How long does a typical survey take?',
      answer:
        'A domestic line can be filmed in under an hour; larger networks may need half-day slots.',
    },
    {
      question: 'Do you map pipe depths and locations?',
      answer:
        'Yes. All surveys include on-screen distance counting and optional GPS-enabled mapping.',
    },
    {
      question: 'Will the survey disrupt my business?',
      answer:
        'Minimal—our units are self-contained and can work outside trading hours if required.',
    },
    {
      question: 'What format is the report delivered in?',
      answer:
        'PDF and MP4 video files, plus a WinCan XML archive if your engineer needs raw data.',
    },
  ],
  'Ultra-High-Pressure Water Jetting (UHPWJ)': [
    {
      question: 'What is UHPWJ?',
      answer:
        'Water delivered at 20,000–40,000 psi to remove concrete, tar, or heavy scale without chemicals.',
    },
    {
      question: 'Typical applications?',
      answer:
        'Tank cleaning, concrete scarification, graffiti removal, and bridge deck preparation.',
    },
    {
      question: 'Are your operators certified?',
      answer:
        'All engineers hold Water Jetting Association & City & Guilds UHP cards.',
    },
    {
      question: 'Is it environmentally safe?',
      answer:
        'Yes—no abrasive media or solvents; spent water is vacuum-recovered for recycling.',
    },
    {
      question: 'Can you work in confined spaces?',
      answer:
        'We combine UHP heads with breathing apparatus teams for safe confined-space work.',
    },
    {
      question: 'How do I book?',
      answer:
        "Call our specialist jetting line 24/7; we'll scope, quote, and mobilise the right unit.",
    },
  ],
  'Liquid Waste Disposal': [
    {
      question: 'What liquid wastes do you take?',
      answer:
        'Food waste, sludge, storm water, glycol, leachate, oily water, and general effluent.',
    },
    {
      question: 'Do you recycle the waste?',
      answer:
        'Up to 99 % is recycled at our on-site treatment plant; only residues go to approved facilities.',
    },
    {
      question: 'How is pricing calculated?',
      answer:
        'Based on volume, contamination level, and distance to our plant—quotes are free.',
    },
    {
      question: 'Can you collect outside business hours?',
      answer: 'Yes, night-time or weekend collections avoid site disruption.',
    },
    {
      question: 'Do you supply disposal certificates?',
      answer:
        'A digital Waste Transfer Note is emailed immediately after tipping.',
    },
    {
      question: 'What capacity do your tankers have?',
      answer:
        'From 3,000-litre urban units to 30,000-litre articulated tanks for bulk moves.',
    },
  ],
  'Hazardous Liquid Waste Disposal': [
    {
      question: 'What qualifies as hazardous liquid waste?',
      answer:
        'Acids, alkalis, solvents, oily sludges, contaminated firefighting water, and drill muds with heavy metals.',
    },
    {
      question: 'Are you licensed for ADR transport?',
      answer:
        'Yes. Drivers hold ADR & CPC, and vehicles carry full spill-response kits.',
    },
    {
      question: 'How do you ensure compliance?',
      answer:
        'Consignment notes, pre-acceptance analysis, and treatment at permitted facilities under ISO 14001.',
    },
    {
      question: 'Can you sample and classify unknown liquids?',
      answer:
        'Our chemists take site samples and run laboratory profiling within 24 hours.',
    },
    {
      question: 'Do you provide emergency response?',
      answer:
        '2-hour call-outs for spills, with containment booms and decontamination units.',
    },
    {
      question: 'What about tank cleaning after removal?',
      answer:
        'We can follow up with UHP jetting, gas-free certification, and entry permits.',
    },
  ],
  'Emergency Liquid & Bulk Storage': [
    {
      question: 'When would I need temporary liquid storage?',
      answer:
        'Planned plant shutdowns, flood events, fire-water retention, or sudden tank failure.',
    },
    {
      question: 'What capacities are available?',
      answer:
        'Frac tanks 25 m³, ISO tanks 30 m³, modular berms up to 1 million litres.',
    },
    {
      question: 'How quickly can you deliver?',
      answer: 'Units can be on the road within 4 hours of order confirmation.',
    },
    {
      question: 'Are the tanks clean and tested?',
      answer:
        'Each vessel is pressure-tested, inspected, and supplied with a cleanliness certificate.',
    },
    {
      question: 'Do you supply pumps and hoses?',
      answer:
        'Yes—diesel or electric transfer pumps, 2"–6" lay-flat, and Bauer fittings.',
    },
    {
      question: 'Is on-site staffing available?',
      answer:
        'We can station a technician 24/7 to monitor levels and transfers if required.',
    },
  ],
  'Interceptor Cleaning & Maintenance': [
    {
      question: 'Why clean an oil or fuel interceptor?',
      answer:
        'To prevent forecourt flooding, pollution incidents, and costly Environmental Agency fines.',
    },
    {
      question: 'How often should it be serviced?',
      answer: 'Every 6–12 months, or immediately after a major spill event.',
    },
    {
      question: "What's included in your service?",
      answer:
        'Waste removal, internal jet wash, filter change, integrity inspection, and compliance paperwork.',
    },
    {
      question: 'Can you install telemetry?',
      answer:
        'Yes, we fit level alarms that notify you when sludge reaches threshold.',
    },
    {
      question: 'Do you handle hydro-carbon digest additive dosing?',
      answer: 'We stock and dose bio-additives on request.',
    },
    {
      question: 'Will operations disrupt my site?',
      answer:
        'Access via low-profile hoses; fuel pumps remain open where safe.',
    },
  ],
  'Pump Station Services & Hire': [
    {
      question: 'What pump issues do you solve?',
      answer:
        'Ragging, impeller failure, level float faults, and station flooding.',
    },
    {
      question: 'Do you supply temporary over-pumping?',
      answer:
        'Trailer and skid pumps from 2" to 12" keep flow going while repairs happen.',
    },
    {
      question: 'Can you inspect electrical controls?',
      answer: 'Our NICEIC partners test panels, VSDs, and PLC logic.',
    },
    {
      question: 'How fast can you attend a failed pump?',
      answer: '2-hour emergency attendance with spares van and lifting gear.',
    },
    {
      question: 'Do you offer maintenance contracts?',
      answer:
        'Quarterly inspection plans include wet-well cleaning and condition reporting.',
    },
    {
      question: 'Are your teams confined-space trained?',
      answer: 'Yes—CSCS, City & Guilds, and rescue kit on every van.',
    },
  ],
  'Sewer & Tunnel Cleaning (Inc. Crossrail / Tideway)': [
    {
      question: 'What tunnels can you access?',
      answer:
        'Rail, road, utility, storm, and super-sewer tunnels up to 8 m diameter.',
    },
    {
      question: 'What equipment do you use underground?',
      answer:
        'Jet-vac tankers, mega-reel hose, vacuum conveyors, and ATEX lighting.',
    },
    {
      question: 'Is rail-possession work covered?',
      answer: 'Yes—PTS-certified crews and RISQS-audited procedures.',
    },
    {
      question: 'How do you dispose of tunnel waste?',
      answer:
        'Dewater, recycle silts at our plant, and issue full duty-of-care paperwork.',
    },
    {
      question: 'Can you handle hydrogen sulphide environments?',
      answer:
        'Gas monitoring and SCBA systems keep operatives safe in H₂S zones.',
    },
    {
      question: 'Do you assist with CCTV and asset mapping?',
      answer:
        'Robotic crawler cameras map condition after cleaning for client hand-over.',
    },
  ],
  'Road Sweeper Hire & Sweeper Waste': [
    {
      question: 'What sweepers do you supply?',
      answer:
        'Compact city sweepers to 8-wheel "Mega-Sweep" high-capacity units.',
    },
    {
      question: 'Are drivers qualified?',
      answer:
        'Each sweeper comes with an NVQ-qualified operator and FORS Gold fleet compliance.',
    },
    {
      question: 'Can I book ad-hoc or long-term?',
      answer: 'Yes—hourly call-outs or multi-month project rates.',
    },
    {
      question: 'Do you remove collected waste?',
      answer:
        'We tip and recycle the waste at our wet-waste plant—no third-party fees.',
    },
    {
      question: 'Is night-time sweeping available?',
      answer:
        '24/7 scheduling with amber beacons and white-noise reversing alarms.',
    },
    {
      question: 'Do you provide water suppression?',
      answer:
        'High-pressure spray bars suppress dust and improve pickup efficiency.',
    },
  ],
  'Gully Cleaning & Gully Gulper': [
    {
      question: 'Why clean road gullies?',
      answer:
        'Blocked gullies cause surface flooding, potholes, and pollution of watercourses.',
    },
    {
      question: 'How many gullies can you service per shift?',
      answer: 'Up to 150 standard kerb units with a two-man crew.',
    },
    {
      question: 'Do you log each gully?',
      answer:
        'GPS-tagged reports list silt depth, blockage cause, and maintenance recommendations.',
    },
    {
      question: 'Are traffic management services included?',
      answer: 'We supply Chapter 8 vans, cones, and laning if needed.',
    },
    {
      question: 'Can you clean deep road gully pots?',
      answer: 'Our extending boom and high-vac hoses reach depths over 4 m.',
    },
    {
      question: 'What happens to the gully waste?',
      answer:
        'Dewatered, screened, and recycled; metal debris is sent for recovery.',
    },
  ],
  'Digester & Anaerobic Tank Cleaning': [
    {
      question: 'Why clean a digester tank?',
      answer:
        'Grit and fibrous build-up reduce gas yield and can damage mixers.',
    },
    {
      question: 'How do you clean without taking it offline?',
      answer:
        'We offer no-entry desludging via suction cannons and recirculation loops.',
    },
    {
      question: 'Do you provide confined-space entry if needed?',
      answer:
        'Yes—full breathing apparatus and rescue cover for man-entry cleans.',
    },
    {
      question: 'How is biogas safety managed?',
      answer: 'Gas detectors, LEL monitors, and forced-air ventilation.',
    },
    {
      question: 'Can you test the tank integrity?',
      answer:
        'Ultrasound thickness checks and concrete crack mapping available.',
    },
    {
      question: 'What happens to removed sludge?',
      answer:
        'Transported in sealed ADR tankers to our treatment plant or licensed AD facilities.',
    },
  ],
  'Drilling Slurry & Mud Disposal': [
    {
      question: 'What drilling wastes can you take?',
      answer:
        'Bentonite slurry, polymer muds, cement returns, and tunnel-boring filtrate.',
    },
    {
      question: 'Do you offer on-site storage tanks?',
      answer:
        '30 m³ frac tanks and geotextile dewatering bags for continuous drilling.',
    },
    {
      question: 'How fast can you remove full tanks?',
      answer: 'Same-day swap-outs to keep rigs operating 24/7.',
    },
    {
      question: 'Are solids separated?',
      answer:
        'We screen, centrifuge, and recycle water back to clients where feasible.',
    },
    {
      question: 'Do you comply with British Drilling Association guidance?',
      answer:
        'Yes—waste codes, WAC testing, and duty-of-care paperwork supplied.',
    },
    {
      question: 'Can you service offshore frack sites?',
      answer:
        'ADR marine tankers and P&I-insured crews are available for coastal projects.',
    },
  ],
  'Septic & Cesspit Services': [
    {
      question: 'How often should a septic tank be emptied?',
      answer:
        'Typically every 6–12 months, depending on household size and usage.',
    },
    {
      question: 'What areas do you cover?',
      answer:
        'UK-wide for scheduled empties; same-day emergency call-outs in the South-East.',
    },
    {
      question: 'Do you inspect for defects?',
      answer:
        'We check baffles, T-pipes, and soakaway performance at each visit.',
    },
    {
      question: 'Can you install new systems?',
      answer:
        'We design and fit EN-12566-1 certified tanks and drainage fields.',
    },
    {
      question: 'Is odour control provided?',
      answer: 'Biological dosing blocks minimise smells between visits.',
    },
    {
      question: 'Do you issue compliance paperwork?',
      answer: 'A Waste Transfer Note and service record are emailed instantly.',
    },
  ],
  'Flood Cleanup & Water Damage Control': [
    {
      question: 'What emergency flood services do you offer?',
      answer:
        'Water extraction, silt removal, sanitising, and temporary pump installations.',
    },
    {
      question: 'How soon can you mobilise?',
      answer:
        '24/7 crews reach most London sites within 60 minutes during severe weather.',
    },
    {
      question: 'Do you liaise with insurers?',
      answer:
        'We supply moisture readings, photos, and cost breakdowns to speed claims.',
    },
    {
      question: 'Can you dry buildings after pumping out?',
      answer: 'Yes—desiccant dryers and HEPA air scrubbers stop mould growth.',
    },
    {
      question: 'Is contaminated water treated?',
      answer:
        'Polluted run-off is transported to our licensed treatment plant.',
    },
    {
      question: 'Do you prevent re-flooding?',
      answer:
        'We install non-return valves, backflow pumps, and offer gully cleansing.',
    },
  ],
  'Confined-Space Work & Rescue': [
    {
      question: 'What qualifies as a confined space?',
      answer:
        'Any area with restricted entry and potential hazardous atmosphere—tanks, sewers, culverts.',
    },
    {
      question: 'Are your teams City & Guilds trained?',
      answer: 'Yes, with rescue level 3 certification and rope access skills.',
    },
    {
      question: 'What equipment is provided?',
      answer:
        'Tripods, winches, SCBA sets, gas monitors, escape sets, and rescue stretchers.',
    },
    {
      question: 'Can you act as a stand-by rescue crew?',
      answer: 'We supply full rescue cover for third-party contractors.',
    },
    {
      question: 'Do you draft rescue plans?',
      answer:
        'Site-specific risk assessments and method statements precede every entry.',
    },
    {
      question: 'How do you handle emergency extraction?',
      answer:
        'Anti-entanglement harnesses and continuous atmospheric monitoring ensure quick retrieval.',
    },
  ],
  'Construction & Event Site Cleaning': [
    {
      question: 'What services are available?',
      answer:
        'Road sweeping, litter picking, wet waste removal, and portable water supply.',
    },
    {
      question: 'Can you work to CDM regulations?',
      answer: 'Our site supervisors hold SMSTS/SSSTS and handle CDM paperwork.',
    },
    {
      question: 'Is night work possible?',
      answer:
        'Yes, reducing disruption to event guests or daytime site traffic.',
    },
    {
      question: 'Do you recycle site waste?',
      answer:
        'Segregated recycling, skips, and recycling certificates provided.',
    },
    {
      question: 'Are vehicles ULEZ compliant?',
      answer: 'Entire fleet meets London LEZ and FORS Gold standards.',
    },
    {
      question: 'Can you scale for large festivals?',
      answer:
        'Up to 10 sweepers, tankers, and 30 operatives available for major events.',
    },
  ],
  'Sanitising & Disinfecting': [
    {
      question: 'What pathogens can you target?',
      answer:
        'Bacteria, viruses (incl. COVID-19), mould, and bio-film build-up.',
    },
    {
      question: 'What chemicals do you use?',
      answer: 'EN14476-approved virucidal agents and food-safe biocides.',
    },
    {
      question: 'Is fogging or manual wipe better?',
      answer:
        'We assess site size; fogging covers large volumes quickly, wipes suit touchpoints.',
    },
    {
      question: 'How long before areas can reopen?',
      answer:
        'Typically 30 minutes after ventilation, depending on agent used.',
    },
    {
      question: 'Do you provide certificates?',
      answer:
        'A disinfection certificate with COSHH sheets is issued post-service.',
    },
    {
      question: 'Can you include drain hygiene?',
      answer: 'Yes—bio-enzymatic dosing keeps pipework odour-free and flowing.',
    },
  ],
  'Groundwater & Environmental Water Recycling': [
    {
      question: 'What is groundwater control?',
      answer:
        'Pumping or treating subsurface water to protect excavations and basements.',
    },
    {
      question: 'Do you offer treatment systems?',
      answer:
        'Carbon filters, lamella settlers, and pH correction for discharge compliance.',
    },
    {
      question: 'Can water be reused on site?',
      answer:
        'We set up closed-loop systems for dust suppression and concrete batching.',
    },
    {
      question: 'What permits are required?',
      answer:
        'We assist with Environment Agency discharge consents and sampling.',
    },
    {
      question: 'How is sludge handled?',
      answer:
        'Dewatered and recycled at our facility; solids sent to licensed landfill.',
    },
    {
      question: 'Do you monitor water quality?',
      answer: 'Real-time turbidity and pH data logging with cloud dashboards.',
    },
  ],
  'Tanker Hire & Bulk Logistics': [
    {
      question: 'What tanker types are available?',
      answer: 'Vacuum, jet-vac, ADR chemical, and stainless food-grade.',
    },
    {
      question: 'Is short-term hire possible?',
      answer: 'From a single day to multi-year leases with or without driver.',
    },
    {
      question: 'Do you track tankers?',
      answer: 'Live GPS tracking and telematics data accessible to clients.',
    },
    {
      question: 'Can you supply drivers only?',
      answer: 'Yes—CPC, ADR, and FORS-trained personnel for your own fleet.',
    },
    {
      question: 'Are maintenance services included?',
      answer: 'Full R&M packages or customer-maintained options.',
    },
    {
      question: 'What capacity do they cover?',
      answer: '3 m³ micro tankers to 30 m³ articulated ADR units.',
    },
  ],
  'Commercial Bodywork & Fleet Services': [
    {
      question: 'What vehicle bodywork do you build?',
      answer:
        'Jet-vac tankers, sweepers, combination units, and bespoke vacuum rigs.',
    },
    {
      question: 'Are bodies built in-house?',
      answer:
        'Yes—fabrication, hydraulics, paint, and livery all under one roof.',
    },
    {
      question: 'Can you refurbish existing tanks?',
      answer: 'Sand-blast, re-plate, and re-certify to extend service life.',
    },
    {
      question: 'Do builds meet FORS/CLOCS?',
      answer: 'Side-scan, 360° cameras, and guard rails fitted as standard.',
    },
    {
      question: "What's the lead time?",
      answer: 'Typically 12–16 weeks, subject to chassis availability.',
    },
    {
      question: 'Do you offer finance or lease?',
      answer: 'Flexible lease-purchase and hire options through HCL Fleet.',
    },
  ],
  'Waste Haulage & Logistics': [
    {
      question: 'Do you handle multi-site waste contracts?',
      answer: 'Yes—national collections with single monthly reporting.',
    },
    {
      question: 'What fleet accreditations do you hold?',
      answer: 'FORS Gold, DVS 5-star, and Earned Recognition.',
    },
    {
      question: 'Can you provide skip & roll-on roll-off bins?',
      answer: '8-yd to 40-yd plus live-load articulated walking-floors.',
    },
    {
      question: 'How do you track carbon footprint?',
      answer: 'Fleet telematics and DEFRA conversion factors on every invoice.',
    },
    {
      question: 'Is hazardous and non-hazardous waste segregated?',
      answer: 'Dedicated ADR units keep waste streams compliant.',
    },
    {
      question: 'Do you offer on-site logistics staff?',
      answer: 'Yes—contract managers embed with clients for large projects.',
    },
  ],
  'UV Pipe Lining': [
    {
      question: 'What is UV lining?',
      answer:
        'Installing a resin-impregnated liner cured with ultraviolet light to form a new pipe inside the old.',
    },
    {
      question: 'Advantages over hot-cure?',
      answer:
        'Faster cure (minutes not hours), no steam emissions, and higher final strength.',
    },
    {
      question: 'Pipe sizes you can line?',
      answer: '150 mm to 1,200 mm diameter, circular or egg-shaped.',
    },
    {
      question: 'Is excavation needed?',
      answer: 'Usually no—liners are winched from existing manholes.',
    },
    {
      question: 'How long will the liner last?',
      answer: '50-year design life, certified to WRc standards.',
    },
    {
      question: 'Can flow be maintained during lining?',
      answer: 'We set up over-pumping to keep customers in service.',
    },
  ],
  'Emergency Waste Removal': [
    {
      question: 'What incidents qualify as an emergency?',
      answer:
        'Chemical spills, tanker overturns, blocked sewers, or flood-damaged waste stores.',
    },
    {
      question: 'Response time?',
      answer: 'Crews on the road within 2 hours—24/7/365.',
    },
    {
      question: 'Do you liaise with regulators?',
      answer: 'We handle EA notifications, sampling, and incident reports.',
    },
    {
      question: 'How is waste contained on site?',
      answer:
        'Inflatable booms, over-pack drums, and vacuum recovery limit spread.',
    },
    {
      question: 'Where is the waste taken?',
      answer:
        'To our licensed treatment facility or specialist disposal partners.',
    },
    {
      question: 'Will you restore the area?',
      answer:
        'Full clean-down, surface testing, and "all-clear" documentation provided.',
    },
  ],
  'General Hydro-Cleansing Services': [
    {
      question: 'What services does Hydro-Cleansing offer?',
      answer:
        'We provide a comprehensive range of environmental services including drain unblocking, liquid waste disposal, CCTV surveys, pump maintenance, road sweeping, and emergency response across London and the Southeast.',
    },
    {
      question: 'Do you operate 24/7?',
      answer:
        'Yes, our control room and emergency response teams operate round-the-clock, 365 days a year, to handle both scheduled maintenance and urgent callouts.',
    },
    {
      question: 'What areas do you cover?',
      answer:
        'We primarily serve London, Surrey, Kent, Essex, and the Southeast, but can arrange nationwide service for large commercial contracts.',
    },
    {
      question: 'How quickly can you respond to emergencies?',
      answer:
        'Our teams aim to be on-site within 60 minutes for most London locations and within 2 hours across the wider Southeast region.',
    },
    {
      question: 'What environmental certifications do you hold?',
      answer:
        'We operate under ISO 14001 Environmental Management, ISO 9001 Quality Management, and maintain all relevant waste carrier and treatment permits.',
    },
    {
      question: 'How can I request a quote?',
      answer:
        'Call our customer service team at 0800 740 8888 or complete our online enquiry form for a detailed, no-obligation quote tailored to your specific requirements.',
    },
  ],
};

// Loop through each URL and display its related FAQs
for (const url of urls) {
  console.log(`URL: ${url}`);
  const category =
    Object.keys(categories).find(cat => categories[cat](url)) ||
    'General Hydro-Cleansing Services'; // Default to General category instead of (no category)
  console.log(`Category: ${category}`);
  const items = faqs[category] || [];
  if (!items.length) {
    console.log('  (no FAQs)');
  } else {
    items.forEach((item, idx) => {
      console.log(`  ${idx + 1}. ${item.question} - ${item.answer}`);
    });
  }
  console.log('');
}
