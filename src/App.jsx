import { useState, useEffect } from "react";
import ThreeDBackground from "./ThreeDBackground";

/* ══════════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════════ */
const T = {
  bg:      "#110D0C",
  surface: "#1A1412",
  surf2:   "#241C1A",
  border:  "rgba(230,95,44,0.1)",
  orange:  "#E65F2C",
  gold:    "#EAB308",
  green:   "#10B981",
  red:     "#EF4444",
  blue:    "#3B82F6",
  white:   "#FDFBF7",
  grey:    "#8E7C77",
  grey2:   "#C4B5B1",
};

/* ══════════════════════════════════════════════════════
   STYLE HELPERS
══════════════════════════════════════════════════════ */
const baseInput = {
  width: "100%", background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
  padding: "12px 16px", color: T.white, fontSize: 15, outline: "none",
  boxSizing: "border-box", fontFamily: "Inter, sans-serif", transition: "border-color 0.2s",
};

const primaryBtn = {
  background: `linear-gradient(135deg, ${T.orange}, ${T.gold})`, color: "#fff",
  border: "none", borderRadius: 12, padding: "14px 32px", fontWeight: 700,
  fontSize: 15, cursor: "pointer", fontFamily: "Inter, sans-serif",
  boxShadow: `0 6px 28px rgba(34, 211, 238, 0.25)`,
};

const ghostBtn = {
  background: "transparent", color: T.grey2,
  border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12,
  padding: "12px 24px", fontWeight: 600, cursor: "pointer",
  fontFamily: "Inter, sans-serif", fontSize: 14,
};

const card = {
  background: T.surface, border: `1px solid ${T.border}`,
  borderRadius: 20, padding: 28,
};

/* ══════════════════════════════════════════════════════
   ATOMIC COMPONENTS
══════════════════════════════════════════════════════ */
function TInput({ value, onChange, placeholder, type = "text" }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      className="input-3d"
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...baseInput, borderColor: focus ? T.orange : "rgba(255,255,255,0.1)" }}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
    />
  );
}

function SInput({ value, onChange, options, placeholder = "-- Select --" }) {
  return (
    <select className="input-3d" value={value} onChange={e => onChange(e.target.value)}
      style={{ ...baseInput, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}>
      <option value="" style={{ background: T.surface, color: T.white }}>{placeholder}</option>
      {options.map(o => (
        <option key={o.value || o} value={o.value || o} style={{ background: T.surface, color: T.white }}>
          {o.label || o}
        </option>
      ))}
    </select>
  );
}

function CheckGroup({ options, selected, onChange }) {
  const toggle = v => onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 10 }}>
      {options.map(o => {
        const on = selected.includes(o);
        return (
          <label key={o} className="choice-chip" style={{
            display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
            background: on ? `${T.orange}18` : "rgba(255,255,255,0.025)",
            border: `1px solid ${on ? T.orange : "rgba(255,255,255,0.08)"}`,
            borderRadius: 10, cursor: "pointer", fontSize: 14,
            color: on ? T.white : T.grey, fontWeight: on ? 600 : 400, transition: "all 0.18s",
          }}>
            <input type="checkbox" checked={on} onChange={() => toggle(o)}
              style={{ accentColor: T.orange, margin: 0, flexShrink: 0 }} />
            {o}
          </label>
        );
      })}
    </div>
  );
}

function FieldBox({ label, required, hint, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: "block", color: T.white, fontWeight: 600, marginBottom: hint ? 4 : 8, fontSize: 14 }}>
        {label}{required && <span style={{ color: T.orange }}> *</span>}
      </label>
      {hint && <div style={{ color: T.grey, fontSize: 12, marginBottom: 8 }}>{hint}</div>}
      {children}
    </div>
  );
}

function Tag({ children, color = T.orange }) {
  return (
    <span style={{
      background: `${color}18`, color, border: `1px solid ${color}30`,
      borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600,
    }}>{children}</span>
  );
}

/* ══════════════════════════════════════════════════════
   FORM STEPS
══════════════════════════════════════════════════════ */
function StepA({ d, s }) {
  const u = k => v => s({ ...d, [k]: v });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0 24px" }}>
      <FieldBox label="Restaurant Name" required>
        <TInput value={d.restaurantName} onChange={u("restaurantName")} placeholder="e.g. Karachi Biryani House" />
      </FieldBox>
      <FieldBox label="Owner Name" required>
        <TInput value={d.ownerName} onChange={u("ownerName")} placeholder="Your full name" />
      </FieldBox>
      <FieldBox label="Phone Number" required>
        <TInput value={d.phone} onChange={u("phone")} placeholder="+92 300 1234567" />
      </FieldBox>
      <FieldBox label="WhatsApp Number">
        <TInput value={d.whatsapp} onChange={u("whatsapp")} placeholder="+92 300 1234567" />
      </FieldBox>
      <FieldBox label="Email Address" required>
        <TInput value={d.email} onChange={u("email")} type="email" placeholder="you@restaurant.com" />
      </FieldBox>
      <FieldBox label="City" required>
        <TInput value={d.city} onChange={u("city")} placeholder="e.g. Karachi, Lahore, Islamabad" />
      </FieldBox>
      <FieldBox label="Number of Branches">
        <SInput value={d.branches} onChange={u("branches")} options={[
          { value: "1", label: "1 Branch" }, { value: "2-5", label: "2–5 Branches" },
          { value: "6-10", label: "6–10 Branches" }, { value: "10+", label: "10+ Branches" },
        ]} />
      </FieldBox>
      <FieldBox label="Restaurant Type" required>
        <SInput value={d.restaurantType} onChange={u("restaurantType")} options={[
          { value: "Fast Food", label: "🍔 Fast Food" }, { value: "Cafe", label: "☕ Cafe" },
          { value: "Fine Dining", label: "🍽️ Fine Dining" }, { value: "Bakery", label: "🥐 Bakery" },
          { value: "Other", label: "🍴 Other" },
        ]} />
      </FieldBox>
      {d.restaurantType === "Other" && (
        <div style={{ gridColumn: "1 / -1", marginTop: "-12px", marginBottom: "12px" }}>
          <FieldBox label="Specify Restaurant Type" required>
            <TInput value={d.customRestaurantType || ""} onChange={u("customRestaurantType")} placeholder="e.g. Cloud Kitchen, Food Truck, etc." />
          </FieldBox>
        </div>
      )}
    </div>
  );
}

