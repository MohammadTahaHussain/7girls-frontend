import React from 'react'

const Checkout = () => {


    const name = "ITEMNAME";
    const TotalPrice = 50;
    const count = 3;

  const goToStripe = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              quantity: count,
              price: TotalPrice,
              name: name,
            },
          ],
        }),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      // Assuming the server response is a URL
      const data = await res.json();
      window.location = data.url;
   
    } catch (err) {
      console.error("Error during fetch:", err);
    }
  };

  return (
    <div>
      <h1 style={{textAlign:"center" , fontSize:"18px" , fontWeight:"bold" , marginTop:"2rem"}}>Add a Paynment Details Click on the Continue Button</h1>
      <div className="btn-cont" style={{display:"flex" , justifyContent:"center" , marginTop:"1rem"}}>
      <button onClick={goToStripe} style={{background:"blue" , padding:".5rem 2rem" , borderRadius:"12px" , color:"#fff" , fontWeight:"bold"}}>Continue</button>
      </div>
    </div>
  )
}

export default Checkout;
