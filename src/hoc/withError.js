import React,{Component, Fragment} from 'react'
import Modal from '../components/UI/Modal/Modal'



 const withErrorHandler = (WrappedComponent,instance) => {
  return class extends Component{
constructor(props) {
  super(props)

  this.state = {
     error:null
  }
}

    componentDidMount(){
    this.reqInterseptor=instance.interceptors.request.use(req=>{
        this.setState({error:null});  
        return req
      })
    this.resInterceptor=instance.interceptors.response.use(res=>res,error=>{
        this.setState({error:error})
    
      })
    }
    componentWillUnmount(){
instance.interceptors.request.eject(this.reqInterseptor)
instance.interceptors.response.eject(this.resInterceptor)
    }
    errorConfirmHandler=()=>{
      this.setState({error:null})

    }
    render(){
      const error=this.state.error
       
      return(
        <Fragment>
        <Modal show={this.state.error}
    modalClosed={()=>this.errorConfirmHandler()}
        >
         {this.state.error !== null ?error.message : null}
        </Modal>
    <WrappedComponent {...this.props} />
    </Fragment>
      );
    }
  }
}

export default withErrorHandler
