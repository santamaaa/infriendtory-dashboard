import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavMenu from '../components/NavMenu.js'
import MenuTitle from '../components/MenuTitle.js'
import ModalAdd from '../components/ModalAdd.js'
import DeleteConfirmation from '../components/DeleteConfirmation.js'

const Items = () => {
    const navigate = useNavigate()
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
    const [category, setCategory] = useState([])
    const [generatedID, setGeneratedID] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState('')
    const [sortKey, setSortKey] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const generateID = () => {
        const prefix = 'ITM-'
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0') // Bulan mulai dari 0
        const day = String(today.getDate()).padStart(2, '0')
        const randomNumber = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')
        const randomID = prefix + year + month + day + randomNumber
        setGeneratedID(randomID)
    }
    const showModalAdd = () => {
        setModalAddIsOpen(true)
        generateID()
    }
    const hideModalAdd = () => setModalAddIsOpen(false)
    const styleModalAdd = modalAddIsOpen ? { display: 'grid' } : { display: 'none' }
    const modalAddConfiguration = { 
        title: 'Add Item',
        fields: [
            { name: '_id', label: 'ID', type: 'text', value: generatedID, required: true, readonly: true },
            { name: 'item_name', label: 'Item Name', type: 'text', value: '', required: true, readonly: false },
            { name: 'category', label: 'Category', type: 'select', value: '', required: true, readonly: false },
            { name: 'purchase_price', label: 'Purchase Price', type: 'number', value: '', required: true, readonly: false },
            { name: 'selling_price', label: 'Selling Price', type: 'number', value: '', required: true, readonly: false },
            { name: 'stock', label: 'Stock', type: 'number', value: '', required: true, readonly: false }
        ],
        close: hideModalAdd,
        path: 'item/'
    }

    useEffect(() => {
        const apiURL = process.env.REACT_APP_API_URL
        const endpointItem = apiURL + 'item/'
        const endpointItemCategory = apiURL + 'item_category/'

        const token = localStorage.getItem('token')

        const fetchData = async () => {
            if (!token) {
                alert('No session, please log in.')
                navigate('/')
                return
            }

            try {
                const response = await axios.get(endpointItem, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                setData(response.data)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token')
                    alert('Session expired, please log in again.')
                    navigate('/')
                } else {
                    console.error('Error fetching data:', error)
                }
            }
        }

        const fetchCategories = async () => {
            if (!token) {
                alert('No session, please log in.')
                navigate('/')
                return
            }

            try {
                const response = await axios.get(endpointItemCategory, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                setCategory(response.data)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token')
                    alert('Session expired, please log in again.')
                    navigate('/')
                } else {
                    console.error('Error fetching data:', error)
                }
            }
        }

        fetchData()
        fetchCategories()
    }, [])

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortOrder('asc')
        }
    }
    const sortedItems = [...data].sort((a, b) => {
        if (sortKey) {
            const aValue = a[sortKey].toString().toLowerCase()
            const bValue = b[sortKey].toString().toLowerCase()
            if (sortOrder === 'asc') {
                return aValue.localeCompare(bValue, undefined, { numeric: true })
            } else {
                return bValue.localeCompare(aValue, undefined, { numeric: true })
            }
        }
        return 0
    })
    const filteredItems = sortedItems.filter(item =>
        item._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.purchase_price.toString().includes(searchQuery) ||
        item.selling_price.toString().includes(searchQuery) ||
        item.stock.toString().includes(searchQuery)
    )

    const showDeleteConfirmation = () => setDeleteConfirmIsOpen(true)
    const hideDeleteConfirmation = () => setDeleteConfirmIsOpen(false)
    const handleDelete = async () => {
        const apiURL = process.env.REACT_APP_API_URL
        const endpoint = apiURL + 'item/' + selectedItem
        const token = localStorage.getItem('token')

        try {
            await axios.delete(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            setTimeout(() => {
                hideDeleteConfirmation()
            }, 1000)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="w-full flex">
                <div className="w-full fixed bottom-0 lg:w-1/5 lg:top-0 z-50">
                    <NavMenu />
                </div>
                <div className="w-full lg:w-4/5 lg:relative lg:left-[20%]">
                    <MenuTitle menu="ITEMS" />
                    <div className="w-full relative top-[60px] md:top-[80px] lg:top-0">
                        <div className="w-[100vw] lg:w-full h-[calc(100vh-122px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-60px)] px-4 md:px-12 lg:px-8 lg:pt-4 overflow-x-auto">
                            <div className="w-full h-[40px] md:h-[48px] flex gap-3 md:gap-4">
                                <button onClick={showModalAdd} className="w-[120px] flex items-center justify-center gap-2 md:gap-4 rounded-md bg-yellowgreen text-white text-xs md:text-base font-semibold">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add</span>
                                </button>
                                {
                                    modalAddIsOpen && (
                                    <div style={styleModalAdd} className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 place-items-center">
                                        <div onClick={hideModalAdd} className="w-full h-full absolute top-0 left-0 z-0 bg-black/60"></div>
                                        <ModalAdd close={modalAddConfiguration.close} title={modalAddConfiguration.title} fields={modalAddConfiguration.fields} categoriesInItem={category} path={modalAddConfiguration.path} />
                                    </div>
                                    )
                                }
                                <input value={searchQuery}  onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search Infriendtory . . ." className="w-full h-full px-2 md:px-3 lg:px-4 outline-none rounded-md bg-gray-100 text-xs md:text-sm font-medium md:tracking-widest" />
                            </div>
                            <div className="w-full h-[calc(100%-40px)] md:h-[calc(100%-48px)] py-3 md:py-4">
                                <div className="w-full h-full overflow-y-scroll">
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="sticky top-0 z-20 bg-gray-100">
                                            <tr>
                                                <th onClick={() => handleSort('_id')} className="w-[5%] px-6 py-4 sticky top-0 left-0 z-50 bg-gray-100 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">ID <br/> {sortKey === '_id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('item_name')} className="w-[25%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Item Name <br/> {sortKey === 'item_name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('category')} className="w-[20%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Category <br/> {sortKey === 'category' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('purchase_price')} className="w-[15%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Purchase Price <br/> {sortKey === 'purchase_price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('selling_price')} className="w-[15%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Selling Price <br/> {sortKey === 'selling_price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('stock')} className="w-[10%] px-6 py-4 text-center text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Stock <br/> {sortKey === 'stock' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th className="w-[10%] px-6 py-4 sticky top-0 right-0 z-50 bg-gray-100 text-center text-sm font-medium text-gray-800 tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredItems.map(item => (
                                                <tr key={item._id} className="hover:bg-gray-50">
                                                    <td className="w-[5%] px-6 py-4 sticky top-0 left-0 z-0 bg-white whitespace-normal text-xs md:text-sm font-medium text-gray-800">{item._id}</td>
                                                    <td className="w-[25%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.item_name}</td>
                                                    <td className="w-[20%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.category}</td>
                                                    <td className="w-[15%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.purchase_price}</td>
                                                    <td className="w-[15%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.selling_price}</td>
                                                    <td className="w-[10%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800 text-center">{item.stock}</td>
                                                    <td className="w-[10%] px-6 py-4 sticky top-0 right-0 z-0 bg-white whitespace-normal text-xs md:text-sm text-gray-800 text-center">
                                                        <button>
                                                            <FontAwesomeIcon icon={faPenToSquare} className="text-blue-400 text-xl" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedItem(item._id)
                                                                showDeleteConfirmation()
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className="ms-3 text-red-400 text-xl" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <DeleteConfirmation isOpen={deleteConfirmIsOpen} item={selectedItem} onCancel={hideDeleteConfirmation} onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Items