function StepB({ d, s }) {
  const u = k => v => s({ ...d, [k]: v });
  return (
    <>
      <FieldBox label="Daily Orders" required>
        <SInput value={d.dailyOrders} onChange={u("dailyOrders")} options={[
          { value: "Less than 50/day", label: "Less than 50 orders/day" },
          { value: "50–100/day", label: "50–100 orders/day" },
          { value: "100–300/day", label: "100–300 orders/day" },
          { value: "300+/day", label: "300+ orders/day" },
        ]} />
      </FieldBox>
      <FieldBox label="Monthly Revenue Range">
        <SInput value={d.monthlyRevenue} onChange={u("monthlyRevenue")} options={[
          { value: "Under 500k PKR", label: "Under 500,000 PKR / month" },
          { value: "500k–1.5m PKR", label: "500,000 – 1,500,000 PKR / month" },
          { value: "1.5m–3m PKR", label: "1,500,000 – 3,000,000 PKR / month" },
          { value: "3m+ PKR", label: "3,000,000+ PKR / month" },
          { value: "Custom", label: "Custom Amount (Enter manually)..." },
        ]} />
      </FieldBox>
      {d.monthlyRevenue === "Custom" && (
        <div style={{ marginTop: "-12px", marginBottom: "12px" }}>
          <FieldBox label="Enter Custom Monthly Revenue" required>
            <TInput value={d.customMonthlyRevenue || ""} onChange={u("customMonthlyRevenue")} placeholder="e.g. 750,000 PKR or $4,000" />
          </FieldBox>
        </div>
      )}
      <FieldBox label="Number of Employees">
        <SInput value={d.employees} onChange={u("employees")} options={[
          { value: "1–5", label: "1–5 Employees" }, { value: "6–15", label: "6–15 Employees" },
          { value: "16–30", label: "16–30 Employees" }, { value: "30+", label: "30+ Employees" },
        ]} />
      </FieldBox>
      <FieldBox label="Working Hours">
        <SInput value={d.workingHours} onChange={u("workingHours")} options={[
          { value: "8–12 hrs/day", label: "8–12 Hours/day" },
          { value: "12–16 hrs/day", label: "12–16 Hours/day" },
          { value: "16–20 hrs/day", label: "16–20 Hours/day" },
          { value: "24/7", label: "24/7 (Always Open)" },
        ]} />
      </FieldBox>
    </>
  );
}

function StepC({ d, s }) {
  return (
    <FieldBox label="How do customers contact you?" required hint="Select all that apply">
      <CheckGroup
        options={["WhatsApp", "Phone Calls", "Instagram", "Facebook", "Website"]}
        selected={d.contactChannels}
        onChange={v => s({ ...d, contactChannels: v })}
      />
    </FieldBox>
  );
}

function StepD({ d, s }) {
  const u = k => v => s({ ...d, [k]: v });
  return (
    <>
      <FieldBox label="What are your biggest challenges?" required hint="Select all that apply">
        <CheckGroup
          options={["Missed Calls", "Slow Responses", "Lost Orders", "Customer Complaints",
            "High Staff Cost", "Reservation Management", "Menu Questions", "Other"]}
          selected={d.challenges}
          onChange={v => s({ ...d, challenges: v })}
        />
      </FieldBox>
      {d.challenges.includes("Other") && (
        <div style={{ marginTop: "-12px", marginBottom: "12px" }}>
          <FieldBox label="Specify Other Challenge(s)" required>
            <TInput value={d.customChallenge || ""} onChange={u("customChallenge")} placeholder="e.g. Bad delivery service, inventory errors, etc." />
          </FieldBox>
        </div>
      )}
    </>
  );
}

