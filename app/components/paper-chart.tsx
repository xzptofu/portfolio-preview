import { paperChartData } from "./paper-chart-data";
import s from "./interactive-world-prototype.module.css";

const styles = [
  { color: "#28455f", dash: "9 6" },
  { color: "#a74b32", dash: undefined },
  { color: "#2f705e", dash: "11 5 2 5" },
] as const;

export default function PaperChart() {
  const { width, height, xTicks, yTicks, series } = paperChartData;
  return (
    <figure
      className={s.paperChart}
      role="img"
      aria-label="Cumulative loss over 200 tasks in an abruptly changing meta-imitation environment. FTPL-A and FTPL-D+ end with lower cumulative loss than FTPL. Shaded bands show standard deviation across five runs."
    >
      <div className={s.chartLegend} aria-hidden="true">
        {series.map((item, i) => (
          <span className={s.chartLegendItem} key={item.name}>
            <svg width="32" height="12" viewBox="0 0 32 12" focusable="false">
              <line x1="1" y1="6" x2="31" y2="6" stroke={styles[i].color} strokeWidth="3" strokeDasharray={styles[i].dash} />
            </svg>
            {item.name}
          </span>
        ))}
      </div>
      <div className={s.chartUnit} aria-hidden="true">Cumulative loss (×10³)</div>
      <div className={s.chartPadding} aria-hidden="true">
        <div className={s.chartPlot}>
          <svg viewBox={`0 0 ${width} ${height}`} focusable="false">
            <g className={s.chartGrid}>
              {yTicks.map((tick) => <line key={tick.value} x1="0" x2={width} y1={tick.position} y2={tick.position} vectorEffect="non-scaling-stroke" />)}
              {xTicks.filter((tick) => tick.value > 0 && tick.value < 200).map((tick) => <line key={tick.value} x1={tick.position} x2={tick.position} y1="0" y2={height} vectorEffect="non-scaling-stroke" />)}
            </g>
            <g className={s.chartSeries}>
              {series.map((item, i) => <path key={`${item.name}-band`} d={item.band} fill={styles[i].color} fillOpacity="0.15" />)}
              {series.map((item, i) => <path key={`${item.name}-line`} d={item.line} fill="none" stroke={styles[i].color} strokeWidth="2.6" strokeDasharray={styles[i].dash} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />)}
            </g>
            <path className={s.chartAxes} d={`M 0 0 V ${height} H ${width}`} fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          {yTicks.map((tick) => <span className={s.chartYTick} style={{ top: `${tick.position / height * 100}%` }} key={tick.value}>{tick.value}</span>)}
          {xTicks.map((tick) => <span className={s.chartXTick} style={{ left: `${tick.position / width * 100}%` }} key={tick.value}>{tick.value}</span>)}
        </div>
      </div>
      <div className={s.chartXAxis} aria-hidden="true">Round (task index)</div>
    </figure>
  );
}
