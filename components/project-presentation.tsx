"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  TrendingUp,
  LineChart,
  Coins,
  Globe,
  Zap,
  ShieldCheck,
  Sparkles,
  Target,
  BarChart3,
  Code2,
  ArrowRight,
  Maximize2,
  Minimize2,
} from "lucide-react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts"

const sampleGrowthData = [
  { year: "1", value: 1200000 },
  { year: "5", value: 7800000 },
  { year: "10", value: 21500000 },
  { year: "15", value: 48200000 },
  { year: "20", value: 95400000 },
  { year: "25", value: 178900000 },
  { year: "30", value: 318600000 },
]

const BAR_PALETTE = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const breakdownData = [
  { name: "Эхний хөрөнгө", value: 1000000, color: "hsl(var(--chart-4))" },
  { name: "Хуримтлал", value: 36000000, color: "hsl(var(--chart-2))" },
  { name: "Хүү", value: 281600000, color: "hsl(var(--chart-1))" },
]

const comparisonData = [
  { name: "Хадгаламж", traditional: 5, compound: 12 },
  { name: "Бонд", traditional: 8, compound: 14 },
  { name: "Хувьцаа", traditional: 10, compound: 18 },
  { name: "Хосолсон", traditional: 7, compound: 15 },
]

interface Slide {
  id: number
  title: string
  subtitle?: string
  content: React.ReactNode
  background?: string
}

