import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

const SuppliersMap = ({ data }) => {
    const [suppliersCoordinate, setSuppliersCoordinate] = useState([])

    useEffect(() => {
        const fetchCoordinates = async (address) => {
            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: address,
                        format: 'json',
                        addressdetails: 1
                    }
                })
                if (response.data.length > 0) {
                    return {
                        lat: parseFloat(response.data[0].lat),
                        lon: parseFloat(response.data[0].lon)
                    }
                } else {
                    return { lat: null, lon: null }
                }
            } catch (error) {
                console.error('Error fetching coordinates:', error)
                return { lat: null, lon: null }
            }
        }

        const fetchAllSuppliers = async () => {
            try {
                const updatedSuppliers = await Promise.all(
                    data.map(async (supplier) => {
                        const { lat, lon } = await fetchCoordinates(supplier.address)
                        return { ...supplier, coordinates: { lat, lon } }
                    })
                )
                setSuppliersCoordinate(updatedSuppliers)
            } catch (error) {
                console.error('Error fetching supplier coordinates:', error)
            }
        }

        if (Array.isArray(data) && data.length > 0) {
            fetchAllSuppliers()
        }
    }, [data])

    const customMarkerIcon = new Icon({
        iconUrl: require('../assets/location-mark.png'),
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    })

    return (
        <MapContainer center={[-7.3277, 110.501]} zoom={13} className="w-full h-full rounded-md">
            <TileLayer
                attribution="&copy <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                suppliersCoordinate.map(item => item.coordinates.lat && item.coordinates.lon && (
                        <Marker 
                            key={item._id} 
                            position={[item.coordinates.lat, item.coordinates.lon]} 
                            icon={customMarkerIcon}
                        >
                            <Popup>
                                <p className="text-sm font-semibold">{item.supplier_name}</p>
                                <p className="text-xs">{item.address}</p>
                            </Popup>
                        </Marker>
                    )
                )
            }
        </MapContainer>
    )
}

export default SuppliersMap
