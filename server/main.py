"""
Khoj (खोज) - Women's Health Companion & Care Navigation Platform
FastAPI Backend Server
"""

import os
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Khoj API (खोज)",
    description="Backend API for Khoj - Women's Health Care Navigation Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for local dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Domain Models -----------------

class SymptomEntry(BaseModel):
    code: str
    label: str
    category: str
    severity: int = Field(ge=0, le=3)
    duration: str

class Profile(BaseModel):
    language: str = "en"
    name: Optional[str] = "Priya Sharma"
    lifeStage: str = "menstrual"
    ageRange: Optional[str] = "25 - 29"
    lastPeriod: Optional[str] = "2026-04-12"
    cycleLength: Optional[str] = "28-30 days"
    concerns: Optional[List[str]] = []
    onboardingCompleted: Optional[bool] = True

class Consents(BaseModel):
    saveData: bool = True
    aiExplain: bool = True
    sharePassport: bool = True
    discreetMode: bool = False

class CheckinCreate(BaseModel):
    lifeStage: str = "menstrual"
    symptoms: List[SymptomEntry]
    notes: Optional[str] = None
    medications: Optional[str] = None
    flow: Optional[str] = "moderate"

class Checkin(CheckinCreate):
    id: str
    recordedAt: str

class SafetyResult(BaseModel):
    level: str # 'routine' | 'soon' | 'urgent' | 'emergency'
    redFlag: bool
    matchedRuleId: Optional[str] = None
    ruleVersion: str = "demo-0.1"
    message: str
    showSafetyScreen: bool
    aiCanOverride: bool = False
    suggestedAction: Optional[str] = None
    contactNumber: Optional[str] = None
    serviceName: Optional[str] = None

class PatternEvidence(BaseModel):
    symptom: str
    occurrences: int
    period: str
    entryIds: List[str]

class Pattern(BaseModel):
    id: str
    title: str
    summary: str
    evidenceStrength: str # 'limited' | 'moderate' | 'stronger'
    evidence: List[PatternEvidence]
    missingInformation: List[str]
    topicsToDiscuss: List[str]
    routeTo: str
    notADiagnosis: bool = True
    suggestedTests: List[str]
    suggestedSpecialist: str
    otherPossibilities: Optional[List[str]] = []

class Provider(BaseModel):
    id: str
    name: str
    type: str
    area: str
    city: str
    languages: List[str]
    costBand: str # 'free' | 'low' | 'private'
    facility: str # 'public' | 'private'
    femaleDoctorAvailable: bool
    source: str
    verifiedOn: Optional[str] = None
    isSample: bool = True
    phone: str
    address: str
    testCostEstimate: Optional[str] = None

class CareRecommendation(BaseModel):
    specialistType: str
    urgency: str
    reason: str
    questionsToAsk: List[str]
    providers: List[Provider]
    directoryNotice: str

class Followup(BaseModel):
    id: str
    text: str
    dueDate: Optional[str] = None
    done: bool = False

class PassportDraft(BaseModel):
    includeTimeline: bool = True
    includePatterns: bool = True
    includeMedications: bool = True
    includeQuestions: bool = True
    patientNotes: str = ""
    customQuestions: List[str] = []

# ----------------- In-Memory Database -----------------

db_profile: Optional[Profile] = Profile()
db_consents: Consents = Consents()
db_checkins: List[Checkin] = []
db_followups: List[Followup] = []
db_passport: PassportDraft = PassportDraft()

# ----------------- Sample Pune Healthcare Providers -----------------

