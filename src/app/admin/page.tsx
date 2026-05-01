"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  BarChart3,
  DollarSign,
  FileText,
  TrendingUp,
  ShoppingCart,
  UserCheck,
  Activity,
  Settings,
  CreditCard,
  Tag,
  Mail,
  Eye,
} from "lucide-react";

interface Stats {
  totalUsers: number;
  totalAnalyses: number;
  totalPayments: number;
  totalRevenue: number;
  avgCustomerValue: number;
}

interface RecentAnalysis {
  id: string;
  platform: string;
  businessType: string;
  overallScore: number | null;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
}

interface BusinessType {
  businessType: string;
  _count: { id: number };
}

type TabType = "dashboard" | "users" | "analyses" | "packages" | "payments" | "settings";

interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  _count: { analyses: number; payments: number };
}

interface AnalysisItem {
  id: string;
  platform: string;
  businessType: string;
  overallScore: number | null;
  mainProblem: string | null;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  payments: { amount: number; status: string; packageType: string }[];
}

interface PaymentItem {
  id: string;
  packageType: string;
  amount: number;
  status: string;
  method: string | null;
  createdAt: string;
  user: { name: string; email: string };
  analysis: { platform: string; businessType: string; overallScore: number | null };
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.stats) {
        setStats(data.stats);
        setRecentAnalyses(data.recentAnalyses || []);
        setBusinessTypes(data.businessTypes || []);
      }
    } catch {
      console.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTabData = useCallback(async (tab: TabType) => {
    if (tab === "users") {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } else if (tab === "analyses") {
      const res = await fetch("/api/admin/analyses");
      const data = await res.json();
      if (data.analyses) setAnalyses(data.analyses);
    } else if (tab === "payments") {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      if (data.payments) setPayments(data.payments);
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== "admin") {
          router.push("/auth");
        } else {
          loadDashboard();
        }
      })
      .catch(() => router.push("/auth"));
  }, [router, loadDashboard]);

  function handleTabChange(tab: TabType) {
    setActiveTab(tab);
    loadTabData(tab);
  }

  const tabs: { id: TabType; label: string; icon: typeof Users }[] = [
    { id: "dashboard", label: "لوحة التحكم", icon: BarChart3 },
    { id: "users", label: "المستخدمين", icon: Users },
    { id: "analyses", label: "التحليلات", icon: FileText },
    { id: "payments", label: "المدفوعات", icon: CreditCard },
    { id: "packages", label: "الباقات", icon: Tag },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-border min-h-screen p-4 flex flex-col">
        <Link href="/" className="text-xl font-bold text-primary mb-8 block">
          🧪 مختبر النمو
        </Link>
        <nav className="space-y-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-text-secondary hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="text-xs text-text-secondary text-center pt-4 border-t border-border">
          لوحة تحكم الأدمن
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && stats && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[
                {
                  label: "الزوار",
                  value: stats.totalUsers * 5,
                  icon: Eye,
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  label: "التسجيلات",
                  value: stats.totalUsers,
                  icon: UserCheck,
                  color: "bg-green-50 text-green-600",
                },
                {
                  label: "التحليلات",
                  value: stats.totalAnalyses,
                  icon: Activity,
                  color: "bg-purple-50 text-purple-600",
                },
                {
                  label: "المبيعات",
                  value: stats.totalPayments,
                  icon: ShoppingCart,
                  color: "bg-amber-50 text-amber-600",
                },
                {
                  label: "الإيرادات",
                  value: `$${stats.totalRevenue}`,
                  icon: DollarSign,
                  color: "bg-emerald-50 text-emerald-600",
                },
                {
                  label: "متوسط العميل",
                  value: `$${stats.avgCustomerValue.toFixed(0)}`,
                  icon: TrendingUp,
                  color: "bg-rose-50 text-rose-600",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-border"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Funnel */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-4">رحلة المستخدم (Funnel)</h2>
              <div className="flex items-center justify-between gap-2">
                {[
                  { label: "زائر", count: stats.totalUsers * 5 },
                  { label: "سجل", count: stats.totalUsers },
                  { label: "حلل", count: stats.totalAnalyses },
                  { label: "اشترى", count: stats.totalPayments },
                ].map((step, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {step.count}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {step.label}
                    </div>
                    {i < 3 && (
                      <div className="text-text-secondary mt-1">⬇</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Types */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="text-lg font-bold mb-4">
                  أكثر المجالات طلباً
                </h2>
                <div className="space-y-3">
                  {businessTypes.map((bt, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{bt.businessType}</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                        {bt._count.id}
                      </span>
                    </div>
                  ))}
                  {businessTypes.length === 0 && (
                    <p className="text-text-secondary text-sm">
                      لا توجد بيانات بعد
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Analyses */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="text-lg font-bold mb-4">آخر التحليلات</h2>
                <div className="space-y-3">
                  {recentAnalyses.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <span className="font-medium">{a.user.name}</span>
                        <span className="text-text-secondary mr-2">
                          {a.businessType}
                        </span>
                      </div>
                      <span
                        className={`font-bold ${
                          a.overallScore && a.overallScore >= 70
                            ? "text-green-500"
                            : "text-amber-500"
                        }`}
                      >
                        {a.overallScore || "-"}
                      </span>
                    </div>
                  ))}
                  {recentAnalyses.length === 0 && (
                    <p className="text-text-secondary text-sm">
                      لا توجد تحليلات بعد
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Hot Leads */}
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>🔥</span> العملاء الساخنين
              </h2>
              <p className="text-text-secondary text-sm mb-4">
                أشخاص حصلوا على تحليل مجاني ولم يشتروا بعد
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right py-2 px-3 font-medium text-text-secondary">
                        الاسم
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-text-secondary">
                        البريد
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-text-secondary">
                        الدرجة
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-text-secondary">
                        إجراء
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAnalyses.slice(0, 5).map((a) => (
                      <tr key={a.id} className="border-b border-border/50">
                        <td className="py-2 px-3">{a.user.name}</td>
                        <td className="py-2 px-3 text-text-secondary">
                          {a.user.email}
                        </td>
                        <td className="py-2 px-3 font-bold">
                          {a.overallScore || "-"}
                        </td>
                        <td className="py-2 px-3">
                          <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                            <Mail className="w-3 h-3" /> إرسال عرض
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">إدارة المستخدمين</h1>
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium">الاسم</th>
                    <th className="text-right py-3 px-4 font-medium">البريد</th>
                    <th className="text-right py-3 px-4 font-medium">الهاتف</th>
                    <th className="text-right py-3 px-4 font-medium">الدور</th>
                    <th className="text-right py-3 px-4 font-medium">التحليلات</th>
                    <th className="text-right py-3 px-4 font-medium">المشتريات</th>
                    <th className="text-right py-3 px-4 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-border/50">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-text-secondary">{user.email}</td>
                      <td className="py-3 px-4">{user.phone || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === "admin" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"}`}>
                          {user.role === "admin" ? "أدمن" : "مستخدم"}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user._count.analyses}</td>
                      <td className="py-3 px-4">{user._count.payments}</td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(user.createdAt).toLocaleDateString("ar")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="p-8 text-center text-text-secondary">
                  لا يوجد مستخدمون بعد
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analyses Tab */}
        {activeTab === "analyses" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">إدارة التحليلات</h1>
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium">العميل</th>
                    <th className="text-right py-3 px-4 font-medium">المنصة</th>
                    <th className="text-right py-3 px-4 font-medium">النشاط</th>
                    <th className="text-right py-3 px-4 font-medium">الدرجة</th>
                    <th className="text-right py-3 px-4 font-medium">المشكلة</th>
                    <th className="text-right py-3 px-4 font-medium">الحالة</th>
                    <th className="text-right py-3 px-4 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((a) => (
                    <tr key={a.id} className="border-t border-border/50">
                      <td className="py-3 px-4 font-medium">{a.user.name}</td>
                      <td className="py-3 px-4">{a.platform}</td>
                      <td className="py-3 px-4">{a.businessType}</td>
                      <td className="py-3 px-4 font-bold">{a.overallScore || "-"}</td>
                      <td className="py-3 px-4 text-sm text-text-secondary max-w-48 truncate">
                        {a.mainProblem || "-"}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          a.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {a.status === "completed" ? "مكتمل" : "جاري"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(a.createdAt).toLocaleDateString("ar")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {analyses.length === 0 && (
                <div className="p-8 text-center text-text-secondary">
                  لا توجد تحليلات بعد
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">إدارة المدفوعات</h1>
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium">العميل</th>
                    <th className="text-right py-3 px-4 font-medium">الباقة</th>
                    <th className="text-right py-3 px-4 font-medium">المبلغ</th>
                    <th className="text-right py-3 px-4 font-medium">الوسيلة</th>
                    <th className="text-right py-3 px-4 font-medium">الحالة</th>
                    <th className="text-right py-3 px-4 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-t border-border/50">
                      <td className="py-3 px-4 font-medium">{p.user.name}</td>
                      <td className="py-3 px-4">{p.packageType}</td>
                      <td className="py-3 px-4 font-bold">${p.amount}</td>
                      <td className="py-3 px-4">{p.method || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          p.status === "completed" ? "bg-green-100 text-green-700" :
                          p.status === "pending" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {p.status === "completed" ? "مكتمل" : p.status === "pending" ? "معلق" : "مرتجع"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {new Date(p.createdAt).toLocaleDateString("ar")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {payments.length === 0 && (
                <div className="p-8 text-center text-text-secondary">
                  لا توجد مدفوعات بعد
                </div>
              )}
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === "packages" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">إدارة الباقات</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "مجانية", price: "0$", badge: "تجربة أولى" },
                { name: "احترافية", price: "10$", badge: "أصحاب المشاريع" },
                { name: "شاملة", price: "50$", badge: "نتائج أسرع" },
                { name: "VIP", price: "حسب الحالة", badge: "تنفيذ كامل" },
              ].map((pkg, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{pkg.name}</h3>
                      <span className="text-sm text-text-secondary">{pkg.badge}</span>
                    </div>
                    <span className="text-xl font-bold text-primary">{pkg.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl border border-border text-sm font-medium hover:bg-gray-50 transition">
                      تعديل السعر
                    </button>
                    <button className="flex-1 py-2 rounded-xl border border-border text-sm font-medium hover:bg-gray-50 transition">
                      تعديل المزايا
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-bold mb-4">التسويق الداخلي</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Tag, label: "كوبونات خصم" },
                  { icon: Mail, label: "حملات بريدية" },
                  { icon: Activity, label: "إشعارات" },
                  { icon: TrendingUp, label: "عروض العودة" },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="p-4 rounded-xl border border-border text-center hover:border-primary hover:shadow-sm transition"
                  >
                    <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">الإعدادات</h1>
            <div className="space-y-6">
              {[
                { label: "اسم المنصة", value: "مختبر النمو", type: "text" },
                { label: "البريد الإلكتروني", value: "info@growthlab.com", type: "email" },
              ].map((setting, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-border">
                  <label className="block text-sm font-medium mb-2">{setting.label}</label>
                  <input
                    type={setting.type}
                    defaultValue={setting.value}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    dir={setting.type === "email" ? "ltr" : "rtl"}
                  />
                </div>
              ))}

              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-bold mb-4">بوابات الدفع</h3>
                <div className="space-y-3">
                  {["بطاقة بنكية", "تحويل بنكي", "PayPal", "وسائل دفع محلية"].map(
                    (method, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="font-medium">{method}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-primary rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all rtl:peer-checked:after:-translate-x-full" />
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-bold mb-4">إدارة الصلاحيات</h3>
                <p className="text-text-secondary text-sm">
                  يمكنك إضافة موظفين ومنحهم صلاحيات محددة للوصول إلى أقسام
                  مختلفة من لوحة التحكم.
                </p>
                <button className="mt-4 bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition">
                  إضافة موظف
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
