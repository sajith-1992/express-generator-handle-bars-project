

  function addTocart(proID){


    
    $.ajax({
      url:"/add-cart/" + proID,
      method:"get",
      success:((Response)=>{
        alert(Response)
      })


    })
    


  }
