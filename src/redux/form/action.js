import {LIST_PRODUCT_ADD,LIST_PRODUCT_EDIT,LIST_PRODUCT_DEL} from 'src/constants';

export function addProduct(item){
    return{
        type:LIST_PRODUCT_ADD,
        item
    }
}

export function editProduct(item,index){
    return{
        type: LIST_PRODUCT_EDIT,
        item,
        index
    }
}

export function delProduct(index){
    return{
        type:LIST_PRODUCT_DEL,
        index
    }
}