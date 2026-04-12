import { useState, useRef } from 'react';
import './CostCalculator.css';

interface CostItem {
  id: string;
  name: string;
  costPerBox: number;
  category: 'product' | 'packaging';
}

const DEFAULT_ITEMS: CostItem[] = [
  { id: 'p1', name: "Children's Book #1", costPerBox: 0, category: 'product' },
  { id: 'p2', name: "Children's Book #2", costPerBox: 0, category: 'product' },
  { id: 'p3', name: "Children's Book #3", costPerBox: 0, category: 'product' },
  { id: 'p4', name: 'Adult Book',         costPerBox: 0, category: 'product' },
  { id: 'p5', name: '12oz Coffee Bag',    costPerBox: 0, category: 'product' },
  { id: 'k1', name: 'Box',               costPerBox: 3.29, category: 'packaging' },
  { id: 'k2', name: 'Info Card',         costPerBox: 0.56, category: 'packaging' },
  { id: 'k3', name: 'Postcard',          costPerBox: 0.19, category: 'packaging' },
  { id: 'k4', name: 'Tissue Paper',      costPerBox: 0.41, category: 'packaging' },
  { id: 'k5', name: 'Tape',             costPerBox: 0.11, category: 'packaging' },
  { id: 'k6', name: 'Crinkle Paper',    costPerBox: 0.13, category: 'packaging' },
  { id: 'k7', name: 'Shipping Labels',  costPerBox: 0.14, category: 'packaging' },
];

function n(v: number | string): number {
  const num = typeof v === 'string' ? parseFloat(v) : v;
  return isFinite(num) ? num : 0;
}

function fmt(v: number): string {
  return n(v).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function NumInput({
  value,
  onChange,
  min = 0,
  step = '0.01',
  className = '',
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: string;
  className?: string;
}) {
  const [raw, setRaw] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <input
      type="text"
      inputMode="decimal"
      className={className}
      value={focused ? raw : (value === 0 ? '' : String(value))}
      placeholder="0"
      onFocus={() => {
        setRaw(value === 0 ? '' : String(value));
        setFocused(true);
      }}
      onChange={e => {
        const s = e.target.value;
        if (/^-?\d*\.?\d*$/.test(s)) {
          setRaw(s);
          const num = parseFloat(s);
          onChange(isNaN(num) ? 0 : Math.max(min, num));
        }
      }}
      onBlur={() => {
        setFocused(false);
      }}
    />
  );
}

