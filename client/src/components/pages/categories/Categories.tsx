import React, { useState, useContext } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import './categories.css'
import { updateCategory, newCategory, removeCategory } from '../../service/categoryService'
import {GetErrorMessage} from '../../service/api-service'
interface Catgorie {
    name:string,_id:string
}
function Categories() {
    const state = useContext(globalState)
    const [categories, setcategories] = state!.categoriesAPI.categories
    const [callsback, setcallsback] = state!.categoriesAPI.callback
    const [category, setcategory] = useState<string>("")
    const [onEdit, setonEdit] = useState<Boolean>(false)
    const [id, setid] = useState<string>("")

    const createCategory = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (onEdit) {
                const res = await updateCategory(category, id)
                alert(res.message);
            }
            else {
                const res = await newCategory(category)
                alert(res.message);
            }
            setonEdit(false)
            setcategory("")
            setcallsback(!callsback)
        } catch (error) {
            GetErrorMessage(error)
        }
    }

    const editCategory = (id:string, name:string) => {
        setid(id)
        setcategory(name)
        setonEdit(true)
    }

    const deleteCategory = async (id:string) => {
        try {
            const res = await removeCategory(id)
            alert(res.message);
            setcallsback(!callsback)
        } catch (error) {
            GetErrorMessage(error)
        }
    }
    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label>Category</label>
                <input type="text" name="category" value={category} required
                    onChange={e => setcategory(e.target.value)} />

                <button className='submitButton' type="submit">{onEdit ? "Edit" : "Create"}</button>
            </form>
            <div className="col">
                {
                    categories.map((category:Catgorie) => {
                        return (
                            <div className="row" key={category._id}>
                                <p>{category.name}</p>
                                <div>
                                    <button className='editButton'  onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                    <button className='deleteButton' onClick={() => deleteCategory(category._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Categories
