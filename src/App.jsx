import React, { useState, useEffect, useMemo } from 'react';
import {
  Package,
  BarChart3,
  Store,
  CreditCard,
  Settings,
  Search,
  CheckCircle2,
  X,
  ChevronDown,
  Snowflake,
  Apple,
  Carrot,
  Wheat,
  Beef,
  Coffee,
  Zap,
  Home,
  SlidersHorizontal,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Droplets,
  Truck,
  Building2,
  ArrowLeft,
  TrendingUp,
  ArrowRight,
  Bot,
  MessageCircle,
  Send,
  FileText
} from 'lucide-react';

// --- INITIAL CATEGORIES MATCHING REFERENCE UI TOKENS ---
const INITIAL_CATEGORIES = [
  {
    id: 'cat-cold',
    name: 'Cold Items',
    filterKey: 'COLD ITEMS',
    desc: 'Dairy, chilled beverages, frozen stocks, temp monitored',
    skus: '142 Active SKUs',
    inStock: '98.4% In Stock',
    tag: 'Optimal • 2.4°C',
    iconBg: 'bg-[#AED0E6]',
    iconColor: 'text-[#1E4E68]',
    tagStyle: 'bg-[#C2DDF0] text-[#23495D]',
    icon: Snowflake
  },
  {
    id: 'cat-veggies',
    name: 'Vegetables',
    filterKey: 'VEGETABLES',
    desc: 'Organic produce, farm fresh root veggies & greens',
    skus: '89 Active SKUs',
    inStock: '8 Restock Alerts',
    tag: 'Fresh Daily',
    iconBg: 'bg-[#9CD6A8]',
    iconColor: 'text-[#1F542C]',
    tagStyle: 'bg-[#B8E3C0] text-[#255832]',
    icon: Carrot
  },
  {
    id: 'cat-fruits',
    name: 'Fruits',
    filterKey: 'FRUITS',
    desc: 'Seasonal citrus, berries, tropical assortments',
    skus: '64 Active SKUs',
    inStock: '96.1% In Stock',
    tag: 'Peak Harvest',
    iconBg: 'bg-[#F2B979]',
    iconColor: 'text-[#6E3F0D]',
    tagStyle: 'bg-[#F2D5B8] text-[#6E441B]',
    icon: Apple
  },
  {
    id: 'cat-bakery',
    name: 'Bakery & Dry Grains',
    filterKey: 'BAKERY & DRY GRAINS',
    desc: 'Artisanal bread, pantry staples, flours',
    skus: '112 Active SKUs',
    inStock: '100% in Stock',
    tag: 'Dry Sealed',
    iconBg: 'bg-[#D99B84]',
    iconColor: 'text-[#5C2A18]',
    tagStyle: 'bg-[#E5C5B8] text-[#593224]',
    icon: Wheat
  },
  {
    id: 'cat-meat',
    name: 'Meat & Poultry',
    filterKey: 'MEAT & POULTRY',
    desc: 'Fresh cuts, marinated provisions, sealed packaging',
    skus: '76 Active SKUs',
    inStock: '94.8% In Stock',
    tag: 'Cold Chain Monitored',
    iconBg: 'bg-[#CF8A88]',
    iconColor: 'text-[#5E1F1E]',
    tagStyle: 'bg-[#E2B8B5] text-[#542524]',
    icon: Beef
  },
  {
    id: 'cat-beverages',
    name: 'Beverages & Cold Brew',
    filterKey: 'BEVERAGES & COLD BREW',
    desc: 'Artisan sodas, cold press juices, specialty blends',
    skus: '53 Active SKUs',
    inStock: '98.2% In Stock',
    tag: 'Batch Brewed',
    iconBg: 'bg-[#8EC9BD]',
    iconColor: 'text-[#194E44]',
    tagStyle: 'bg-[#B5DDD4] text-[#1E4E68]',
    icon: Coffee
  }
];

// --- INITIAL INVENTORY ITEMS ---
const INITIAL_INVENTORY_ITEMS = [
  {
    id: 'SKU 882-011',
    name: 'Fresh Hass Avocados',
    subtext: 'Chilled Storage • Batch #304 • Farm Direct Michoacán',
    category: 'VEGETABLES',
    soldQty: 310,
    totalQty: 450,
    soldPercent: 68.8,
    unitPrice: 520,
    unit: 'per kg',
    statusTag: 'Optimal Stock',
    isOutdated: false,
    expiryNote: 'Fresh • 9 Days Shelf Life',
    costPrice: 280,
    supplier: 'Organic Roots Co.',
    iconKey: 'veggies'
  },
  {
    id: 'SKU 759-312',
    name: 'Organic Roma Tomatoes',
    subtext: 'Vine-ripened • Ambient Aisle 2 • Fresh Daily',
    category: 'VEGETABLES',
    soldQty: 620,
    totalQty: 700,
    soldPercent: 88.5,
    unitPrice: 45,
    unit: 'per kg',
    statusTag: 'Low Stock',
    isOutdated: false,
    expiryNote: 'Fresh • 4 Days Shelf Life',
    costPrice: 32,
    supplier: 'Green Valley Farms',
    iconKey: 'veggies'
  },
  {
    id: 'SKU 194-8811',
    name: 'Grass-Fed Beef Tenderloin',
    subtext: 'Cold Chain Monitored • -1.5°C • Premium Cut Vacuum Sealed',
    category: 'MEAT & POULTRY',
    soldQty: 140,
    totalQty: 160,
    soldPercent: 87.5,
    unitPrice: 750,
    unit: 'per kg',
    statusTag: 'High Demand',
    isOutdated: false,
    expiryNote: 'Chilled • 6 Days Shelf Life',
    costPrice: 580,
    supplier: 'Highland Meats',
    iconKey: 'meat'
  },
  {
    id: 'SKU 691-2189',
    name: 'Honeycrisp Apples',
    subtext: 'Peak Harvest • Grade A Orchard Selected',
    category: 'FRUITS',
    soldQty: 520,
    totalQty: 600,
    soldPercent: 86.6,
    unitPrice: 220,
    unit: 'per kg',
    statusTag: 'Optimal Stock',
    isOutdated: false,
    expiryNote: 'Crisp • 14 Days Shelf Life',
    costPrice: 145,
    supplier: 'Orchard Select',
    iconKey: 'fruits'
  },
  {
    id: 'SKU 402-1190',
    name: 'Artisanal Sourdough Boule',
    subtext: 'Stone-baked Daily • Unbleached Heritage Wheat',
    category: 'BAKERY & DRY GRAINS',
    soldQty: 95,
    totalQty: 120,
    soldPercent: 79.2,
    unitPrice: 180,
    unit: 'per loaf',
    statusTag: 'Optimal Stock',
    isOutdated: false,
    expiryNote: 'Baked Today • 48h Window',
    costPrice: 95,
    supplier: 'Hearth & Mill Bakery',
    iconKey: 'bakery'
  },
  {
    id: 'SKU 512-9042',
    name: 'Single-Origin Cold Brew Concentrate',
    subtext: '18-Hour Slow Steeped • Nitrogen Sealed Glass Bottles',
    category: 'BEVERAGES & COLD BREW',
    soldQty: 210,
    totalQty: 240,
    soldPercent: 87.5,
    unitPrice: 340,
    unit: 'per bottle',
    statusTag: 'High Demand',
    isOutdated: false,
    expiryNote: 'Chilled • 21 Days Shelf Life',
    costPrice: 190,
    supplier: 'Roast & Steep Co.',
    iconKey: 'beverages'
  },
  {
    id: 'SKU 309-4410',
    name: 'A2 Cultured Farm Butter (Unsalted)',
    subtext: 'Cold Items • 2.4°C Vault • Batch #219 Near Best-By',
    category: 'COLD ITEMS',
    soldQty: 64,
    totalQty: 150,
    soldPercent: 42.6,
    unitPrice: 410,
    unit: 'per 500g',
    statusTag: 'Clearance Candidate',
    isOutdated: true,
    expiryNote: 'Expiring in 36 Hours • Markdown Suggested',
    costPrice: 290,
    supplier: 'Nordic Dairy Collective',
    iconKey: 'cold'
  },
  {
    id: 'SKU 309-7781',
    name: 'Heirloom Baby Spinach Punnet',
    subtext: 'Hydroponic Lot #88 • Moisture Warning on Crate 4',
    category: 'VEGETABLES',
    soldQty: 48,
    totalQty: 110,
    soldPercent: 43.6,
    unitPrice: 95,
    unit: 'per box',
    statusTag: 'Rotate Stock',
    isOutdated: true,
    expiryNote: 'Expiring in 24 Hours • Priority Clearance',
    costPrice: 55,
    supplier: 'Green Valley Farms',
    iconKey: 'veggies'
  }
];

const INITIAL_SUPPLIERS = [
  {
    id: 'SUP-101',
    name: 'Organic Roots Co.',
    contactPerson: 'Vikram Patel',
    phone: '+91 98230 11223',
    email: 'orders@organicroots.in',
    category: 'Fresh Produce & Fruit',
    rating: 4.9,
    totalSpent: 485000,
    sourcedItems: [
      {
        sku: 'SKU 882-011',
        name: 'Fresh Hass Avocados',
        buyPrice: 280,
        sellPrice: 520,
        qtyBought: 450,
        lastDate: '2026-11-01'
      },
      {
        sku: 'SKU 691-2189',
        name: 'Honeycrisp Apples',
        buyPrice: 145,
        sellPrice: 220,
        qtyBought: 600,
        lastDate: '2026-11-02'
      }
    ]
  },
  {
    id: 'SUP-102',
    name: 'Green Valley Farms',
    contactPerson: 'Anita Rao',
    phone: '+91 91234 88776',
    email: 'sales@greenvalley.com',
    category: 'Vegetables & Farm Root',
    rating: 4.7,
    totalSpent: 320000,
    sourcedItems: [
      {
        sku: 'SKU 759-312',
        name: 'Organic Roma Tomatoes',
        buyPrice: 32,
        sellPrice: 45,
        qtyBought: 1200,
        lastDate: '2026-11-03'
      }
    ]
  },
  {
    id: 'SUP-103',
    name: 'Highland Meats & Cold Chain',
    contactPerson: 'Karan Malhotra',
    phone: '+91 99876 54321',
    email: 'dispatch@highlandmeats.in',
    category: 'Meat & Poultry (-1.5°C)',
    rating: 4.8,
    totalSpent: 612000,
    sourcedItems: [
      {
        sku: 'SKU 194-8811',
        name: 'Grass-Fed Beef Tenderloin',
        buyPrice: 580,
        sellPrice: 750,
        qtyBought: 160,
        lastDate: '2026-11-04'
      }
    ]
  }
];