export default function CostCalculator() {
  const nextId = useRef(200);

  const [boxName, setBoxName]               = useState('The Book Box');
  const [boxQty, setBoxQty]                 = useState(1000);
  const [seasonsPerYear, setSeasonsPerYear] = useState(4);
  const [price, setPrice]                   = useState(86.95);

  const [items, setItems] = useState<CostItem[]>(DEFAULT_ITEMS);

  const [shopifyRate, setShopifyRate]       = useState(2.9);
  const [rechargeRate, setRechargeRate]     = useState(1.0);
  const [rechargeFlatFee, setRechargeFlatFee] = useState(0.5);

  const [spotlight1, setSpotlight1]         = useState(500);
  const [spotlight2, setSpotlight2]         = useState(0);

  const [fixedExpenses, setFixedExpenses]   = useState(0);
  const [ownerWage, setOwnerWage]           = useState(0);
  const [thirdPartyWages, setThirdPartyWages] = useState(0);

  const [taxRate, setTaxRate]               = useState(12.2);

  // ── Derived ──────────────────────────────────────────────────
  const qty     = Math.max(1, n(boxQty));
  const seasons = Math.max(1, n(seasonsPerYear));
  const p       = n(price);

  const itemCostPerBox = items.reduce((s, i) => s + n(i.costPerBox), 0);
  const shopifyFee     = p * (n(shopifyRate) / 100);
  const rechargeFee    = p * (n(rechargeRate) / 100) + n(rechargeFlatFee);
  const totalFees      = shopifyFee + rechargeFee;
  const totalCost      = itemCostPerBox + totalFees;
  const profitPerBox   = p - totalCost;
  const margin         = p > 0 ? (profitPerBox / p) * 100 : 0;

  const grossRevSeason  = p * qty;
  const grossProfSeason = profitPerBox * qty;
  const sponsorRev      = n(spotlight1) + n(spotlight2);
  const fixedTotal      = n(fixedExpenses) + n(ownerWage) + n(thirdPartyWages);
  const netSeason       = grossProfSeason + sponsorRev - fixedTotal;
  const taxSeason       = netSeason > 0 ? netSeason * (n(taxRate) / 100) : 0;
  const afterTaxSeason  = netSeason - taxSeason;

  const netYearly       = netSeason * seasons;
  const taxYearly       = netYearly > 0 ? netYearly * (n(taxRate) / 100) : 0;
  const afterTaxYearly  = netYearly - taxYearly;

  // ── Item helpers ─────────────────────────────────────────────
  const updateName = (id: string, name: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, name } : it));

  const updateCost = (id: string, costPerBox: number) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, costPerBox } : it));

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(it => it.id !== id));

  const addItem = (category: 'product' | 'packaging') =>
    setItems(prev => [...prev, {
      id: String(nextId.current++),
      name: category === 'product' ? 'New Product' : 'New Packing Item',
      costPerBox: 0,
      category,
    }]);

  const productItems   = items.filter(i => i.category === 'product');
  const packagingItems = items.filter(i => i.category === 'packaging');

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="cc">

      <div className="cc-hero">
        <h1>Box Cost Calculator</h1>
        <p>Model costs, profits, and projections in real time.</p>
      </div>

      <div className="cc-body">
        <div className="cc-layout">

          {/* ── INPUTS ── */}
          <div className="cc-inputs">

            {/* Box setup */}
            <section className="cc-card">
              <h2 className="cc-card-title">Box Setup</h2>
              <div className="cc-form-grid">
                <div className="cc-field">
                  <label>Box Name</label>
                  <input
                    type="text"
                    value={boxName}
                    onChange={e => setBoxName(e.target.value)}
                  />
                </div>
                <div className="cc-field">
                  <label>Subscription Price / Box ($)</label>
                  <NumInput value={price} onChange={setPrice} min={0} />
                </div>
                <div className="cc-field">
                  <label>Boxes per Season</label>
                  <NumInput value={boxQty} onChange={v => setBoxQty(Math.max(1, Math.round(v)))} min={1} step="1" />
                </div>
                <div className="cc-field">
                  <label>Seasons per Year</label>
                  <NumInput value={seasonsPerYear} onChange={v => setSeasonsPerYear(Math.max(1, Math.round(v)))} min={1} step="1" />
                </div>
              </div>
            </section>

            {/* Products */}
            <section className="cc-card">
              <h2 className="cc-card-title">Products</h2>
              <p className="cc-hint">Wholesale / bulk cost per unit included in each box.</p>
              <ItemsTable
                items={productItems}
                onNameChange={updateName}
                onCostChange={updateCost}
                onRemove={removeItem}
                qty={qty}
              />
              <button className="cc-add-btn" onClick={() => addItem('product')}>+ Add Product</button>
            </section>

            {/* Packaging */}
            <section className="cc-card">
              <h2 className="cc-card-title">Packaging Materials</h2>
              <p className="cc-hint">Per-unit cost of each packaging item per box shipped.</p>
              <ItemsTable
                items={packagingItems}
                onNameChange={updateName}
                onCostChange={updateCost}
                onRemove={removeItem}
                qty={qty}
              />
              <button className="cc-add-btn" onClick={() => addItem('packaging')}>+ Add Item</button>
            </section>

            {/* Processing fees */}
            <section className="cc-card">
              <h2 className="cc-card-title">Processing Fees</h2>
              <p className="cc-hint">Calculated per transaction based on subscription price.</p>
              <div className="cc-form-grid cc-form-grid-3">
                <div className="cc-field">
                  <label>Shopify Fee (%)</label>
                  <NumInput value={shopifyRate} onChange={setShopifyRate} />
                  <span className="cc-sub">{fmt(shopifyFee)} / box</span>
                </div>
                <div className="cc-field">
                  <label>Recharge Fee (%)</label>
                  <NumInput value={rechargeRate} onChange={setRechargeRate} />
                </div>
                <div className="cc-field">
                  <label>Recharge Flat ($)</label>
                  <NumInput value={rechargeFlatFee} onChange={setRechargeFlatFee} />
                  <span className="cc-sub">{fmt(rechargeFee)} / box</span>
                </div>
              </div>
              <div className="cc-fees-total">
                <span>Total fees per box</span>
                <strong>{fmt(totalFees)}</strong>
              </div>
            </section>

            {/* Sponsors */}
            <section className="cc-card">
              <h2 className="cc-card-title">Sponsored Spotlights</h2>
              <p className="cc-hint">Additional revenue from brand partnerships per season.</p>
              <div className="cc-form-grid">
                <div className="cc-field">
                  <label>Spotlight #1 ($)</label>
                  <NumInput value={spotlight1} onChange={setSpotlight1} step="1" />
                </div>
                <div className="cc-field">
                  <label>Spotlight #2 ($)</label>
                  <NumInput value={spotlight2} onChange={setSpotlight2} step="1" />
                </div>
              </div>
            </section>

            {/* Fixed costs */}
            <section className="cc-card">
              <h2 className="cc-card-title">Fixed Costs per Season</h2>
              <div className="cc-form-grid">
                <div className="cc-field">
                  <label>Fixed Expenses ($)</label>
                  <NumInput value={fixedExpenses} onChange={setFixedExpenses} step="1" />
                </div>
                <div className="cc-field">
                  <label>Owner Wage ($)</label>
                  <NumInput value={ownerWage} onChange={setOwnerWage} step="1" />
                </div>
                <div className="cc-field">
                  <label>3rd Party Wages ($)</label>
                  <NumInput value={thirdPartyWages} onChange={setThirdPartyWages} step="1" />
                </div>
                <div className="cc-field">
                  <label>Tax Rate (%)</label>
                  <NumInput value={taxRate} onChange={setTaxRate} />
                </div>
              </div>
            </section>

          </div>{/* /cc-inputs */}

          {/* ── RESULTS ── */}
          <div className="cc-results">

            <section className="cc-result-card cc-result-card--box">
              <h3>Per Box — {boxName}</h3>
              <ResultRow label="Subscription Price" value={fmt(p)} />
              <div className="cc-rule" />
              <ResultRow label="Products" value={fmt(items.filter(i=>i.category==='product').reduce((s,i)=>s+n(i.costPerBox),0))} neg />
              <ResultRow label="Packaging" value={fmt(items.filter(i=>i.category==='packaging').reduce((s,i)=>s+n(i.costPerBox),0))} neg />
              <ResultRow label="Processing Fees" value={fmt(totalFees)} neg />
              <div className="cc-rule" />
              <ResultRow label="Total Cost / Box" value={fmt(totalCost)} bold />
              <ResultRow label="Profit / Box" value={fmt(profitPerBox)} profit />
              <ResultRow label="Margin" value={`${margin.toFixed(1)}%`} />
            </section>

            <section className="cc-result-card cc-result-card--season">
              <h3>Season ({qty.toLocaleString()} boxes)</h3>
              <ResultRow label="Gross Revenue" value={fmt(grossRevSeason)} />
              <ResultRow label="Total Costs" value={fmt((itemCostPerBox + totalFees) * qty)} neg />
              <div className="cc-rule" />
              <ResultRow label="Gross Profit" value={fmt(grossProfSeason)} bold />
              {sponsorRev > 0 && <ResultRow label="Sponsored Spotlights" value={`+${fmt(sponsorRev)}`} pos />}
              {fixedTotal > 0  && <ResultRow label="Fixed Costs" value={fmt(fixedTotal)} neg />}
              <div className="cc-rule" />
              <ResultRow label="Net Profit" value={fmt(netSeason)} profit />
              <ResultRow label={`Tax (${taxRate}%)`} value={fmt(taxSeason)} neg />
              <ResultRow label="After-Tax Profit" value={fmt(afterTaxSeason)} final />
            </section>

            <section className="cc-result-card cc-result-card--year">
              <h3>Yearly ({seasons} seasons)</h3>
              <ResultRow label="Gross Revenue" value={fmt(grossRevSeason * seasons)} />
              <div className="cc-rule" />
              <ResultRow label="Gross Profit" value={fmt(grossProfSeason * seasons)} bold />
              <ResultRow label="Net Profit" value={fmt(netYearly)} profit />
              <ResultRow label={`Tax (${taxRate}%)`} value={fmt(taxYearly)} neg />
              <ResultRow label="After-Tax Profit" value={fmt(afterTaxYearly)} final />
            </section>

            {/* Breakdown bar */}
            {p > 0 && (
              <section className="cc-result-card cc-result-card--bar">
                <h3>Cost Breakdown</h3>
                <p className="cc-hint">% of subscription price</p>
                <div className="cc-bar">
                  <div className="cc-bar-seg cc-bar-seg--product" style={{ width: `${Math.min(Math.max(items.filter(i=>i.category==='product').reduce((s,i)=>s+n(i.costPerBox),0)/p*100,0),100)}%` }} />
                  <div className="cc-bar-seg cc-bar-seg--packaging" style={{ width: `${Math.min(Math.max(items.filter(i=>i.category==='packaging').reduce((s,i)=>s+n(i.costPerBox),0)/p*100,0),100)}%` }} />
                  <div className="cc-bar-seg cc-bar-seg--fees" style={{ width: `${Math.min(Math.max(totalFees/p*100,0),100)}%` }} />
                  <div className="cc-bar-seg cc-bar-seg--profit" style={{ width: `${Math.min(Math.max(profitPerBox/p*100,0),100)}%` }} />
                </div>
                <div className="cc-legend">
                  <span className="cc-legend-dot cc-legend-dot--product" />Products
                  <span className="cc-legend-dot cc-legend-dot--packaging" />Packaging
                  <span className="cc-legend-dot cc-legend-dot--fees" />Fees
                  <span className="cc-legend-dot cc-legend-dot--profit" />Profit
                </div>
              </section>
            )}

          </div>{/* /cc-results */}

        </div>
      </div>

    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────

