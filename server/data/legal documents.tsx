import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Scale, Shield, Gavel } from "lucide-react";

const LegalDocuments = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documents = [
    {
      id: "constitution",
      title: "Constitution",
      icon: BookOpen,
      description: "Kenya Constitution 2010 - Complete text and articles",
      color: "text-primary",
      content: `CONSTITUTION OF KENYA 2010 - ALL 18 CHAPTERS

PREAMBLE
WE, THE PEOPLE OF KENYA—
ACKNOWLEDGING the supremacy of the Almighty God of all creation:
HONOURING those who heroically struggled to bring freedom and justice to our land:
PROUD of our ethnic, cultural and religious diversity, and determined to live in peace and unity as one indivisible sovereign nation:
RESPECTFUL of the environment, which is our heritage, and determined to sustain it for the benefit of future generations:
COMMITTED to nurturing and protecting the well-being of the individual, the family, communities and the nation:
RECOGNISING the aspirations of all Kenyans for a government based on the essential values of human rights, equality, freedom, democracy, social justice and the rule of law:
EXERCISING our sovereign and inalienable right to determine the form of governance of our country and having participated fully in the making of this Constitution:
ADOPT, ENACT and give this Constitution to ourselves and to our future generations.

GOD BLESS KENYA

CHAPTER ONE—THE REPUBLIC
Article 1. Sovereignty of the people
Article 2. Supremacy of this Constitution
Article 3. Defence of this Constitution
Article 4. The Republic
Article 5. Territory of Kenya
Article 6. Devolution
Article 7. National, official and other languages
Article 8. State and religion
Article 9. National days
Article 10. National values and principles of governance

CHAPTER TWO—THE REPUBLIC
Article 11. Culture
Article 12. National symbols
Article 13. National flag, national anthem and public seal

CHAPTER THREE—CITIZENSHIP
Article 14. Citizenship by birth
Article 15. Citizenship by registration
Article 16. Dual citizenship
Article 17. Citizenship Act
Article 18. Decisions on applications

CHAPTER FOUR—THE BILL OF RIGHTS
Article 19. Rights and fundamental freedoms
Article 20. Application of Bill of Rights
Article 21. Implementation of rights and fundamental freedoms
Article 22. Enforcement of Bill of Rights
Article 23. Authority to limit rights and fundamental freedoms
Article 24. Limitation of rights and fundamental freedoms
Article 25. Fundamental rights and freedoms that may not be limited
Article 26. Right to life
Article 27. Equality and freedom from discrimination
Article 28. Human dignity
Article 29. Freedom and security of the person
Article 30. Right to privacy
Article 31. Freedom of conscience, religion, thought, belief and opinion
Article 32. Freedom of expression
Article 33. Freedom of the media
Article 34. Freedom and right to fair administrative action
Article 35. Access to information
Article 36. Freedom of association
Article 37. Assembly, demonstration, picketing and petition
Article 38. Political rights
Article 39. Freedom of movement and residence
Article 40. Protection of right to property
Article 41. Labour relations
Article 42. Environment
Article 43. Economic and social rights
Article 44. Language and culture
Article 45. Family
Article 46. Consumer rights
Article 47. Fair administrative action
Article 48. Access to justice
Article 49. Rights of arrested persons
Article 50. Fair hearing
Article 51. Rights of persons detained, held in custody or imprisoned
Article 52. Rights of accused persons
Article 53. Children
Article 54. Persons with disabilities
Article 55. Youth
Article 56. Minorities and marginalised groups
Article 57. Older members of society

CHAPTER FIVE—LAND AND ENVIRONMENT
Article 60. Principles of land policy
Article 61. Classification of land
Article 62. Public land
Article 63. Community land
Article 64. Private land
Article 65. Landholding by non-citizens
Article 66. Regulation of land use and property
Article 67. National Land Commission
Article 68. Community land
Article 69. Obligations in respect of the environment
Article 70. Enforcement of environmental rights

CHAPTER SIX—LEADERSHIP AND INTEGRITY
Article 73. Leadership and integrity
Article 74. Oath of office of State officers
Article 75. Conduct of State officers
Article 76. Financial probity of State officers
Article 77. Restriction on activities of State officers
Article 78. Citizenship and leadership
Article 79. Legislation on leadership
Article 80. Enforcement

CHAPTER SEVEN—REPRESENTATION OF THE PEOPLE
Article 81. General principles for the electoral system
Article 82. Legislation on elections
Article 83. Registration as a voter
Article 84. Delimitation of electoral units
Article 85. General elections and by-elections
Article 86. Voting
Article 87. Electoral disputes
Article 88. Independent Electoral and Boundaries Commission
Article 89. Functions and powers of the Independent Electoral and Boundaries Commission
Article 90. Composition of the Independent Electoral and Boundaries Commission
Article 91. Terms of service of members of the Independent Electoral and Boundaries Commission

CHAPTER EIGHT—THE LEGISLATURE
Article 93. Parliament
Article 94. Role of Parliament
Article 95. The National Assembly
Article 96. The Senate
Article 97. Membership of the National Assembly
Article 98. Membership of the Senate
Article 99. Election of members of Parliament
Article 100. Vacation of office of member of Parliament
Article 101. Sessions of Parliament
Article 102. Presiding officers of Parliament
Article 103. Party lists
Article 104. Determination of questions of membership
Article 105. Right of recall
Article 106. Right to petition Parliament
Article 107. Power to summon any person to appear before Parliament
Article 108. Powers, privileges and immunities
Article 109. Legislative authority of Parliament
Article 110. Legislative process
Article 111. Ordinary Bills concerning county governments
Article 112. Money Bills
Article 113. Revenue Bills
Article 114. Bills initiated in the Senate concerning county governments
Article 115. Amendments to this Constitution
Article 116. Presidential assent and referral
Article 117. Coming into force of laws
Article 118. Public participation and access to information
Article 119. Public access and participation
Article 120. Exercise of legislative powers
Article 121. Committees of Parliament
Article 122. Dissolution of Parliament
Article 123. General elections for Parliament

CHAPTER NINE—THE EXECUTIVE
Article 129. National executive
Article 130. The President
Article 131. Functions of the President
Article 132. Powers of the President
Article 133. Procedures for election of President
Article 134. Election of President
Article 135. Term of office of the President
Article 136. Questions concerning the election of the President
Article 137. Assumption of office of President
Article 138. Removal of President by impeachment
Article 139. Incapacity of President and succession
Article 140. Protection of President
Article 141. The Deputy President
Article 142. Functions of Deputy President
Article 143. Principles of executive authority
Article 144. Deputy President and other State officers
Article 145. Secretary to the Cabinet
Article 146. Attorney-General
Article 147. The Cabinet
Article 148. Composition of the Cabinet
Article 149. Conduct of business of the Cabinet
Article 150. Responsibility of the Cabinet
Article 151. Vote of no confidence in the Cabinet
Article 152. Principal Secretaries
Article 153. National government administrative officers
Article 154. Foreign relations
Article 155. National security
Article 156. National Security Council
Article 157. Command of National Defence Forces
Article 158. Alternative dispute resolution

CHAPTER TEN—JUDICIARY
Article 159. Judicial authority and legal system
Article 160. Independence of the Judiciary
Article 161. Establishment of courts
Article 162. System of courts
Article 163. High Court
Article 164. Jurisdiction of the High Court
Article 165. Court of Appeal
Article 166. Jurisdiction of the Court of Appeal
Article 167. The Supreme Court
Article 168. Jurisdiction of the Supreme Court
Article 169. Subordinate courts
Article 170. Traditional dispute resolution mechanisms
Article 171. Language of the courts
Article 172. Judicial Service Commission
Article 173. Appointment of judges
Article 174. Tenure of office of judges
Article 175. Removal from office
Article 176. Vetting of judges and magistrates
Article 177. Remuneration and benefits of judges
Article 178. Administrative independence of the Judiciary

CHAPTER ELEVEN—DEVOLVED GOVERNMENT
Article 174. Objects of devolution
Article 175. Principles of devolved government
Article 176. County governments
Article 177. Membership of county assemblies
Article 178. County executive committee
Article 179. County governor and deputy county governor
Article 180. Election of county governor
Article 181. Removal of a county governor
Article 182. Deputy county governor
Article 183. County executive committee
Article 184. Urban areas and cities
Article 185. Legislative authority of county governments
Article 186. Respective functions and powers of national and county governments
Article 187. Transfer of functions
Article 188. Boundaries of counties
Article 189. Cooperation between national and county governments
Article 190. Support for county governments
Article 191. County governments' additional sources of revenue
Article 192. Revenue allocated to county governments
Article 193. Conditional allocations to county governments
Article 194. Equitable sharing of national revenue
Article 195. Revenue Allocation Commission
Article 196. Accounting and audit in county governments

CHAPTER TWELVE—PUBLIC FINANCE
Article 201. Principles of public finance
Article 202. Revenue raising powers and the basis of equitable sharing
Article 203. Equitable sharing of revenue raised nationally
Article 204. Equitable sharing and revenue allocation
Article 205. Legislation on equitable sharing and revenue allocation
Article 206. Contingencies Fund
Article 207. Division of revenue Bills
Article 208. County Allocation of Revenue Bill
Article 209. Annual Division of Revenue Bill
Article 210. Appropriation Bills
Article 211. Financial control
Article 212. Office of the Controller of Budget
Article 213. Parliamentary Service Commission
Article 214. Parliamentary Service Commission
Article 215. Parliamentary Service Commission
Article 216. Revenue Funds
Article 217. Public money
Article 218. Appropriation of public money
Article 219. Annual financial statements
Article 220. Accounts and audit of public finances
Article 221. Audit of public finances
Article 222. Auditor-General
Article 223. Finances of county governments
Article 224. County Revenue Funds
Article 225. Financial control in county governments
Article 226. Accounts and audit of county governments
Article 227. Procurement of public goods and services
Article 228. Central Bank of Kenya

CHAPTER THIRTEEN—THE PUBLIC SERVICE
Article 230. Public service values and principles
Article 231. Values and principles of public service
Article 232. Citizens' right to services
Article 233. Public Service Commission
Article 234. Functions and powers of the Public Service Commission
Article 235. Composition of the Public Service Commission
Article 236. Terms of service of members of commissions
Article 237. Teachers Service Commission
Article 238. Functions of the Teachers Service Commission
Article 239. National Police Service Commission
Article 240. Functions of the National Police Service Commission
Article 241. National Police Service
Article 242. Command of the National Police Service
Article 243. Objects and functions of the National Police Service
Article 244. Cooperation of police with other agencies
Article 245. Kenya Defence Forces
Article 246. Establishment of the Kenya Defence Forces
Article 247. Command of the Kenya Defence Forces
Article 248. Functions of the Kenya Defence Forces
Article 249. National security organs

CHAPTER FOURTEEN—NATIONAL SECURITY
Article 238. National security
Article 239. National security organs
Article 240. Principles of national security

CHAPTER FIFTEEN—COMMISSIONS AND INDEPENDENT OFFICES
Article 248. Commissions and independent offices
Article 249. Objects, authority and functions of commissions and independent offices
Article 250. Independence of commissions and holders of independent offices
Article 251. Tenure and remuneration of commissioners
Article 252. Removal from office
Article 253. Incorporation of commissions
Article 254. Reporting by commissions and independent offices
Article 255. Budget and expenditure of commissions and independent offices
Article 256. Kenya National Human Rights and Equality Commission
Article 257. Commission on Revenue Allocation
Article 258. Salaries and Remuneration Commission
Article 259. Parliamentary Service Commission

CHAPTER SIXTEEN—AMENDMENT OF THIS CONSTITUTION
Article 255. Amendment of this Constitution by referendum
Article 256. Amendment of this Constitution by Parliament
Article 257. Amendments affecting counties

CHAPTER SEVENTEEN—GENERAL PROVISIONS
Article 258. Enforcement of this Constitution
Article 259. Jurisdictional questions arising from this Constitution
Article 260. Interpretation
Article 261. Consequential legislation
Article 262. Transitional and consequential provisions

CHAPTER EIGHTEEN—TRANSITIONAL AND CONSEQUENTIAL PROVISIONS
Article 263. Transitional arrangements
Article 264. Continuation in office
Article 265. Validation of appointments
Article 266. Pending Bills and motions
Article 267. Pending legal proceedings
Article 268. Existing obligations, rights etc.
Article 269. Succession to property and assets
Article 270. Devolution
Article 271. Legislation
Article 272. Final provisions

    },
    {
      id: "penal-code",
      title: "Penal Code",
      icon: Scale,
      description: "Comprehensive criminal offenses and penalties under Kenyan law",
      color: "text-secondary",
      content: `PENAL CODE PROVISIONS - COMPREHENSIVE REFERENCE

CRIMINAL LAW UNDER KENYA CONSTITUTION 2010

CHAPTER FOUR—THE BILL OF RIGHTS
General provisions on rights and criminal procedures

25. Fundamental rights and freedoms
(1) Despite any other provision in this Constitution, the following rights and fundamental freedoms shall not be limited—
(a) freedom from torture and cruel, inhuman or degrading treatment or punishment;
(b) freedom from slavery or servitude;
(c) the right to a fair trial; and
(d) the right to an order of habeas corpus.

49. Rights of arrested persons
(1) An arrested person has the right—
(a) to remain silent;
(b) to be informed promptly, in language that the person understands, of—
(i) the reason for the arrest;
(ii) the right to remain silent; and
(iii) the consequences of not remaining silent;
(c) not to be compelled to make any confession or admission that could be used in evidence against the person;
(d) to be held separately from persons who are serving a sentence;
(e) to be brought before a court as soon as reasonably possible, but not later than—
(i) twenty-four hours after being arrested; or
(ii) if the twenty-four hours ends outside ordinary court hours, or on a day that is not an ordinary court day, the end of the next court day;
(f) at the first court appearance, to be charged or informed of the reason for the detention continuing, or to be released; and
(g) to be released on bond or bail, on reasonable conditions, pending a charge or trial, unless there are compelling reasons not to be released.
(2) A person shall not be remanded in custody for an offence if the offence is punishable by a fine only or by imprisonment for not more than six months.

50. Fair hearing
(1) Every person has the right to have any dispute that can be resolved by the application of law decided in a fair and public hearing before a court or, if appropriate, another independent and impartial tribunal or body.
(2) Every person who is charged with a criminal offence has the right—
(a) to be presumed innocent until the contrary is proved;
(b) to be informed of the charge promptly, in detail and in a language that the person understands;
(c) to have adequate time and facilities to prepare a defence;
(d) to a public trial before a court established by law;
(e) to have the trial begin and conclude without unreasonable delay;
(f) to be present when being tried;
(g) to choose, and be represented by, an advocate, and to be informed of this right promptly;
(h) to have an advocate assigned to the person by the State and at State expense, if substantial injustice would otherwise result, and to be informed of this right promptly;
(i) to remain silent, and not to testify during the proceedings;
(j) to be protected against self-incrimination;
(k) not to be convicted for an act or omission that at the time it was committed or omitted was not—
(i) an offence under any law; or
(ii) a criminal offence under international law;
(l) not to be tried for an offence in respect of an act or omission for which the person has previously been either acquitted or convicted;
(m) to the benefit of the least severe of the prescribed punishments for an offence, if the prescribed punishment for the offence has been changed between the time that the offence was committed and the time of sentencing; and
(n) if convicted, to appeal to, or apply for review by, a higher court as prescribed by law.
(3) If this Article requires information to be given to a person, the information shall be given in a language that the person understands.
(4) Evidence obtained in a manner that violates any right or fundamental freedom in the Bill of Rights shall be excluded if the admission of that evidence would render the trial unfair, or would otherwise be detrimental to the administration of justice.

51. Rights of persons detained, held in custody or imprisoned
(1) A person who is detained, held in custody or imprisoned under the law, retains all the rights and fundamental freedoms in the Bill of Rights, except to the extent that any particular right or a fundamental freedom is clearly incompatible with the fact that the person is detained, held in custody or imprisoned.
(2) A person who is detained or held in custody is entitled to petition for an order of habeas corpus.
(3) Parliament shall enact legislation providing for the conditions of detention of persons awaiting trial and persons imprisoned under the law, taking into account the need—
(a) to ensure that the conditions of detention observe the human dignity of detained persons;
(b) to provide proper accommodation, nutrition, reading material and medical treatment at the expense of the State;
(c) to enable a detained person to communicate with their family and advocate; and
(d) to enable a detained person to be visited by their family, advocate, religious counsellor and medical practitioner.

CRIMINAL OFFENSES AND PENALTIES

OFFENSES AGAINST THE PERSON
Murder: The unlawful killing of a human being with malice aforethought
- Penalty: Death or life imprisonment
- Provisions: Protected under Article 26 (Right to life)

Manslaughter: The unlawful killing of a human being without malice aforethought
- Penalty: Life imprisonment
- Mitigating factors considered under constitutional fair trial provisions

Assault: The intentional application of force or threat of force against another person
- Simple assault: Fine or imprisonment up to 2 years
- Aggravated assault: Up to 7 years imprisonment
- Protected under Article 29 (Freedom and security of person)

OFFENSES AGAINST PROPERTY
Theft: The dishonest appropriation of property belonging to another
- Penalty varies by value: Fine to 14 years imprisonment
- Aggravated theft (with violence): 14 years to life imprisonment

Robbery: Theft accompanied by violence or threat of violence
- Penalty: 14 years to life imprisonment
- Armed robbery: Minimum 15 years imprisonment

Burglary: Unlawful entry into premises with intent to commit theft
- Penalty: Up to 14 years imprisonment

OFFENSES AGAINST PUBLIC ORDER
Sedition: Actions intended to incite rebellion against lawful authority
- Balanced against Article 33 (Freedom of expression)
- Penalty: Up to 7 years imprisonment

Unlawful assembly: Gathering of 3+ persons for unlawful purpose
- Protected under Article 37 (Assembly, demonstration, petition and petition)
- Must be balanced with public safety

CORRUPTION AND ECONOMIC CRIMES
Corruption: Abuse of office for private gain
- Under Article 73 (Public service values and principles)
- Penalty: Up to 10 years imprisonment and asset forfeiture
- Enhanced penalties for public officers

Money laundering: Concealing proceeds of crime
- Penalty: Up to 14 years imprisonment
- Asset forfeiture provisions

CYBERCRIME OFFENSES
Computer misuse: Unauthorized access to computer systems
- Penalty: Up to 10 years imprisonment
- Identity theft: Up to 10 years imprisonment
- Cyber harassment: Up to 10 years imprisonment

CONSTITUTIONAL PROTECTIONS IN CRIMINAL LAW
1. Presumption of innocence (Article 50(2)(a))
2. Right to legal representation (Article 50(2)(g))
3. Protection against self-incrimination (Article 50(2)(j))
4. Right to interpreter services (Article 50(3))
5. Prohibition of double jeopardy (Article 50(2)(l))
6. Right to appeal (Article 50(2)(n))

SENTENCING PRINCIPLES
1. Proportionality to offense severity
2. Consideration of mitigating factors
3. Alternative dispute resolution where appropriate
4. Rehabilitation over purely punitive measures
5. Community service as alternative to imprisonment
6. Restorative justice principles

Created by Sydney Walter`
    },
    {
      id: "criminal-justice",
      title: "Criminal Justice",
      icon: Shield,
      description: "Comprehensive justice system procedures and protections",
      color: "text-primary",
      content: `CRIMINAL JUSTICE SYSTEM - COMPREHENSIVE FRAMEWORK

CONSTITUTIONAL FOUNDATION FOR CRIMINAL JUSTICE

CHAPTER TEN—JUDICIARY

159. Judicial authority
(1) Judicial authority is derived from the people and vests in, and shall be exercised by, the courts and tribunals established by or under this Constitution.
(2) In exercising judicial authority, the courts and tribunals shall be guided only by this Constitution and the law and shall not be subject to the control or direction of any person or authority.
(3) In the exercise of judicial authority, the courts and tribunals shall observe, uphold and promote the rule of law, and shall ensure equal justice under law.
(4) Justice shall be done to all, irrespective of status.
(5) Justice shall not be delayed.

160. Independence of the Judiciary
(1) In the exercise of judicial authority, the Judiciary, as constituted by Article 161, shall be subject only to this Constitution and the law and shall not be subject to the control or direction of any person or authority.
(2) The office of a judge of a superior court shall not be abolished while there is a substantive holder of the office.
(3) The remuneration and benefits payable to or in respect of judges shall be a charge on the Consolidated Fund.
(4) The remuneration and benefits payable to, or in respect of, a judge shall not be varied to the disadvantage of that judge, and the retirement benefits of a judge shall not be taxed.
(5) A member of the Judiciary is not liable in an action or suit in respect of anything done or omitted to be done in good faith in the lawful exercise of a judicial function.

161. Judicial offices and officers
(1) The Judiciary consists of—
(a) the Chief Justice, who shall be the head of the Judiciary;
(b) the Deputy Chief Justice, who shall be the deputy head of the Judiciary;
(c) the judges of the superior courts;
(d) the magistrates, other judicial officers and staff.
(2) There is established the office of Chief Justice.
(3) The Chief Justice shall be nominated and appointed in accordance with the procedure set out in Article 166.

162. System of courts
(1) The superior courts are—
(a) the Supreme Court;
(b) the Court of Appeal;
(c) the High Court; and
(d) such other courts as may be established by an Act of Parliament, other than those referred to in clause (2).
(2) Parliament may establish courts with the status of the High Court to hear and determine disputes relating to—
(a) employment and labour relations;
(b) the environment and the use and occupation of, and title to, land; and
(c) such other special jurisdiction as Parliament may, by legislation, specify.
(3) The subordinate courts are the magistrates' courts and any other courts established by or under an Act of Parliament, other than those referred to in clause (1).
(4) Parliament shall enact legislation conferring jurisdiction, functions and powers on the courts established under this Constitution.

CRIMINAL JUSTICE PROCEDURES

PRE-TRIAL PROCEDURES
1. Investigation by Police
- Constitutional mandate under Article 244
- Kenya Police Service responsibilities
- Evidence collection procedures
- Witness protection protocols

2. Arrest Procedures
- Warrant-based arrests
- Warrantless arrests in specific circumstances
- Rights of arrested persons (Article 49)
- Time limits for appearance before magistrate

3. Prosecution Decisions
- Director of Public Prosecutions authority (Article 157)
- Case assessment and charging decisions
- Plea bargaining procedures
- Witness protection programs

TRIAL PROCEDURES
1. Pre-trial Conferences
- Case management procedures
- Disclosure of evidence
- Plea negotiations
- Scheduling of hearings

2. Trial Process
- Open court proceedings (subject to exceptions)
- Rules of evidence
- Examination of witnesses
- Cross-examination rights
- Closing arguments

3. Sentencing
- Judicial discretion within statutory limits
- Mitigating and aggravating factors
- Alternative sentencing options
- Victim impact statements

POST-TRIAL PROCEDURES
1. Appeals Process
- Right to appeal (Article 50(2)(n))
- Appellate court hierarchy
- Grounds for appeal
- Time limits for filing appeals

2. Enforcement of Sentences
- Prison system management
- Probation and community service
- Fine collection procedures
- Asset forfeiture processes

JUVENILE JUSTICE
Special procedures for persons under 18 years:
- Child-friendly court procedures
- Diversion programs
- Family involvement in proceedings
- Rehabilitation focus over punishment
- Special sentencing options

ALTERNATIVE DISPUTE RESOLUTION
1. Traditional Justice Systems
- Recognition under Article 159(2)(c)
- Community-based resolution
- Restorative justice principles
- Integration with formal system

2. Plea Bargaining
- Early case resolution
- Reduced court congestion
- Victim compensation
- Supervised implementation

VICTIM RIGHTS AND PROTECTION
1. Constitutional Protections
- Right to dignity (Article 28)
- Right to fair trial participation
- Protection from secondary victimization
- Compensation mechanisms

2. Special Categories
- Gender-based violence victims
- Child victims and witnesses
- Elderly and disabled victims
- Human trafficking victims

CORRECTIONAL SERVICES
1. Prison Management
- Constitutional requirements for humane treatment
- Rehabilitation programs
- Educational and vocational training
- Healthcare provision

2. Community-Based Corrections
- Probation supervision
- Community service orders
- Electronic monitoring
- Halfway house programs

PROFESSIONAL STANDARDS
1. Judicial Officers
- Code of conduct
- Disciplinary procedures
- Continuing education requirements
- Performance evaluation

2. Legal Practitioners
- Law Society of Kenya regulation
- Professional ethics
- Client representation standards
- Pro bono obligations

All Rights Reserved to Sydney Walter © 2024`
    },
    {
      id: "legal-systems",
      title: "Legal Systems",
      icon: Gavel,
      description: "Complete structure and hierarchy of Kenya's legal framework",
      color: "text-secondary",
      content: `KENYA LEGAL SYSTEMS - COMPLETE FRAMEWORK

CONSTITUTIONAL FOUNDATION

CHAPTER ONE—THE REPUBLIC
Structure and Governance Principles

6. Devolution
(1) The territory of Kenya is divided into the counties specified in the First Schedule.
(2) A county shall not be altered except by a resolution—
(a) passed by the National Assembly with the support of at least two-thirds of all the members of the Assembly; and
(b) approved by a majority of the county assemblies.
(3) A resolution under clause (2) shall not be passed without the prior consent of—
(a) the commission established to consider the matter; and
(b) the people of the county concerned expressed through a referendum.

7. National, official and other languages
(1) The national language of the Republic is Kiswahili.
(2) The official languages of the Republic are Kiswahili and English.
(3) The State shall—
(a) promote and protect the diversity of language of the people of Kenya; and
(b) promote the development and use of indigenous languages, Kenyan Sign language, Braille and other communication formats and technologies accessible to persons with disabilities.

SOURCES OF LAW IN KENYA

1. THE CONSTITUTION
- Supreme law of the land (Article 2)
- All other laws must conform to constitutional provisions
- Bill of Rights as fundamental framework
- Devolution structure and principles

2. WRITTEN LAWS (STATUTES)
Primary Legislation:
- Acts of Parliament
- County assembly legislation within devolved functions
- Subsidiary legislation (regulations, rules, orders)

3. COMMON LAW
- English common law as received law
- Judicial precedents and case law
- Equity principles
- Commercial law principles

4. CUSTOMARY LAW
- African customary law
- Islamic law (in specific contexts)
- Hindu law (in specific contexts)
- Subject to constitutional compatibility

5. INTERNATIONAL LAW
- General rules of international law (Article 2(5))
- Ratified treaties and conventions (Article 2(6))
- International criminal law
- Human rights instruments

COURT HIERARCHY AND JURISDICTION

SUPERIOR COURTS

1. Supreme Court (Article 163)
Jurisdiction:
- Constitutional interpretation
- Presidential election petitions
- Death penalty appeals
- Inter-governmental disputes
- Appeals from Court of Appeal on constitutional matters

2. Court of Appeal (Article 164)
Jurisdiction:
- Appeals from High Court
- Final court for most matters
- Constitutional review on appeal
- Administrative law appeals

3. High Court (Article 165)
Jurisdiction:
- Unlimited original jurisdiction
- Constitutional petitions
- Judicial review of administrative action
- Commercial disputes above certain thresholds
- Family law matters
- Land and environment disputes

SUBORDINATE COURTS

1. Magistrates' Courts
Classes and Jurisdiction:
- Chief Magistrates: Up to 10 years imprisonment
- Principal Magistrates: Up to 7 years imprisonment
- Senior Principal Magistrates: Up to 14 years imprisonment
- Resident Magistrates: Specific jurisdictional limits

2. Specialized Courts
- Employment and Labour Relations Court
- Environment and Land Court
- Family Courts
- Children's Courts
- Traffic Courts

QUASI-JUDICIAL BODIES

1. Administrative Tribunals
- Land disputes tribunals
- Employment disputes tribunals
- Tax appeals tribunal
- Professional disciplinary tribunals

2. Constitutional Commissions
- Kenya National Commission on Human Rights
- Commission on Administrative Justice (Ombudsman)
- National Gender and Equality Commission
- Ethics and Anti-Corruption Commission

LEGAL PROFESSION STRUCTURE

1. Legal Practitioners
- Advocates of the High Court
- Law Society of Kenya regulation
- Continuing Professional Development requirements
- Pro bono obligations

2. Judicial Officers
- Judges of superior courts
- Magistrates and other judicial officers
- Judicial Service Commission oversight
- Professional development requirements

3. Other Legal Officers
- State Counsel (Attorney General's office)
- Prosecutors (Office of Director of Public Prosecutions)
- Legal officers in government ministries
- Corporate legal counsel

ENFORCEMENT MECHANISMS

1. Executive Enforcement
- Kenya Police Service
- Directorate of Criminal Investigations
- Kenya Prison Service
- Probation and After-care Service

2. Regulatory Bodies
- Professional regulatory bodies
- Sectoral regulators (communications, banking, etc.)
- County government enforcement
- Specialized enforcement agencies

ALTERNATIVE DISPUTE RESOLUTION

1. Traditional Justice Systems (Article 159(2)(c))
- Recognized customary dispute resolution
- Community-based mechanisms
- Elder-mediated processes
- Compensation and reconciliation

2. Modern ADR
- Arbitration (domestic and international)
- Mediation and conciliation
- Plea bargaining in criminal matters
- Court-annexed ADR programs

DEVOLVED GOVERNMENT LEGAL FRAMEWORK

1. County Governments (Chapter 11)
- County assemblies legislative powers
- County executive implementation
- Intergovernmental relations
- Conflict resolution mechanisms

2. Functions Distribution
- National government functions (Fourth Schedule Part 1)
- County government functions (Fourth Schedule Part 2)
- Concurrent functions
- Residual functions

LEGAL EDUCATION AND TRAINING

1. Legal Education
- University law degree programs
- Kenya School of Law post-graduate diploma
- Pupillage and articling requirements
- Continuing legal education

2. Judicial Training
- Kenya Judiciary Training Institute
- Induction programs for new judicial officers
- Continuing judicial education
- International exchange programs

ACCESS TO JUSTICE

1. Constitutional Guarantees
- Right to fair trial (Article 50)
- Access to justice for all
- Legal aid provisions
- Language interpretation services

2. Implementation Mechanisms
- National Legal Aid Service
- Pro bono legal services
- Simplified court procedures
- Mobile courts for remote areas

INTERNATIONAL LEGAL COOPERATION

1. Treaties and Conventions
- Bilateral legal assistance treaties
- Multilateral conventions
- Extradition agreements
- Mutual legal assistance

2. Regional Integration
- East African Community legal framework
- African Union legal instruments
- International criminal law cooperation
- Trade and commercial law harmonization

LEGAL RESEARCH AND DEVELOPMENT

1. Law Reform
- Kenya Law Reform Commission
- Continuous review of laws
- Public participation in law reform
- Legislative drafting standards

2. Legal Information Systems
- Kenya Law Reports
- Legal databases and research tools
- Court management systems
- Case law accessibility

Created by Sydney Walter`
    }
  ];

  const getDocumentContent = (docId: string) => {
    return documents.find(doc => doc.id === docId)?.content || "";
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Kenya Legal <span className="text-primary">Documents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access comprehensive legal documents and constitutional provisions 
            that form the foundation of Kenya's justice system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((document) => (
            <Dialog key={document.id}>
              <DialogTrigger asChild>
                <Card className="p-6 cursor-pointer bg-card/80 backdrop-blur-sm border border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-primary rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <document.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {document.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {document.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Click to View
                    </Badge>
                  </div>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-2xl">
                    <document.icon className="w-6 h-6 text-primary" />
                    {document.title}
                  </DialogTitle>
                </DialogHeader>
                
                <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {document.content}
                  </div>
                </ScrollArea>
                
                <div className="flex justify-end mt-4">
                  <Badge variant="outline" className="text-xs">
                    Kenya Constitution 2010
                  </Badge>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-2">
            All documents are based on the official Kenya Constitution 2010. 
            For complete texts, consult official government publications.
          </p>
          <p className="text-xs text-muted-foreground">
            All Rights Reserved to Sydney Walter © 2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegalDocuments;
