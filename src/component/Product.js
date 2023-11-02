import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
export default function Product()
{
    
    const columns= [
        {
            name:"Title",
            selector:(row)=>row.title,
        },
        {
            name:"Category",
            selector:(row)=>row.category,
        },
        {
            name:"Price",
            selector:(row)=>row.price,
        },
        {
            name:"Image",
            selector:(row)=><img  height ={70} width={80} src={ row.image}/>,
        }

    ];
    const [data, setData]= useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState([]);
    const [sortOrder, setSortOrder] = useState('none');

    const handleSortChange = (e) => {
      setSortOrder(e.target.value);
    };
  
  
    const getProduct=async()=>{
    try{
        const req= await fetch("https://fakestoreapi.com/products");
        const res= await req.json();
        setData(res);
        setFilter(res);
    } catch(error){
       console.log(error);
    }
    }
    useEffect(()=>{
        getProduct();
    }, []);

    useEffect(()=>{
        const result= data.filter((item)=>{
         return item.category.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    },[data, search]);
    useEffect(() => {
        const sortedData = [...filter];
        if(sortOrder==='none')
            setFilter(data);
        else if (sortOrder === 'asc') {
          sortedData.sort((a, b) => a.price - b.price);
        } else {
          sortedData.sort((a, b) => b.price - a.price);
        }
        setFilter(sortedData);
      }, [sortOrder, filter, data]);
   
   const tableHeaderstyle={
    headCells:{
        style:{
            fontWeight:"bold",
            fontSize:"14px",
            backgroundColor:"#ccc"

        },
    },
   }

    return(
        <React.Fragment>
            <div>
        <label>Sort by Price:</label>
        <select value={sortOrder} onChange={handleSortChange}>
        <option value="none">None</option>

          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
            <DataTable 
            customStyles={ tableHeaderstyle}
            columns={columns}
            data={filter}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            subHeader
             subHeaderComponent={
               
                <input type="text"
                className="w-25 form-control"
                placeholder="Search by category...(men, women, jewelery, electronic)"
                value={ search}
                onChange={(e)=>SetSearch(e.target.value)}
                
                />
                // </div>

}
subHeaderAlign="right"
             
            
            />
        </React.Fragment>
    );
}