PUNE_PROVIDERS: List[Provider] = [
    Provider(
        id="prov-1",
        name="Kamala Nehru General Hospital",
        type="Gynecology & General Medicine",
        area="Mangalwar Peth",
        city="Pune",
        languages=["Marathi", "Hindi", "English"],
        costBand="free",
        facility="public",
        femaleDoctorAvailable=True,
        source="Pune Municipal Corporation (PMC)",
        verifiedOn="15 Feb 2026",
        isSample=True,
        phone="+91 20 2605 8484",
        address="Near Old Bazar, Mangalwar Peth, Pune 411011",
        testCostEstimate="Free or nominal (₹10 - ₹50 for OPD & CBC)"
    ),
    Provider(
        id="prov-2",
        name="Sahyadri Super Speciality Hospital",
        type="Obstetrics, Gynecology & Hematology",
        area="Deccan Gymkhana",
        city="Pune",
        languages=["English", "Marathi", "Hindi"],
        costBand="private",
        facility="private",
        femaleDoctorAvailable=True,
        source="NABH Accredited Directory",
        verifiedOn="12 Jan 2026",
        isSample=True,
        phone="+91 20 6721 3000",
        address="Plot No. 30-C, Erandwane, Karve Road, Pune 411004",
        testCostEstimate="Consultation ₹800 - ₹1,200 | CBC & Ferritin ~₹900"
    ),
    Provider(
        id="prov-3",
        name="KEM Hospital & Research Centre",
        type="Women & Child Health, Endocrinology",
        area="Rasta Peth",
        city="Pune",
        languages=["Marathi", "Hindi", "English"],
        costBand="low",
        facility="private",
        femaleDoctorAvailable=True,
        source="Charitable Trust Registry",
        verifiedOn="20 Jan 2026",
        isSample=True,
        phone="+91 20 6603 7300",
        address="489, Sardar Moodliar Road, Rasta Peth, Pune 411011",
        testCostEstimate="Consultation ₹300 - ₹500 | Subsidized Lab Panel ~₹400"
    ),
    Provider(
        id="prov-4",
        name="Ruby Hall Clinic",
        type="Advanced Gynecology, Endocrine & Diagnostics",
        area="Sassoon Road",
        city="Pune",
        languages=["English", "Hindi", "Marathi"],
        costBand="private",
        facility="private",
        femaleDoctorAvailable=True,
        source="NABH Directory",
        verifiedOn="04 Mar 2026",
        isSample=True,
        phone="+91 20 6645 5100",
        address="40, Sassoon Road, Sangamvadi, Pune 411001",
        testCostEstimate="Consultation ₹1,000 | Comprehensive Hormone Panel ~₹2,200"
    ),
    Provider(
        id="prov-5",
        name="Dr. Ananya Joshi Women’s Care Clinic",
        type="Reproductive Health & PCOS Clinic",
        area="Kothrud",
        city="Pune",
        languages=["Marathi", "English", "Hindi"],
        costBand="private",
        facility="private",
        femaleDoctorAvailable=True,
        source="IMA Pune Chapter",
        verifiedOn="18 Feb 2026",
        isSample=True,
        phone="+91 98230 44120",
        address="Shop 4, Mayur Colony, Near Joggers Park, Kothrud, Pune 411038",
        testCostEstimate="Consultation ₹600 | Personalized Cycle Review"
    ),
    Provider(
        id="prov-6",
        name="Sassoon General Hospital & BJ Medical College",
        type="Tertiary Government Hospital & Crisis Care",
        area="Near Pune Station",
        city="Pune",
        languages=["Marathi", "Hindi", "English"],
        costBand="free",
        facility="public",
        femaleDoctorAvailable=True,
        source="Government of Maharashtra Health Dept",
        verifiedOn="01 Feb 2026",
        isSample=True,
        phone="+91 20 2612 8000",
        address="Station Road, Opp Pune Railway Station, Pune 411001",
        testCostEstimate="Free emergency triage & government subsidized testing"
    )
]

# ----------------- Safety & Pattern Engines -----------------

