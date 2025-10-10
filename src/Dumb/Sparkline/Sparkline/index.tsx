import {
    Fragment,
    type RefObject,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';

import Stick from 'react-stick';

import Caption from './Caption';
import Crosshair from './Crosshair';
import Export from './Export';
import Focus from './Focus';
import Icon from './Icons';
import Selection from './Selection';
import Spark from './Spark';
import {
    type Captions,
    type DataPoint,
    type SparklineAddons,
    type SparklineAppearance,
    type SparklineData,
    type SparklineExportOptions,
    type SparklineSelectionCallbacks,
} from './types';
import useResizeObserver from './useResizeObserver';
import useSeries from './useSeries';
import {
    DARK_COLORS,
    DEFAULT_SPARKLINE_HEIGHT,
    DEFAULT_SPARKLINE_WIDTH,
    formatDateTime,
    formatNumber,
    isPointInsideRect,
    SPARKLINE_PADDING_START,
} from './utils';

import styles from './index.module.css';

export interface SparklineProps
    extends SparklineData,
        SparklineAddons,
        SparklineAppearance,
        SparklineSelectionCallbacks,
        SparklineExportOptions {
    canDim?: boolean;
    canSelect?: boolean;
    canExport?: boolean;
}

export default function Sparkline(props: SparklineProps) {
    const {
        series: seriesProp,
        width: widthProp,
        height: heightProp,
        circleRadius = 2,
        lineColors = DARK_COLORS,
        circleColors = DARK_COLORS,
        activeIndex = null,
        TooltipComponent,
        points,
        onSelectPoint,
        canSelect = false,
        canDim = false,
        canExport = false,
        onExportError,
        onExport,
        exportFilename,
        exportFormat,
        exportSchema,
        onSelectPoints,
        onSelectPointToUrl,
        crosshairColor = 'var(--sparkline-crosshair-color)',
        captionClassName,
        caption: captionProp,
    } = props;

    const divRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const parentSize = useResizeObserver(divRef as RefObject<HTMLDivElement>);

    const width = useMemo(
        () => widthProp ?? parentSize.width ?? DEFAULT_SPARKLINE_WIDTH,
        [parentSize, widthProp],
    );
    const height = useMemo(
        () => heightProp ?? parentSize.height ?? DEFAULT_SPARKLINE_HEIGHT,
        [parentSize, heightProp],
    );
    const input = useMemo(
        () =>
            points !== undefined
                ? points
                : seriesProp.map((item) => item.points),
        [points, seriesProp],
    );

    const {
        // series,
        items,
        minY,
        maxY,
        minX,
        maxX,
    } = useSeries({
        items: input,
        width,
        height,
        circleRadius,
    });

    const [activeCaption, setShowCaption] = useState<Captions | null>(null);

    const hideCaption = (): void => {
        setShowCaption(null);
    };

    const toggleCaption = useCallback((): void => {
        if (activeCaption === 'series') {
            hideCaption();
            return;
        }
        setShowCaption('series');
    }, [activeCaption]);

    const toggleFocus = useCallback((): void => {
        if (activeCaption === 'focus') {
            hideCaption();
            return;
        }
        setShowCaption('focus');
    }, [activeCaption]);

    const caption = useMemo(
        () =>
            `Min ${formatNumber(minY)}, Max ${formatNumber(
                maxY,
            )}. Period: ${formatDateTime(minX as any)}-${formatDateTime(maxX as any)}
      `,
        [minY, maxY, minX, maxX],
    );

    const canTooltip = TooltipComponent !== undefined && activeIndex !== null;
    const [activeActionBar, setActiveActionBar] = useState(true);

    return (
        <Stick
            className={styles.stick}
            sameWidth
            autoFlipVertically
            node={
                <Caption
                    kind={activeCaption}
                    className={captionClassName}
                    caption={captionProp ?? caption}
                    series={seriesProp}
                />
            }
            position="top center"
            onClickOutside={hideCaption}
        >
            <div
                ref={divRef}
                className={styles.root}
                style={{
                    maxHeight: height + SPARKLINE_PADDING_START,
                    paddingTop: SPARKLINE_PADDING_START,
                }}
            >
                <svg
                    ref={svgRef}
                    width={width}
                    height={height}
                    aria-label={caption}
                    className={styles.svg}
                >
                    {items.map((normalizedData, datasetIndex: number) => (
                        <Spark
                            key={datasetIndex}
                            lineColors={lineColors}
                            circleRadius={circleRadius}
                            onSelectPoint={onSelectPoint}
                            onSelectPointToUrl={onSelectPointToUrl}
                            seriesProp={seriesProp}
                            normalizedData={normalizedData}
                            datasetIndex={datasetIndex}
                        />
                    ))}
                    <Crosshair
                        activeIndex={activeIndex}
                        normalizedDataSeries={items}
                        width={width}
                        height={height}
                        crosshairColor={crosshairColor}
                        circleColors={circleColors}
                    />
                </svg>
                {canTooltip &&
                    items.map(({ circles }, datasetIndex: number) => {
                        if (circles[activeIndex] === undefined)
                            return <Fragment key={datasetIndex} />;
                        const { x, y } = circles[activeIndex];
                        const color =
                            circleColors[datasetIndex % circleColors.length];
                        const point = input[datasetIndex][activeIndex];
                        return (
                            <TooltipComponent
                                key={datasetIndex}
                                x={x + 10}
                                y={y - 5}
                                point={point}
                                serie={seriesProp[datasetIndex].name}
                                color={color}
                            />
                        );
                    })}
                {canSelect && (
                    <Selection
                        width={width}
                        onSelectionEnd={(rect) => {
                            if (rect != null) {
                                const selectedPoints: DataPoint[][] = [];
                                items.forEach(({ circles }, datasetIndex) => {
                                    const datasetPoints: DataPoint[] = [];
                                    circles.forEach((circle, circleIndex) => {
                                        if (isPointInsideRect(circle, rect)) {
                                            datasetPoints.push(
                                                seriesProp[datasetIndex].points[
                                                    circleIndex
                                                ],
                                            );
                                        }
                                    });
                                    selectedPoints.push(datasetPoints);
                                });
                                onSelectPoints?.(selectedPoints.flat());
                                return selectedPoints;
                            }
                        }}
                    />
                )}
                <div className={styles.actions}>
                    {activeActionBar && (
                        <>
                            <Caption.Trigger onClick={toggleCaption} />
                            {canDim && <Focus.Trigger onClick={toggleFocus} />}
                            {canExport && (
                                <Export
                                    onError={onExportError}
                                    onExport={onExport}
                                    filename={exportFilename}
                                    format={exportFormat}
                                    divRef={divRef}
                                    items={input}
                                    seriesProp={seriesProp}
                                    {...(exportSchema !== undefined && {
                                        schema: exportSchema,
                                    })}
                                />
                            )}
                        </>
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            setActiveActionBar((prev) => !prev);
                        }}
                        className={styles.mlAuto}
                    >
                        <Icon name={activeActionBar ? 'hidden' : 'hide'} />
                    </button>
                </div>
            </div>
        </Stick>
    );
}

export type { Series } from './types';
export { dim } from './utils';