function ItemsTable({
  items, onNameChange, onCostChange, onRemove, qty,
}: {
  items: CostItem[];
  onNameChange: (id: string, name: string) => void;
  onCostChange: (id: string, cost: number) => void;
  onRemove: (id: string) => void;
  qty: number;
}) {
  if (items.length === 0) return null;
  return (
    <div className="cc-items">
      <div className="cc-items-head">
        <span>Item</span>
        <span>Cost / Box</span>
        <span>Season Total</span>
        <span />
      </div>
      {items.map(item => (
        <div className="cc-items-row" key={item.id}>
          <input
            type="text"
            className="cc-item-name"
            value={item.name}
            onChange={e => onNameChange(item.id, e.target.value)}
          />
          <NumInput
            className="cc-item-cost"
            value={item.costPerBox}
            onChange={v => onCostChange(item.id, v)}
          />
          <span className="cc-item-total">{fmt(item.costPerBox * qty)}</span>
          <button className="cc-remove" onClick={() => onRemove(item.id)} aria-label="Remove">×</button>
        </div>
      ))}
      <div className="cc-items-foot">
        <span>Subtotal</span>
        <span>{fmt(items.reduce((s, i) => s + n(i.costPerBox), 0))}</span>
        <span>{fmt(items.reduce((s, i) => s + n(i.costPerBox), 0) * qty)}</span>
        <span />
      </div>
    </div>
  );
}

function ResultRow({
  label, value, bold, profit, final, neg, pos,
}: {
  label: string; value: string;
  bold?: boolean; profit?: boolean; final?: boolean; neg?: boolean; pos?: boolean;
}) {
  return (
    <div className={`cc-rrow ${bold ? 'cc-rrow--bold' : ''} ${profit ? 'cc-rrow--profit' : ''} ${final ? 'cc-rrow--final' : ''}`}>
      <span>{label}</span>
      <span className={neg ? 'cc-neg' : pos ? 'cc-pos' : ''}>{value}</span>
    </div>
  );
}