function StepE({ d, s }) {
  const u = k => v => s({ ...d, [k]: v });
  return (
    <>
      <FieldBox label="Monthly Budget for AI Automation" required>
        <SInput value={d.budget} onChange={u("budget")} options={[
          { value: "Under $50/mo", label: "Under $50 / month" },
          { value: "$50–$100/mo", label: "$50 – $100 / month" },
          { value: "$100–$300/mo", label: "$100 – $300 / month" },
          { value: "$300+/mo", label: "$300+ / month" },
          { value: "Custom", label: "Custom Budget (Enter manually)..." },
        ]} />
      </FieldBox>
      {d.budget === "Custom" && (
        <div style={{ marginTop: "-12px", marginBottom: "12px" }}>
          <FieldBox label="Enter Custom Monthly Budget" required>
            <TInput value={d.customBudget || ""} onChange={u("customBudget")} placeholder="e.g. 50,000 PKR or $150" />
          </FieldBox>
        </div>
      )}
      <FieldBox label="AI Languages Needed" hint="Select all that apply">
        <CheckGroup
          options={["Urdu", "English", "Arabic", "Mixed (Urdu + English)"]}
          selected={d.languages} onChange={v => s({ ...d, languages: v })}
        />
      </FieldBox>
      <FieldBox label="Tools You Currently Use" hint="Select all that apply">
        <CheckGroup
          options={["WhatsApp Business", "FoodPanda", "POS System", "Website", "Instagram"]}
          selected={d.integrations} onChange={v => s({ ...d, integrations: v })}
        />
      </FieldBox>
      <FieldBox label="Digital Menu Availability">
        <SInput value={d.menuType} onChange={u("menuType")} options={[
          { value: "PDF Menu", label: "📄 PDF Menu" },
          { value: "Website Menu", label: "🌐 Website Menu" },
          { value: "Menu Images", label: "🖼️ Menu Images" },
          { value: "None", label: "❌ No Digital Menu Yet" },
        ]} />
      </FieldBox>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════════════ */
function Landing({ onStart, onAdmin }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const benefits = [
    { icon: "🤖", title: "24/7 Customer Support", desc: "Your AI handles every query round the clock — no breaks, no missed messages, ever." },
    { icon: "💬", title: "WhatsApp Order Taking", desc: "Customers order directly via WhatsApp with automatic confirmation, upsells & tracking." },
    { icon: "📅", title: "Reservation Management", desc: "Smart booking system that prevents conflicts and sends automatic reminders." },
    { icon: "📞", title: "Call Handling", desc: "AI answers calls, handles FAQs instantly, and routes complex cases to your team." },
  ];
  const metrics = [
    { val: "40%", label: "Faster Responses" },
    { val: "25%", label: "More Orders" },
    { val: "60%", label: "Fewer Missed Calls" },
    { val: "10hrs", label: "Saved Per Week" },
  ];

  return (
    <div className="page-shell" style={{ minHeight: "100vh", background: "transparent", color: T.white, fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <nav className="nav-shell" style={{
        padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 0,
        background: "rgba(10, 20, 40, 0.72)", backdropFilter: "blur(16px)", zIndex: 100,
      }}>
        <div className="logo-container">
          <span className="logo-emoji">🍽️</span>
          <span className="logo-text">
            <span style={{ color: T.orange }}>Restaurant</span>AI
          </span>
        </div>
        <button onClick={onAdmin} style={{ ...ghostBtn, padding: "8px 18px", fontSize: 13 }}>
          Admin →
        </button>
      </nav>

      {/* Hero */}
      <div className="hero-shell" style={{ textAlign: "center", padding: "88px 24px 64px", maxWidth: 860, margin: "0 auto" }}>
        <div className="orb one" />
        <div className="orb two" />
        <div className="badge-pill" style={{
          display: "inline-block", background: `${T.orange}18`, border: `1px solid ${T.orange}30`,
          color: T.orange, borderRadius: 24, padding: "5px 20px", fontSize: 12,
          fontWeight: 700, marginBottom: 28, letterSpacing: 1, textTransform: "uppercase",
        }}>
          ✨ AI-Powered Restaurant Automation
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 900, margin: "0 0 24px",
          lineHeight: 1.1, letterSpacing: -1.5,
        }}>
          Get Your Restaurant<br />
          <span style={{
            background: `linear-gradient(135deg, ${T.orange} 20%, ${T.gold})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>AI Assistant</span>{" "}in 5 Minutes
        </h1>
        <p style={{ color: T.grey2, fontSize: "clamp(15px, 2vw, 18px)", maxWidth: 580, margin: "0 auto 44px", lineHeight: 1.8 }}>
          Answer a few quick questions. Our AI will analyze your restaurant, find automation opportunities, and recommend the perfect solution — free.
        </p>
        <button className="btn-3d" onClick={onStart} style={{ ...primaryBtn, padding: "18px 52px", fontSize: 17, borderRadius: 14 }}>
          Start Free Assessment 🚀
        </button>
        <div style={{ color: T.grey2, fontSize: 13, marginTop: 18, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          <span>✓ Takes 5 minutes</span>
          <span>✓ Completely free</span>
          <span>✓ No credit card required</span>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", maxWidth: 680, margin: "0 auto 80px", padding: "0 24px", gap: 2 }}>
        {metrics.map((m, i) => (
          <div key={i} className="glass-card stat-card" style={{
            textAlign: "center", padding: "26px 16px",
            background: i % 2 === 0 ? "rgba(16, 38, 58, 0.6)" : "rgba(24, 52, 77, 0.6)",
            borderRadius: i === 0 ? "14px 0 0 14px" : i === metrics.length - 1 ? "0 14px 14px 0" : 0,
          }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: T.orange, letterSpacing: -1 }}>{m.val}</div>
            <div style={{ color: T.grey2, fontSize: 12, marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, marginBottom: 48, letterSpacing: -0.5 }}>
          What Your AI Assistant Handles
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {benefits.map((b, i) => (
            <div key={i} className="glass-card" style={{ ...card, background: "rgba(16, 38, 58, 0.45)", border: `1px solid rgba(34, 211, 238, 0.12)`, transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${T.orange}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.12)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: 38, marginBottom: 16 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{b.title}</div>
              <div style={{ color: T.grey2, fontSize: 14, lineHeight: 1.7 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: "rgba(16, 38, 58, 0.35)", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "64px 24px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 800, marginBottom: 48, letterSpacing: -0.5 }}>
            How It Works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
            {[
              { step: "01", icon: "📋", title: "Fill the Form", desc: "5-minute questionnaire about your restaurant" },
              { step: "02", icon: "🤖", title: "AI Analyzes", desc: "Our AI reviews your data instantly" },
              { step: "03", icon: "📊", title: "Get Your Score", desc: "Receive your AI Readiness Score" },
              { step: "04", icon: "🚀", title: "We Build It", desc: "Custom AI agent built for your restaurant" },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{ padding: "24px 20px", position: "relative", background: "rgba(16, 38, 58, 0.55)" }}>
                <div style={{ fontSize: 10, color: T.orange, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: T.grey2, fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Bottom CTA */}
      <div style={{ textAlign: "center", padding: "72px 24px 80px" }}>
        <h3 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: 16, letterSpacing: -0.5 }}>
          Ready to Automate Your Restaurant?
        </h3>
        <p style={{ color: T.grey2, marginBottom: 32, fontSize: 15 }}>Join 100+ restaurants already powered by AI</p>
        <button className="btn-3d" onClick={onStart} style={{ ...primaryBtn, fontSize: 17, padding: "18px 52px", borderRadius: 14 }}>
          Get My Free AI Assessment →
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FORM PAGE
══════════════════════════════════════════════════════ */
const STEPS_META = [
  { id: "A", label: "Business Info", icon: "🏪" },
  { id: "B", label: "Operations", icon: "📊" },
  { id: "C", label: "Communication", icon: "💬" },
  { id: "D", label: "Pain Points", icon: "⚠️" },
  { id: "E", label: "Additional", icon: "➕" },
];

const INIT = {
  restaurantName: "", ownerName: "", phone: "", whatsapp: "", email: "",
  city: "", branches: "", restaurantType: "", customRestaurantType: "",
  dailyOrders: "", monthlyRevenue: "", customMonthlyRevenue: "", employees: "", workingHours: "",
  contactChannels: [], challenges: [], customChallenge: "",
  budget: "", customBudget: "", languages: [], integrations: [], menuType: "",
};

function FormPage({ onSubmit, onBack }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState(INIT);

  const valid = () => {
    if (step === 0) return d.restaurantName && d.ownerName && d.phone && d.email && d.city && d.restaurantType && (d.restaurantType !== "Other" || d.customRestaurantType);
    if (step === 1) return !!d.dailyOrders && (d.monthlyRevenue !== "Custom" || d.customMonthlyRevenue);
    if (step === 2) return d.contactChannels.length > 0;
    if (step === 3) return d.challenges.length > 0 && (!d.challenges.includes("Other") || d.customChallenge);
    if (step === 4) return d.budget && (d.budget !== "Custom" || d.customBudget);
    return true;
  };

  const stepContent = [
    <StepA d={d} s={setD} key="a" />,
    <StepB d={d} s={setD} key="b" />,
    <StepC d={d} s={setD} key="c" />,
    <StepD d={d} s={setD} key="d" />,
    <StepE d={d} s={setD} key="e" />,
  ];

  const pct = Math.round(((step + 1) / STEPS_META.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "transparent", color: T.white, fontFamily: "Inter, sans-serif", padding: "20px 16px" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, paddingTop: 8 }}>
          <button className="btn-3d btn-ghost" onClick={onBack} style={ghostBtn}>← Back</button>
          <div style={{ fontWeight: 800, color: T.white, fontSize: 17 }}>
            <span style={{ color: T.orange }}>🍽️</span> AI Discovery Form
          </div>
        </div>

        {/* Step pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
          {STEPS_META.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
              background: i < step ? `${T.green}18` : i === step ? `${T.orange}18` : "rgba(255,255,255,0.03)",
              border: `1px solid ${i < step ? T.green : i === step ? T.orange : "rgba(255,255,255,0.07)"}`,
              borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
              color: i < step ? T.green : i === step ? T.orange : T.grey,
            }}>
              <span>{i < step ? "✓" : s.icon}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="progress-bar" style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginBottom: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${T.orange}, ${T.gold})`, borderRadius: 2, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.grey, marginBottom: 28 }}>
          <span>Step {step + 1} of {STEPS_META.length}</span>
          <span style={{ color: T.orange, fontWeight: 600 }}>{pct}% Complete</span>
        </div>

        {/* Form card */}
        <div className="glass-card" style={{ ...card, border: `1px solid rgba(255,107,53,0.2)`, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${T.border}` }}>
            <div style={{
              width: 54, height: 54, borderRadius: 14, flexShrink: 0,
              background: `${T.orange}18`, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 24,
            }}>
              {STEPS_META[step].icon}
            </div>
            <div>
              <div style={{ fontSize: 10, color: T.orange, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>
                Section {STEPS_META[step].id}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.3 }}>{STEPS_META[step].label}</div>
            </div>
          </div>
          {stepContent[step]}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <button className="btn-3d btn-ghost" onClick={() => step > 0 && setStep(s => s - 1)} disabled={step === 0}
            style={{ ...ghostBtn, opacity: step === 0 ? 0.3 : 1 }}>
            ← Previous
          </button>
          <button className="btn-3d" onClick={() => step < 4 ? setStep(s => s + 1) : onSubmit(d)}
            disabled={!valid()}
            style={{ ...primaryBtn, opacity: valid() ? 1 : 0.4, transition: "opacity 0.2s" }}>
            {step === 4 ? "🚀 Analyze My Restaurant" : "Next Step →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LOADING PAGE
══════════════════════════════════════════════════════ */
function LoadingPage() {
  const [tick, setTick] = useState(0);
  const msgs = [
    "Analyzing your restaurant profile...",
    "Identifying automation opportunities...",
    "Calculating AI readiness score...",
    "Generating personalized recommendations...",
    "Compiling your report...",
  ];
  useEffect(() => {
    const t = setInterval(() => setTick(x => Math.min(x + 1, msgs.length - 1)), 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "transparent", color: T.white, fontFamily: "Inter, sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ textAlign: "center", maxWidth: 460, padding: "24px 24px" }}>
        <div style={{ fontSize: 60, marginBottom: 24, display: "inline-block", animation: "spin 3s linear infinite" }}>🤖</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, letterSpacing: -0.5 }}>AI is Analyzing...</h2>
        <p style={{ color: T.grey2, marginBottom: 40, fontSize: 14 }}>Usually takes 10–20 seconds</p>
        <div>
          {msgs.map((m, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", marginBottom: 8,
              background: i < tick ? `${T.green}10` : i === tick ? `${T.orange}12` : "rgba(255,255,255,0.02)",
              border: `1px solid ${i < tick ? T.green + "25" : i === tick ? T.orange + "30" : "transparent"}`,
              borderRadius: 12, opacity: i > tick + 1 ? 0.2 : 1, transition: "all 0.5s",
            }}>
              <span style={{ fontSize: 18, minWidth: 24, textAlign: "center" }}>
                {i < tick ? "✅" : i === tick ? "⚡" : "○"}
              </span>
              <span style={{ fontSize: 14, color: i <= tick ? T.white : T.grey }}>{m}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   RESULT PAGE
══════════════════════════════════════════════════════ */
function ResultPage({ result, formData, onReset }) {
  const score = result.aiReadinessScore || 70;
  const [animScore, setAnimScore] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimScore(score), 200);
    return () => clearTimeout(t);
  }, [score]);

  const cat = result.leadCategory || "Warm";
  const catColor = { Hot: T.red, Warm: T.gold, Cold: T.blue }[cat] || T.gold;
  const catEmoji = { Hot: "🔥", Warm: "⚡", Cold: "❄️" }[cat] || "⚡";

  return (
    <div style={{ minHeight: "100vh", background: "transparent", color: T.white, fontFamily: "Inter, sans-serif", padding: "20px 16px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", padding: "44px 0 36px" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🎯</div>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 900, marginBottom: 8, letterSpacing: -0.5 }}>
            Analysis Complete!
          </h1>
          <p style={{ color: T.grey2, fontSize: 15 }}>
            Personalized AI recommendation for{" "}
            <strong style={{ color: T.white }}>{formData?.restaurantName}</strong>
          </p>
        </div>

        {/* Score Card */}
        <div style={{ ...card, background: "rgba(16, 38, 58, 0.45)", border: `1px solid ${T.orange}35`, marginBottom: 20, textAlign: "center", padding: "36px 28px" }}>
          <div style={{ fontSize: 11, color: T.grey2, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, marginBottom: 20 }}>
            AI Readiness Score
          </div>
          <div style={{ fontSize: 80, fontWeight: 900, color: T.orange, lineHeight: 1, letterSpacing: -4 }}>
            {animScore}
            <span style={{ fontSize: 36, color: T.grey2, fontWeight: 600, letterSpacing: 0 }}>/100</span>
          </div>
          <div style={{ maxWidth: 420, margin: "22px auto 20px", height: 10, background: "rgba(255,255,255,0.07)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${animScore}%`,
              background: `linear-gradient(90deg, ${T.orange}, ${T.gold})`,
              borderRadius: 5, transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }} />
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}35`,
            borderRadius: 24, padding: "8px 28px", fontWeight: 800, fontSize: 16,
          }}>
            {catEmoji} {cat} Lead
          </div>
        </div>

        {/* Recommended Solution */}
        <div style={{ ...card, background: "rgba(16, 38, 58, 0.45)", border: `1px solid ${T.orange}25`, marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: T.orange, textTransform: "uppercase", letterSpacing: 2, fontWeight: 800, marginBottom: 16 }}>
            Recommended Solution
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12, letterSpacing: -0.3 }}>{result.agentType}</h2>
          <p style={{ color: T.white, lineHeight: 1.8, marginBottom: 24, fontSize: 14 }}>{result.agentDescription}</p>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, color: T.grey2, textTransform: "uppercase", letterSpacing: 1 }}>Features Included:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(result.features || []).map((f, i) => (
              <Tag key={i} color={T.orange}>✓ {f}</Tag>
            ))}
          </div>
        </div>

        {/* Expected Benefits */}
        <div style={{ ...card, background: "rgba(16, 38, 58, 0.45)", border: `1px solid ${T.green}25`, marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: T.green, textTransform: "uppercase", letterSpacing: 2, fontWeight: 800, marginBottom: 20 }}>
            Expected Benefits
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 14 }}>
            {(result.expectedBenefits || []).map((b, i) => (
              <div key={i} style={{
                background: `${T.green}08`, border: `1px solid ${T.green}20`,
                borderRadius: 14, padding: "18px 16px", textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.green, marginBottom: 5 }}>{b.improvement}</div>
                <div style={{ color: T.grey2, fontSize: 12, lineHeight: 1.4 }}>{b.metric}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline + Cost */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {[
            { icon: "⏱️", val: result.implementationTimeline, label: "Implementation Timeline" },
            { icon: "💰", val: result.estimatedCostRange, label: "Estimated Setup Cost" },
          ].map((item, i) => (
            <div key={i} style={{ ...card, background: "rgba(16, 38, 58, 0.45)", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.orange, marginBottom: 6 }}>{item.val}</div>
              <div style={{ color: T.grey2, fontSize: 13 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Automation Opportunities */}
        {result.automationOpportunities?.length > 0 && (
          <div style={{ ...card, background: "rgba(16, 38, 58, 0.45)", border: `1px solid ${T.gold}22`, marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: T.gold, textTransform: "uppercase", letterSpacing: 2, fontWeight: 800, marginBottom: 16 }}>
              Automation Opportunities Identified
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.automationOpportunities.map((o, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  background: "rgba(255, 255, 255, 0.03)", padding: "10px 14px",
                  borderRadius: 10, border: "1px solid rgba(255, 255, 255, 0.05)"
                }}>
                  <span style={{ color: T.orange, marginTop: 1, flexShrink: 0 }}>★</span>
                  <span style={{ color: T.white, fontSize: 14, lineHeight: 1.7 }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Priority Features */}
        {result.priorityFeatures?.length > 0 && (
          <div style={{ ...card, background: "rgba(16, 38, 58, 0.45)", marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: T.grey2, textTransform: "uppercase", letterSpacing: 2, fontWeight: 800, marginBottom: 14 }}>
              Priority Features to Build First
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.priorityFeatures.map((f, i) => (
                <Tag key={i} color={T.gold}>⭐ {f}</Tag>
              ))}
            </div>
          </div>
        )}

        {/*
         AI Notes */}
        <div style={{ ...card, background: "rgba(16, 38, 58, 0.45)", marginBottom: 32 }}>
          <div style={{ fontSize: 10, color: T.grey2, textTransform: "uppercase", letterSpacing: 2, fontWeight: 800, marginBottom: 12 }}>
            AI Analysis Notes
          </div>
          <p style={{ color: T.white, fontSize: 14, lineHeight: 1.8, margin: 0 }}>{result.reasoning}</p>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingBottom: 56, flexWrap: "wrap" }}>
          <button onClick={onReset} style={ghostBtn}>Start New Assessment</button>
          <button
            onClick={() => window.open(
              `mailto:info@restaurantai.com?subject=AI Agent Inquiry - ${formData?.restaurantName}&body=Restaurant: ${formData?.restaurantName}%0AOwner: ${formData?.ownerName}%0ARecommended Agent: ${result.agentType}%0AScore: ${score}/100`,
              "_blank"
            )}
            style={{ ...primaryBtn, fontSize: 16, padding: "16px 40px" }}
          >
            Get Started Now →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ADMIN DASHBOARD
══════════════════════════════════════════════════════ */
function AdminDashboard({ onBack }) {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [leads, setLeads] = useState([]);
  const [catFilter, setCatFilter] = useState("all");
  const [citySearch, setCitySearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (auth) {
      try {
        const r = localStorage.getItem("restaurant_leads");
        if (r) setLeads(JSON.parse(r));
      } catch { setLeads([]); }
    }
  }, [auth]);

  const login = () => {
    if (pw === "admin123") { setAuth(true); setErr(""); }
    else setErr("Incorrect password");
  };

  const catColor = { Hot: T.red, Warm: T.gold, Cold: T.blue };
  const catEmoji = { Hot: "🔥", Warm: "⚡", Cold: "❄️" };

  const filtered = leads.filter(l => {
    if (catFilter !== "all" && l.leadCategory !== catFilter) return false;
    if (citySearch && !(l.city || "").toLowerCase().includes(citySearch.toLowerCase())) return false;
    return true;
  });

  const exportCSV = () => {
    const H = ["Lead ID","Date","Owner","Restaurant","Phone","WhatsApp","Email","City","Type","Daily Orders","Revenue","Employees","Budget","Score","Category","Agent","Challenges","Contact Channels"];
    const rows = filtered.map(l => [
      l.leadId, l.date, l.ownerName, l.restaurantName, l.phone, l.whatsapp,
      l.email, l.city, l.restaurantType, l.dailyOrders, l.monthlyRevenue, l.employees,
      l.budget, l.aiReadinessScore, l.leadCategory, l.agentType,
      (l.challenges || []).join("; "), (l.contactChannels || []).join("; ")
    ]);
    const csv = [H, ...rows].map(r => r.map(c => `"${(c||"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = `restaurant_leads_${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const clearLeads = () => {
    if (!window.confirm("Delete all leads? This cannot be undone.")) return;
    try {
      localStorage.setItem("restaurant_leads", JSON.stringify([]));
      setLeads([]);
    } catch {}
  };

  if (!auth) return (
    <div style={{
      minHeight: "100vh", background: "transparent", color: T.white, fontFamily: "Inter, sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ ...card, background: "rgba(16, 38, 58, 0.55)", border: `1px solid ${T.orange}25`, width: 340, textAlign: "center", padding: 36 }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🔐</div>
        <h2 style={{ fontWeight: 900, marginBottom: 6, fontSize: 22 }}>Admin Access</h2>
        <p style={{ color: T.grey2, fontSize: 13, marginBottom: 24 }}>Enter your admin password to view leads</p>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Password"
          style={{ ...baseInput, textAlign: "center", marginBottom: err ? 8 : 16 }}
        />
        {err && <div style={{ color: T.red, fontSize: 13, marginBottom: 12 }}>{err}</div>}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onBack} style={{ ...ghostBtn, flex: 1, padding: "12px 16px" }}>← Back</button>
          <button onClick={login} style={{ ...primaryBtn, flex: 1, padding: "12px 16px" }}>Login</button>
        </div>
        <div style={{ color: T.grey2, fontSize: 11, marginTop: 16 }}></div>
      </div>
    </div>
  );

  if (selected) return (
    <div style={{ minHeight: "100vh", background: "transparent", color: T.white, fontFamily: "Inter, sans-serif", padding: "20px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button onClick={() => setSelected(null)} style={{ ...ghostBtn, marginBottom: 24, marginTop: 8 }}>← Back to Dashboard</button>
        <div style={{ ...card, background: "rgba(16, 38, 58, 0.45)", border: `1px solid ${catColor[selected.leadCategory] || T.border}30`, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${T.border}` }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{selected.restaurantName}</h2>
              <div style={{ color: T.grey2, fontSize: 14 }}>{selected.city} • {selected.restaurantType}</div>
            </div>
            <div style={{
              background: `${catColor[selected.leadCategory] || T.gold}18`,
              color: catColor[selected.leadCategory] || T.gold,
              border: `1px solid ${catColor[selected.leadCategory] || T.gold}30`,
              borderRadius: 20, padding: "6px 20px", fontWeight: 800,
            }}>
              {catEmoji[selected.leadCategory]} {selected.leadCategory} Lead
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { label: "Owner", val: selected.ownerName },
              { label: "Phone", val: selected.phone },
              { label: "WhatsApp", val: selected.whatsapp || "—" },
              { label: "Email", val: selected.email },
              { label: "Daily Orders", val: selected.dailyOrders },
              { label: "Monthly Revenue", val: selected.monthlyRevenue || "—" },
              { label: "Employees", val: selected.employees || "—" },
              { label: "Budget", val: selected.budget },
              { label: "AI Score", val: `${selected.aiReadinessScore}/100` },
              { label: "Recommended Agent", val: selected.agentType },
              { label: "Date", val: selected.date },
              { label: "Lead ID", val: selected.leadId },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: T.grey2, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.white }}>{item.val}</div>
              </div>
            ))}
          </div>
          {selected.challenges?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, color: T.grey2, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Pain Points</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selected.challenges.map((c, i) => <Tag key={i} color={T.red}>{c}</Tag>)}
              </div>
            </div>
          )}
          {selected.contactChannels?.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, color: T.grey2, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Contact Channels</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selected.contactChannels.map((c, i) => <Tag key={i} color={T.blue}>{c}</Tag>)}
              </div>
            </div>
          )}
          <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {selected.phone && (
              <a href={`tel:${selected.phone}`} style={{ ...primaryBtn, textDecoration: "none", display: "inline-block", fontSize: 13, padding: "10px 20px" }}>
                📞 Call
              </a>
            )}
            {selected.whatsapp && (
              <a href={`https://wa.me/${selected.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
                💬 WhatsApp
              </a>
            )}
            {selected.email && (
              <a href={`mailto:${selected.email}?subject=Your Restaurant AI Proposal - ${selected.restaurantName}`}
                style={{ ...ghostBtn, textDecoration: "none", display: "inline-block", padding: "10px 20px", fontSize: 13 }}>
                📧 Email
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "transparent", color: T.white, fontFamily: "Inter, sans-serif", padding: "20px 16px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, paddingTop: 12, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.5, marginBottom: 4 }}>📊 Lead Dashboard</h1>
            <div style={{ color: T.grey2, fontSize: 13 }}>{leads.length} total leads • Last updated just now</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={exportCSV} style={{ background: T.green, border: "none", color: "#fff", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "Inter, sans-serif" }}>
              📥 Export CSV
            </button>
            <button onClick={clearLeads} style={{ background: `${T.red}18`, border: `1px solid ${T.red}30`, color: T.red, padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "Inter, sans-serif" }}>
              🗑️ Clear
            </button>
            <button onClick={onBack} style={{ ...ghostBtn, padding: "10px 18px" }}>← Back</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total Leads", val: leads.length, color: T.white },
            { label: "Hot 🔥", val: leads.filter(l => l.leadCategory === "Hot").length, color: T.red },
            { label: "Warm ⚡", val: leads.filter(l => l.leadCategory === "Warm").length, color: T.gold },
            { label: "Cold ❄️", val: leads.filter(l => l.leadCategory === "Cold").length, color: T.blue },
            { label: "Avg Score", val: leads.length ? Math.round(leads.reduce((s, l) => s + (l.aiReadinessScore || 0), 0) / leads.length) + "/100" : "—", color: T.orange },
          ].map((s, i) => (
            <div key={i} style={{ ...card, background: "rgba(16, 38, 58, 0.45)", padding: "20px 22px" }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: s.color, letterSpacing: -1 }}>{s.val}</div>
              <div style={{ color: T.grey2, fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: T.grey2, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Filter:</span>
          {["all", "Hot", "Warm", "Cold"].map(f => (
            <button key={f} onClick={() => setCatFilter(f)} style={{
              background: catFilter === f ? T.orange : "rgba(255,255,255,0.04)",
              border: `1px solid ${catFilter === f ? T.orange : T.border}`,
              color: catFilter === f ? "#fff" : T.grey2, padding: "7px 18px",
              borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "Inter, sans-serif",
            }}>
              {f === "all" ? "All Leads" : `${catEmoji[f] || ""} ${f}`}
            </button>
          ))}
          <input
            value={citySearch} onChange={e => setCitySearch(e.target.value)}
            placeholder="Search city..."
            style={{ ...baseInput, width: 160, padding: "7px 14px", fontSize: 13 }}
          />
          {(catFilter !== "all" || citySearch) && (
            <button onClick={() => { setCatFilter("all"); setCitySearch(""); }}
              style={{ ...ghostBtn, padding: "7px 14px", fontSize: 12, color: T.grey2 }}>
              ✕ Clear
            </button>
          )}
          <span style={{ color: T.grey2, fontSize: 12, marginLeft: 4 }}>({filtered.length} results)</span>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "72px 0", color: T.grey2 }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📭</div>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
              {leads.length === 0 ? "No leads yet" : "No matching leads"}
            </div>
            <div style={{ fontSize: 13 }}>
              {leads.length === 0 ? "Complete the assessment form to generate your first lead." : "Try adjusting your filters above."}
            </div>
          </div>
        ) : (
          <div style={{ overflowX: "auto", borderRadius: 16, border: T.border, background: "rgba(16, 38, 58, 0.55)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {["Date", "Owner", "Restaurant", "City", "Phone", "Score", "Category", "Agent", "Budget", ""].map(h => (
                    <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 10, color: T.grey2, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={i}
                    style={{ borderBottom: `1px solid ${T.border}`, transition: "background 0.15s", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "13px 16px", fontSize: 12, color: T.grey2, whiteSpace: "nowrap" }}>{l.date}</td>
                    <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 700 }}>{l.ownerName}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13 }}>{l.restaurantName}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: T.grey2 }}>{l.city}</td>
                    <td style={{ padding: "13px 16px", fontSize: 12, color: T.grey2 }}>{l.phone}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontWeight: 900, fontSize: 15, color: (l.aiReadinessScore||0) >= 75 ? T.green : (l.aiReadinessScore||0) >= 50 ? T.gold : T.red }}>
                        {l.aiReadinessScore || "—"}
                        {l.aiReadinessScore ? <span style={{ fontSize: 11, fontWeight: 500, color: T.grey2 }}>/100</span> : ""}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      {l.leadCategory ? (
                        <span style={{
                          background: `${catColor[l.leadCategory]}18`, color: catColor[l.leadCategory],
                          border: `1px solid ${catColor[l.leadCategory]}30`, borderRadius: 20,
                          padding: "3px 12px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                        }}>
                          {catEmoji[l.leadCategory]} {l.leadCategory}
                        </span>
                      ) : <span style={{ color: T.grey2 }}>—</span>}
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 12, color: T.grey2, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {l.agentType || "—"}
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 12, color: T.grey2, whiteSpace: "nowrap" }}>{l.budget || "—"}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <button onClick={() => setSelected(l)} style={{
                        background: `${T.orange}15`, border: `1px solid ${T.orange}30`,
                        color: T.orange, padding: "5px 12px", borderRadius: 8,
                        cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "Inter, sans-serif",
                      }}>
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════ */
const PAGES = { LANDING: 0, FORM: 1, LOADING: 2, RESULT: 3, ADMIN: 4 };

export default function App() {
  const [page, setPage] = useState(PAGES.LANDING);
  const [formData, setFormData] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    // Load Inter font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleSubmit = async (data) => {
    const finalData = { ...data };
    if (data.restaurantType === "Other" && data.customRestaurantType) {
      finalData.restaurantType = data.customRestaurantType;
    }
    if (data.monthlyRevenue === "Custom" && data.customMonthlyRevenue) {
      finalData.monthlyRevenue = data.customMonthlyRevenue;
    }
    if (data.budget === "Custom" && data.customBudget) {
      finalData.budget = data.customBudget;
    }
    if (data.challenges.includes("Other") && data.customChallenge) {
      finalData.challenges = data.challenges.map(x => x === "Other" ? data.customChallenge : x);
    }

    setFormData(finalData);
    setPage(PAGES.LOADING);

    const prompt = `You are an expert AI automation consultant specializing in restaurant businesses in Pakistan and the Middle East.

Analyze this restaurant data and provide a comprehensive AI solution recommendation.

Restaurant Data:
${JSON.stringify(finalData, null, 2)}

Respond ONLY with valid JSON. No markdown backticks, no preamble, no explanation — just raw JSON:

{
  "agentType": "Specific descriptive agent name (e.g., 'WhatsApp AI Ordering Agent', 'AI Call Center for Restaurants', 'Multi-Channel Restaurant Chatbot')",
  "agentDescription": "2-3 compelling sentences explaining why this agent is the perfect fit for their specific restaurant type, size, challenges, and communication channels. Be specific.",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "expectedBenefits": [
    {"metric": "Customer Response Time", "improvement": "45% Faster"},
    {"metric": "Daily Orders Captured", "improvement": "22% More"},
    {"metric": "Staff Hours Saved", "improvement": "12 hrs/week"},
    {"metric": "Missed Inquiries", "improvement": "65% Fewer"}
  ],
  "timeSavings": "X hours per week",
  "revenueIncrease": "X–Y%",
  "automationOpportunities": [
    "Specific opportunity based on their pain points and channels",
    "Another specific opportunity",
    "A third opportunity"
  ],
  "complexityLevel": "Low/Medium/High",
  "estimatedCostRange": "$X – $Y one-time setup",
  "aiReadinessScore": 75,
  "leadCategory": "Hot/Warm/Cold",
  "reasoning": "2-3 sentences explaining the score: what makes them a good or poor fit, their biggest opportunity, and what's holding them back if anything.",
  "priorityFeatures": ["Most important feature to build first", "Second priority"],
  "implementationTimeline": "X–Y weeks"
}

Scoring guide:
- Hot (75–100): Revenue >$5k/mo OR orders >100/day, budget >$100/mo, 3+ pain points, uses WhatsApp/calls, multiple branches get bonus
- Warm (50–74): Moderate operations, some automation potential, willing to invest
- Cold (<50): Very small operation, <$50/mo budget, minimal contact channels

Choose agentType based on primary channel: WhatsApp dominant → WhatsApp agent. Calls dominant → AI Call Handler. Multiple channels → Omni-channel agent. Multi-branch → Enterprise AI System.`;

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const json = await resp.json();
      const text = (json.content || []).map(c => c.text || "").join("");
      // Try to extract JSON robustly
      let clean = text.replace(/```json\n?|```\n?/g, "").trim();
      let result;
      try {
        result = JSON.parse(clean);
      } catch {
        const m = text.match(/\{[\s\S]*\}/);
        if (m) result = JSON.parse(m[0]);
        else throw new Error("No JSON found");
      }

      // Save lead to localStorage
      const lead = {
        leadId: `L${Date.now()}`,
        date: new Date().toLocaleDateString("en-PK"),
        ...finalData,
        agentType: result.agentType,
        aiReadinessScore: result.aiReadinessScore,
        leadCategory: result.leadCategory,
      };
      try {
        const existing = localStorage.getItem("restaurant_leads");
        const all = existing ? JSON.parse(existing) : [];
        localStorage.setItem("restaurant_leads", JSON.stringify([...all, lead]));
      } catch { /* storage unavailable, continue */ }

      setAiResult(result);
      setPage(PAGES.RESULT);
    } catch (e) {
      console.error("AI Analysis error:", e);
      // Graceful fallback
      const fallback = {
        agentType: "WhatsApp AI Ordering & Support Agent",
        agentDescription: `A smart WhatsApp automation system tailored for ${finalData.restaurantType || "your restaurant"} in ${finalData.city || "your city"}. It handles incoming orders, answers menu questions, manages reservations, and responds to customer inquiries 24/7 — reducing your staff workload while improving customer satisfaction significantly.`,
        features: ["Automated Order Taking", "Menu Query Handling", "Reservation Management", "Order Confirmation & Updates", "Upselling Suggestions", "Multi-language Support"],
        expectedBenefits: [
          { metric: "Response Time", improvement: "40% Faster" },
          { metric: "Orders Captured", improvement: "20% More" },
          { metric: "Staff Hours Saved", improvement: "10 hrs/week" },
          { metric: "Customer Satisfaction", improvement: "35% Higher" },
        ],
        timeSavings: "10 hours/week",
        revenueIncrease: "15–25%",
        automationOpportunities: [
          "Automate the complete WhatsApp order flow from inquiry to kitchen confirmation",
          "Instant AI replies to FAQ about menu, pricing, and delivery times",
          "Handle peak-hour surge without additional staff costs",
        ],
        complexityLevel: "Medium",
        estimatedCostRange: "$500 – $1,500 one-time setup",
        aiReadinessScore: 70,
        leadCategory: "Warm",
        reasoning: "Based on your restaurant profile, there is solid potential for WhatsApp-based AI automation. Your customer communication patterns and operational challenges align well with our standard restaurant AI solution. A WhatsApp agent would provide immediate ROI.",
        priorityFeatures: ["WhatsApp Order Flow", "Auto-Reply to FAQs"],
        implementationTimeline: "2–3 weeks",
      };

      try {
        const lead = { leadId: `L${Date.now()}`, date: new Date().toLocaleDateString("en-PK"), ...finalData, agentType: fallback.agentType, aiReadinessScore: fallback.aiReadinessScore, leadCategory: fallback.leadCategory };
        const existing = localStorage.getItem("restaurant_leads");
        const all = existing ? JSON.parse(existing) : [];
        localStorage.setItem("restaurant_leads", JSON.stringify([...all, lead]));
      } catch { /* ignore */ }

      setAiResult(fallback);
      setPage(PAGES.RESULT);
    }
  };

  const reset = () => { setPage(PAGES.LANDING); setFormData(null); setAiResult(null); };

  return (
    <>
      <ThreeDBackground />
      {page === PAGES.LANDING && <Landing onStart={() => setPage(PAGES.FORM)} onAdmin={() => setPage(PAGES.ADMIN)} />}
      {page === PAGES.FORM && <FormPage onSubmit={handleSubmit} onBack={() => setPage(PAGES.LANDING)} />}
      {page === PAGES.LOADING && <LoadingPage />}
      {page === PAGES.RESULT && <ResultPage result={aiResult} formData={formData} onReset={reset} />}
      {page === PAGES.ADMIN && <AdminDashboard onBack={() => setPage(PAGES.LANDING)} />}
    </>
  );
}
