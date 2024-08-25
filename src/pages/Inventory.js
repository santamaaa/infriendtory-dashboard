// import { useState } from 'react'
import NavMenu from '../components/NavMenu.js'
import MenuTitle from '../components/MenuTitle.js'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const Inventory = () => {
    // // const [items, setItems] = useState([])
    // const [searchQuery, setSearchQuery] = useState('')
    // const [sortKey, setSortKey] = useState('')
    // const [sortOrder, setSortOrder] = useState('asc')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const apiURL = process.env.REACT_APP_API_URL
    //         const endpointItems = apiURL + 'item/'

    //         const token = localStorage.getItem('token')

    //         if (!token) {
    //             alert('No session, please log in.')
    //             window.location.href = '/'
    //             return
    //         }

    //         try {
    //             const response = await axios.get(endpointItems, {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + token
    //                 }
    //             })
    //             setItems(response.data)
    //         } catch (error) {
    //             if (error.response && error.response.status === 401) {
    //                 localStorage.removeItem('token')
    //                 alert('Session expired, please log in again.')
    //                 window.location.href = '/'
    //             } else {
    //                 console.error('Error fetching data:', error)
    //             }
    //         }
    //     }

    //     fetchData()
    // }, [])

    // const handleSort = (key) => {
    //     if (sortKey === key) {
    //         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    //     } else {
    //         setSortKey(key)
    //         setSortOrder('asc')
    //     }
    // }

    // const sortedItems = [...myitems].sort((a, b) => {
    //     if (sortKey) {
    //         const aValue = a[sortKey].toString().toLowerCase()
    //         const bValue = b[sortKey].toString().toLowerCase()
    //         if (sortOrder === 'asc') {
    //             return aValue.localeCompare(bValue, undefined, { numeric: true })
    //         } else {
    //             return bValue.localeCompare(aValue, undefined, { numeric: true })
    //         }
    //     }
    //     return 0
    // })

    // const filteredItems = sortedItems.filter(item =>
    //     item._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.purchase_price.toString().includes(searchQuery) ||
    //     item.selling_price.toString().includes(searchQuery) ||
    //     item.stock.toString().includes(searchQuery)
    // )

    return (
        <>
            <div className="w-full flex">
                <div className="w-full fixed bottom-0 lg:w-1/5 lg:top-0 z-50">
                    <NavMenu />
                </div>
                <div className="w-full lg:w-4/5 lg:relative lg:left-[20%]">
                    <MenuTitle menu="INVENTORY" />
                    <div className="w-full relative top-[60px] md:top-[80px] lg:top-0">
                        <div className="w-[100vw] lg:w-full h-[calc(100vh-122px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-60px)] px-4 md:px-12 lg:px-8 lg:pt-4 overflow-x-auto">
                            <div className="w-full h-[40px] md:h-[48px] flex gap-2">
                                {/* <input value={searchQuery}  onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search Infriendtory . . ." className="w-full h-full px-2 md:px-3 lg:px-4 outline-none rounded-md bg-gray-100 text-sm md:text-base font-medium md:tracking-widest" /> */}
                            </div>
                            <div className="w-full h-[calc(100%-40px)] md:h-[calc(100%-48px)] py-3 md:py-4">
                                <div className="w-full h-full overflow-y-scroll">
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="sticky top-0 bg-gray-100">
                                            {/* <tr>
                                                <th onClick={() => handleSort('_id')} className="w-[5%] px-6 py-4 text-left text-sm font-medium text-gray-800 tracking-wider cursor-pointer">ID <br/> {sortKey === '_id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('item_name')} className="w-[25%] px-6 py-4 text-left text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Item Name <br/> {sortKey === 'item_name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('category')} className="w-[20%] px-6 py-4 text-left text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Category <br/> {sortKey === 'category' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('purchase_price')} className="w-[15%] px-6 py-4 text-left text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Purchase Price <br/> {sortKey === 'purchase_price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('selling_price')} className="w-[15%] px-6 py-4 text-left text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Selling Price <br/> {sortKey === 'selling_price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('stock')} className="w-[10%] px-6 py-4 text-center text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Stock <br/> {sortKey === 'stock' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th className="w-[10%] px-6 py-4 text-center text-sm font-medium text-gray-800 tracking-wider">Action</th>
                                            </tr> */}
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {/* {filteredItems.map(item => (
                                                <tr key={item._id} className="hover:bg-gray-50">
                                                    <td className="w-[5%] px-6 py-4 whitespace-normal text-sm font-medium text-gray-800">{item._id}</td>
                                                    <td className="w-[25%] px-6 py-4 whitespace-normal text-sm text-gray-800">{item.item_name}</td>
                                                    <td className="w-[20%] px-6 py-4 whitespace-normal text-sm text-gray-800">{item.category}</td>
                                                    <td className="w-[15%] px-6 py-4 whitespace-normal text-sm text-gray-800">{item.purchase_price}</td>
                                                    <td className="w-[15%] px-6 py-4 whitespace-normal text-sm text-gray-800">{item.selling_price}</td>
                                                    <td className="w-[10%] px-6 py-4 whitespace-normal text-sm text-gray-800 text-center">{item.stock}</td>
                                                    <td className="w-[10%] px-6 py-4 whitespace-normal text-sm text-gray-800 text-center"><FontAwesomeIcon icon={faCirclePlus} className="text-yellowgreen text-2xl" /></td>
                                                </tr>
                                            ))} */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inventory