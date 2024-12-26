import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import './IndiaMap.css';

const INDIA_TOPO_JSON = "/india-map.geojson";



const IndiaMap = ({ onLoad }) => {
    const [mapScale, setMapScale] = useState(1000); // Default scale

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Adjust scale based on screen width
            if (width < 600) {
                setMapScale(500); // For small screens
            } else if (width < 1024) {
                setMapScale(800); // For tablets
            } else {
                setMapScale(1000); // For large screens
            }
        };

        // Initial scale setting
        handleResize();

        // Listen to window resize events
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        // Call onLoad when the component mounts
        if (onLoad) {
            onLoad(); // Trigger the onLoad function
        }
    }, [onLoad]); // Dependency array to ensure it runs only when onLoad changes

    const [highlightedState, setHighlightedState] = useState(null);

    const handleMouseEnter = (stateName) => {
        setHighlightedState(stateName);
    };

    const handleMouseLeave = () => {
        setHighlightedState(null);
    };

    const MemoizedGeography = React.memo(Geography);

    return (
        <div className="india-map-container">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: mapScale,
                    center: [82.9629, 22.5937], // Center the map on India
                }}
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            // Check if the current state is the one to be highlighted
                            const isHighlighted = geo.properties.st_nm === "Bihar";
                            return (
                                <MemoizedGeography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => handleMouseEnter(geo.properties.NAME_1)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        default: {
                                            fill: isHighlighted ? "#28A745" : "#E0E0E0", // Highlight Bihar
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: isHighlighted ? "#28A745" : "#28A745", // Hover effect
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#28A745",
                                            outline: "none",
                                        },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default IndiaMap;
