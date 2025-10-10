```ts

<div style={{ width: '400px' }}>
    {pointInUrlDetails() !== undefined && (
        <>
            <Font
                onClick={() => {
                    setSearchParams({
                        value: pointInUrlDetails()?.value ?? '',
                        date: pointInUrlDetails()?.date ?? '',
                    });
                }}
            >
                {pointInUrlDetails()?.value ?? ''}
            </Font>
        </>
    )}

    <Mouse series={dataSeries}>
        {(active) => (
            <Sparkline
                series={dataSeries}
                // TooltipComponent={CustomTooltip}
                activeIndex={active}
                height={300}
                width={500}
                circleRadius={8}
                lineColors={palette}
                circleColors={palette}
                canDim
                canExport
                exportSchema={schema}
                onSelectPointToUrl={(p) => {
                    setSearchParams(p);
                }}
            />
        )}
    </Mouse>
</div>

interface TooltipProps {
    point: DataPoint | null;
    x: number;
    y: number;
    color: string;
    serie: string;
}

const CustomTooltip = (props: TooltipProps) => {
    const { point, color, x, y, serie } = props;
    if (point == null) return null;
    const { label, value } = point;
    return (
        <div
            aria-hidden="true"
            className="tooltip"
            style={{
                backgroundColor: color,
                left: x,
                top: y,
            }}
        >
            <p>
                {serie} <br />
                <b>{label}</b>
                <br />
                <span>{formatNumber(value)}</span>
            </p>
        </div>
    );
};

 const palette = HAPPY_COLORS;

 const schema = [
     {
         column: 'serie',
         type: String,
         value: (item: any) => item.serie,
         width: 30,
         wrap: true,
     },
     {
         column: 'label',
         type: String,
         value: (item: any) => item.label,
         width: 50,
         wrap: true,
     },
     {
         column: 'value',
         type: String,
         value: (item: any) => formatNumber(item.value),
         width: 20,
         fontWeight: 'bold' as const,
     },
     {
         column: 'date',
         type: String,
         value: (item: any) => formatDateTime(new Date(item.date)),
         width: 30,
     },
 ];

 const { setSearchParams, pointInUrlDetails } = useSparklineUrl();


```

```tsx

   <Window series={seriesWithColors} windowSize={30}>
     {sliced => (
       <Fragment>
         <Mouse series={seriesWithColors} windowSize={30}>
           {active => (
             <Sparkline
               series={seriesWithColors}
               points={sliced}
               TooltipComponent={CustomTooltip}
               activeIndex={active}
               width={ww}
               height={hh}
               circleRadius={circleRadius}
               lineColors={palette}
               circleColors={palette}
               onSelectPoint={point => {
                 console.log({ point })
               }}
               onSelectPoints={selection => {
                 setPoints(selection)
               }}
               canSelect
             />
           )}
         </Mouse>
         <div className="toolbar" style={{ maxWidth: ww }}>
           <p>
             <b>Range:</b>
             {formatDateTime(new Date(sliced[0][0].date))}-
             {formatDateTime(
               new Date(sliced[0][sliced[0].length - 1].date as Date),
             )}
           </p>
         </div>
       </Fragment>
     )}
   </Window>
 </div>
 <div className="toolbar sticked-toolbar" style={{ maxWidth: ww * 2 }}>
   {selectedPoints?.map((p, i) => (
     <Card
       key={`${slugify(p.label)}-${i}`}
       value={formatNumber(p.value)}
       label={p.label}
       onClick={() => {
         setPoints([])
       }}
     />
   ))}
 </div>

```
