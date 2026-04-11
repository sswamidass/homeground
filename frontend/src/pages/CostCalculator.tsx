import { useState, useCallback } from 'react';
import './CostCalculator.css';

interface CostItem {
  id: string;
  name: string;
  qty: number;
  unitCost: number;
}

interface FixedCosts {
  fixedExpenses: number;
  ownerWage: number;
  thirdPartyWages: number;
}

interface SponsorsRevenue {
  spotlight1: number;
  spotlight2: number;
}

const DEFAULT_ITEMS: CostItem[] = [
  { id: '1', name: 'Boxes', qty: 1000, unitCost: 3.29 },
  { id: '2', name: 'Info Card', qty: 1000, unitCost: 0.56 },
  { id: '3', name: 'Postcard', qty: 1000, unitCost: 0.19 },
  { id: '4', name: 'Tissue Paper', qty: 1000, unitCost: 0.41 },
  { id: '5', name: 'Tape', qty: 1000, unitCost: 0.11 },
  { id: '6', name: 'Crinkle Paper', qty: 1000, unitCost: 0.13 },
  { id: '7', name: 'Shipping Labels', qty: 1000, unitCost: 0.14 },
];

let nextId = 8;

function fmt(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function CostCalculator() {
  const [boxName, setBoxName] = useState('The Book Box');
  const [boxQty, setBoxQty] = useState(1000);
  const [seasonsPerYear, setSeasonsPerYear] = useState(4);
  const [subscriptionPrice, setSubscriptionPrice] = useState(86.95);

  const [items, setItems] = useState<CostItem[]>(DEFAULT_ITEMS);

  const [shopifyRate, setShopifyRate] = useState(2.9);
  const [rechargeRate, setRechargeRate] = useState(1.0);
  const [rechargeFlatFee, setRechargeFlatFee] = useState(0.50);

  const [fixedCosts, setFixedCosts] = useState<FixedCosts>({
    fixedExpenses: 0,
    ownerWage: 0,
    thirdPartyWages: 0,
  });

  const [sponsors, setSponsors] = useState<SponsorsRevenue>({
    spotlight1: 500,
    spotlight2: 0,
  });

  const [taxRate, setTaxRate] = useState(12.2);

  // --- Derived calculations ---
  const totalItemCostPerBox = items.reduce((sum, item) => {
    const costContrib = (item.qty / boxQty) * item.unitCost;
    return sum + costContrib;
  }, 0);

  const shopifyFeePerBox = subscriptionPrice * (shopifyRate / 100);
  const rechargeFeePerBox = subscriptionPrice * (rechargeRate / 100) + rechargeFlatFee;
  const totalFeesPerBox = shopifyFeePerBox + rechargeFeePerBox;

  const totalCostPerBox = totalItemCostPerBox + totalFeesPerBox;
  const profitPerBox = subscriptionPrice - totalCostPerBox;
  const marginPct = subscriptionPrice > 0 ? (profitPerBox / subscriptionPrice) * 100 : 0;

  const grossSeasonRevenue = subscriptionPrice * boxQty;
  const grossSeasonItemCosts = totalItemCostPerBox * boxQty;
  const grossSeasonFees = totalFeesPerBox * boxQty;
  const grossSeasonProfit = profitPerBox * boxQty;

  const sponsorRevenue = sponsors.spotlight1 + sponsors.spotlight2;
  const totalFixedCostsSeason = fixedCosts.fixedExpenses + fixedCosts.ownerWage + fixedCosts.thirdPartyWages;
  const netSeasonProfit = grossSeasonProfit + sponsorRevenue - totalFixedCostsSeason;
  const taxAmount = netSeasonProfit > 0 ? netSeasonProfit * (taxRate / 100) : 0;
  const netAfterTaxSeason = netSeasonProfit - taxAmount;

  const netYearlyProfit = netSeasonProfit * seasonsPerYear;
  const taxYearly = netYearlyProfit > 0 ? netYearlyProfit * (taxRate / 100) : 0;
  const netAfterTaxYearly = netYearlyProfit - taxYearly;

  // --- Item management ---
  const updateItem = useCallback((id: string, field: keyof CostItem, value: string | number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: field === 'name' ? value : Number(value) } : item
    ));
  }, []);

  const addItem = useCallback(() => {
    setItems(prev => [...prev, { id: String(nextId++), name: 'New Item', qty: 1000, unitCost: 0 }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div className="cost-calculator">
      <div className="calc-hero">
        <div className="calc-hero-inner">
          <h1>Box Cost Calculator</h1>
          <p>Model your subscription box costs, profits, and projections in real time.</p>
        </div>
      </div>

      <div className="calc-body">
        <div className="calc-grid">

          {/* ── LEFT COLUMN: Inputs ── */}
          <div className="calc-inputs">

            {/* Box Setup */}
            <section className="calc-card">
              <h2 className="calc-card-title">Box Setup</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Box Name</label>
                  <input
                    type="text"
                    value={boxName}
                    onChange={e => setBoxName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Boxes per Season</label>
                  <input
                    type="number"
                    min={1}
                    value={boxQty}
                    onChange={e => setBoxQty(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Seasons per Year</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={seasonsPerYear}
                    onChange={e => setSeasonsPerYear(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Subscription Price / Box ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={subscriptionPrice}
                    onChange={e => setSubscriptionPrice(Number(e.target.value))}
                  />
                </div>
              </div>
            </section>

            {/* Packaging & Product Items */}
            <section className="calc-card">
              <h2 className="calc-card-title">Packaging &amp; Product Items</h2>
              <p className="calc-card-hint">Enter each item's total quantity ordered and unit cost. Cost per box is calculated proportionally to your season quantity.</p>
              <div className="items-table-wrapper">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Order Qty</th>
                      <th>Unit Cost ($)</th>
                      <th>Cost / Box</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => {
                      const costPerBox = (item.qty / boxQty) * item.unitCost;
                      return (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="text"
                              className="item-input item-name"
                              value={item.name}
                              onChange={e => updateItem(item.id, 'name', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="item-input item-num"
                              min={1}
                              value={item.qty}
                              onChange={e => updateItem(item.id, 'qty', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="item-input item-num"
                              min={0}
                              step={0.01}
                              value={item.unitCost}
                              onChange={e => updateItem(item.id, 'unitCost', e.target.value)}
                            />
                          </td>
                          <td className="cost-cell">{fmt(costPerBox)}</td>
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="items-subtotal-label">Items subtotal</td>
                      <td className="cost-cell items-subtotal">{fmt(totalItemCostPerBox)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <button className="add-item-btn" onClick={addItem}>+ Add Item</button>
            </section>

            {/* Processing Fees */}
            <section className="calc-card">
              <h2 className="calc-card-title">Processing Fees</h2>
              <p className="calc-card-hint">Fees are calculated per transaction based on subscription price.</p>
              <div className="form-grid form-grid-3">
                <div className="form-group">
                  <label>Shopify Fee (%)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={shopifyRate}
                    onChange={e => setShopifyRate(Number(e.target.value))}
                  />
                  <span className="fee-calc">{fmt(shopifyFeePerBox)} / box</span>
                </div>
                <div className="form-group">
                  <label>Recharge Fee (%)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={rechargeRate}
                    onChange={e => setRechargeRate(Number(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label>Recharge Flat Fee ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={rechargeFlatFee}
                    onChange={e => setRechargeFlatFee(Number(e.target.value))}
                  />
                  <span className="fee-calc">{fmt(rechargeFeePerBox)} / box</span>
                </div>
              </div>
              <div className="fees-total-row">
                <span>Total fees per box</span>
                <strong>{fmt(totalFeesPerBox)}</strong>
              </div>
            </section>

            {/* Sponsored Spotlights */}
            <section className="calc-card">
              <h2 className="calc-card-title">Sponsored Spotlights</h2>
              <p className="calc-card-hint">Additional revenue from brand partnerships per season.</p>
              <div className="form-grid">
                <div className="form-group">
                  <label>Spotlight #1 ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={sponsors.spotlight1}
                    onChange={e => setSponsors(s => ({ ...s, spotlight1: Number(e.target.value) }))}
                  />
                </div>
                <div className="form-group">
                  <label>Spotlight #2 ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={sponsors.spotlight2}
                    onChange={e => setSponsors(s => ({ ...s, spotlight2: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </section>

            {/* Fixed Costs */}
            <section className="calc-card">
              <h2 className="calc-card-title">Fixed Costs per Season</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Fixed Expenses ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={fixedCosts.fixedExpenses}
                    onChange={e => setFixedCosts(f => ({ ...f, fixedExpenses: Number(e.target.value) }))}
                  />
                </div>
                <div className="form-group">
                  <label>Owner Wage ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={fixedCosts.ownerWage}
                    onChange={e => setFixedCosts(f => ({ ...f, ownerWage: Number(e.target.value) }))}
                  />
                </div>
                <div className="form-group">
                  <label>3rd Party Wages ($)</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={fixedCosts.thirdPartyWages}
                    onChange={e => setFixedCosts(f => ({ ...f, thirdPartyWages: Number(e.target.value) }))}
                  />
                </div>
                <div className="form-group">
                  <label>Tax Rate (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={taxRate}
                    onChange={e => setTaxRate(Number(e.target.value))}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT COLUMN: Results ── */}
          <div className="calc-results">

            {/* Per Box Summary */}
            <section className="result-card result-card--perbox">
              <h3 className="result-card-title">Per Box</h3>
              <div className="result-rows">
                <div className="result-row">
                  <span>Subscription Price</span>
                  <span className="result-val">{fmt(subscriptionPrice)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span>Item Costs</span>
                  <span className="result-val neg">{fmt(totalItemCostPerBox)}</span>
                </div>
                <div className="result-row">
                  <span>Processing Fees</span>
                  <span className="result-val neg">{fmt(totalFeesPerBox)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row result-row--highlight">
                  <span>Total Cost / Box</span>
                  <span className="result-val">{fmt(totalCostPerBox)}</span>
                </div>
                <div className="result-row result-row--profit">
                  <span>Profit / Box</span>
                  <span className="result-val">{fmt(profitPerBox)}</span>
                </div>
                <div className="result-row">
                  <span>Margin</span>
                  <span className="result-val">{marginPct.toFixed(1)}%</span>
                </div>
              </div>
            </section>

            {/* Season Summary */}
            <section className="result-card result-card--season">
              <h3 className="result-card-title">Season ({boxQty.toLocaleString()} boxes)</h3>
              <div className="result-rows">
                <div className="result-row">
                  <span>Gross Revenue</span>
                  <span className="result-val">{fmt(grossSeasonRevenue)}</span>
                </div>
                <div className="result-row">
                  <span>Item Costs</span>
                  <span className="result-val neg">{fmt(grossSeasonItemCosts)}</span>
                </div>
                <div className="result-row">
                  <span>Processing Fees</span>
                  <span className="result-val neg">{fmt(grossSeasonFees)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row result-row--highlight">
                  <span>Gross Profit</span>
                  <span className="result-val">{fmt(grossSeasonProfit)}</span>
                </div>
                {sponsorRevenue > 0 && (
                  <div className="result-row">
                    <span>Sponsored Spotlights</span>
                    <span className="result-val pos">+{fmt(sponsorRevenue)}</span>
                  </div>
                )}
                {totalFixedCostsSeason > 0 && (
                  <div className="result-row">
                    <span>Fixed Costs</span>
                    <span className="result-val neg">{fmt(totalFixedCostsSeason)}</span>
                  </div>
                )}
                <div className="result-divider" />
                <div className="result-row result-row--profit">
                  <span>Net Season Profit</span>
                  <span className="result-val">{fmt(netSeasonProfit)}</span>
                </div>
                <div className="result-row">
                  <span>Tax ({taxRate}%)</span>
                  <span className="result-val neg">{fmt(taxAmount)}</span>
                </div>
                <div className="result-row result-row--final">
                  <span>After-Tax Profit</span>
                  <span className="result-val">{fmt(netAfterTaxSeason)}</span>
                </div>
              </div>
            </section>

            {/* Yearly Summary */}
            <section className="result-card result-card--yearly">
              <h3 className="result-card-title">Yearly ({seasonsPerYear} seasons)</h3>
              <div className="result-rows">
                <div className="result-row">
                  <span>Gross Revenue</span>
                  <span className="result-val">{fmt(grossSeasonRevenue * seasonsPerYear)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row result-row--highlight">
                  <span>Gross Profit</span>
                  <span className="result-val">{fmt(grossSeasonProfit * seasonsPerYear)}</span>
                </div>
                <div className="result-row result-row--profit">
                  <span>Net Yearly Profit</span>
                  <span className="result-val">{fmt(netYearlyProfit)}</span>
                </div>
                <div className="result-row">
                  <span>Tax ({taxRate}%)</span>
                  <span className="result-val neg">{fmt(taxYearly)}</span>
                </div>
                <div className="result-row result-row--final">
                  <span>After-Tax Profit</span>
                  <span className="result-val">{fmt(netAfterTaxYearly)}</span>
                </div>
              </div>
            </section>

            {/* Cost Breakdown Bar */}
            <section className="result-card result-card--breakdown">
              <h3 className="result-card-title">Cost Breakdown</h3>
              <p className="breakdown-label">as % of subscription price</p>
              {subscriptionPrice > 0 && (
                <div className="breakdown-bar-wrapper">
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-segment seg--items"
                      style={{ width: `${Math.min((totalItemCostPerBox / subscriptionPrice) * 100, 100)}%` }}
                      title={`Items: ${fmt(totalItemCostPerBox)}`}
                    />
                    <div
                      className="breakdown-segment seg--fees"
                      style={{ width: `${Math.min((totalFeesPerBox / subscriptionPrice) * 100, 100)}%` }}
                      title={`Fees: ${fmt(totalFeesPerBox)}`}
                    />
                    <div
                      className="breakdown-segment seg--profit"
                      style={{ width: `${Math.max(Math.min((profitPerBox / subscriptionPrice) * 100, 100), 0)}%` }}
                      title={`Profit: ${fmt(profitPerBox)}`}
                    />
                  </div>
                  <div className="breakdown-legend">
                    <div className="legend-item"><span className="legend-dot dot--items" />Items ({((totalItemCostPerBox / subscriptionPrice) * 100).toFixed(1)}%)</div>
                    <div className="legend-item"><span className="legend-dot dot--fees" />Fees ({((totalFeesPerBox / subscriptionPrice) * 100).toFixed(1)}%)</div>
                    <div className="legend-item"><span className="legend-dot dot--profit" />Profit ({Math.max(marginPct, 0).toFixed(1)}%)</div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostCalculator;
