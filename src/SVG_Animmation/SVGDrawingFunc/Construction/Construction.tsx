function Construction(outline:{stroke:string; color:string; cordinates: string}[]) {
    
    
    
    
    
    return (
       outline.map((item) => PathConstruction(item))  
    );
}
function PathConstruction(item:{stroke:string; color:string; cordinates: string}) {
    if(item.stroke=="path"){
    return (
        <path key={item.cordinates} fill={item.color} d={item.cordinates} />
    );
}
   else if(item.stroke=="polygon")
   {
    return (
        <polygon key={item.cordinates}  points={item.cordinates} />
    );
   }
   else{
    return null;
   }
}
export default Construction;
    