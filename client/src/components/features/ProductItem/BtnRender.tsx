import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { globalState } from '../globalState/GlobalState'
import { IProduct } from '../../Types/products'


interface Props {
    product_id: string | undefined;
    deleteProduct: () => void;
    product: IProduct
}

const BtnRender: React.FC<Props> = ({ product_id, deleteProduct, product }) => {
    const state = useContext(globalState)
    const { isAdmin } = state!.userAPI.isAdmin
    const ADDCART = state!.userAPI.ADDCART
    return (
        <div className="row_btn">
            {
                isAdmin ?
                    <>
                        <Link id="btn_buy" to="#!" onClick={() => deleteProduct()}>
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/edit_product/${product_id}`}>
                            Edit
                        </Link>
                    </>
                    :
                    <>
                        <Link id="btn_buy" to="#!" onClick={() => ADDCART(product)}>
                            Buy
                        </Link>
                        <Link id="btn_view" to={`/detail/${product_id}`}>
                            View
                        </Link>
                    </>
            }

        </div>
    )
}

export default BtnRender
