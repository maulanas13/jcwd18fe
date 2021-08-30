import React, { Component } from 'react';
import axios from 'axios'
import {
    Card, CardImg,CardBody,
    CardTitle, 
    Modal, ModalHeader, ModalBody, ModalFooter, Spinner 
  } from 'reactstrap';

const ApiKey = `apiKey=ff938463dc4844d889bd93169fe83043`
const URL=`https://api.spoonacular.com/recipes`

class Resep extends Component {
    state = { 
        loading:true,
        resep:[],
        cuisines:['japanese','indian','chinese','thai','Middle Eastern'],
        cuisineChoices:'',
        dietChoices:'',
        diet:['Gluten Free','Ketogenic','Vegetarian'],
        ingredientSelected:[],
        resepNameSelected:'',
        modal:false
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

    onCardClick=(id,name)=>{
        axios.get(`${URL}/${id}/ingredientWidget.json?${ApiKey}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({ingredientSelected:res.data.ingredients,modal:true,resepNameSelected:name})
        }).catch((err)=>{
            console.log(err)
            alert('error')
        })
    }  


    renderRecipes=()=>{
        if(!this.state.resep.length){
            return (
                <div className = 'd-flex justify-content-center align-items-center'>
                    <h1>No data</h1>
                </div>
            )
        }
        return this.state.resep.map((val,index)=>{
            return(
            <div key={index} className="col-md-3 col-sm-4 col-6 my-2">
                <Card onClick={()=>this.onCardClick(val.id,val.title)} className='tinggi ngangkat'>
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
        const {cuisineChoices,dietChoices} = this.state
        if(cuisineChoices){
            url+= `&cuisine=${cuisineChoices}`
            // url berubah jadi
            // `${URL}/complexSearch?${ApiKey}&cuisine=japanese` jika pilihan japanses
        }
        if(dietChoices){
            url+= `&diet=${dietChoices}`
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

    renderlist=(property)=>{
        return this.state[property].map((val)=>{
            return <option key={val} value={val}>{val} </option>
        })
    }

    toggle = ()=>this.setState({modal:!this.state.modal})

    renderModal=()=>{
        if(this.state.ingredientSelected.length){
            // jika di select dan resep ada
            console.log(this.state.ingredientSelected[0].name)
            return(
                <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Ingredients of {this.state.resepNameSelected}</ModalHeader>
                    <ModalBody>
                        {
                            this.state.ingredientSelected.map((val,index)=>{
                                return (
                                    <div key={index}>
                                    {index+1}. {val.name} {val.amount.us.value} {val.amount.us.unit}
                                    </div>
                                )
                            })
                        }
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
            )
        }else{
            // jika ingeridiend resep tidak ada
            return null
        }
    }

    render() {

        return (
            <div className='container-md  mt-5'>
                {this.renderModal()}
                <div className='d-flex'>
                    <div className='mr-4 ' >
                        <select 
                            name='cuisineChoices' 
                            value={this.state.cuisineChoices} 
                            onChange={this.inputHandler} 
                            className='form-control rounded-pill'
                        >
                            <option value="">All Cuisines</option>
                            {this.renderlist('cuisines')}
                        </select>
                    </div>
                    <div>
                    <select 
                        value={this.state.dietChoices} 
                        name='dietChoices' 
                        onChange={this.inputHandler}   
                        className='form-control rounded-pill'
                    >
                        <option value="">all Diet</option>
                        {this.renderlist('diet')}
                    </select>

                    </div>
                </div>
                <div style={{height:'7vh'}} className='py-2' >
                    {
                        this.state.cuisineChoices?
                        <div className="btn btn-outline-success mr-2">
                            {this.state.cuisineChoices} <span onClick={()=>this.setState({cuisineChoices:''})}>X</span> 
                        </div>
                        :
                        null
                    }
                       {
                        this.state.dietChoices?
                        <div className="btn btn-outline-success">
                            {this.state.dietChoices} <span onClick={()=>this.setState({dietChoices:''})}>X</span> 
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