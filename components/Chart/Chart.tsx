'use client'
import { useEffect, useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer, Customized } from 'recharts';

type ChartSize = {
   width?: number;
   height?: number;
}

type ChartProps = {
   data: any;
   yDataKey: string;
   xDataKey: string;
   xAxisInterval?: number;
   mobileChartSize?: ChartSize;
   desktopChartSize?: ChartSize;
}

export default function Chart({ data, yDataKey, xDataKey, xAxisInterval, mobileChartSize, desktopChartSize }: ChartProps) {
   const [width, setWidth] = useState(500)
   const [height, setHeight] = useState(250)

   function getDeviceType(navgtr: Navigator): 'mobile' | 'desktop' {
      const ua = navgtr.userAgent;
      if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
         return 'mobile';
      } else {
         return 'desktop';
      }
   }

   useEffect(() => {
      if (getDeviceType(navigator) == "mobile") {
         setHeight(mobileChartSize?.width || 200)
         setWidth(mobileChartSize?.height || 350)
      } else {
         setWidth(desktopChartSize?.width || 500)
         setHeight(desktopChartSize?.height || 250)
      }
   }, [])
   
   return (   
   <ResponsiveContainer width={"100%"} height={height}>
      <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 10 }}>         
         <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
               <stop offset="5%" stopColor="#ff812e" stopOpacity={0.35} />
               <stop offset="95%" stopColor="#ff812e" stopOpacity={0.05} />
            </linearGradient>
         </defs>

         <XAxis dataKey={xDataKey} tick={{ fontSize: '0.75rem' }} interval={xAxisInterval!} />
         <YAxis
            tick={{ fill: "rgb(207, 207, 207)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={35}
         />

         <Area 
            type="monotone"
            dataKey={yDataKey} 
            stroke="#ff812e" 
            fill="url(#colorUsers)"
            strokeWidth={getDeviceType(navigator) == "desktop" ? 1.3 : 1}
            dot={false}
            activeDot={{
               r: 6,
               stroke: "#fff",
               strokeWidth: 1,
               fill: "#ff812ec2",
            }}
         />
         
         <CartesianGrid 
            verticalValues={data.flatMap((dt: any) => dt.totalAmount)}
            strokeDasharray="4 4"
            vertical={false}
            stroke="rgb(192, 192, 192)"
            opacity={0.85}
         />
         
         <Tooltip 
            // content={<CustomTooltip 
            //    width={width} 
            //    xAxisKey={xDataKey} 
            //    toolTipType={toolTipType} 
            //    isMobile={(getDeviceType(navigator) == "mobile")}
            // />}
            // cursor={{ strokeWidth: 0.5, stroke: "#e6e6e6" }}
            // wrapperStyle={{ marginLeft: 20, marginTop: -20 }}
         />
      </AreaChart>
   </ResponsiveContainer>
   )
}