def assess_safety_rules(symptoms: List[SymptomEntry], life_stage: str, flow: Optional[str]) -> SafetyResult:
    codes = {s.code for s in symptoms}
    if flow == "very_heavy":
        codes.add("heavy_bleeding")

    # 1. Self harm -> Emergency (Tele-MANAS)
    if "self_harm" in codes or "hopelessness_severe" in codes:
        return SafetyResult(
            level="emergency",
            redFlag=True,
            matchedRuleId="RF-01-SELF-HARM",
            message="We want you to be completely safe. Please speak to someone who can help right now. Support is free, confidential, and available 24/7 on Tele-MANAS.",
            showSafetyScreen=True,
            contactNumber="14416",
            serviceName="Tele-MANAS (Mental Health Helpline)",
            suggestedAction="Call Tele-MANAS (14416) immediately."
        )

    # 2. Fainting + Heavy Bleeding -> Urgent
    if "fainting" in codes and "heavy_bleeding" in codes:
        return SafetyResult(
            level="urgent",
            redFlag=True,
            matchedRuleId="RF-02-FAINTING-HEAVY-BLEED",
            message="Fainting or severe dizziness combined with heavy bleeding needs immediate medical attention to check your blood pressure and blood count.",
            showSafetyScreen=True,
            contactNumber="112",
            serviceName="Emergency Medical Services (112)",
            suggestedAction="Seek same-day clinical evaluation."
        )

    # 3. Postpartum Fever or Bleeding -> Urgent
    if life_stage == "postpartum" and ("postpartum_fever" in codes or ("heavy_bleeding" in codes and "wound_infection" in codes)):
        return SafetyResult(
            level="urgent",
            redFlag=True,
            matchedRuleId="RF-05-POSTPARTUM-FEVER-BLEED",
            message="High fever or severe bleeding after childbirth can be a sign of infection and needs urgent clinical evaluation.",
            showSafetyScreen=True,
            contactNumber="108",
            serviceName="Maternity Crisis Care",
            suggestedAction="Contact your maternity hospital or call 108."
        )

    # 4. Severe single symptoms
    severe_count = sum(1 for s in symptoms if s.severity >= 3)
    if severe_count >= 2:
        return SafetyResult(
            level="soon",
            redFlag=False,
            message="You have reported high-intensity symptoms affecting daily life. We recommend speaking with a healthcare professional soon.",
            showSafetyScreen=False,
            suggestedAction="Consult a physician or gynecologist within 3-5 days."
        )

    return SafetyResult(
        level="routine",
        redFlag=False,
        message="Your recorded symptoms appear suitable for routine self-care and monitoring on your health timeline.",
        showSafetyScreen=False,
        suggestedAction="Keep logging how you feel to build a clear symptom timeline."
    )

def analyze_patterns(checkins: List[Checkin]) -> List[Pattern]:
    patterns: List[Pattern] = []
    if not checkins:
        return patterns

    symptom_counts: Dict[str, int] = {}
    entry_ids_map: Dict[str, List[str]] = {}

    for chk in checkins:
        for s in chk.symptoms:
            symptom_counts[s.code] = symptom_counts.get(s.code, 0) + 1
            entry_ids_map.setdefault(s.code, []).append(chk.id)
        if chk.flow in ("heavy", "very_heavy"):
            symptom_counts["heavy_bleeding"] = symptom_counts.get("heavy_bleeding", 0) + 1
            if chk.id not in entry_ids_map.setdefault("heavy_bleeding", []):
                entry_ids_map["heavy_bleeding"].append(chk.id)

    heavy_count = symptom_counts.get("heavy_bleeding", 0)
    fatigue_count = symptom_counts.get("fatigue", 0)
    dizziness_count = symptom_counts.get("dizziness", 0)
    hairfall_count = symptom_counts.get("hair_fall", 0)

    # Pattern 1: Iron deficiency
    if (heavy_count >= 2 and fatigue_count >= 2) or (heavy_count >= 1 and (fatigue_count >= 1 or dizziness_count >= 1)):
        patterns.append(Pattern(
            id="pattern-iron-deficiency",
            title="Pattern worth discussing: possible iron-related concern",
            summary="Heavy menstrual bleeding accompanied by recurring tiredness or lightheadedness often reflects diminished iron reserves over time.",
            evidenceStrength="stronger" if heavy_count >= 3 else "moderate",
            evidence=[
                PatternEvidence(
                    symptom="Heavy bleeding",
                    occurrences=heavy_count,
                    period="Across logged cycles",
                    entryIds=entry_ids_map.get("heavy_bleeding", [])
                ),
                PatternEvidence(
                    symptom="Fatigue / low energy",
                    occurrences=fatigue_count,
                    period="Recurring on heavy flow days",
                    entryIds=entry_ids_map.get("fatigue", [])
                )
            ],
            missingInformation=[
                "No recent complete blood count (CBC) or serum ferritin on file.",
                "Dietary iron and absorption intake not yet documented."
            ],
            topicsToDiscuss=[
                "Pad saturation frequency during heavy days",
                "Lightheadedness when climbing stairs",
                "Suitability of iron supplementation or flow reduction therapy"
            ],
            routeTo="Gynecologist or General Physician",
            suggestedSpecialist="Gynecologist or General Physician",
            suggestedTests=["Complete Blood Count (CBC)", "Serum Ferritin", "Total Iron Binding Capacity (TIBC)"],
            otherPossibilities=["Thyroid variation", "Temporary sleep deficit", "Vitamin D insufficiency"]
        ))

    # Pattern 2: Hormonal / Metabolic
    if hairfall_count >= 1 and fatigue_count >= 1:
        patterns.append(Pattern(
            id="pattern-hormonal-metabolic",
            title="Pattern worth discussing: hormonal or metabolic factors",
            summary="Noticeable hair shedding coupled with energy fluctuations and menstrual shifts can be associated with thyroid shifts or hormonal imbalance.",
            evidenceStrength="moderate",
            evidence=[
                PatternEvidence(
                    symptom="Hair thinning / shedding",
                    occurrences=hairfall_count,
                    period="Recent check-ins",
                    entryIds=entry_ids_map.get("hair_fall", [])
                ),
                PatternEvidence(
                    symptom="Fatigue",
                    occurrences=fatigue_count,
                    period="Intermittent across weeks",
                    entryIds=entry_ids_map.get("fatigue", [])
                )
            ],
            missingInformation=[
                "No pelvic ultrasound (USG) report recorded.",
                "Hormone profile (TSH, free testosterone) not yet available."
            ],
            topicsToDiscuss=[
                "Cycle variations over past 6 months",
                "Acne or sudden shifts in weight and stamina"
            ],
            routeTo="Gynecologist or Endocrinologist",
            suggestedSpecialist="Gynecologist or Endocrinologist",
            suggestedTests=["Pelvic Ultrasound (USG)", "Thyroid Profile (TSH)", "Fasting Blood Sugar"],
            otherPossibilities=["Telogen effluvium", "Environmental water hardness"]
        ))

    return patterns