const INITIAL_PAYMENTS = [
  {
    id: 'PAY-8821',
    gateway: 'UPI',
    method: 'Google Pay',
    amount: 4300,
    timestamp: '2026-11-05 20:15:10',
    entity: 'Customer: Direct Retail POS',
    note: 'Purchase Hass Avocados 10kg',
    status: 'Completed',
    rawMsg: 'Rs 4,300.00 received via Google Pay UPI Ref: 992018231105 (Direct Retail POS).'
  },
  {
    id: 'PAY-8820',
    gateway: 'Paytm',
    method: 'Paytm QR',
    amount: 7500,
    timestamp: '2026-11-05 18:30:22',
    entity: 'Customer: Café Aroma',
    note: 'Order Beef Tenderloin 10kg',
    status: 'Completed',
    rawMsg: 'Paytm Receipt: Rs 7,500.00 credited to Merchant QR A/c XX4821. Ref: PTM8820194.'
  },
  {
    id: 'PAY-8819',
    gateway: 'NEFT',
    method: 'Corporate NetBanking',
    amount: 48500,
    timestamp: '2026-11-04 14:12:05',
    entity: 'Supplier: Organic Roots Co.',
    note: 'Batch #304 Settlement',
    status: 'Completed',
    rawMsg: 'INR 48,500.00 settled via NEFT to ORGANIC ROOTS CO. UTR: HDFCN2611048819.'
  }
];

// --- 6 BILL CATEGORIES ---
const BILL_CATEGORIES = [
  {
    id: 'profit',
    number: '1',
    name: 'Profit History',
    desc: 'Monthly net profit statements, margin realizations & payout summaries',
    footerLeft: '4 Monthly Statements',
    footerRight: 'Net +₹1,94,500 (Nov)',
    tag: '+18.4% MoM',
    iconBg: 'bg-[#9CD6A8]',
    iconColor: 'text-[#1F542C]',
    tagStyle: 'bg-[#B8E3C0] text-[#255832]',
    icon: TrendingUp
  },
  {
    id: 'household',
    number: '2',
    name: 'Household Bills',
    desc: 'Electricity (APEPDCL), municipal water, fiber internet, cooking gas & upkeep',
    footerLeft: '8 Monthly Bills',
    footerRight: '₹13,735 / mo',
    tag: 'Utilities & Home',
    iconBg: 'bg-[#AED0E6]',
    iconColor: 'text-[#1E4E68]',
    tagStyle: 'bg-[#C2DDF0] text-[#23495D]',
    icon: Zap
  },
  {
    id: 'suppliers',
    number: '3',
    name: 'Suppliers Bills',
    desc: 'Wholesale procurement settlements, farm direct payouts & cold chain freight',
    footerLeft: '6 Active Invoices',
    footerRight: '2 Due Soon',
    tag: 'Vendor Invoices',
    iconBg: 'bg-[#F2B979]',
    iconColor: 'text-[#6E3F0D]',
    tagStyle: 'bg-[#F2D5B8] text-[#6E441B]',
    icon: Truck
  },
  {
    id: 'milk',
    number: '4',
    name: 'Milk Bills',
    desc: 'Morning & evening buffalo/cow milk crates, A2 farm cards & curd supplies',
    footerLeft: 'Daily Log • 65L/day',
    footerRight: '₹68,400 / mo',
    tag: 'Daily Dairy Ledger',
    iconBg: 'bg-[#8EC9BD]',
    iconColor: 'text-[#194E44]',
    tagStyle: 'bg-[#B5DDD4] text-[#1E4E68]',
    icon: Droplets
  },
  {
    id: 'online',
    number: '5',
    name: 'Online Payments',
    desc: 'Google Pay, PhonePe, Paytm QR settlements, POS card swipes & raw gateway logs',
    footerLeft: '148 Settled Txns',
    footerRight: '100% Verified',
    tag: 'UPI & Gateway Sync',
    iconBg: 'bg-[#CF8A88]',
    iconColor: 'text-[#5E1F1E]',
    tagStyle: 'bg-[#E2B8B5] text-[#542524]',
    icon: CreditCard
  },
  {
    id: 'rent',
    number: '6',
    name: 'Rent Bills',
    desc: 'Warehouse Central A-1 lease, cold storage bay rent & society maintenance',
    footerLeft: '5 Lease Ledgers',
    footerRight: 'Paid Nov 2026',
    tag: 'Lease & Storage',
    iconBg: 'bg-[#D99B84]',
    iconColor: 'text-[#5C2A18]',
    tagStyle: 'bg-[#E5C5B8] text-[#593224]',
    icon: Building2
  }
];

const INITIAL_BILLS_DATA = [
  {
    id: 'PRF-2026-11',
    categoryId: 'profit',
    title: 'November 2026 Monthly Net Profit Statement',
    provider: 'Central Merchant Enterprise • Audited P&L',
    month: 'November 2026',
    date: '2026-11-05',
    amount: 194500,
    status: 'Paid',
    method: 'Bank Treasury Transfer',
    refNo: 'PNL-NOV26-001',
    subtext: 'Gross Sales: ₹6,42,000 • COGS: ₹3,65,500 • OpEx: ₹82,000',
    breakdown: [
      { label: 'Gross Retail & Wholesale Revenue', val: '₹6,42,000' },
      { label: 'Less: Cost of Goods Sold (Procurement)', val: '-₹3,65,500' },
      { label: 'Less: Cold Chain, Rent & Utilities OpEx', val: '-₹82,000' },
      { label: 'Net Realized Monthly Profit (30.3% Margin)', val: '+₹1,94,500' }
    ]
  },
  {
    id: 'HH-2611-ELEC',
    categoryId: 'household',
    title: 'Electricity Bill (APEPDCL Service #104928)',
    provider: 'Eastern Power Distribution Co. (APEPDCL)',
    month: 'November 2026',
    date: '2026-11-03',
    amount: 4680,
    status: 'Paid',
    method: 'UPI AutoPay (Google Pay)',
    refNo: 'APEPDCL-1126-8841',
    subtext: '542 kWh Consumed • Meter #AP-88412 • Home & Split AC Load',
    breakdown: [
      { label: 'Energy Charges (542 Units @ Slab Rate)', val: '₹4,120' },
      { label: 'Fixed Connected Load & Meter Rent', val: '₹340' },
      { label: 'Electricity Duty & Customer Charges', val: '₹220' }
    ]
  },
  {
    id: 'SUPB-2611-01',
    categoryId: 'suppliers',
    title: 'Organic Roots Co. — Hass Avocado & Apple Consignment',
    provider: 'Organic Roots Co. (Vikram Patel)',
    month: 'November 2026',
    date: '2026-11-01',
    amount: 126000,
    status: 'Paid',
    method: 'Corporate NEFT',
    refNo: 'HDFCN261101882',
    subtext: '450 kg Hass Avocados @ ₹280/kg • Batch #304 Cold Truck',
    breakdown: [
      { label: 'Fresh Hass Avocados (450 kg @ ₹280)', val: '₹1,26,000' },
      { label: 'Cold-Chain Transit Insurance', val: 'Included' }
    ]
  },
  {
    id: 'MLK-2611-01',
    categoryId: 'milk',
    title: 'Godavari A2 Farm Cow Milk — Morning Crates (40L/Day)',
    provider: 'Godavari Organic Dairy Collective',
    month: 'November 2026',
    date: '2026-11-05',
    amount: 36000,
    status: 'Paid',
    method: 'UPI Merchant Transfer',
    refNo: 'GODAVARI-NOV-40L',
    subtext: '1,200 Liters Monthly Card (40L x 30 Days @ ₹30/L Wholesale)',
    breakdown: [
      { label: 'Morning A2 Cow Milk (40L/day x 30 days)', val: '₹36,000' }
    ]
  },
  {
    id: 'PAY-8821',
    categoryId: 'online',
    title: 'Customer POS Settlement — Direct Retail Counter',
    provider: 'Google Pay UPI • Verified QR',
    month: 'November 2026',
    date: '2026-11-05 20:15',
    amount: 4300,
    status: 'Paid',
    method: 'UPI (Google Pay)',
    refNo: 'UPI-992018231105',
    subtext: 'Rs 4,300.00 received via Google Pay UPI Ref: 992018231105 (Hass Avocados 10kg)',
    breakdown: [
      { label: 'POS Order: Fresh Hass Avocados (10kg)', val: '₹4,300' },
      { label: 'Gateway Fee (Zero MDR UPI)', val: '₹0' }
    ]
  },
  {
    id: 'RNT-2611-01',
    categoryId: 'rent',
    title: 'Warehouse Central A-1 — Commercial Lease',
    provider: 'Apex Industrial Logistics Park LLP',
    month: 'November 2026',
    date: '2026-11-01',
    amount: 45000,
    status: 'Paid',
    method: 'RTGS Lease Transfer',
    refNo: 'LEASE-WCA1-NOV26',
    subtext: '4,200 sq.ft Climate-Insulated Warehouse + Loading Bay Dock #4',
    breakdown: [
      { label: 'Base Monthly Commercial Lease (4,200 sq.ft)', val: '₹41,000' },
      { label: 'Industrial Park Security & Dock Upkeep', val: '₹4,000' }
    ]
  }
];

const getCategoryVisuals = (categoryStr, iconKey) => {
  const upper = (categoryStr || '').toUpperCase();
  if (iconKey === 'cold' || upper.includes('COLD ITEM')) {
    return { Icon: Snowflake, bg: 'bg-[#AED0E6]', text: 'text-[#1E4E68]', pill: 'bg-[#C2DDF0] text-[#23495D]' };
  }
  if (iconKey === 'fruits' || upper.includes('FRUIT')) {
    return { Icon: Apple, bg: 'bg-[#F2B979]', text: 'text-[#6E3F0D]', pill: 'bg-[#F2D5B8] text-[#6E441B]' };
  }
  if (iconKey === 'bakery' || upper.includes('BAKERY') || upper.includes('GRAIN')) {
    return { Icon: Wheat, bg: 'bg-[#D99B84]', text: 'text-[#5C2A18]', pill: 'bg-[#E5C5B8] text-[#593224]' };
  }
  if (iconKey === 'meat' || upper.includes('MEAT')) {
    return { Icon: Beef, bg: 'bg-[#CF8A88]', text: 'text-[#5E1F1E]', pill: 'bg-[#E2B8B5] text-[#542524]' };
  }
  if (iconKey === 'beverages' || upper.includes('BEVERAGE')) {
    return { Icon: Coffee, bg: 'bg-[#8EC9BD]', text: 'text-[#194E44]', pill: 'bg-[#B5DDD4] text-[#1E4E68]' };
  }
  return { Icon: Carrot, bg: 'bg-[#9CD6A8]', text: 'text-[#1F542C]', pill: 'bg-[#B8E3C0] text-[#255832]' };
};

