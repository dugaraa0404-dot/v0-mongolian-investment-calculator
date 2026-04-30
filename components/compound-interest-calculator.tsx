"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Wallet, Calendar, Percent, Building2, CircleDollarSign, ArrowUpRight, Info, LineChart as LineChartIcon, PieChartIcon, BarChart3, Presentation } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
  Bar,
} from "recharts"

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

const CHART_COLORS = {
  primary: "hsl(var(--chart-1))",
  accent: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))",
}

const BAR_PALETTE = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

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

    const compoundFactor = Math.pow(1 + r / n, n * t)
    const principalGrowth = P * compoundFactor

    const contributionGrowth =
      r > 0
        ? PMT * 12 * ((compoundFactor - 1) / r)
        : PMT * 12 * t

    const totalValue = principalGrowth + contributionGrowth
    const totalContributions = P + PMT * 12 * t
    const totalInterest = totalValue - totalContributions

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
        label: `${year}`,
        totalValue: Math.round(yearTotalValue),
        contributions: Math.round(yearTotalContributions),
        interest: Math.round(yearInterest),
        principalGrowth: Math.round(yearPrincipalGrowth),
      })
    }

    const pieData = [
      { name: "Эхний хөрөнгө", value: P, color: CHART_COLORS.quaternary },
      { name: "Сар бүрийн хуримтлал", value: PMT * 12 * t, color: CHART_COLORS.accent },
      { name: "Хүүгийн орлого", value: Math.round(totalInterest), color: CHART_COLORS.primary },
    ]

    return {
      totalValue,
      totalContributions,
      totalInterest,
      principalGrowth,
      contributionGrowth,
      yearlyData,
      pieData,
    }
  }, [principal, monthlyContribution, annualRate, years, compoundingFrequency])

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border/50 bg-card/95 backdrop-blur-sm p-4 shadow-xl">
          <p className="font-semibold text-foreground mb-2">{label} жил</p>
          <div className="space-y-1.5">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  {entry.dataKey === "totalValue" && "Нийт"}
                  {entry.dataKey === "contributions" && "Оруулсан"}
                  {entry.dataKey === "interest" && "Хүү"}
                </span>
                <span className="font-mono font-medium" style={{ color: entry.color }}>
                  {formatTugrik(entry.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">Хүүгийн Тооцоолуур</h1>
                <p className="text-sm text-muted-foreground">Хуримтлалын өсөлтийг тооцоолох</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="h-9 bg-transparent">
                <Link href="/presentation">
                  <Presentation className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Танилцуулга</span>
                </Link>
              </Button>
              <Badge variant="secondary" className="hidden md:flex items-center gap-1.5 px-3 py-1.5">
                <CircleDollarSign className="h-3.5 w-3.5" />
                <span>Монгол төгрөг</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Input Panel */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wallet className="h-5 w-5 text-primary" />
                    Оруулах мэдээлэл
                  </CardTitle>
                  <CardDescription>
                    Хөрөнгө оруулалтын үзүүлэлтүүд
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Principal */}
                  <div className="space-y-2">
                    <Label htmlFor="principal" className="text-sm font-medium">
                      Эхний хөрөнгө
                    </Label>
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="text-right font-mono transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground">{formatTugrik(principal)}</p>
                  </div>

                  {/* Monthly Contribution */}
                  <div className="space-y-2">
                    <Label htmlFor="monthly" className="text-sm font-medium">
                      Сар бүрийн хуримтлал
                    </Label>
                    <Input
                      id="monthly"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="text-right font-mono transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-xs text-muted-foreground">{formatTugrik(monthlyContribution)}</p>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        Жилийн хүү
                      </Label>
                      <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold text-primary">
                        {annualRate}%
                      </span>
                    </div>
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
                      <span className="text-primary/70">Дундаж: 15-18%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  {/* Years */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Хугацаа
                      </Label>
                      <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold text-primary">
                        {years} жил
                      </span>
                    </div>
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
                    <Label className="text-sm font-medium">Хүү нэмэгдэх давтамж</Label>
                    <Select
                      value={compoundingFrequency}
                      onValueChange={(value) => setCompoundingFrequency(value as CompoundingFrequency)}
                    >
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
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

              {/* Info Card */}
              <Card className="border-primary/20 bg-primary/5 shadow-sm">
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Монголын эдийн засаг</h3>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <li>Бодлогын хүү: 12-13% (2024)</li>
                        <li>Хадгаламжийн хүү: 10-15%</li>
                        <li>Инфляци: 7-10%</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6 lg:col-span-8 xl:col-span-9">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                <CardContent className="pt-6 relative">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">Нийт хуримтлал</div>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-primary">
                    {formatTugrikShort(calculations.totalValue)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {years} жилийн дараа
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-sm font-medium text-muted-foreground">Нийт оруулсан</div>
                  <div className="mt-2 text-2xl font-bold text-foreground">
                    {formatTugrikShort(calculations.totalContributions)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Эхний + сар бүрийн
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-accent/30 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent shadow-sm">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
                <CardContent className="pt-6 relative">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">Хүүгийн орлого</div>
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                  <div className="mt-2 text-2xl font-bold text-accent">
                    {formatTugrikShort(calculations.totalInterest)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    +{((calculations.totalInterest / calculations.totalContributions) * 100).toFixed(0)}% ашиг
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Chart */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Хөрөнгийн өсөлт</CardTitle>
                    <CardDescription>
                      Цаг хугацааны явцад таны хуримтлал хэрхэн өсөх вэ
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="area" className="w-full">
                  <TabsList className="mb-6 grid w-full grid-cols-3 sm:w-auto sm:inline-flex">
                    <TabsTrigger value="area" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Талбай</span>
                    </TabsTrigger>
                    <TabsTrigger value="line" className="gap-2">
                      <LineChartIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Шугам</span>
                    </TabsTrigger>
                    <TabsTrigger value="pie" className="gap-2">
                      <PieChartIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Бүтэц</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="area" className="mt-0">
                    <div className="h-80 sm:h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={calculations.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.5} />
                              <stop offset="50%" stopColor={CHART_COLORS.quinary} stopOpacity={0.3} />
                              <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.accent} stopOpacity={0.5} />
                              <stop offset="100%" stopColor={CHART_COLORS.accent} stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.tertiary} stopOpacity={0.5} />
                              <stop offset="100%" stopColor={CHART_COLORS.tertiary} stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                          <XAxis
                            dataKey="year"
                            tickFormatter={(value) => `${value}`}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            tickLine={{ stroke: "hsl(var(--border))" }}
                          />
                          <YAxis
                            tickFormatter={(value) => formatTugrikShort(value)}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            tickLine={{ stroke: "hsl(var(--border))" }}
                            width={85}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="totalValue"
                            stroke={CHART_COLORS.primary}
                            strokeWidth={2.5}
                            fill="url(#colorTotal)"
                            animationDuration={1000}
                            animationEasing="ease-out"
                          />
                          <Area
                            type="monotone"
                            dataKey="contributions"
                            stroke={CHART_COLORS.accent}
                            strokeWidth={2}
                            fill="url(#colorContrib)"
                            animationDuration={1000}
                            animationEasing="ease-out"
                          />
                          <Area
                            type="monotone"
                            dataKey="interest"
                            stroke={CHART_COLORS.tertiary}
                            strokeWidth={2}
                            fill="url(#colorInterest)"
                            animationDuration={1000}
                            animationEasing="ease-out"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS.primary }} />
                        <span className="text-muted-foreground">Нийт хуримтлал</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS.accent }} />
                        <span className="text-muted-foreground">Оруулсан мөнгө</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS.tertiary }} />
                        <span className="text-muted-foreground">Хүүгийн орлого</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="line" className="mt-0">
                    <div className="h-80 sm:h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={calculations.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                          <XAxis
                            dataKey="year"
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            tickLine={{ stroke: "hsl(var(--border))" }}
                          />
                          <YAxis
                            tickFormatter={(value) => formatTugrikShort(value)}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            tickLine={{ stroke: "hsl(var(--border))" }}
                            width={85}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar
                            dataKey="contributions"
                            radius={[4, 4, 0, 0]}
                            opacity={0.55}
                          >
                            {calculations.yearlyData.map((_, index) => (
                              <Cell key={`bar-cell-${index}`} fill={BAR_PALETTE[index % BAR_PALETTE.length]} />
                            ))}
                          </Bar>
                          <Line
                            type="monotone"
                            dataKey="totalValue"
                            stroke={CHART_COLORS.primary}
                            strokeWidth={3}
                            dot={{ fill: CHART_COLORS.primary, strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                            animationDuration={1200}
                            animationEasing="ease-out"
                          />
                          <Line
                            type="monotone"
                            dataKey="interest"
                            stroke={CHART_COLORS.tertiary}
                            strokeWidth={2.5}
                            dot={{ fill: CHART_COLORS.tertiary, strokeWidth: 0, r: 3 }}
                            animationDuration={1200}
                            animationEasing="ease-out"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS.primary }} />
                        <span className="text-muted-foreground">Нийт хуримтлал</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-3 w-12 overflow-hidden rounded-full opacity-70">
                          {BAR_PALETTE.map((c, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <span className="text-muted-foreground">Оруулсан</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CHART_COLORS.tertiary }} />
                        <span className="text-muted-foreground">Хүүгийн орлого</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pie" className="mt-0">
                    <div className="h-80 sm:h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={calculations.pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius="55%"
                            outerRadius="80%"
                            paddingAngle={3}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={800}
                            animationEasing="ease-out"
                          >
                            {calculations.pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="rounded-lg border border-border/50 bg-card/95 backdrop-blur-sm p-3 shadow-xl">
                                    <p className="font-semibold text-foreground">{data.name}</p>
                                    <p className="font-mono text-sm mt-1">{formatTugrik(data.value)}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {((data.value / calculations.totalValue) * 100).toFixed(1)}%
                                    </p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-2xl font-bold text-foreground">{formatTugrikShort(calculations.totalValue)}</p>
                      <p className="text-sm text-muted-foreground">Нийт хуримтлал {years} жилийн дараа</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Yearly Breakdown Table */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Жил бүрийн задаргаа</CardTitle>
                <CardDescription>Хөрөнгийн өсөлтийн дэлгэрэнгүй мэдээлэл</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="pb-3 text-left font-medium text-muted-foreground">Жил</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Оруулсан</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Хүү</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground">Нийт</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.yearlyData
                        .filter((_, index) => index % Math.ceil(years / 10) === 0 || index === years)
                        .map((row, idx, arr) => (
                          <tr
                            key={row.year}
                            className={`border-b border-border/30 transition-colors hover:bg-muted/30 ${idx === arr.length - 1 ? "bg-primary/5 font-medium" : ""}`}
                          >
                            <td className="py-3.5 font-medium">{row.year} жил</td>
                            <td className="py-3.5 text-right font-mono text-muted-foreground">
                              {formatTugrik(row.contributions)}
                            </td>
                            <td className="py-3.5 text-right font-mono text-accent">
                              +{formatTugrik(row.interest)}
                            </td>
                            <td className="py-3.5 text-right font-mono font-medium text-foreground">
                              {formatTugrik(row.totalValue)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Хүүгийн Тооцоолуур &middot; Монгол улсад зориулсан санхүүгийн хэрэгсэл
          </p>
          <p className="text-center text-xs text-muted-foreground/60 mt-1">
            Анхааруулга: Энэхүү тооцоолуур нь зөвхөн мэдээллийн зорилгоор бөгөөд санхүүгийн зөвлөгөө биш юм.
          </p>
        </div>
      </footer>
    </div>
  )
}
