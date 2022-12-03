import { Component } from 'react'
import './App.css'

const myDataBase =[]

export default class Main extends Component {
  constructor(){
    super()
    this.state = {
      data: []
    }

    fetch ('https://fakestoreapi.com/products?limit=15')
    .then(res=> res.json())
    .then(myData=>{
      this.setState({
        data: myData
      });
    })
    
  }


  Cart = (e) => {
    let Price = e.target.parentElement.parentElement.getAttribute('data-price')
    let Titel = e.target.parentElement.parentElement.getAttribute('data-title')
    let NumId= e.target.parentElement.parentElement.getAttribute('data-id')
    let count = parseInt(e.target.parentElement.parentElement.getAttribute('data-count'))

    if (count ===1){
      let _li = document.createElement('li')
      _li.setAttribute('id', 'id'+ NumId)
      _li.innerHTML=`
      <strong class="col-4">${Price}$</strong>
      <span class="col-5">${Titel}</span>
      <button class="col-3 text-danger delete" id='delete'> <b>Delete</b> </button>
      <div class="row quantity">
        <button class="col-3 add"  id='add'><a> + </a></button>
        <em class="col-6"></em>
        <button class="col-3" id='less'> - </button>
      </div>
      `;
        
      document.getElementById('cart').appendChild(_li);
      document.querySelector('#id'+NumId+ '>div>em').innerHTML=+count+" Quantity"
      
    } else{
      document.querySelector('#id'+NumId+ '>div>em').innerHTML=+count+" Quantity"
      
    }
     e.target.parentElement.parentElement.setAttribute('data-count', count+1);

      
    document.getElementById("delete").onclick= function() {removefun()};
    
    function removefun(self){
      // self.parentElement.remove()
      document.querySelector('#id'+NumId).remove()
    }
    
    document.getElementById('add').onclick = ()=> {addfun()};
    function addfun(){

      document.querySelector('.quantity>em').innerHTML= +count+" Quantity"


    }

    }
  


    // add = () =>{
    //   this.setState({
    //     count:this.state.count+1
    //   })
    // }
    

    Buy = () => {
      const temp = {
        title: '',
        price: '',
        count: '',
      }

      const _produts = document.querySelectorAll('#cart>li')

      for (let i=0; i<_produts.length; i++){
        temp.price = document.querySelector('#cart>li:nth-of-type('+(i+1)+')>strong').innerHTML
        temp.title =document.querySelector('#cart>li:nth-of-type('+(i+1)+')>span').innerHTML
        temp.price = document.querySelector('#cart>li:nth-of-type('+(i+1)+')>.quantity>em').innerHTML
        
        temp.count = temp.count.substring(1)
        myDataBase.push(temp)
      }
  
    }
  
  render(){
    return(
      <div className="container">
        <div className="row">
          <h1 className="col-12">Amozon Shop</h1>
          <div className="cart col-2">
            <ul id="cart" className='col-12'></ul>
            <button onClick={this.Buy} className='btn bg-success p-2 text-light col-12'>Buy Now</button>
          </div>



          <div className="store row col-10">
            {this.state.data.map((val) => {
              return(
                <article className='box col-4 border bg-white m-2' data-price={val.price} data-id={val.id} data-title={val.title} data-count='1' key={val.id}>

                  <figure className='col-12 row'>
                    <img className='col-6' src={val.image} alt={val.title} />
                  </figure>

                  <div className="text">
                    <h3>{val.title}</h3>
                    <p>{val.description}</p>
                  </div>
                  
                  <div className="buy row col-12">
                    <strong className='col-6 text-danger'>{val.price} $</strong>
                    <button onClick={this.Cart} className='btn col-6 bg-success text-light'>Add to cart</button>
                  </div>

                </article>

              )
            }
          )}
        </div>
      </div>
    </div>
  )}
}
