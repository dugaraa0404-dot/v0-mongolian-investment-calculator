"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Wallet, Calendar, Percent, PiggyBank, BarChart3 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"

type CompoundingFrequency = "annually" | "semi-annually" | "quarterly" | "monthly" | "daily"

const frequencyMap: Record<CompoundingFrequency, { label: string; value: number }> = {
  annually: { label: "Жилд нэг удаа", value: 1 },
  "semi-annually": { label: "Хагас жилд нэг удаа", value: 2 },
  quarterly: { label: "Улирал бүр", value: 4 },
  monthly: { label: "Сар бүр", value: 12 },
  daily: { label: "Өдөр бүр", value: 365 },
}

function formatTugrik(amount: number): string {
  return new Intl.NumberFormat("mn-MN", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + "₮"
}

function formatTugrikShort(amount: number): string {
  if (amount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1) + " тэрбум₮"
  }
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + " сая₮"
  }
  if (amount >= 1_000) {
    return (amount / 1_000).toFixed(0) + " мянга₮"
  }
  return formatTugrik(amount)
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(10_000_000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500_000)
  const [annualRate, setAnnualRate] = useState<number>(15)
  const [years, setYears] = useState<number>(10)
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly")

  const calculations = useMemo(() => {
    const n = frequencyMap[compoundingFrequency].value
    const r = annualRate / 100
    const t = years
    const P = principal
    const PMT = monthlyContribution

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundFactor = Math.pow(1 + r / n, n * t)
    const principalGrowth = P * compoundFactor

    // Future value of monthly contributions
    // FV = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
    const contributionGrowth =
      r > 0
        ? PMT * 12 * ((compoundFactor - 1) / r)
        : PMT * 12 * t

    const totalValue = principalGrowth + contributionGrowth
    const totalContributions = P + PMT * 12 * t
    const totalInterest = totalValue - totalContributions

    // Generate yearly data for charts
    const yearlyData = []
    for (let year = 0; year <= t; year++) {
      const yearCompoundFactor = Math.pow(1 + r / n, n * year)
      const yearPrincipalGrowth = P * yearCompoundFactor
      const yearContributionGrowth =
        r > 0
          ? PMT * 12 * ((yearCompoundFactor - 1) / r)
          : PMT * 12 * year

      const yearTotalValue = yearPrincipalGrowth + yearContributionGrowth
      const yearTotalContributions = P + PMT * 12 * year
      const yearInterest = yearTotalValue - yearTotalContributions

      yearlyData.push({
        year: year,
        label: `${year} жил`,
        totalValue: Math.round(yearTotalValue),
        contributions: Math.round(yearTotalContributions),
        interest: Math.round(yearInterest),
      })
    }

    return {
      totalValue,
      totalContributions,
      totalInterest,
      principalGrowth,
      contributionGrowth,
      yearlyData,
    }
  }, [principal, monthlyContribution, annualRate, years, compoundingFrequency])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Хүүгийн Тооцоолуур</h1>
              <p className="text-sm text-muted-foreground">Хуримтлалын өсөлтийг тооцоолох</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  Хөрөнгө оруулалтын мэдээлэл
                </CardTitle>
                <CardDescription>
                  Доорх талбаруудыг бөглөнө үү
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Principal */}
                <div className="space-y-2">
                  <Label htmlFor="principal" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    Эхний хөрөнгө
                  </Label>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="text-right font-mono"
                  />
                  <p className="text-xs text-muted-foreground">{formatTugrik(principal)}</p>
                </div>

                {/* Monthly Contribution */}
                <div className="space-y-2">
                  <Label htmlFor="monthly" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Сар бүрийн хуримтлал
                  </Label>
                  <Input
                    id="monthly"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="text-right font-mono"
                  />
                  <p className="text-xs text-muted-foreground">{formatTugrik(monthlyContribution)}</p>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                  <Label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      Жилийн хүү
                    </span>
                    <span className="font-mono text-primary">{annualRate}%</span>
                  </Label>
                  <Slider
                    value={[annualRate]}
                    onValueChange={(value) => setAnnualRate(value[0])}
                    min={1}
                    max={30}
                    step={0.5}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>Монголын дундаж: 15-18%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Years */}
                <div className="space-y-3">
                  <Label className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      Хугацаа
                    </span>
                    <span className="font-mono text-primary">{years} жил</span>
                  </Label>
                  <Slider
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                    min={1}
                    max={40}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 жил</span>
                    <span>40 жил</span>
                  </div>
                </div>

                {/* Compounding Frequency */}
                <div className="space-y-2">
                  <Label>Хүү нэмэгдэх давтамж</Label>
                  <Select
                    value={compoundingFrequency}
                    onValueChange={(value) => setCompoundingFrequency(value as CompoundingFrequency)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(frequencyMap).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6 lg:col-span-2">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-sm font-medium text-muted-foreground">Нийт хуримтлал</div>
                  <div className="mt-1 text-2xl font-bold text-primary">
                    {formatTugrikShort(calculations.totalValue)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {years} жилийн дараа
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm font-medium text-muted-foreground">Нийт оруулсан мөнгө</div>
                  <div className="mt-1 text-2xl font-bold text-foreground">
                    {formatTugrikShort(calculations.totalContributions)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Эхний + сар бүр
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="pt-6">
                  <div className="text-sm font-medium text-muted-foreground">Нийт хүүгийн орлого</div>
                  <div className="mt-1 text-2xl font-bold text-accent">
                    {formatTugrikShort(calculations.totalInterest)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    +{((calculations.totalInterest / calculations.totalContributions) * 100).toFixed(0)}% ашиг
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Хөрөнгийн өсөлт</CardTitle>
                <CardDescription>
                  Цаг хугацааны явцад таны хөрөнгө хэрхэн өсөх талаар
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="area" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="area">Талбайн график</TabsTrigger>
                    <TabsTrigger value="bar">Баганан график</TabsTrigger>
                  </TabsList>
                  <TabsContent value="area">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={calculations.yearlyData}>
                          <defs>
                            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="year"
                            tickFormatter={(value) => `${value}ж`}
                            className="text-xs"
                          />
                          <YAxis
                            tickFormatter={(value) => formatTugrikShort(value)}
                            className="text-xs"
                            width={80}
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="rounded-lg border bg-card p-3 shadow-lg">
                                    <p className="font-medium">{label} жил</p>
                                    <p className="text-sm text-chart-2">
                                      Оруулсан: {formatTugrik(payload[0]?.value as number)}
                                    </p>
                                    <p className="text-sm text-chart-1">
                                      Хүү: {formatTugrik(payload[1]?.value as number)}
                                    </p>
                                    <p className="mt-1 font-medium">
                                      Нийт: {formatTugrik((payload[0]?.value as number) + (payload[1]?.value as number))}
                                    </p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="contributions"
                            stackId="1"
                            stroke="hsl(var(--chart-2))"
                            fill="url(#colorContributions)"
                            name="Оруулсан мөнгө"
                          />
                          <Area
                            type="monotone"
                            dataKey="interest"
                            stackId="1"
                            stroke="hsl(var(--chart-1))"
                            fill="url(#colorInterest)"
                            name="Хүүгийн орлого"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="bar">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={calculations.yearlyData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis
                            dataKey="year"
                            tickFormatter={(value) => `${value}ж`}
                            className="text-xs"
                          />
                          <YAxis
                            tickFormatter={(value) => formatTugrikShort(value)}
                            className="text-xs"
                            width={80}
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="rounded-lg border bg-card p-3 shadow-lg">
                                    <p className="font-medium">{label} жил</p>
                                    <p className="text-sm text-chart-2">
                                      Оруулсан: {formatTugrik(payload[0]?.value as number)}
                                    </p>
                                    <p className="text-sm text-chart-1">
                                      Хүү: {formatTugrik(payload[1]?.value as number)}
                                    </p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Legend
                            formatter={(value) =>
                              value === "contributions" ? "Оруулсан мөнгө" : "Хүүгийн орлого"
                            }
                          />
                          <Bar dataKey="contributions" stackId="a" fill="hsl(var(--chart-2))" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="interest" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Yearly Breakdown Table */}
            <Card>
              <CardHeader>
                <CardTitle>Жил бүрийн задаргаа</CardTitle>
                <CardDescription>Хөрөнгийн өсөлтийн дэлгэрэнгүй</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-left font-medium text-muted-foreground">Жил</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Оруулсан</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Хүү</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Нийт</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.yearlyData
                        .filter((_, index) => index % Math.ceil(years / 10) === 0 || index === years)
                        .map((row) => (
                          <tr key={row.year} className="border-b last:border-0">
                            <td className="py-3 font-medium">{row.year} жил</td>
                            <td className="py-3 text-right font-mono text-muted-foreground">
                              {formatTugrik(row.contributions)}
                            </td>
                            <td className="py-3 text-right font-mono text-accent">
                              {formatTugrik(row.interest)}
                            </td>
                            <td className="py-3 text-right font-mono font-medium">
                              {formatTugrik(row.totalValue)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground">Монголын эдийн засгийн мэдээлэл</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• Монгол банкны бодлогын хүү: 12-13% (2024)</li>
                  <li>• Хадгаламжийн дундаж хүү: 10-15%</li>
                  <li>• Инфляцийн түвшин: 7-10%</li>
                  <li>• Зээлийн хүү: 18-24%</li>
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Анхааруулга: Энэхүү тооцоолуур нь зөвхөн мэдээллийн зорилгоор бөгөөд санхүүгийн зөвлөгөө биш юм.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Хүүгийн Тооцоолуур • Монгол улсад зориулсан санхүүгийн хэрэгсэл
          </p>
        </div>
      </footer>
    </div>
  )
}
