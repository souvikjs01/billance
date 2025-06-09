"use client"
import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'


interface iAppProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function Graph({ data } : iAppProps) {
  return (
    <ChartContainer 
        config={{
            amount: {
                label: "Amount",
                color: "hsl(var(--primary))",
            }
        }}
        className="min-h-[300px]"
    >
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line
                type="monotone"
                dataKey="amount"
                stroke="gray"
                strokeWidth={2}
            />
            </LineChart>
        </ResponsiveContainer>
    </ChartContainer>
  )
}