export function ProjectPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const slides: Slide[] = [
    {
      id: 1,
      title: "Хүүгийн Тооцоолуур",
      subtitle: "Монголын хөрөнгө оруулагчдад зориулсан",
      content: (
        <div className="flex flex-col items-center justify-center text-center gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium text-primary">Санхүүгийн ухаалаг шийдэл</span>
          </div>

          <div className="size-32 rounded-3xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/30">
            <Calculator className="size-16 text-primary-foreground" strokeWidth={1.5} />
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Хүүгийн Тооцоолуур
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
              Хуримтлалын өсөлтийг тооцоолох, ирээдүйн санхүүгээ төлөвлөх найдвартай хэрэгсэл
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              Монгол хэл
            </Badge>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              Төгрөгийн валют
            </Badge>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              Бодит цагийн график
            </Badge>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Асуудал",
      subtitle: "Яагаад энэ төсөл хэрэгтэй вэ?",
      content: (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20">
              <span className="size-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-sm font-medium text-destructive">Тулгарч буй бэрхшээл</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              Олон хүн санхүүгээ төлөвлөхөд бэрхшээлтэй тулгардаг
            </h2>
            <div className="space-y-4">
              {[
                "Хүүгийн нийлмэл өсөлтийг ойлгоход хэцүү",
                "Олон жилийн хуримтлалын үр дүнг харуулах хэрэгсэл байхгүй",
                "Монгол хэл дээрх найдвартай тооцоолуур ховор",
                "Инфляци, хүүгийн хувийг тооцох цогц шийдэл байхгүй",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-destructive">{i + 1}</span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="size-3 text-primary" />
              <span className="text-sm font-medium text-primary">Бидний шийдэл</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-balance">Энгийн, ойлгомжтой тооцоолуур</h2>
            <div className="space-y-4">
              {[
                "Бодит цагийн график, дүрслэлтэй харуулна",
                "Сар, жил бүрийн дэлгэрэнгүй задаргаа",
                "Бүрэн Монгол хэл дээр, төгрөгөөр",
                "Монголын банкны хүүгийн хувьд тохирсон",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Үндсэн Боломжууд",
      subtitle: "Тооцоолуурын онцлог шинж чанарууд",
      content: (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: Calculator,
              title: "Хүүгийн нийлмэл",
              desc: "Өдөр, сар, улирал, жилээр хүү нэмэгдэх давтамжийг сонгох боломжтой",
              color: "from-blue-500/20 to-blue-500/5",
              iconColor: "text-blue-600 dark:text-blue-400",
            },
            {
              icon: TrendingUp,
              title: "Өсөлтийн график",
              desc: "Хөрөнгийн өсөлтийг бодит цагийн динамик графикаар харуулна",
              color: "from-emerald-500/20 to-emerald-500/5",
              iconColor: "text-emerald-600 dark:text-emerald-400",
            },
            {
              icon: Coins,
              title: "Төгрөгийн валют",
              desc: "Бүх тооцоо төгрөгөөр, Монголын стандартаар форматлагдана",
              color: "from-amber-500/20 to-amber-500/5",
              iconColor: "text-amber-600 dark:text-amber-400",
            },
            {
              icon: BarChart3,
              title: "Дэлгэрэнгүй задаргаа",
              desc: "Жил бүрийн хүү, хуримтлал, нийт дүнг хүснэгтээр харуулна",
              color: "from-violet-500/20 to-violet-500/5",
              iconColor: "text-violet-600 dark:text-violet-400",
            },
            {
              icon: Target,
              title: "Зорилго төлөвлөлт",
              desc: "Сар бүрийн хуримтлалын дүн, хүүгийн хувийг өөрчлөх боломжтой",
              color: "from-rose-500/20 to-rose-500/5",
              iconColor: "text-rose-600 dark:text-rose-400",
            },
            {
              icon: ShieldCheck,
              title: "Найдвартай тооцоо",
              desc: "Олон улсын стандарт томьёогоор үнэн зөв тооцоолно",
              color: "from-cyan-500/20 to-cyan-500/5",
              iconColor: "text-cyan-600 dark:text-cyan-400",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="p-6 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur"
            >
              <div className={`size-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className={`size-6 ${feature.iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 4,
      title: "Хүүгийн Нийлмэл Томьёо",
      subtitle: "Тооцооллын математик үндэс",
      content: (
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Үндсэн томьёо</p>
              <div className="text-3xl md:text-5xl font-mono font-bold tracking-tight">
                A = P(1 + r/n)<sup>nt</sup>
              </div>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Хүүгийн нийлмэл томьёо нь хугацаа өнгөрөх тусам хүү дээр хүү нэмэгдэж, өсөлт нь экспоненциал өсөх зарчмыг харуулдаг
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { symbol: "A", label: "Эцсийн дүн", desc: "Хугацааны эцэст хүлээн авах нийт мөнгө" },
              { symbol: "P", label: "Эхний хөрөнгө", desc: "Анх оруулсан үндсэн хөрөнгийн дүн" },
              { symbol: "r", label: "Жилийн хүү", desc: "Жилийн хүүгийн хувь (аравтын бутархай)" },
              { symbol: "n", label: "Давтамж", desc: "Жилд хэдэн удаа хүү нэмэгдэх" },
            ].map((item, i) => (
              <Card key={i} className="p-5 bg-card/50 backdrop-blur border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-lg font-bold text-primary">{item.symbol}</span>
                  </div>
                  <h4 className="font-semibold">{item.label}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-muted/30 border-border/50">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="size-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Жишээ тооцоо</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  1,000,000₮ хөрөнгийг 12% жилийн хүүтэй, 20 жил хадгалбал — эцэст нь ойролцоогоор{" "}
                  <span className="font-semibold text-foreground">9,646,000₮</span> болж өсөх юм
                </p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 5,
      title: "Өсөлтийн Дүрслэл",
      subtitle: "30 жилийн хөрөнгийн өсөлт",
      content: (
        <div className="max-w-6xl mx-auto space-y-6">
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Хөрөнгийн өсөлтийн муруй</h3>
                <p className="text-sm text-muted-foreground">Эхний хөрөнгө: 1,000,000₮ • Сарын хуримтлал: 100,000₮ • Хүү: 14%</p>
              </div>
              <Badge variant="secondary" className="hidden md:flex">
                <TrendingUp className="size-3 mr-1" />
                Экспоненциал
              </Badge>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sampleGrowthData}>
                  <defs>
                    <linearGradient id="presentationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.55} />
                      <stop offset="35%" stopColor="hsl(var(--chart-4))" stopOpacity={0.4} />
                      <stop offset="70%" stopColor="hsl(var(--chart-2))" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="presentationStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                      <stop offset="50%" stopColor="hsl(var(--chart-4))" />
                      <stop offset="100%" stopColor="hsl(var(--chart-2))" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis
                    dataKey="year"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: "Жил", position: "insideBottom", offset: -5, fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}сая`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                    formatter={(value: number) => [`${value.toLocaleString("mn-MN")}₮`, "Дүн"]}
                    labelFormatter={(label) => `${label}-р жил`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="url(#presentationStroke)"
                    strokeWidth={3}
                    fill="url(#presentationGradient)"
                    dot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))", fill: "hsl(var(--chart-1))" }}
                    activeDot={{ r: 7, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "10 жилийн дараа", value: "21.5сая₮", color: "text-blue-600 dark:text-blue-400" },
              { label: "20 жилийн дараа", value: "95.4сая₮", color: "text-emerald-600 dark:text-emerald-400" },
              { label: "30 жилийн дараа", value: "318.6сая₮", color: "text-violet-600 dark:text-violet-400" },
              { label: "Нийт олз", value: "+281.6сая₮", color: "text-primary" },
            ].map((stat, i) => (
              <Card key={i} className="p-4 bg-card/50 backdrop-blur border-border/50">
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Хөрөнгийн Задаргаа",
      subtitle: "30 жилийн дараах бүтэц",
      content: (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={130}
                    paddingAngle={3}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {breakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                    formatter={(value: number) => [`${value.toLocaleString("mn-MN")}₮`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Нийт хөрөнгийн бүтэц</h3>
              <p className="text-muted-foreground leading-relaxed">
                Урт хугацааны хуримтлалд хүүгийн нийлмэл нь үндсэн хөрөнгөөс хэд дахин их үр дүн өгдөг
              </p>
            </div>

            <div className="space-y-3">
              {breakdownData.map((item, i) => {
                const total = breakdownData.reduce((s, d) => s + d.value, 0)
                const percent = ((item.value / total) * 100).toFixed(1)
                return (
                  <div key={i} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{percent}%</span>
                    </div>
                    <p className="text-lg font-bold">{item.value.toLocaleString("mn-MN")}₮</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "Монголын Эдийн Засаг",
      subtitle: "Орон нутгийн нөхцөлд тохирсон",
      content: (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Бодлогын хүү", value: "12.0%", source: "Монголбанк", icon: ShieldCheck },
              { label: "Хадгаламжийн хүү", value: "13–18%", source: "Арилжааны банк", icon: Coins },
              { label: "Жилийн инфляци", value: "~9.5%", source: "ҮСХ 2024", icon: TrendingUp },
            ].map((item, i) => (
              <Card key={i} className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="size-5 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="text-3xl font-bold mb-2">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.source}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Хөрөнгө оруулалтын төрлүүдийн харьцуулалт</h3>
                <p className="text-sm text-muted-foreground">Жилийн дундаж өгөөжийн хувь (%)</p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="traditional" radius={[6, 6, 0, 0]} name="Энгийн хүү">
                    {comparisonData.map((_, index) => (
                      <Cell
                        key={`trad-${index}`}
                        fill={BAR_PALETTE[index % BAR_PALETTE.length]}
                        fillOpacity={0.4}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="compound" radius={[6, 6, 0, 0]} name="Нийлмэл хүү">
                    {comparisonData.map((_, index) => (
                      <Cell
                        key={`comp-${index}`}
                        fill={BAR_PALETTE[index % BAR_PALETTE.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 8,
      title: "Технологийн Стек",
      subtitle: "Орчин үеийн вэб технологиор бүтээгдсэн",
      content: (
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Next.js 16", desc: "React-д суурилсан full-stack framework", category: "Framework" },
              { name: "TypeScript", desc: "Төрөл аюулгүй байдлыг хангах хэл", category: "Хэл" },
              { name: "Tailwind CSS v4", desc: "Utility-first загварчлал", category: "Загвар" },
              { name: "shadcn/ui", desc: "Хүртээмжтэй UI компонентууд", category: "UI" },
              { name: "Recharts", desc: "Бодит цагийн дүрслэлийн график", category: "График" },
              { name: "Lucide Icons", desc: "Цэвэрхэн, орчин үеийн дүрс тэмдэг", category: "Дүрс" },
            ].map((tech, i) => (
              <Card
                key={i}
                className="p-5 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="size-4 text-primary" />
                      <h3 className="font-semibold">{tech.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tech.desc}</p>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {tech.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="size-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Хурдан, найдвартай</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Server-side rendering, edge deployment, болон оптимизаци хийгдсэн графикийн ачаар хэрэглэгчийн
                  туршлага хамгийн дээд түвшинд хүрсэн
                </p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 9,
      title: "Хэн ашиглах вэ?",
      subtitle: "Зорилтот хэрэглэгчид",
      content: (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Хувийн хөрөнгө оруулагчид",
              desc: "Урт хугацааны хадгаламж, хөрөнгө оруулалтаа төлөвлөх",
              icon: Target,
            },
            {
              title: "Санхүүгийн зөвлөхүүд",
              desc: "Үйлчлүүлэгчдэдээ ирээдүйн өсөлтийг харуулах",
              icon: LineChart,
            },
            {
              title: "Оюутнууд, залуус",
              desc: "Эрт эхэлсэн хадгаламжийн ач холбогдлыг ойлгох",
              icon: Sparkles,
            },
            {
              title: "Тэтгэвэрт гарахад",
              desc: "Тэтгэврийн насан дахь санхүүгийн төлөвлөгөө гаргах",
              icon: ShieldCheck,
            },
          ].map((user, i) => (
            <Card
              key={i}
              className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <user.icon className="size-6 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{user.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{user.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 10,
      title: "Туршаад үзээрэй",
      subtitle: "Өөрийн санхүүгийн ирээдүйг харна уу",
      content: (
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <div className="size-24 mx-auto rounded-3xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/30">
              <Sparkles className="size-12 text-primary-foreground" strokeWidth={1.5} />
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Бэлэн үү?
              </h2>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
                Хөрөнгө оруулалтаа эхлүүлж, ирээдүйн санхүүгээ өнөөдөр төлөвлөж эхлээрэй
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20">
              <Link href="/">
                <Calculator className="size-5 mr-2" />
                Тооцоолуур руу очих
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent" onClick={() => setCurrentSlide(0)}>
              Эхнээс үзэх
            </Button>
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Бүтээгдсэн<span className="mx-2">•</span>Монгол улсын хөрөнгө оруулагчдад зориулав
            </p>
          </div>
        </div>
      ),
    },
  ]

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
  }, [slides.length])

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goToNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrev()
      } else if (e.key === "Home") {
        e.preventDefault()
        goToSlide(0)
      } else if (e.key === "End") {
        e.preventDefault()
        goToSlide(slides.length - 1)
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev, goToSlide, slides.length, toggleFullscreen])

  const slide = slides[currentSlide]
  const progress = ((currentSlide + 1) / slides.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Calculator className="size-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none">Хүүгийн Тооцоолуур</p>
              <p className="text-xs text-muted-foreground mt-0.5">Танилцуулга</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground tabular-nums hidden sm:block">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="size-9" aria-label="Дэлгэц томруулах">
              {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </Button>
            <Button variant="outline" size="sm" asChild className="hidden md:flex bg-transparent">
              <Link href="/">
                <Calculator className="size-4 mr-2" />
                Тооцоолуур
              </Link>
            </Button>
          </div>
        </div>

        <div className="h-0.5 bg-muted/50">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
        <div className="w-full max-w-7xl">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
              <Globe className="size-3 mr-1.5" />
              Слайд {currentSlide + 1} / {slides.length}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-balance">{slide.title}</h2>
            {slide.subtitle && <p className="text-muted-foreground text-balance">{slide.subtitle}</p>}
          </div>

          <div key={slide.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {slide.content}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 z-40 border-t border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={currentSlide === 0}
            className="h-11 bg-transparent"
            aria-label="Өмнөх слайд"
          >
            <ChevronLeft className="size-4 mr-1" />
            <span className="hidden sm:inline">Өмнөх</span>
          </Button>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-8 h-2 bg-primary"
                    : index < currentSlide
                      ? "w-2 h-2 bg-primary/50 hover:bg-primary/70"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`${index + 1}-р слайд руу шилжих`}
              />
            ))}
          </div>

          <Button
            onClick={goToNext}
            disabled={currentSlide === slides.length - 1}
            className="h-11 shadow-md shadow-primary/20"
            aria-label="Дараах слайд"
          >
            <span className="hidden sm:inline">Дараах</span>
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
