import * as React from 'react';
import { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { useTradingContext } from '../context/TradingContext';

export function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const { selectedAsset } = useTradingContext();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1a1a1a' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#2d2d2d' },
        horzLines: { color: '#2d2d2d' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Generate initial data
    const currentDate = new Date();
    const initialData: CandlestickData[] = [];
    
    for (let i = 0; i < 100; i++) {
      const time = new Date(currentDate);
      time.setMinutes(time.getMinutes() - i);
      
      const basePrice = selectedAsset?.price || 45000;
      const volatility = basePrice * 0.002;
      const open = basePrice + (Math.random() - 0.5) * volatility;
      const high = open + Math.random() * volatility;
      const low = open - Math.random() * volatility;
      const close = (open + high + low) / 3;

      initialData.unshift({
        time: time.getTime() / 1000 as any,
        open,
        high,
        low,
        close,
      });
    }

    seriesRef.current.setData(initialData);

    // Update chart with live data
    const updateInterval = setInterval(() => {
      if (!seriesRef.current || !selectedAsset) return;

      const lastData = initialData[initialData.length - 1];
      const basePrice = selectedAsset.price;
      const volatility = basePrice * 0.002;
      
      const newData = {
        time: (Date.now() / 1000) as any,
        open: lastData.close,
        high: lastData.close + Math.random() * volatility,
        low: lastData.close - Math.random() * volatility,
        close: basePrice,
      };

      seriesRef.current.update(newData);
      initialData.push(newData);
      
      if (initialData.length > 100) {
        initialData.shift();
      }
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(updateInterval);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [selectedAsset]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}