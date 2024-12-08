

  function addTocart(proID){



    
    $.ajax({
      url:"/add-cart/" + proID,
      method:"get",
      success:(response)=>{

        if(response.status){

            
        }
      alert(response )

      }


    })
    


  }
