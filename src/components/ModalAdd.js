import { useState } from "react"
import axios from "axios"
import PopupAlertAddForm from "./PopupAlertAddForm"
import { faBell, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

const ModalAdd = ({ close, title, fields, categoriesInItem, path }) => {
    const [iconAlert, setIconAlert] = useState()
    const [messageAlert, setMessageAlert] = useState('')
    const [btnIsVisible, setBtnIsVisible] = useState()
    const [alertIsVisible, setAlertIsVisible] = useState(false)
    
    const [fieldValues, setFieldValues] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = field.value
            return acc
        }, {})
    )

    const blockInvalidChar = (e) => {
        if (e.target.type === 'number') {
            if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault()
            }
        }
    }

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value

        setFieldValues({
            ...fieldValues,
            [fieldName]: value
        })
    }

    const handleResetForm = () => {
        setFieldValues(
            fields.reduce((acc, field) => {
                if (field.name !== '_id') {
                    acc[field.name] = ''
                } else {
                    acc[field.name] = field.value
                }
                return acc
            }, {})
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const allFieldsEmpty = Object.values(fieldValues).some(value => value === '')

        if (allFieldsEmpty) {
            setIconAlert(faBell)
            setMessageAlert('All fields must be filled')
            setBtnIsVisible({display: 'flex'})
            setAlertIsVisible(true)
            return
        } else {
            const apiURL = process.env.REACT_APP_API_URL
            const endpoint = apiURL + path
            const token = localStorage.getItem('token')

            try {
                await axios.post(endpoint, fieldValues, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                setIconAlert(faCircleCheck)
                setMessageAlert('Successfully')
                setBtnIsVisible({display: 'none'})
                setAlertIsVisible(true)
                window.location.reload()
            } catch (error) {
                setIconAlert(faBell)
                setMessageAlert('Failed to add data')
                setBtnIsVisible({display: 'none'})
                setAlertIsVisible(true)
            }

            handleResetForm()

            setTimeout(() => {
                close()
            }, 1500)
        }
    }
    
    return (
        <div className="w-4/5 max-w-[480px] h-auto max-h-[90vh] px-6 pt-6 pb-8 absolute z-0 flex flex-col rounded-md bg-white overflow-y-auto">
            <h1 className="text-xl font-bold text-center">{title}</h1>
            <form className="w-full flex flex-col">
                {
                    fields.map((field) => (
                        <div key={field.name} className="w-full flex flex-col">
                            <label className="mt-3 text-sm font-medium">{field.label} :</label>
                            {
                                field.type === 'select'
                                ?
                                (
                                    <select value={fieldValues[field.name]} onChange={(e) => handleInputChange(e, field.name)} onKeyDown={blockInvalidChar} required={field.required} disabled={field.readonly} style={{ WebkitAppearance: 'none' }} className="h-[36px] mt-1 px-2 rounded-sm outline-none bg-gray-200 text-sm">
                                        <option value='' className="text-xs md:text-sm">Select a category</option>
                                        {categoriesInItem.map((category) => (
                                            <option key={category._id} value={category._id} className="text-xs md:text-sm">
                                                {category.category}
                                            </option>
                                        ))}
                                    </select>
                                )
                                :
                                (
                                    <input type={field.type} value={fieldValues[field.name]} onChange={(e) => handleInputChange(e, field.name)} onKeyDown={blockInvalidChar} required={field.required} readOnly={field.readonly} className="px-2 h-[36px] mt-1 rounded-sm outline-none bg-gray-200 text-sm" />
                                )
                            }
                        </div>
                    ))
                }

                <div className="w-full mt-6 flex justify-between">
                    <button onClick={close} type="button" className="w-[30%] h-[40px] flex items-center justify-center rounded bg-[red] text-white text-sm font-semibold">Cancel</button>
                    <button onClick={handleResetForm} type="button" className="w-[30%] h-[40px] flex items-center justify-center rounded bg-[yellow] text-black text-sm font-semibold">Reset</button>
                    <button onClick={handleSubmit} className="w-[30%] h-[40px] flex items-center justify-center rounded bg-[green] text-white text-sm font-semibold">Submit</button>
                </div>
            </form>
            {
                alertIsVisible && (
                    <PopupAlertAddForm icon={iconAlert} content={messageAlert} btnVisibility={btnIsVisible} onClose={() => setAlertIsVisible(false)} />
                )
            }
        </div>
    )
}

export default ModalAdd