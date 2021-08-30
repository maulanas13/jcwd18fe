import React, { Component } from 'react';
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import { Spinner } from 'reactstrap';
const ApiKey = `apiKey=ff938463dc4844d889bd93169fe83043`
const URL=`https://api.spoonacular.com/recipes`

class Resep extends Component {
    state = { 
        loading:true,
        resep:[],
        cuisines:['japanese','indian','chinese','thai','Middle Eastern'],
        cuisineChoices:'',
        dietChoinces:'',
        diet:['Gluten Free','Ketogenic','Vegetarian']
    }

    componentDidMount(){
       axios.get(`${URL}/complexSearch?${ApiKey}`)
       .then((res)=>{
           console.log(res.data)
            this.setState({resep:res.data.results})
       }).catch((err)=>{
           console.log(err)
           alert('server error')
       }).finally(()=>{
           this.setState({loading:false})
       })
    }

    onCardClick=()=>{

    }


    renderRecipes=()=>{
        return this.state.resep.map((val,index)=>{
            return(
            <div key={index} className="col-md-3 col-sm-4 col-6 my-2">
                <Card onClick={this.onCardClick} className='tinggi ngangkat'>
                    <CardImg top width="100%" src={val.image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5" >{val.title}</CardTitle>
                    </CardBody>
                </Card>
            </div>
            )
        })
    }

    onSearchClick=()=>{
        let url= `${URL}/complexSearch?${ApiKey}`
        const {cuisineChoices,dietChoinces} = this.state
        if(cuisineChoices){
            url+= `&cuisine=${cuisineChoices}`
            // url berubah jadi
            // `${URL}/complexSearch?${ApiKey}&cuisine=japanese` jika pilihan japanses
        }
        this.setState({resep:[],loading:true})
        axios.get(`${url}`)
        .then((res)=>{
            console.log(res.data)
             this.setState({resep:res.data.results})
        }).catch((err)=>{
            console.log(err)
            alert('server error')
        }).finally(()=>{
            this.setState({loading:false})
        })
    }

    inputHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    renderCuisines=()=>{
        return this.state.cuisines.map((val)=>{
            return <option key={val} value={val}>{val} </option>
        })
    }

    

    render() {

        return (
            <div className='container-md  mt-5'>

                <div>
                    <select name='cuisineChoices' onChange={this.inputHandler} className='form-control'>
                        <option value="">All Cuisines</option>
                        {this.renderCuisines()}
                    </select>
                    <select className='form-control'>
                        <option value="">all Diet</option>
                    </select>
                </div>
                <div style={{height:'7vh'}} className='py-2' >
                    {
                        this.state.cuisineChoices?
                        <div className="btn btn-outline-success">
                                {this.state.cuisineChoices} X
                        </div>
                        :
                        null
                    }
                </div>
                <div>
                <button onClick={this.onSearchClick} className='btn btn-primary my-2'>
                        Search
                    </button>
                </div>
                    {
                        this.state.loading?
                    <div className='container  mt-5'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <Spinner color="success" />
                        </div>
                    </div>:
                    <div className="row justify-content-center">
                        {this.renderRecipes()}
                    </div>
                    
                    }
            </div>
          );
    }
}
 
export default Resep;