export default function App() {
  // --- APP FLOW STATE ---
  // 'splash' -> 'management' -> 'dashboard'
  const [appFlow, setAppFlow] = useState('splash');

  const [activeMainTab, setActiveMainTab] = useState('inventory');
  const [inventorySubTab, setInventorySubTab] = useState('category');
  const [analysisSubTab, setAnalysisSubTab] = useState('buying');
  const [strategyMode, setStrategyMode] = useState('profit');

  // Bills Module State
  const [activeBillCategory, setActiveBillCategory] = useState('all');
  const [billMonthFilter, setBillMonthFilter] = useState('All Months');
  const [selectedBillDetail, setSelectedBillDetail] = useState(null);

  const [inventoryItems, setInventoryItems] = useState(() => {
    try {
      const saved = localStorage.getItem('app_inventory_items_v12');
      return saved ? JSON.parse(saved) : INITIAL_INVENTORY_ITEMS;
    } catch {
      return INITIAL_INVENTORY_ITEMS;
    }
  });

  const [suppliers, setSuppliers] = useState(() => {
    try {
      const saved = localStorage.getItem('app_suppliers_v12');
      return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
    } catch {
      return INITIAL_SUPPLIERS;
    }
  });

  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('app_payments_v12');
      return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
    } catch {
      return INITIAL_PAYMENTS;
    }
  });

  const [billsList, setBillsList] = useState(() => {
    try {
      const saved = localStorage.getItem('app_bills_ledger_v12');
      return saved ? JSON.parse(saved) : INITIAL_BILLS_DATA;
    } catch {
      return INITIAL_BILLS_DATA;
    }
  });

  const [storeConfig, setStoreConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_store_config_v12');
      return saved
        ? JSON.parse(saved)
        : {
            storeName: 'Central Merchant Enterprise',
            coldChainTarget: '2.4°C',
            lowStockPercentThreshold: 85,
            autoSyncPos: true
          };
    } catch {
      return {
        storeName: 'Central Merchant Enterprise',
        coldChainTarget: '2.4°C',
        lowStockPercentThreshold: 85,
        autoSyncPos: true
      };
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantMessages, setAssistantMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I can compile your Payment History records from all six bill categories into a bank loan support report.'
    }
  ]);
  const [warehouse, setWarehouse] = useState('Warehouse Central A-1');
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  // Price Simulator State
  const [simSkuId, setSimSkuId] = useState('SKU 882-011');
  const [simMarkupPct, setSimMarkupPct] = useState(5);

  // Modals State
  const [isAddSkuOpen, setIsAddSkuOpen] = useState(false);
  const [isSimPaymentOpen, setIsSimPaymentOpen] = useState(false);
  const [restockSupplierModal, setRestockSupplierModal] = useState(null);

  const [newSkuForm, setNewSkuForm] = useState({
    name: '',
    subtext: '',
    category: 'VEGETABLES',
    totalQty: 250,
    soldQty: 90,
    costPrice: 120,
    unitPrice: 195,
    unit: 'per kg',
    supplier: 'Organic Roots Co.'
  });

  const [newReceiptForm, setNewReceiptForm] = useState({
    categoryId: 'household',
    title: '',
    gateway: 'UPI',
    method: 'Google Pay',
    entity: 'Customer: GreenBite Grocer',
    amount: 6400,
    month: 'November 2026',
    note: 'Bulk Cold Brew & Produce Order',
    rawMsg: 'Rs 6,400.00 credited to Merchant A/c XX4821 via Google Pay UPI Ref: 6309441822.'
  });

  const [restockOrderForm, setRestockOrderForm] = useState({
    sku: 'SKU 882-011',
    qty: 150
  });

  useEffect(() => {
    try {
      localStorage.setItem('app_inventory_items_v12', JSON.stringify(inventoryItems));
    } catch (e) {
      console.error(e);
    }
  }, [inventoryItems]);

  useEffect(() => {
    try {
      localStorage.setItem('app_suppliers_v12', JSON.stringify(suppliers));
    } catch (e) {
      console.error(e);
    }
  }, [suppliers]);

  useEffect(() => {
    try {
      localStorage.setItem('app_payments_v12', JSON.stringify(payments));
    } catch (e) {
      console.error(e);
    }
  }, [payments]);

  useEffect(() => {
    try {
      localStorage.setItem('app_bills_ledger_v12', JSON.stringify(billsList));
    } catch (e) {
      console.error(e);
    }
  }, [billsList]);

  useEffect(() => {
    try {
      localStorage.setItem('app_store_config_v12', JSON.stringify(storeConfig));
    } catch (e) {
      console.error(e);
    }
  }, [storeConfig]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast((prev) => (prev === message ? null : prev)), 3200);
  };

  const generateLoanDocument = () => {
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
      showToast('Allow pop-ups for this site to open the loan document.');
      return false;
    }

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
    const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
    const dateText = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const paidBills = billsList.filter((bill) => bill.status === 'Paid');
    const pendingBills = billsList.filter((bill) => bill.status !== 'Paid');
    const categoryRows = BILL_CATEGORIES.map((category) => {
      const categoryBills = billsList.filter((bill) => bill.categoryId === category.id);
      const categoryTotal = categoryBills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
      const categoryPaid = categoryBills.filter((bill) => bill.status === 'Paid').reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
      return `<tr><td>${escapeHtml(category.name)}</td><td>${categoryBills.length}</td><td>${money(categoryTotal)}</td><td>${money(categoryPaid)}</td></tr>`;
    }).join('');
    const billRows = billsList.map((bill) => {
      const category = BILL_CATEGORIES.find((item) => item.id === bill.categoryId);
      return `<tr><td>${escapeHtml(bill.date || bill.month)}</td><td>${escapeHtml(category?.name || bill.categoryId)}</td><td><strong>${escapeHtml(bill.title)}</strong><br>${escapeHtml(bill.provider)}<br><span class="muted">${escapeHtml(bill.subtext)} · Ref: ${escapeHtml(bill.refNo)}</span></td><td>${escapeHtml(bill.method)}</td><td>${escapeHtml(bill.status)}</td><td class="amount">${money(bill.amount)}</td></tr>`;
    }).join('');
    const paymentRows = payments.map((payment) => `<tr><td>${escapeHtml(payment.timestamp)}</td><td>${escapeHtml(payment.id)}</td><td>${escapeHtml(payment.gateway)} · ${escapeHtml(payment.method)}</td><td>${escapeHtml(payment.entity)}</td><td>${escapeHtml(payment.note)}</td><td>${escapeHtml(payment.status)}</td><td class="amount">${money(payment.amount)}</td></tr>`).join('');
    const recordPeriod = [...new Set(billsList.map((bill) => bill.month).filter(Boolean))].join(', ') || 'All available records';

    reportWindow.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Business Financial Summary - ${escapeHtml(storeConfig.storeName)}</title><style>
      *{box-sizing:border-box}body{margin:0;background:#eef0ed;color:#1f2b24;font:13px/1.5 Arial,sans-serif}.toolbar{position:sticky;top:0;padding:12px;text-align:center;background:#263f32}.toolbar button{border:0;border-radius:8px;padding:10px 18px;background:#fff;color:#263f32;font-weight:700;cursor:pointer}.paper{max-width:920px;margin:24px auto;padding:44px 50px;background:#fff;box-shadow:0 8px 32px #263f3222}.brand{color:#567560;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase}.doc-title{margin:8px 0 4px;font-size:25px}.subtitle,.muted{color:#68736d}.meta{display:flex;justify-content:space-between;gap:20px;margin:20px 0;padding:12px 0;border-block:1px solid #dce2dd}.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0}.metric{border:1px solid #dce2dd;border-radius:8px;padding:12px}.metric small{display:block;color:#68736d}.metric strong{font-size:18px}.section{margin-top:25px}.section h2{font-size:15px;border-bottom:1px solid #b8c7bb;padding-bottom:7px}table{width:100%;border-collapse:collapse;margin-top:10px;font-size:11px}th,td{padding:8px 7px;border:1px solid #dce2dd;text-align:left;vertical-align:top}th{background:#edf2ee;color:#263f32}.amount{text-align:right;white-space:nowrap}.note{margin-top:18px;padding:12px;background:#f3f5f3;border-left:3px solid #688b75;font-size:11px}.signature{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin:45px 0 20px}.sigline{border-top:1px solid #68736d;padding-top:6px;color:#68736d;font-size:11px}.footer{margin-top:24px;border-top:1px solid #dce2dd;padding-top:10px;color:#68736d;font-size:10px}@media(max-width:650px){.paper{margin:0;padding:24px 16px}.summary{grid-template-columns:1fr}.meta{display:block}table{font-size:9px}th,td{padding:5px 4px}}@media print{body{background:#fff;font-size:10px}.toolbar{display:none}.paper{max-width:none;margin:0;padding:12mm;box-shadow:none}.section{break-inside:avoid}thead{display:table-header-group}tr{break-inside:avoid}.doc-title{font-size:21px}}
    </style></head><body><div class="toolbar"><button onclick="window.print()">Print / Save as PDF</button></div><main class="paper"><div class="brand">MR.VENDOR · Management-prepared report</div><h1 class="doc-title">Business Financial Summary &amp; Bill Statement</h1><div class="subtitle">Supporting records for bank credit / loan review</div><div class="meta"><div><strong>Business:</strong> ${escapeHtml(storeConfig.storeName)}</div><div><strong>Prepared on:</strong> ${escapeHtml(dateText)}</div><div><strong>Record period:</strong> ${escapeHtml(recordPeriod)}</div></div><div class="summary"><div class="metric"><small>Bill / statement records</small><strong>${billsList.length}</strong></div><div class="metric"><small>Paid bill value</small><strong>${money(paidBills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0))}</strong></div><div class="metric"><small>Pending bill value</small><strong>${money(pendingBills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0))}</strong></div></div><section class="section"><h2>Summary by bill category</h2><table><thead><tr><th>Category</th><th>Records</th><th>Recorded value</th><th>Paid value</th></tr></thead><tbody>${categoryRows}</tbody></table><p class="muted">Category values summarize records entered in each segment. They may represent different kinds of activity, including profit statements and payment receipts, and should not be added together as a single expense figure.</p></section><section class="section"><h2>Bill and statement register (${billsList.length} records)</h2><table><thead><tr><th>Date</th><th>Category</th><th>Bill / statement details</th><th>Payment method</th><th>Status</th><th>Amount</th></tr></thead><tbody>${billRows || '<tr><td colspan="6">No bill records available.</td></tr>'}</tbody></table></section><section class="section"><h2>Payment transaction log (${payments.length} records)</h2><table><thead><tr><th>Date / time</th><th>Transaction ID</th><th>Gateway / method</th><th>Entity</th><th>Description</th><th>Status</th><th>Amount</th></tr></thead><tbody>${paymentRows || '<tr><td colspan="7">No payment transactions available.</td></tr>'}</tbody></table></section><div class="note"><strong>Review before submission:</strong> This report compiles business records currently entered in MR.VENDOR. Verify each amount and status, and attach original invoices, bank statements, tax returns, and any other evidence requested by the lender. This is management-prepared and is not bank-issued, audited, or independently certified.</div><div class="signature"><div class="sigline">Authorized business representative · Name / signature</div><div class="sigline">Date and business seal (if applicable)</div></div><div class="footer">Generated from MR.VENDOR records for review. This document does not certify the authenticity of source invoices or financial data.</div></main></body></html>`);
    reportWindow.document.close();
    return true;
  };

  const handleAssistantPrompt = (prompt) => {
    const normalizedPrompt = prompt.toLowerCase();
    let reply = 'I can compile all six bill categories and the payment log into a print-ready bank loan support report.';

    if (normalizedPrompt.includes('loan') || normalizedPrompt.includes('document') || normalizedPrompt.includes('report') || normalizedPrompt.includes('statement')) {
      reply = generateLoanDocument()
        ? 'I compiled all bill categories and payment transactions into a report in a new tab. Choose “Print / Save as PDF” there to create a PDF for review.'
        : 'I could not open the report. Please allow pop-ups for this site, then try again.';
    } else if (normalizedPrompt.includes('category') || normalizedPrompt.includes('total')) {
      const totals = BILL_CATEGORIES.map((category) => {
        const categoryBills = billsList.filter((bill) => bill.categoryId === category.id);
        const total = categoryBills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
        return `${category.name}: ${categoryBills.length} records, ₹${total.toLocaleString('en-IN')}`;
      });
      reply = `Current recorded totals: ${totals.join('; ')}. Choose “Prepare bank loan report” to include every bill and transaction in a document.`;
    } else if (normalizedPrompt.includes('pending') || normalizedPrompt.includes('unpaid')) {
      const pending = billsList.filter((bill) => bill.status !== 'Paid');
      const pendingTotal = pending.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
      reply = pending.length
        ? `${pending.length} bill(s) are pending, totaling ₹${pendingTotal.toLocaleString('en-IN')}: ${pending.map((bill) => bill.title).join('; ')}.`
        : 'There are no bills marked pending in the current sample records.';
    } else if (normalizedPrompt.includes('low stock') || normalizedPrompt.includes('restock')) {
      const lowStockItems = inventoryItems.filter((item) => item.statusTag === 'Low Stock');
      reply = lowStockItems.length
        ? `Restock suggestion: ${lowStockItems.map((item) => `${item.name} (${item.totalQty - item.soldQty} units remaining)`).join(', ')}. Check the Suppliers tab to plan a reorder.`
        : 'Your sample inventory has no items marked Low Stock right now. Keep checking the Inventory tab as sales come in.';
    } else if (normalizedPrompt.includes('expir') || normalizedPrompt.includes('waste')) {
      const expiringItems = inventoryItems.filter((item) => item.isOutdated);
      reply = expiringItems.length
        ? `Priority items: ${expiringItems.map((item) => `${item.name} — ${item.expiryNote}`).join('; ')}. Consider a quick markdown or bundle offer to reduce waste.`
        : 'There are no sample items marked as expiring. Check the inventory expiry notes regularly.';
    } else if (normalizedPrompt.includes('profit') || normalizedPrompt.includes('margin')) {
      const profitBill = billsList.find((bill) => bill.categoryId === 'profit');
      reply = profitBill
        ? `The Profit History record shows ₹${Number(profitBill.amount).toLocaleString('en-IN')} (${profitBill.month || 'period not specified'}). This figure is listed separately from operating bills in the report.`
        : 'There is no Profit History record in the current bill data.';
    } else if (normalizedPrompt.includes('supplier')) {
      reply = `You have ${suppliers.length} sample suppliers. Open the Suppliers tab to review contacts, sourced items, and recent purchase details.`;
    }

    setAssistantMessages((messages) => [
      ...messages,
      { role: 'user', text: prompt },
      { role: 'assistant', text: reply }
    ]);
    setAssistantInput('');
  };

  const filteredItems = useMemo(() => {
    return inventoryItems.filter((item) => {
      if (inventorySubTab === 'outdated' && !item.isOutdated) return false;
      if (inventorySubTab === 'items' && item.isOutdated) return false;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subtext.toLowerCase().includes(q)
      );
    });
  }, [inventoryItems, searchQuery, inventorySubTab]);

  const handlePriceAdjust = (skuId, deltaPct) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id !== skuId) return item;
        const nextPrice = Math.max(10, Math.round(item.unitPrice * (1 + deltaPct / 100)));
        return { ...item, unitPrice: nextPrice };
      })
    );
    showToast(`Adjusted retail price for ${skuId}.`);
  };

  const handleQuickStockUpdate = (skuId, addSold, addTotal) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id !== skuId) return item;
        const nextTotal = Math.max(1, item.totalQty + addTotal);
        const nextSold = Math.min(nextTotal, Math.max(0, item.soldQty + addSold));
        const nextPct = Number(((nextSold / nextTotal) * 100).toFixed(1));
        return {
          ...item,
          totalQty: nextTotal,
          soldQty: nextSold,
          soldPercent: nextPct,
          statusTag: nextPct >= 88 ? 'Low Stock' : 'Optimal Stock'
        };
      })
    );
    showToast(`Updated stock ledger for ${skuId}.`);
  };

  const handleClearanceMark = (skuId) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id !== skuId) return item;
        return {
          ...item,
          unitPrice: Math.round(item.unitPrice * 0.75),
          statusTag: '25% Clearance Applied',
          isOutdated: false
        };
      })
    );
    showToast(`Applied 25% flash clearance & moved ${skuId} to active items.`);
  };

  const handleAddSkuSubmit = (e) => {
    e.preventDefault();
    if (!newSkuForm.name.trim()) return;
    const total = Number(newSkuForm.totalQty) || 100;
    const sold = Math.min(total, Number(newSkuForm.soldQty) || 0);
    const pct = Number(((sold / total) * 100).toFixed(1));

    const newItem = {
      id: `SKU ${Math.floor(100 + Math.random() * 899)}-${Math.floor(100 + Math.random() * 899)}`,
      name: newSkuForm.name.trim(),
      subtext: newSkuForm.subtext.trim() || `${warehouse} • Climate Controlled`,
      category: newSkuForm.category,
      soldQty: sold,
      totalQty: total,
      soldPercent: pct,
      unitPrice: Number(newSkuForm.unitPrice) || 200,
      unit: newSkuForm.unit || 'per kg',
      statusTag: pct > 85 ? 'High Demand' : 'Optimal Stock',
      isOutdated: false,
      expiryNote: 'Fresh Batch • 14 Days',
      costPrice: Number(newSkuForm.costPrice) || 120,
      supplier: newSkuForm.supplier,
      iconKey: 'veggies'
    };

    setInventoryItems((prev) => [newItem, ...prev]);
    setIsAddSkuOpen(false);
    setNewSkuForm({
      name: '',
      subtext: '',
      category: 'VEGETABLES',
      totalQty: 250,
      soldQty: 90,
      costPrice: 120,
      unitPrice: 195,
      unit: 'per kg',
      supplier: 'Organic Roots Co.'
    });
    showToast(`Added ${newItem.name} (${newItem.id}) to directory.`);
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    const amt = Number(newReceiptForm.amount) || 2500;
    const targetCategory = newReceiptForm.categoryId || 'online';
    const newPay = {
      id: `PAY-${8822 + payments.length}`,
      gateway: newReceiptForm.gateway,
      method: newReceiptForm.method,
      amount: amt,
      timestamp: '2026-11-05 23:40:00',
      entity: newReceiptForm.entity,
      note: newReceiptForm.note,
      status: 'Completed',
      rawMsg: newReceiptForm.rawMsg
    };
    setPayments((prev) => [newPay, ...prev]);

    const newBillEntry = {
      id: `BIL-${Math.floor(1000 + Math.random() * 8999)}`,
      categoryId: targetCategory,
      title: newReceiptForm.title.trim() || `${newReceiptForm.entity} — ${newReceiptForm.note}`,
      provider: `${newReceiptForm.gateway} • ${newReceiptForm.method}`,
      month: newReceiptForm.month || 'November 2026',
      date: '2026-11-05',
      amount: amt,
      status: 'Paid',
      method: `${newReceiptForm.gateway} (${newReceiptForm.method})`,
      refNo: `REF-${Math.floor(100000 + Math.random() * 899999)}`,
      subtext: newReceiptForm.rawMsg || newReceiptForm.note,
      breakdown: [
        { label: newReceiptForm.note || 'Bill / Receipt Settlement', val: `₹${amt.toLocaleString('en-IN')}` }
      ]
    };
    setBillsList((prev) => [newBillEntry, ...prev]);
    setIsSimPaymentOpen(false);
    showToast(`Logged ₹${amt.toLocaleString('en-IN')} into Bills ledger.`);
  };

  const handleToggleBillStatus = (billId) => {
    setBillsList((prev) =>
      prev.map((b) => {
        if (b.id !== billId) return b;
        const nextStatus = b.status === 'Paid' ? 'Pending' : 'Paid';
        return { ...b, status: nextStatus };
      })
    );
    if (selectedBillDetail && selectedBillDetail.id === billId) {
      setSelectedBillDetail((prev) =>
        prev ? { ...prev, status: prev.status === 'Paid' ? 'Pending' : 'Paid' } : null
      );
    }
    showToast(`Updated payment status for ${billId}.`);
  };

  const handleSupplierRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockSupplierModal) return;
    const targetItem = inventoryItems.find((i) => i.id === restockOrderForm.sku) || inventoryItems[0];
    const qty = Number(restockOrderForm.qty) || 100;
    const poCost = qty * (targetItem ? targetItem.costPrice : 200);

    if (targetItem) {
      handleQuickStockUpdate(targetItem.id, 0, qty);
    }

    setSuppliers((prev) =>
      prev.map((s) => {
        if (s.id !== restockSupplierModal.id) return s;
        return {
          ...s,
          totalSpent: s.totalSpent + poCost,
          sourcedItems: [
            {
              sku: targetItem.id,
              name: targetItem.name,
              buyPrice: targetItem.costPrice,
              sellPrice: targetItem.unitPrice,
              qtyBought: qty,
              lastDate: '2026-11-05'
            },
            ...s.sourcedItems
          ]
        };
      })
    );
    setRestockSupplierModal(null);
    showToast(`Dispatched Purchase Order (+${qty} units) to ${restockSupplierModal.name}.`);
  };

  const selectedSimItem = useMemo(
    () => inventoryItems.find((i) => i.id === simSkuId) || inventoryItems[0],
    [inventoryItems, simSkuId]
  );

  const simMetrics = useMemo(() => {
    if (!selectedSimItem) return null;
    const curPrice = selectedSimItem.unitPrice;
    const cost = selectedSimItem.costPrice;
    const newPrice = Math.round(curPrice * (1 + simMarkupPct / 100));
    const estVol = Math.round(selectedSimItem.soldQty * (1 - simMarkupPct * 0.005));
    const curProfit = (curPrice - cost) * selectedSimItem.soldQty;
    const nextProfit = (newPrice - cost) * estVol;
    return {
      curPrice,
      newPrice,
      cost,
      estVol,
      curProfit,
      nextProfit,
      profitDelta: nextProfit - curProfit
    };
  }, [selectedSimItem, simMarkupPct]);

  // =========================================================================
  // INTERFACE 1: SPLASH SCREEN (Matches User Uploaded Exact Visual 1)
  // =========================================================================
  if (appFlow === 'splash') {
    return (
      <div className="min-h-screen bg-[#E6E2D8] text-[#18201C] font-sans relative overflow-hidden flex flex-col items-center justify-center p-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-85">
          <svg className="w-full h-full object-cover" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="splashBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EADECF" />
                <stop offset="50%" stopColor="#D5E3D6" />
                <stop offset="100%" stopColor="#CBE0D1" />
              </linearGradient>
            </defs>
            <rect width="1440" height="960" fill="url(#splashBase)" />
            <g stroke="#8C7A6B" strokeOpacity="0.25" strokeWidth="1" fill="none">
              <rect x="60" y="40" width="380" height="260" rx="8" />
              <line x1="160" y1="40" x2="160" y2="300" />
              <line x1="60" y1="140" x2="240" y2="140" />
              <rect x="980" y="40" width="400" height="300" rx="8" />
              <line x1="1120" y1="40" x2="1120" y2="340" />
              <line x1="980" y1="180" x2="1380" y2="180" />
              <rect x="60" y="620" width="360" height="280" rx="8" />
              <line x1="200" y1="620" x2="200" y2="900" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-md w-full p-8 rounded-[32px] bg-[#F5F5F2]/85 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(30,40,35,0.12)] text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-[#E5ECE7] border border-white flex items-center justify-center shadow-md relative">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-sm">
              <path d="M 15 50 L 32 30 L 68 30 L 85 50 Z" fill="#F2B979" opacity="0.65" />
              <path d="M 24 50 L 32 38 L 68 38 L 76 50 Z" fill="#9CD6A8" opacity="0.85" />
              <path d="M 20 48 C 22 48 34 32 46 48 C 58 32 70 48 80 48 C 84 48 86 54 83 58 C 76 68 62 76 50 76 C 38 76 24 68 17 58 C 14 54 16 48 20 48 Z" fill="none" stroke="#1E3D30" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <text x="35" y="62" fill="#1E3D30" fontSize="24" fontWeight="bold" fontFamily="sans-serif">MP</text>
            </svg>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#18201C] font-sans">MR vendor</h1>
            <p className="text-xs text-[#52635B] mt-1.5 uppercase tracking-wider font-semibold">
              OmniVendor AI & Micro-Retail Intelligence
            </p>
          </div>

          <p className="text-xs text-[#4A5550] leading-relaxed px-2">
            Automated ledgers, cold-chain monitoring, predictive procurement, and unified merchant settlements built for South Asian enterprise.
          </p>

          <div className="w-full pt-2">
            <button
              onClick={() => setAppFlow('management')}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#688B75] hover:bg-[#587964] text-white text-sm font-semibold shadow-[0_8px_20px_rgba(104,139,117,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <span>Continue to App Management</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-[#688B75] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // INTERFACE 2: APP MANAGEMENT INTERFACE (Matches User Uploaded Exact Visual 2)
  // =========================================================================
  if (appFlow === 'management') {
    return (
      <div className="min-h-screen bg-[#E6E2D8] text-[#18201C] font-sans relative overflow-hidden flex flex-col items-center justify-center p-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80">
          <svg className="w-full h-full object-cover" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mgmtBase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EAE6DF" />
                <stop offset="50%" stopColor="#D8E2D9" />
                <stop offset="100%" stopColor="#C4DACB" />
              </linearGradient>
            </defs>
            <rect width="1440" height="960" fill="url(#mgmtBase)" />
            <g stroke="#8C7A6B" strokeOpacity="0.25" strokeWidth="1" fill="none">
              <rect x="60" y="40" width="380" height="260" rx="8" />
              <path d="M 980,140 Q 1180,40 1380,140 T 1380,340" />
              <path d="M 980,190 Q 1180,90 1380,190" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-[#18201C] uppercase font-serif">
              APP MANAGEMENT
            </h1>
            <p className="text-xs text-[#52635B] mt-1.5 uppercase tracking-wider font-semibold">
              ENTERPRISE WORKSPACE & OPERATIONAL GATEWAY
            </p>
          </div>

          {/* Floating Dock Card matching User Uploaded Image 2 */}
          <div className="bg-[#EAEAE5]/90 backdrop-blur-xl border border-white/90 rounded-[28px] px-6 py-4 shadow-[0_20px_50px_rgba(35,40,35,0.14)] flex items-center justify-center gap-6 sm:gap-8 my-4">
            {[
              { id: 'inventory', label: 'Inventory', icon: Package, tab: 'category' },
              { id: 'analysis', label: 'Analysis', icon: BarChart3, tab: 'buying' },
              { id: 'suppliers', label: 'Suppliers', icon: Store },
              { id: 'payments', label: 'Payment History', icon: CreditCard },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => {
              const IconComp = item.icon;
              const isSelected = activeMainTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMainTab(item.id);
                    if (item.id === 'inventory') setInventorySubTab('category');
                    if (item.id === 'analysis') setAnalysisSubTab('buying');
                    setAppFlow('dashboard');
                  }}
                  className="flex flex-col items-center justify-center group cursor-pointer relative pb-1"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${isSelected ? 'bg-[#B8D0C0] text-[#18201C] scale-105 shadow-md' : 'bg-[#F5F5F2]/90 text-[#2C3531] hover:bg-white shadow-[0_2px_6px_rgba(30,35,30,0.05)]'}`}>
                    <IconComp className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] font-medium text-[#4A5550] group-hover:text-[#18201C] mt-1.5 tracking-tight">
                    {item.label}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 bg-[#688B75] rounded-full absolute -bottom-1" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              onClick={() => setAppFlow('splash')}
              className="px-4 py-2 rounded-xl bg-[#EAE6DF] border border-white text-xs font-semibold text-[#4A5550] hover:text-[#18201C] transition-all cursor-pointer"
            >
              ← Back to Splash
            </button>
            <button
              onClick={() => setAppFlow('dashboard')}
              className="px-6 py-2.5 rounded-xl bg-[#688B75] hover:bg-[#587964] text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN APP DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#EAE6DF] text-[#18201C] font-sans antialiased flex flex-col justify-between relative overflow-x-hidden pb-36 selection:bg-[#688B75] selection:text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="canvasBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAE6DF" />
              <stop offset="50%" stopColor="#DDE3D9" />
              <stop offset="100%" stopColor="#D6CFC4" />
            </linearGradient>
            <linearGradient id="celadonWash" x1="0%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#C2D3C4" stopOpacity="0.78" />
              <stop offset="60%" stopColor="#B2C7B7" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#9FB8A8" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="terracottaWash" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AE9A" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#C49A84" stopOpacity="0.78" />
            </linearGradient>
            <pattern id="bauhausDots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.4" fill="#8C7A6B" fillOpacity="0.55" />
            </pattern>
            <pattern id="bauhausStripes" x="0" y="0" width="20" height="7" patternUnits="userSpaceOnUse">
              <line x1="0" y1="2" x2="20" y2="2" stroke="#8C7A6B" strokeWidth="1" strokeOpacity="0.45" />
            </pattern>
          </defs>

          <rect width="1440" height="960" fill="url(#canvasBase)" />
          <circle cx="1180" cy="360" r="460" fill="url(#celadonWash)" />
          <path d="M -80,960 L -80,540 Q 260,370 680,550 T 1480,820 L 1480,960 Z" fill="url(#celadonWash)" />
          <circle cx="20" cy="400" r="240" fill="url(#terracottaWash)" />
          <rect x="0" y="540" width="190" height="420" fill="#C9D6C8" fillOpacity="0.55" />
          <rect x="0" y="810" width="190" height="150" fill="#D5C0AF" fillOpacity="0.65" />
          <rect x="190" y="810" width="95" height="150" fill="#B59B8B" fillOpacity="0.55" />
          <polygon points="0,960 190,810 190,960" fill="#C49B85" fillOpacity="0.45" />
          <rect x="1115" y="610" width="170" height="240" fill="url(#terracottaWash)" />
          <rect x="1285" y="745" width="155" height="105" fill="url(#bauhausStripes)" />
          <polygon points="1115,850 1440,850 1440,960 980,960" fill="#C89E89" fillOpacity="0.72" />

          <g stroke="#8C7A6B" strokeOpacity="0.4" strokeWidth="1" fill="none">
            <polygon points="185,32 355,-20 430,82" />
            <line x1="250" y1="-20" x2="290" y2="55" />
            <line x1="1115" y1="0" x2="1115" y2="960" />
            <line x1="1285" y1="0" x2="1285" y2="960" />
            <line x1="190" y1="530" x2="190" y2="960" />
            <line x1="285" y1="530" x2="285" y2="960" />
            <line x1="940" y1="140" x2="1440" y2="140" />
            <line x1="1115" y1="52" x2="1285" y2="52" />
            <line x1="1115" y1="530" x2="1440" y2="530" />
            <line x1="0" y1="810" x2="430" y2="810" />
            <line x1="960" y1="850" x2="1440" y2="850" />
          </g>
        </svg>
      </div>

      <div className="w-full max-w-[1220px] mx-auto px-5 sm:px-8 pt-7 pb-6 relative z-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#18201C]/10 pb-4 mb-5">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setAppFlow('management')}
              className="w-11 h-11 rounded-2xl bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 flex items-center justify-center text-[#18201C] shadow-[0_4px_12px_rgba(30,40,35,0.06)] hover:bg-white/90 transition-all cursor-pointer"
              title="App Management Gateway"
            >
              <Home className="w-5 h-5 stroke-[1.8]" />
            </button>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-[#18201C] tracking-tight capitalize">
                  {activeMainTab === 'inventory'
                    ? 'Inventory'
                    : activeMainTab === 'payments'
                    ? 'Payment History'
                    : activeMainTab}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#BCE3C8] text-[#235C36] uppercase">
                  LIVE SYNC
                </span>
              </div>
              <p className="text-xs text-[#4A5550] mt-0.5">
                Merchant Stock & Department Directory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setAppFlow('management')}
              className="px-3.5 py-2 rounded-full bg-[#EAE6DF] border border-white text-xs font-semibold text-[#4A5550] hover:text-[#18201C] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>App Management</span>
            </button>

            <div className="relative flex items-center bg-[#F5F5F2]/85 backdrop-blur-md border border-white/85 rounded-full pl-3.5 pr-7 py-2 shadow-[0_4px_14px_rgba(30,40,35,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#688B75] mr-2 shrink-0" />
              <select
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                  showToast(`Switched active node to ${e.target.value}`);
                }}
                className="appearance-none bg-transparent text-[#18201C] text-xs font-semibold focus:outline-none cursor-pointer pr-1"
              >
                <option value="Warehouse Central A-1">Warehouse Central A-1</option>
                <option value="North Hub Logistics">North Hub Logistics</option>
                <option value="South Cold Storage">South Cold Storage</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A5550] pointer-events-none" />
            </div>

            <button
              onClick={() => setIsAddSkuOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#688B75] hover:bg-[#587964] text-white text-xs font-semibold shadow-[0_4px_12px_rgba(104,139,117,0.3)] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add SKU</span>
            </button>
          </div>
        </header>

        {/* SUB-NAVIGATION PILL BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {activeMainTab === 'inventory' && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[
                { id: 'category', label: 'Category' },
                { id: 'items', label: 'Items' },
                { id: 'prices', label: 'Prices' },
                { id: 'outdated', label: 'Outdated Items' }
              ].map((tab) => {
                const isSelected = inventorySubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setInventorySubTab(tab.id)}
                    className={`px-5 py-2 text-xs rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#688B75] text-white font-semibold shadow-[0_4px_12px_rgba(104,139,117,0.28)]'
                        : 'text-[#4A5550] hover:text-[#18201C] font-medium hover:bg-[#F5F5F2]/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {activeMainTab === 'analysis' && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[
                { id: 'buying', label: '1. Procurement Suggestions' },
                { id: 'pricing', label: '2. Price Simulator' },
                { id: 'mode', label: '3. Strategy Playbook' }
              ].map((tab) => {
                const isSelected = analysisSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAnalysisSubTab(tab.id)}
                    className={`px-5 py-2 text-xs rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#688B75] text-white font-semibold shadow-[0_4px_12px_rgba(104,139,117,0.28)]'
                        : 'text-[#4A5550] hover:text-[#18201C] font-medium hover:bg-[#F5F5F2]/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {activeMainTab === 'suppliers' && (
            <div className="flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#688B75] text-white text-xs font-semibold">
                <span>Active Vendor Ledgers & Sourcing Records</span>
              </div>
              <span className="text-xs font-medium text-[#4A5550]">
                {suppliers.length} Direct Farm & Cold-Chain Partners
              </span>
            </div>
          )}

          {activeMainTab === 'payments' && (
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setActiveBillCategory('all')}
                  className={`px-4 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                    activeBillCategory === 'all'
                      ? 'bg-[#688B75] text-white font-semibold shadow-[0_4px_12px_rgba(104,139,117,0.28)]'
                      : 'text-[#4A5550] hover:text-[#18201C] font-medium hover:bg-[#F5F5F2]/60'
                  }`}
                >
                  All 6 Bill Categories
                </button>
                {BILL_CATEGORIES.map((bCat) => {
                  const isSel = activeBillCategory === bCat.id;
                  return (
                    <button
                      key={bCat.id}
                      onClick={() => setActiveBillCategory(bCat.id)}
                      className={`px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#688B75] text-white font-semibold shadow-[0_4px_12px_rgba(104,139,117,0.28)]'
                          : 'text-[#4A5550] hover:text-[#18201C] font-medium hover:bg-[#F5F5F2]/60'
                      }`}
                    >
                      {bCat.number}. {bCat.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={generateLoanDocument}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#688B75] border border-white text-xs font-semibold text-white hover:bg-[#587964] transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Prepare Bank Loan Report</span>
                </button>
                <button
                  onClick={() => {
                    setNewReceiptForm((prev) => ({
                      ...prev,
                      categoryId: activeBillCategory === 'all' ? 'household' : activeBillCategory
                    }));
                    setIsSimPaymentOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F5F5F2]/85 border border-white text-xs font-semibold text-[#18201C] hover:bg-white transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#235C36]" />
                  <span>+ Add / Simulate Bill</span>
                </button>
              </div>
            </div>
          )}

          {activeMainTab === 'settings' && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#688B75] text-white text-xs font-semibold">
              <span>Store Configuration & Preferences</span>
            </div>
          )}
        </div>

        {/* INVENTORY -> CATEGORY GRID */}
        {activeMainTab === 'inventory' && inventorySubTab === 'category' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INITIAL_CATEGORIES.map((cat) => {
              const CategoryIcon = cat.icon;
              const isAlert = cat.inStock.includes('Alerts');

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSearchQuery(cat.filterKey);
                    setInventorySubTab('items');
                  }}
                  className="bg-[#F5F5F2]/72 hover:bg-[#F5F5F2]/88 backdrop-blur-md border border-white/75 p-6 rounded-[22px] shadow-[0_10px_28px_-6px_rgba(40,45,40,0.08)] transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[198px]"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${cat.iconBg} ${cat.iconColor} group-hover:scale-105 transition-transform`}>
                        <CategoryIcon className="w-5 h-5 stroke-[1.9]" />
                      </div>
                      <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${cat.tagStyle}`}>
                        {cat.tag}
                      </span>
                    </div>

                    <h3 className="text-[17px] font-bold text-[#18201C] mt-4 tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#4A5550] mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-[#18201C]/8 flex items-center justify-between text-xs">
                    <span className="text-[#4A5550] font-medium">{cat.skus}</span>
                    <span className={`font-bold ${isAlert ? 'text-[#8C4A32]' : 'text-[#18201C]'}`}>
                      {cat.inStock}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* INVENTORY -> ITEMS / OUTDATED LIST */}
        {activeMainTab === 'inventory' &&
          (inventorySubTab === 'items' || inventorySubTab === 'outdated') && (
            <div className="space-y-3.5">
              <div className="bg-[#F5F5F2]/78 backdrop-blur-md border border-white/80 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-[0_8px_24px_-6px_rgba(40,45,40,0.06)]">
                <div className="flex items-center gap-3 w-full">
                  <Search className="w-4 h-4 text-[#4A5550] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search inventory items by name, SKU, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-xs text-[#18201C] placeholder-[#68736D] focus:outline-none"
                  />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-2.5 py-1 rounded-full bg-[#EAE6DF] text-[11px] font-semibold text-[#4A5550] hover:text-[#18201C] flex items-center gap-1 shrink-0"
                  >
                    <span>Clear</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredItems.map((item) => {
                const visuals = getCategoryVisuals(item.category, item.iconKey);
                const ItemIcon = visuals.Icon;
                const isLow =
                  item.statusTag.includes('Low') ||
                  item.statusTag.includes('Clearance') ||
                  item.statusTag.includes('Rotate');

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemDetail(item)}
                    className="bg-[#F5F5F2]/75 hover:bg-[#F5F5F2]/90 backdrop-blur-md border border-white/80 rounded-[22px] p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all cursor-pointer group shadow-[0_10px_26px_-6px_rgba(40,45,40,0.07)]"
                  >
                    <div className="flex items-center gap-4 min-w-[290px]">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${visuals.bg} ${visuals.text} group-hover:scale-105 transition-transform`}>
                        <ItemIcon className="w-5 h-5 stroke-[1.9]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-[#18201C] text-[15px]">{item.name}</h3>
                          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${visuals.pill}`}>
                            {item.category}
                          </span>
                          <span className="text-[11px] font-mono text-[#68736D]">{item.id}</span>
                        </div>
                        <p className="text-xs text-[#4A5550] mt-1">{item.subtext}</p>
                        {item.isOutdated && (
                          <p className="text-[11px] font-semibold text-[#8C4A32] mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.expiryNote}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full lg:w-60 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#4A5550]">
                          Sold: <strong className="text-[#18201C] font-semibold">{item.soldQty}</strong> / {item.totalQty}
                        </span>
                        <span className="text-[#255832] font-bold">{item.soldPercent}%</span>
                      </div>
                      <div className="w-full bg-[#D9E2D9] rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#688B75] h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, item.soldPercent)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end lg:self-center">
                      <div className="text-right">
                        <span className="text-[10px] text-[#68736D] font-semibold uppercase tracking-wider block">UNIT PRICE</span>
                        <span className="text-base font-bold text-[#18201C] font-mono">
                          ₹{item.unitPrice}
                        </span>
                      </div>

                      {item.isOutdated ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearanceMark(item.id);
                          }}
                          className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#E5C5B8] text-[#593224] hover:bg-[#D99B84] transition-colors cursor-pointer"
                        >
                          Apply 25% Flash Sale
                        </button>
                      ) : (
                        <span className={`text-[11px] font-semibold px-3.5 py-1 rounded-full ${isLow ? 'bg-[#E5C5B8] text-[#593224]' : 'bg-[#B8E3C0] text-[#255832]'}`}>
                          {item.statusTag}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* INVENTORY -> PRICES MANAGEMENT */}
        {activeMainTab === 'inventory' && inventorySubTab === 'prices' && (
          <div className="space-y-3.5">
            {inventoryItems.map((item) => {
              const visuals = getCategoryVisuals(item.category, item.iconKey);
              const ItemIcon = visuals.Icon;
              const unitMargin = item.unitPrice - item.costPrice;
              const marginPct = ((unitMargin / item.unitPrice) * 100).toFixed(1);

              return (
                <div
                  key={item.id}
                  className="bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 rounded-[22px] p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-[0_10px_26px_-6px_rgba(40,45,40,0.07)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${visuals.bg} ${visuals.text}`}>
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#18201C] text-sm">{item.name}</h3>
                        <span className="text-[11px] font-mono text-[#68736D]">{item.id}</span>
                      </div>
                      <p className="text-xs text-[#4A5550] mt-0.5">Supplier: {item.supplier}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-xs">
                    <div>
                      <span className="text-[#68736D] block">Procurement Cost</span>
                      <span className="font-mono font-bold text-[#18201C] text-sm">₹{item.costPrice}</span>
                    </div>
                    <div>
                      <span className="text-[#68736D] block">Retail Selling Price</span>
                      <span className="font-mono font-bold text-[#255832] text-sm">₹{item.unitPrice}</span>
                    </div>
                    <div>
                      <span className="text-[#68736D] block">Gross Margin</span>
                      <span className="font-mono font-bold text-[#18201C] text-sm">+₹{unitMargin} ({marginPct}%)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePriceAdjust(item.id, -3)}
                      className="px-3 py-1.5 rounded-full bg-[#EAE6DF] hover:bg-[#D5C0AF] text-[#18201C] text-xs font-semibold cursor-pointer"
                    >
                      -3%
                    </button>
                    <button
                      onClick={() => handlePriceAdjust(item.id, 3)}
                      className="px-3 py-1.5 rounded-full bg-[#B8E3C0] hover:bg-[#9CD6A8] text-[#255832] text-xs font-semibold cursor-pointer"
                    >
                      +3%
                    </button>
                    <button
                      onClick={() => handlePriceAdjust(item.id, 5)}
                      className="px-3 py-1.5 rounded-full bg-[#688B75] hover:bg-[#587964] text-white text-xs font-semibold cursor-pointer"
                    >
                      +5%
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ANALYSIS MODULE */}
        {activeMainTab === 'analysis' && (
          <div className="space-y-5">
            <div className="bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 rounded-[22px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#9CD6A8] text-[#1F542C] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-[#18201C] text-base">
                    {strategyMode === 'profit' ? 'Profit Optimization Mode Active' : 'Balanced & Loss-Prevention Mode Active'}
                  </h2>
                  <p className="text-xs text-[#4A5550] mt-0.5">
                    {strategyMode === 'profit' ? 'Prioritizing high-margin SKUs and scaling fast-moving fresh inventory.' : 'Preserving working capital and clearing perishable lots before spoilage.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#EAE6DF]/80 p-1 rounded-full border border-white/60">
                <button
                  onClick={() => setStrategyMode('profit')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${strategyMode === 'profit' ? 'bg-[#688B75] text-white shadow-2xs' : 'text-[#4A5550]'}`}
                >
                  Profit Mode
                </button>
                <button
                  onClick={() => setStrategyMode('balanced')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${strategyMode === 'balanced' ? 'bg-[#688B75] text-white shadow-2xs' : 'text-[#4A5550]'}`}
                >
                  Loss Prevention
                </button>
              </div>
            </div>

            {analysisSubTab === 'buying' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 p-6 rounded-[22px] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#18201C]/8 pb-3">
                    <h3 className="font-bold text-[#18201C] text-sm flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-[#255832]" />
                      Recommended to Buy MORE
                    </h3>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#B8E3C0] text-[#255832]">
                      High Velocity
                    </span>
                  </div>

                  <div className="bg-white/65 p-4 rounded-2xl border border-white space-y-1.5 text-xs">
                    <div className="font-bold text-[#18201C] text-sm">Fresh Hass Avocados (+46.1% Margin)</div>
                    <div className="text-[#4A5550]">Suggested order: <span className="font-bold text-[#255832]">600 kg (+150 kg expansion)</span></div>
                    <div className="text-[#255832] font-bold pt-1">+₹22,500 estimated extra profit / month</div>
                  </div>
                </div>

                <div className="bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 p-6 rounded-[22px] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#18201C]/8 pb-3">
                    <h3 className="font-bold text-[#18201C] text-sm flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-[#8C4A32]" />
                      Recommended to Buy LESS / HOLD
                    </h3>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E5C5B8] text-[#593224]">
                      Capital Preservation
                    </span>
                  </div>

                  <div className="bg-white/65 p-4 rounded-2xl border border-white space-y-1.5 text-xs">
                    <div className="font-bold text-[#18201C] text-sm">A2 Cultured Farm Butter (42.6% Sell-Through)</div>
                    <div className="text-[#4A5550]">Suggested order: <span className="font-bold text-[#8C4A32]">Hold next shipment & run 15% bundle promo</span></div>
                    <div className="text-[#4A5550] font-bold pt-1">₹14,500 spoilage risk prevented</div>
                  </div>
                </div>
              </div>
            )}

            {analysisSubTab === 'pricing' && simMetrics && (
              <div className="bg-[#F5F5F2]/78 backdrop-blur-md border border-white/80 rounded-[22px] p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#18201C]/8 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#18201C]">Interactive Retail Price Elasticity Simulator</h3>
                    <p className="text-xs text-[#4A5550] mt-0.5">Test +3%, +5%, or +10% retail price adjustments and preview monthly revenue impact.</p>
                  </div>
                  <select
                    value={simSkuId}
                    onChange={(e) => setSimSkuId(e.target.value)}
                    className="bg-white/90 border border-white rounded-full px-4 py-2 text-xs font-semibold text-[#18201C]"
                  >
                    {inventoryItems.map((item) => (
                      <option key={item.id} value={item.id}>{item.name} (₹{item.unitPrice})</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-semibold text-[#4A5550] mr-2">Select Price Increase Scenario:</span>
                  {[3, 5, 10, 15].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setSimMarkupPct(pct)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${simMarkupPct === pct ? 'bg-[#688B75] text-white shadow-2xs' : 'bg-white/80 text-[#4A5550]'}`}
                    >
                      +{pct}% Markup
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/70 rounded-2xl p-4 border border-white">
                    <span className="text-[11px] text-[#68736D] block">Simulated Retail Price</span>
                    <span className="text-xl font-bold text-[#18201C] font-mono mt-1 block">₹{simMetrics.newPrice}</span>
                  </div>
                  <div className="bg-white/70 rounded-2xl p-4 border border-white">
                    <span className="text-[11px] text-[#68736D] block">Projected Monthly Profit</span>
                    <span className="text-xl font-bold text-[#255832] font-mono mt-1 block">₹{simMetrics.nextProfit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-white/70 rounded-2xl p-4 border border-white">
                    <span className="text-[11px] text-[#68736D] block">Net Monthly Profit Delta</span>
                    <span className="text-xl font-bold text-[#235C36] font-mono mt-1 block">+₹{Math.max(0, simMetrics.profitDelta).toLocaleString('en-IN')} / mo</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handlePriceAdjust(selectedSimItem.id, simMarkupPct)}
                    className="px-5 py-2.5 rounded-full bg-[#688B75] hover:bg-[#587964] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Apply ₹{simMetrics.newPrice} Price to Live Inventory
                  </button>
                </div>
              </div>
            )}

            {analysisSubTab === 'mode' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { title: 'Cold Chain Energy Optimization', badge: 'Optimal • 2.4°C', badgeStyle: 'bg-[#C2DDF0] text-[#23495D]', desc: 'Consolidating Dairy & Cold Brew compressor cycles saves ₹8,400/month.' },
                  { title: 'Dynamic Perishable Markdown', badge: 'Zero Waste Protocol', badgeStyle: 'bg-[#B8E3C0] text-[#255832]', desc: 'Auto-trigger 20% POS bundle discounts prior to lot expiry.' },
                  { title: 'Direct Farm Consolidation', badge: 'Peak Harvest', badgeStyle: 'bg-[#F2D5B8] text-[#6E441B]', desc: 'Combining Michoacán Avocado and Orchard Apple freight reduces logistics cost.' }
                ].map((card, i) => (
                  <div key={i} className="bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 rounded-[22px] p-5 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      <span className={`inline-block text-[10px] font-semibold px-3 py-1 rounded-full ${card.badgeStyle}`}>{card.badge}</span>
                      <h3 className="font-bold text-[#18201C] text-base">{card.title}</h3>
                      <p className="text-xs text-[#4A5550] leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUPPLIERS MODULE */}
        {activeMainTab === 'suppliers' && (
          <div className="space-y-4">
            {suppliers.map((sup) => (
              <div key={sup.id} className="bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 p-6 rounded-[22px] space-y-4">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#18201C]/8 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#9CD6A8] text-[#1F542C] flex items-center justify-center font-bold text-sm">
                      {sup.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#18201C] text-base">{sup.name}</h3>
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#B8E3C0] text-[#255832]">{sup.category}</span>
                      </div>
                      <p className="text-xs text-[#4A5550] mt-0.5">Contact: {sup.contactPerson} • {sup.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-[#68736D] uppercase block">Total Capital Deployed</span>
                      <span className="text-base font-bold text-[#235C36]">₹{sup.totalSpent.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => setRestockSupplierModal(sup)}
                      className="px-4 py-2 rounded-full bg-[#688B75] hover:bg-[#587964] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                    >
                      + Restock PO
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sup.sourcedItems.map((sItem, idx) => (
                    <div key={idx} className="bg-white/65 border border-white rounded-2xl p-3.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#18201C] block">{sItem.name}</span>
                        <span className="text-[#68736D] font-mono text-[11px]">{sItem.sku} • Last Batch: {sItem.lastDate}</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-[#18201C] block">{sItem.qtyBought} kg</span>
                        <span className="text-[#235C36] text-[11px]">Buy ₹{sItem.buyPrice} → Sell ₹{sItem.sellPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BILLS MODULE */}
        {activeMainTab === 'payments' && (
          <div className="space-y-5">
            {activeBillCategory === 'all' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {BILL_CATEGORIES.map((bCat) => {
                  const CatIcon = bCat.icon;
                  const catBills = billsList.filter((b) => b.categoryId === bCat.id);
                  const totalCatAmt = catBills.reduce((acc, item) => acc + item.amount, 0);

                  return (
                    <div
                      key={bCat.id}
                      onClick={() => setActiveBillCategory(bCat.id)}
                      className="bg-[#F5F5F2]/72 hover:bg-[#F5F5F2]/88 backdrop-blur-md border border-white/75 p-6 rounded-[22px] shadow-[0_10px_28px_-6px_rgba(40,45,40,0.08)] transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[198px]"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${bCat.iconBg} ${bCat.iconColor} group-hover:scale-105 transition-transform`}>
                            <CatIcon className="w-5 h-5 stroke-[1.9]" />
                          </div>
                          <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${bCat.tagStyle}`}>
                            {bCat.tag}
                          </span>
                        </div>

                        <h3 className="text-[17px] font-bold text-[#18201C] mt-4 tracking-tight">
                          {bCat.number}. {bCat.name}
                        </h3>
                        <p className="text-xs text-[#4A5550] mt-1 leading-relaxed">
                          {bCat.desc}
                        </p>
                      </div>

                      <div className="pt-3.5 mt-4 border-t border-[#18201C]/8 flex items-center justify-between text-xs">
                        <span className="text-[#4A5550] font-medium">{catBills.length} Monthly Records</span>
                        <span className="font-bold text-[#18201C]">₹{totalCatAmt.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeBillCategory !== 'all' && (() => {
              const currentMeta = BILL_CATEGORIES.find((c) => c.id === activeBillCategory) || BILL_CATEGORIES[0];
              const ActiveCatIcon = currentMeta.icon;
              const categoryBills = billsList.filter((b) => b.categoryId === activeBillCategory);

              return (
                <div className="space-y-4">
                  <div className="bg-[#F5F5F2]/78 backdrop-blur-md border border-white/80 rounded-[22px] p-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => setActiveBillCategory('all')}
                        className="px-3.5 py-2 rounded-xl bg-[#EAE6DF] hover:bg-[#B8D0C0] text-[#18201C] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>All Categories</span>
                      </button>

                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${currentMeta.iconBg} ${currentMeta.iconColor}`}>
                        <ActiveCatIcon className="w-5 h-5 stroke-[1.9]" />
                      </div>

                      <div>
                        <h2 className="text-base font-bold text-[#18201C]">{currentMeta.number}. {currentMeta.name}</h2>
                        <p className="text-xs text-[#4A5550] mt-0.5">{currentMeta.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {categoryBills.map((bill) => {
                      const isPaid = bill.status === 'Paid';
                      return (
                        <div
                          key={bill.id}
                          onClick={() => setSelectedBillDetail(bill)}
                          className="bg-[#F5F5F2]/75 hover:bg-[#F5F5F2]/92 backdrop-blur-md border border-white/80 rounded-[22px] p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${currentMeta.iconBg} ${currentMeta.iconColor}`}>
                              <ActiveCatIcon className="w-5 h-5 stroke-[1.9]" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-bold text-[#18201C] text-[15px]">{bill.title}</h3>
                                <span className="text-[11px] font-mono text-[#68736D]">{bill.id}</span>
                              </div>
                              <p className="text-xs text-[#4A5550] mt-1">{bill.provider} • {bill.subtext}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end lg:self-center" onClick={(e) => e.stopPropagation()}>
                            <div className="text-right pr-2">
                              <span className="text-[10px] text-[#68736D] font-semibold uppercase block">{bill.method}</span>
                              <span className="text-base font-bold font-mono text-[#18201C]">₹{bill.amount.toLocaleString('en-IN')}</span>
                            </div>
                            <button
                              onClick={() => handleToggleBillStatus(bill.id)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${isPaid ? 'bg-[#B8E3C0] text-[#255832]' : 'bg-[#E5C5B8] text-[#593224]'}`}
                            >
                              {isPaid ? '✓ Paid' : 'Mark Paid'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* SETTINGS MODULE */}
        {activeMainTab === 'settings' && (
          <div className="bg-[#F5F5F2]/75 backdrop-blur-md border border-white/80 p-7 rounded-[22px] max-w-2xl mx-auto space-y-5 shadow-[0_10px_28px_-6px_rgba(40,45,40,0.08)]">
            <div className="border-b border-[#18201C]/8 pb-4">
              <h2 className="text-base font-bold text-[#18201C]">Merchant Workspace Configuration</h2>
              <p className="text-xs text-[#4A5550] mt-0.5">App Management Gateway Active</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#4A5550] font-semibold block mb-1.5">Merchant Store Designation</label>
                <input
                  type="text"
                  value={storeConfig.storeName}
                  onChange={(e) => setStoreConfig({ ...storeConfig, storeName: e.target.value })}
                  className="w-full bg-white/80 border border-white rounded-2xl p-3 text-[#18201C] font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#4A5550] font-semibold block mb-1.5">Cold Items Target Temperature</label>
                <input
                  type="text"
                  value={storeConfig.coldChainTarget}
                  onChange={(e) => setStoreConfig({ ...storeConfig, coldChainTarget: e.target.value })}
                  className="w-full bg-white/80 border border-white rounded-2xl p-3 text-[#18201C] font-medium focus:outline-none"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-[#18201C]/8 flex justify-between">
              <button
                onClick={() => setAppFlow('management')}
                className="bg-[#EAE6DF] hover:bg-[#D5C0AF] text-[#18201C] px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
              >
                Return to App Management
              </button>
              <button
                onClick={() => showToast('Configuration saved successfully.')}
                className="bg-[#688B75] hover:bg-[#587964] text-white px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING DOCK NAVIGATION */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-[#EAEAE5]/82 backdrop-blur-xl border border-white/80 rounded-[30px] px-5 sm:px-7 py-2.5 shadow-[0_16px_36px_-8px_rgba(35,40,35,0.14)] flex items-center gap-3 sm:gap-6">
          {[
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'analysis', label: 'Analysis', icon: BarChart3 },
            { id: 'suppliers', label: 'Suppliers', icon: Store },
            { id: 'payments', label: 'Payment History', icon: CreditCard },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((dockItem) => {
            const DockIcon = dockItem.icon;
            const isActive = activeMainTab === dockItem.id;

            return (
              <button
                key={dockItem.id}
                onClick={() => setActiveMainTab(dockItem.id)}
                className="flex flex-col items-center justify-center group cursor-pointer relative pb-1.5"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${isActive ? 'bg-[#B8D0C0] text-[#18201C] scale-105' : 'bg-[#F5F5F2]/85 text-[#2C3531] hover:bg-white'}`}>
                  <DockIcon className="w-[19px] h-[19px] stroke-[1.8]" />
                </div>
                <span className={`text-[11px] tracking-tight mt-1.5 ${isActive ? 'font-bold text-[#18201C]' : 'font-medium text-[#4A5550]'}`}>
                  {dockItem.label}
                </span>
                {isActive && <span className="w-1.5 h-1.5 bg-[#8FA998] rounded-full absolute -bottom-0.5" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* MODALS */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 bg-[#18201C]/30 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedItemDetail(null)}>
          <div className="bg-[#F5F5F2]/95 backdrop-blur-xl border border-white rounded-[26px] max-w-lg w-full p-6 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-[#18201C]/8 pb-3">
              <div>
                <span className="text-[11px] font-mono text-[#68736D]">{selectedItemDetail.id} • {selectedItemDetail.category}</span>
                <h3 className="text-lg font-bold text-[#18201C] mt-0.5">{selectedItemDetail.name}</h3>
              </div>
              <button onClick={() => setSelectedItemDetail(null)} className="w-8 h-8 rounded-full bg-[#EAE6DF] flex items-center justify-center text-[#4A5550]"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => { handleQuickStockUpdate(selectedItemDetail.id, 10, 0); setSelectedItemDetail(null); }} className="px-4 py-2 rounded-full bg-[#EAE6DF] text-xs font-semibold text-[#18201C] cursor-pointer">Record +10 Sold</button>
              <button onClick={() => { handleQuickStockUpdate(selectedItemDetail.id, 0, 50); setSelectedItemDetail(null); }} className="px-4 py-2 rounded-full bg-[#688B75] text-xs font-semibold text-white cursor-pointer">Receive +50 Batch</button>
            </div>
          </div>
        </div>
      )}

      {isAddSkuOpen && (
        <div className="fixed inset-0 z-50 bg-[#18201C]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F5F5F2]/95 backdrop-blur-xl border border-white rounded-[26px] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#18201C]/8 pb-3">
              <h3 className="text-base font-bold text-[#18201C]">Register New Inventory SKU</h3>
              <button onClick={() => setIsAddSkuOpen(false)} className="w-8 h-8 rounded-full bg-[#EAE6DF] flex items-center justify-center text-[#4A5550]"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddSkuSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#4A5550] block mb-1">Product Name</label>
                <input type="text" required value={newSkuForm.name} onChange={(e) => setNewSkuForm({ ...newSkuForm, name: e.target.value })} className="w-full bg-white rounded-2xl p-2.5 border border-white text-[#18201C]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#4A5550] block mb-1">Retail Price (₹)</label>
                  <input type="number" value={newSkuForm.unitPrice} onChange={(e) => setNewSkuForm({ ...newSkuForm, unitPrice: e.target.value })} className="w-full bg-white rounded-2xl p-2.5 border border-white text-[#18201C]" />
                </div>
                <div>
                  <label className="font-semibold text-[#4A5550] block mb-1">Initial Qty</label>
                  <input type="number" value={newSkuForm.totalQty} onChange={(e) => setNewSkuForm({ ...newSkuForm, totalQty: e.target.value })} className="w-full bg-white rounded-2xl p-2.5 border border-white text-[#18201C]" />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddSkuOpen(false)} className="px-4 py-2 rounded-full text-[#4A5550]">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-[#688B75] text-white font-semibold">Save SKU</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 right-6 z-50 px-4 py-3 rounded-2xl border border-white bg-[#F5F5F2]/95 backdrop-blur-md text-[#18201C] text-xs font-semibold shadow-lg flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#235C36]" />
          <span>{toast}</span>
        </div>
      )}

      {/* PRESET AI ASSISTANT DEMO */}
      {activeMainTab === 'payments' && assistantOpen && (
        <section className="fixed bottom-40 right-4 sm:bottom-24 sm:right-6 z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-white/90 bg-[#F5F5F2]/95 shadow-[0_20px_55px_rgba(24,32,28,0.22)] backdrop-blur-xl" aria-label="MR.VENDOR loan document assistant">
          <div className="flex items-center justify-between bg-[#688B75] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15"><Bot className="h-5 w-5" /></div>
              <div>
                <h2 className="text-sm font-bold">Loan Document Assistant</h2>
                <p className="text-[10px] text-white/80">Demo • uses Payment History records</p>
              </div>
            </div>
            <button type="button" onClick={() => setAssistantOpen(false)} className="rounded-lg px-2 py-1 text-lg leading-none text-white/90 hover:bg-white/15" aria-label="Close assistant">×</button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {assistantMessages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-[#688B75] text-white' : 'rounded-bl-md bg-[#EAE6DF] text-[#26342C]'}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#18201C]/10 px-3 pb-3 pt-2">
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wide text-[#68736D]">Try a question</p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {['Prepare bank loan report', 'Show totals by category', 'Are any bills pending?', 'Show profit record'].map((prompt) => (
                <button key={prompt} type="button" onClick={() => handleAssistantPrompt(prompt)} className="rounded-full border border-[#688B75]/25 bg-white/80 px-2.5 py-1.5 text-[10px] font-medium text-[#345241] hover:bg-[#E5ECE7]">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); if (assistantInput.trim()) handleAssistantPrompt(assistantInput.trim()); }} className="flex items-center gap-2">
              <input value={assistantInput} onChange={(event) => setAssistantInput(event.target.value)} placeholder="Ask about bills or totals…" className="min-w-0 flex-1 rounded-xl border border-[#18201C]/10 bg-white px-3 py-2.5 text-xs text-[#18201C] outline-none focus:border-[#688B75]" aria-label="Ask the loan document assistant" />
              <button type="submit" disabled={!assistantInput.trim()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#688B75] text-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send question"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </section>
      )}
      {activeMainTab === 'payments' && (
        <button type="button" onClick={() => setAssistantOpen((open) => !open)} className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 rounded-full border border-white/80 bg-[#688B75] px-4 py-3 text-white shadow-[0_10px_28px_rgba(35,50,40,0.25)] transition hover:bg-[#587964]" aria-expanded={assistantOpen} aria-label={assistantOpen ? 'Close loan document assistant' : 'Open loan document assistant'}>
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-semibold">Loan Assistant</span>
        </button>
      )}
    </div>
  );
}