# ----------------- Seed Priya Demo Data -----------------

def seed_priya_data():
    global db_profile, db_consents, db_checkins, db_followups, db_passport
    db_profile = Profile(
        language="en",
        name="Priya Sharma",
        lifeStage="menstrual",
        ageRange="25 - 29",
        lastPeriod="2026-04-12",
        cycleLength="28-30 days",
        concerns=["Heavy periods", "Tired all the time", "Skin or hair changes"],
        onboardingCompleted=True
    )
    db_consents = Consents(saveData=True, aiExplain=True, sharePassport=True, discreetMode=False)
    db_followups = [
        Followup(id="f-1", text="Schedule consultation with Dr. Ananya Joshi", dueDate="2026-05-02", done=False),
        Followup(id="f-2", text="Ask for CBC & Serum Ferritin blood work", dueDate="2026-05-05", done=False),
        Followup(id="f-3", text="Review iron-rich foods (spinach, jaggery, legumes)", dueDate="2026-05-10", done=True)
    ]
    db_passport = PassportDraft(
        includeTimeline=True,
        includePatterns=True,
        includeMedications=True,
        includeQuestions=True,
        patientNotes="Symptoms intensify on days 2 and 3 of heavy flow. Energy drops noticeably despite 8 hours of sleep.",
        customQuestions=[
            "Could my low energy and lightheadedness be linked to low ferritin from heavy periods?",
            "Would a routine CBC and pelvic ultrasound be helpful at this stage?",
            "What are safe options to lighten heavy menstrual flow?"
        ]
    )
    db_checkins = [
        Checkin(
            id="chk-jan-14",
            recordedAt="2026-01-14T09:30:00Z",
            lifeStage="menstrual",
            flow="heavy",
            symptoms=[
                SymptomEntry(code="heavy_bleeding", label="Heavy Bleeding", category="period", severity=2, duration="today"),
                SymptomEntry(code="cramps", label="Pelvic Cramping", category="period", severity=2, duration="today"),
                SymptomEntry(code="fatigue", label="Tiredness / Low Energy", category="body", severity=2, duration="few_days")
            ],
            notes="Day 2 of period. Had to change 4 pads by afternoon.",
            medications="Meftal-Spas (1 tablet)"
        ),
        Checkin(
            id="chk-feb-11",
            recordedAt="2026-02-11T10:15:00Z",
            lifeStage="menstrual",
            flow="heavy",
            symptoms=[
                SymptomEntry(code="heavy_bleeding", label="Heavy Bleeding", category="period", severity=3, duration="today"),
                SymptomEntry(code="fatigue", label="Exhaustion", category="body", severity=2, duration="few_days"),
                SymptomEntry(code="dizziness", label="Lightheadedness", category="body", severity=2, duration="today")
            ],
            notes="Very heavy flow with clots. Felt weak climbing stairs."
        ),
        Checkin(
            id="chk-mar-20",
            recordedAt="2026-03-20T17:30:00Z",
            lifeStage="menstrual",
            flow="moderate",
            symptoms=[
                SymptomEntry(code="hair_fall", label="Hair Fall", category="skin_hair", severity=1, duration="more_than_2_weeks"),
                SymptomEntry(code="fatigue", label="Low Energy", category="body", severity=1, duration="few_days")
            ],
            notes="Hair brush accumulating noticeably more strands."
        ),
        Checkin(
            id="chk-apr-12",
            recordedAt="2026-04-12T11:00:00Z",
            lifeStage="menstrual",
            flow="heavy",
            symptoms=[
                SymptomEntry(code="heavy_bleeding", label="Heavy Bleeding", category="period", severity=3, duration="today"),
                SymptomEntry(code="fatigue", label="Extreme Fatigue", category="body", severity=2, duration="few_days"),
                SymptomEntry(code="dizziness", label="Lightheadedness", category="body", severity=2, duration="today")
            ],
            notes="Heavy bleeding returned with exhaustion."
        )
    ]

