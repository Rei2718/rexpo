import { Colors } from '@/constants/theme';

export const getMapStyle = (theme: typeof Colors.light) => [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.backgroundSecondary
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": theme.textSecondary
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": theme.backgroundPrimary
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": theme.separator
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": theme.textTertiary
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.backgroundPrimary
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": theme.textSecondary
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.backgroundPrimary
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.separator
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.separator
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": theme.textTertiary
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.separator
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.backgroundPrimary
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": theme.backgroundTertiary
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": theme.textPrimary
            }
        ]
    }
];
