import React from 'react'
import "./Home.css"
import Product from "./Product";

function Home() {
    return (
        <div className="home">
            <img className="home_image" 
            src="https://www.freepngimg.com/thumb/wings/34952-3-wings-image.png"
            alt="" />
            
            <div className="home_row">
                <Product
                    id="123"
                    title="Sakura"
                    price={13}
                    rating={5}
                    image="https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" 
                />
                <Product
                    id="123"
                    title="Sakura"
                    price={13}
                    rating={5}
                    image="https://www.freepngimg.com/thumb/wings/34952-3-wings-image.png" 
                />
               
            </div>
            <div className="home_row">
                <Product
                    id="123"
                    title="Sakura"
                    price={13}
                    rating={5}
                    image="https://www.freepngimg.com/thumb/wings/34952-3-wings-image.png" 
                />
                <Product
                    id="123"
                    title="Sakura"
                    price={13}
                    rating={5}
                    image="https://www.freepngimg.com/thumb/wings/34952-3-wings-image.png" 
                />
                <Product
                    id="123"
                    title="Sakura"
                    price={13}
                    rating={5}
                    image="https://www.freepngimg.com/thumb/wings/34952-3-wings-image.png" 
                />
            </div>
            <div className="home_row">
                <Product
                    id="123"
                    title="Sakura"
                    price={13}
                    rating={5}
                    image="https://www.freepngimg.com/thumb/wings/34952-3-wings-image.png" 
                />
            </div>
        </div>
        
        
    );
}

export default Home