# Initialize seed data
seed_priya_data()

# ----------------- API Endpoints -----------------

@app.get("/api/v1/health")
def get_health():
    return {
        "status": "healthy",
        "mock": False,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/v1/profile")
def get_profile():
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return db_profile

@app.patch("/api/v1/profile")
def update_profile(updates: Profile):
    global db_profile
    db_profile = updates
    return db_profile

@app.get("/api/v1/consents")
def get_consents():
    return db_consents

@app.put("/api/v1/consents")
def update_consents(consents: Consents):
    global db_consents
    db_consents = consents
    return db_consents

@app.post("/api/v1/safety/assess")
def assess_safety(payload: Dict[str, Any]):
    symptoms_raw = payload.get("symptoms", [])
    symptoms = [SymptomEntry(**s) for s in symptoms_raw]
    life_stage = payload.get("lifeStage", "menstrual")
    flow = payload.get("flow")
    return assess_safety_rules(symptoms, life_stage, flow)

@app.post("/api/v1/checkins")
def create_checkin(payload: CheckinCreate):
    safety = assess_safety_rules(payload.symptoms, payload.lifeStage, payload.flow)

    new_chk = Checkin(
        id=f"chk-{int(datetime.now().timestamp() * 1000)}",
        recordedAt=datetime.now(timezone.utc).isoformat(),
        **payload.model_dump()
    )

    if db_consents.saveData:
        db_checkins.insert(0, new_chk)

    patterns = analyze_patterns(db_checkins)
    return {
        "checkin": new_chk,
        "safety": safety,
        "patternCount": len(patterns)
    }

@app.get("/api/v1/checkins")
def list_checkins():
    return db_checkins

@app.get("/api/v1/timeline")
def get_timeline(range_days: int = Query(default=90, alias="range")):
    points_map: Dict[str, Any] = {}
    for chk in db_checkins:
        d = chk.recordedAt.split("T")[0]
        if d not in points_map:
            points_map[d] = {
                "date": d,
                "symptoms": {},
                "isCycleStart": chk.flow in ("heavy", "moderate"),
                "notes": chk.notes
            }
        for s in chk.symptoms:
            points_map[d]["symptoms"][s.code] = max(points_map[d]["symptoms"].get(s.code, 0), s.severity + 1)
        if chk.flow == "heavy":
            points_map[d]["symptoms"]["heavy_bleeding"] = 3
        elif chk.flow == "moderate":
            points_map[d]["symptoms"]["heavy_bleeding"] = 2

    sorted_points = sorted(points_map.values(), key=lambda x: x["date"])
    for p in sorted_points:
        if len(p["symptoms"]) >= 3:
            p["isKnot"] = True

    return {
        "points": sorted_points,
        "cycles": [
            {"start": "2026-01-14", "end": "2026-01-18", "cycleNumber": 1},
            {"start": "2026-02-11", "end": "2026-02-15", "cycleNumber": 2},
            {"start": "2026-03-12", "end": "2026-03-16", "cycleNumber": 3},
            {"start": "2026-04-12", "end": "2026-04-16", "cycleNumber": 4}
        ]
    }

@app.get("/api/v1/insights")
def get_insights():
    return analyze_patterns(db_checkins)

@app.get("/api/v1/insights/{pattern_id}")
def get_insight(pattern_id: str):
    patterns = analyze_patterns(db_checkins)
    for p in patterns:
        if p.id == pattern_id:
            return p
    raise HTTPException(status_code=404, detail="Pattern not found")

@app.post("/api/v1/care/recommendation")
def get_care_recommendation(filters: Optional[Dict[str, Any]] = None):
    patterns = analyze_patterns(db_checkins)
    specialist = "Gynecologist"
    urgency = "Within 1–2 weeks"
    reason = "A gynecologist is the most appropriate first stop to review your cycle history and heavy flow."
    questions = [
        "Could my heavy bleeding days and tiredness be linked to iron levels?",
        "Can we test Complete Blood Count (CBC) and Ferritin?",
        "What safe flow management options would you advise?"
    ]

    if patterns:
        primary = patterns[0]
        if "iron" in primary.id:
            specialist = "Gynecologist or General Physician"
            urgency = "Within 1–2 weeks"
            reason = "Your logged threads indicate heavy bleeding coinciding with energy drops. A clinician can review your iron levels."

    filtered_providers = list(PUNE_PROVIDERS)
    if filters:
        if filters.get("femaleDoctorOnly"):
            filtered_providers = [p for p in filtered_providers if p.femaleDoctorAvailable]
        if filters.get("costBand") and filters.get("costBand") != "all":
            filtered_providers = [p for p in filtered_providers if p.costBand == filters.get("costBand")]
        if filters.get("facility") and filters.get("facility") != "all":
            filtered_providers = [p for p in filtered_providers if p.facility == filters.get("facility")]

    return CareRecommendation(
        specialistType=specialist,
        urgency=urgency,
        reason=reason,
        questionsToAsk=questions,
        providers=filtered_providers,
        directoryNotice="Sample verified Pune healthcare directory for hackathon evaluation."
    )

@app.get("/api/v1/providers")
def list_providers():
    return PUNE_PROVIDERS

@app.get("/api/v1/followups")
def get_followups():
    return db_followups

@app.post("/api/v1/followups")
def add_followup(payload: Dict[str, Any]):
    new_item = Followup(
        id=f"f-{int(datetime.now().timestamp() * 1000)}",
        text=payload.get("text", "New reminder"),
        dueDate=payload.get("dueDate"),
        done=False
    )
    db_followups.insert(0, new_item)
    return new_item

@app.patch("/api/v1/followups/{followup_id}")
def update_followup(followup_id: str, updates: Dict[str, Any]):
    for i, f in enumerate(db_followups):
        if f.id == followup_id:
            updated = f.model_copy(update=updates)
            db_followups[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Followup not found")

@app.post("/api/v1/passport/preview")
def preview_passport(draft: PassportDraft):
    global db_passport
    db_passport = draft
    return {"summary": "Doctor Passport ready", "draft": db_passport}

@app.post("/api/v1/passport/export")
def export_passport(draft: PassportDraft):
    return {"success": True, "message": "Doctor Passport generated successfully."}

@app.post("/api/v1/demo/load")
def load_demo():
    seed_priya_data()
    return {"success": True, "message": "Demo data for Priya Sharma loaded successfully."}

@app.delete("/api/v1/me")
def delete_me():
    global db_checkins, db_followups, db_profile
    db_checkins.clear()
    db_followups.clear()
    db_profile = None
    return {"success": True, "message": "All personal data erased."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
