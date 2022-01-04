import React, { useState, useEffect, useContext } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import './categories.css'
function Categories() {
    const state = useContext(globalState)
    const [categories, setcategories] = state.categoriesAPI.categories
    const [callsback, setcallsback] = state.categoriesAPI.callback
    const [category, setcategory] = useState("")
    const [onEdit, setonEdit] = useState(false)
    const [id, setid] = useState("")

    const createCategory = async (e) => {
        e.preventDefault()

        try {
            if (onEdit) {
                const res = await fetch(`http://localhost:8080/api/updateCategory/${id}`, {
                    method: "put", headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.accessToken}`,
                    },
                    body: JSON.stringify({ name: category })
                })
                    .then(res => res.json())
                    .then(responce => responce)
                    .catch(error => error)
                alert(res.message);
            }
            else {
                const res = await fetch("http://localhost:8080/api/creatCategory", {
                    method: "post", headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.accessToken}`,
                    },
                    body: JSON.stringify({ name: category })
                })
                    .then(res => res.json())
                    .then(responce => responce)
                    .catch(error => error)
                alert(res.message);
            }
            setonEdit(false)
            setcategory("")
            setcallsback(!callsback)

        } catch (error) {
            alert(error.message)
        }
    }
    const editCategory = (id, name) => {
        setid(id)
        setcategory(name)
        setonEdit(true)
    }
    const deleteCategory = async (id) =>{
        try {
            const res = await fetch(`http://localhost:8080/api/deleteCategory/${id}`, {
                method: "delete", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.accessToken}`,
                }
            })
                .then(res => res.json())
                .then(responce => responce)
                .catch(error => error)
            alert(res.message);
            setcallsback(!callsback)
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label>Category</label>
                <input type="text" name="category" value={category} required
                    onChange={e => setcategory(e.target.value)} />

                <button type="submit">{onEdit ? "Edit" : "Create"}</button>
            </form>
            <div className="col">
                {
                    categories.map(category => {
                        return (
                            <div className="row" key={category._id}>
                                <p>{category.name}</p>
                                <div>
                                    <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                    <button onClick={()=> deleteCategory(category._id)}>Delete</button>
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
