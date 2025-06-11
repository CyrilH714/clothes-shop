export const addItemToBasket= (basket, newItem)=>{
    const existing=basket.find(item=>item.id===newItem.id);
    if (existing){
        return basket.map((item)=>{
            item.id===newItem.id?{...item,quantity:item.quantity+1}:item});
        }else{
            return [...basket, newItem];
        }
    };