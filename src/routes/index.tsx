import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, BarChart3, Check, ChevronRight, Coins, Copy, Crosshair, History, Play, ShieldCheck, Swords, Trophy, Wallet, X, Zap } from "lucide-react";
import { Button } from "../components/Button";
import arenaArt from "../assets/arena.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "COIL — Enter the Arena" },
    { name: "description", content: "Coil is a competitive snake arena. Grow bigger, outplay your rivals, and climb the leaderboard. Coming soon." },
    { property: "og:title", content: "COIL — Enter the Arena" },
    { property: "og:description", content: "Grow bigger. Outplay your rivals. Dominate the leaderboard. A competitive snake arena coming soon." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

type ModalKind = "login" | "register" | "forgot" | "topup" | "withdraw" | "history" | "leaderboard" | "terms" | "privacy" | "responsible" | "support" | null;
const TOPUP_ADDRESS = "DPzKJPjWWjLgd5EvuRev4qtvsMPT3ei3shdwyDSJDB1T";
function Header({ open }: { open: (modal: ModalKind) => void }) {
  return <>
    <header className="site-header"><div className="header-inner">
      <a href="#home" className="brand" aria-label="Coil home"><span className="brand-mark"><Zap size={21} strokeWidth={3} /></span><span>coil<span className="brand-dot">.</span></span></a>
      <nav className="main-nav" aria-label="Main navigation"><a href="#home">Home</a><a href="#leaderboard">Leaderboard</a><a href="#how-to-play">How to Play</a></nav>
      <div className="header-actions"><span className="online-pill"><span className="status-dot" /> Available players: not yet live</span><Button variant="ghost" className="login-button" onClick={() => open("login")}>Log in</Button><Button variant="primary" onClick={() => open("register")}>Register <ArrowRight size={14} /></Button></div>
    </div></header>
    <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#home">Home</a><a href="#leaderboard">Leaderboard</a><a href="#how-to-play">How to Play</a><span className="mobile-availability">Players: not yet live</span></nav>
  </>;
}

function Leaderboard({ open }: { open: (modal: ModalKind) => void }) {
  return <div className="panel leader-panel" id="leaderboard">
    <div className="panel-heading"><h2><Trophy size={17} /> Leaderboard</h2></div>
    <div className="score-head"><span>#</span><span>Player</span><span>Kills</span><span>Best</span><span>Wins</span></div>
    <div className="leader-empty">No players ranked yet.<span>Results will appear when matches begin.</span></div>
    <button className="panel-link" onClick={() => open("leaderboard")}>View full leaderboard <ArrowRight size={13} /></button>
  </div>;
}

function WalletPanel({ open }: { open: (modal: ModalKind) => void }) {
  return <div className="panel wallet-panel">
    <div className="panel-heading"><h2><Wallet size={17} /> Wallet</h2></div>
    <div className="wallet-balance-label">Available balance</div><div className="wallet-balance">$0.00</div><div className="wallet-note">Preview balance · Not connected to deposits</div>
    <div className="wallet-stats"><div><span>Total deposits</span><strong>$0.00</strong></div><div><span>Total withdrawals</span><strong>$0.00</strong></div></div>
    <div className="wallet-actions"><Button variant="primary" size="small" onClick={() => open("topup")}><Coins size={14} /> Top up</Button><Button variant="outline" size="small" onClick={() => open("withdraw")}>Withdraw</Button></div>
    <button className="panel-link" onClick={() => open("history")}>Transaction history <ChevronRight size={13} /></button>
  </div>;
}

function Hero({ open }: { open: (modal: ModalKind) => void }) {
  return <section className="arena" id="home" aria-label="Coil arena">
    <img className="arena-art" src={arenaArt} alt="Colorful snakes weaving through a dark arena filled with glowing orbs" width={1600} height={900} />
    <div className="arena-inner"><div className="arena-intro"><span className="eyebrow"><span className="status-dot" /> The next competitive snake arena</span><h1>ENTER THE ARENA.</h1><p>Grow bigger. Outplay your rivals. Dominate the leaderboard.</p></div>
      <div className="arena-panels"><Leaderboard open={open} /><div className="panel play-panel"><div className="play-top"><Crosshair size={15} /> Ready to coil?</div><h2>Your next move starts here.</h2><p>One arena. Endless ways to win.</p><Button variant="primary" size="large" onClick={() => open("login")}><Play size={18} fill="currentColor" /> PLAY NOW <ArrowRight size={18} /></Button><div className="play-availability"><span className="status-dot" /> Available players: not yet live · Game coming soon</div></div><WalletPanel open={open} /></div>
    </div>
  </section>;
}

function BelowFold() {
  const steps = [
    { title: "Collect orbs", text: "Sweep the arena for glowing orbs and build your momentum." },
    { title: "Grow your snake", text: "Get longer with every pickup. Stay sharp as the stakes rise." },
    { title: "Outplay rivals", text: "Cut off opponents, dodge collisions, and control the arena." },
    { title: "Climb the ranks", text: "Turn every match into a shot at the top of the board." },
  ];
  return <main className="content-band" id="how-to-play"><div className="section-heading"><div><span className="eyebrow">01 / The game</span><h2>How to play</h2></div><p>Simple to learn. Hard to master.</p></div>
    <div className="steps">{steps.map((step, index) => <div className="step" key={step.title}><span className="step-number">0{index + 1} /</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div>
    <div className="features-strip" aria-label="Planned game features"><span className="feature-chip"><Swords size={14} /> Real-time PvP</span><span className="feature-chip"><Trophy size={14} /> Competitive rankings</span><span className="feature-chip"><Zap size={14} /> Snake skins</span><span className="feature-chip"><BarChart3 size={14} /> Match statistics</span></div>
  </main>;
}

function Footer({ open }: { open: (modal: ModalKind) => void }) {
  return <footer className="footer"><div className="footer-inner"><p>© {new Date().getFullYear()} COIL. Built for the thrill of the chase.</p><div className="footer-links"><button onClick={() => open("terms")}>Terms of Service</button><button onClick={() => open("privacy")}>Privacy Policy</button><button onClick={() => open("responsible")}>Responsible Play</button><button onClick={() => open("support")}>Support</button></div></div></footer>;
}

function Modal({ kind, close, switchTo }: { kind: Exclude<ModalKind, null>; close: () => void; switchTo: (kind: ModalKind) => void }) {
  const [message, setMessage] = useState("");
  const [addressState, setAddressState] = useState<"idle" | "loading" | "ready">("idle");
  useEffect(() => { setMessage(""); setAddressState("idle"); }, [kind]);
  useEffect(() => {
    if (kind !== "topup" || addressState !== "loading") return;
    const timer = window.setTimeout(() => setAddressState("ready"), 3000);
    return () => window.clearTimeout(timer);
  }, [kind, addressState]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [close]);

  const titles: Record<Exclude<ModalKind, null>, string> = { login: "Welcome back", register: "Create an account", forgot: "Reset password", topup: "Top up", withdraw: "Withdrawals", history: "Transaction history", leaderboard: "Leaderboard", terms: "Terms of Service", privacy: "Privacy Policy", responsible: "Responsible Play", support: "Support" };
  const submitAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (kind === "register" && data.get("password") !== data.get("confirm")) { setMessage("Passwords do not match. Please try again."); return; }
    setMessage("Account access is not available yet. No information was saved.");
  };

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="modal-top"><div><span className="eyebrow">COIL / {kind === "register" || kind === "login" ? "Account" : kind === "topup" || kind === "withdraw" || kind === "history" ? "Wallet" : "Info"}</span><h2 id="modal-title">{titles[kind]}</h2></div><Button variant="ghost" size="icon" aria-label="Close dialog" onClick={close}><X size={20} /></Button></div>
    {(kind === "login" || kind === "register" || kind === "forgot") && <><p className="modal-copy">{kind === "forgot" ? "Password recovery will be available when accounts launch." : "Accounts and matchmaking are coming soon. This form is a preview only."}</p><form onSubmit={submitAuth}>
      {kind === "register" && <label className="field"><span>Username</span><input name="username" placeholder="Your player name" required minLength={3} autoComplete="username" /></label>}
      <label className="field"><span>{kind === "login" ? "Email or username" : "Email"}</span><input name="email" type={kind === "login" ? "text" : "email"} placeholder={kind === "login" ? "Email or username" : "you@example.com"} required autoComplete="email" /></label>
      {kind !== "forgot" && <label className="field"><span>Password</span><input name="password" type="password" placeholder="At least 8 characters" required minLength={8} autoComplete={kind === "register" ? "new-password" : "current-password"} /></label>}
      {kind === "register" && <label className="field"><span>Confirm password</span><input name="confirm" type="password" placeholder="Repeat your password" required minLength={8} autoComplete="new-password" /></label>}
      {kind === "login" && <div className="form-options"><label className="check-label"><input type="checkbox" /> Remember me</label><button type="button" className="text-action" onClick={() => switchTo("forgot")}>Forgot password?</button></div>}
      {message && <p role="status" className="form-message">{message}</p>}
      <Button variant="primary" className="modal-submit" type="submit">{kind === "register" ? "Create account" : kind === "forgot" ? "Request reset" : "Log in"} <ArrowRight size={15} /></Button>
    </form><p className="modal-switch">{kind === "login" ? "New to the arena?" : "Already have an account?"} <button className="text-action" onClick={() => switchTo(kind === "login" ? "register" : "login")}>{kind === "login" ? "Register" : "Log in"}</button></p></>}
    {kind === "topup" && <><p className="modal-copy">View the provided Solana wallet address.</p><div className="notice-box"><strong>Solana network only: SOL or USDC on Solana.</strong> Do not send funds yet. This preview cannot verify transfers, credit your balance, or process refunds. The address shown is provided for this page, not a unique wallet generated for your account.</div>{addressState === "idle" && <Button variant="primary" className="modal-submit" onClick={() => setAddressState("loading")}>Generate wallet address</Button>}{addressState === "loading" && <div className="address-loading" role="status"><span className="address-spinner" aria-hidden="true" /> Loading wallet address…</div>}{addressState === "ready" && <div className="address-result"><span className="address-label">Solana wallet address</span><div className="address-row"><code>{TOPUP_ADDRESS}</code><Button variant="outline" size="icon" aria-label="Copy wallet address" title="Copy wallet address" onClick={async () => { try { await navigator.clipboard.writeText(TOPUP_ADDRESS); setMessage("Address copied."); } catch { setMessage("Could not copy automatically. Please select the address to copy it."); } }}>{message === "Address copied." ? <Check size={16} /> : <Copy size={16} />}</Button></div>{message && <p role="status" className="address-message">{message}</p>}</div>}</>}
    {kind === "withdraw" && <><div className="notice-box"><strong>Real-money withdrawals are not enabled.</strong> The $0.00 preview balance is not connected to deposits. No withdrawal can be requested or completed in this version.</div><Button variant="secondary" className="modal-submit" onClick={close}>Got it</Button></>}
    {kind === "history" && <><p className="modal-copy">No transactions yet. This preview cannot track deposits or withdrawals.</p><div className="notice-box"><History size={18} /> Your history will appear here when account wallets become available.</div></>}
    {kind === "leaderboard" && <><p className="modal-copy">No players ranked yet. Results will appear when matches begin.</p><div className="score-head"><span>#</span><span>Player</span><span>Kills</span><span>Best</span><span>Wins</span></div><div className="leader-empty">No match results available.</div></>}
    {kind === "terms" && <p className="modal-copy">The game is not yet available. Official terms of service will be provided before account creation or gameplay opens.</p>}
    {kind === "privacy" && <p className="modal-copy">This preview does not create accounts or submit your form entries. An official privacy policy will be available before launch.</p>}
    {kind === "responsible" && <><div className="notice-box"><ShieldCheck size={18} /> This preview uses virtual credits only. They have no cash value and cannot be redeemed for money.</div><p className="modal-copy">Take breaks and play within your limits. Real-money features are not part of this version.</p></>}
    {kind === "support" && <p className="modal-copy">Support contact information will be published before the game launches. No support request is submitted from this preview.</p>}
  </section></div>;
}

function Index() {
  const [modal, setModal] = useState<ModalKind>(null);
  return <><Header open={setModal} /><Hero open={setModal} /><BelowFold /><Footer open={setModal} />{modal && <Modal kind={modal} close={() => setModal(null)} switchTo={setModal} />}</>;
}