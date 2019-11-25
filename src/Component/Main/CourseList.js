import React, {  } from 'react';
import {getMockCourseList, makeDefaultState} from '../../mock/courseList';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import ReactTooltip from 'react-tooltip'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Modal} from '../Login';
import 'react-notifications/lib/notifications.css';
import searchIcon from '../../Common/Images/icon_search.svg';

class CourseList extends React.Component{
    constructor() {
        super();
        this.state = {
          addedtocart:[],
          show:false,
          filteredData:[],
          data: getMockCourseList(),
          initialState: makeDefaultState(),
          LoggedIn:false,
          closePopup:false
        };
      }
      createNotification = (type) => {
        return () => {
          switch (type) {
            case 'success':
              NotificationManager.success('Logged In successfully', '');

              setTimeout(() => {
                this.hideModal();
            },1500)
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };
      ConfigureCourse=(event)=>{
        let newState = Object.assign({}, this.state.data);
      }
      UnConfigureCourse=()=>{

      }
      showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ LoggedIn: true });
      };
      onRowClick = (state, rowInfo, column, instance) => {
        return {
          style:{
            alignItems: 'center',
            textAlign:'center'
          },
            onClick: e => {
             this.showModal();
             let newState = Object.assign({}, this.state.data);
               newState[rowInfo.index].configure = !rowInfo.original.configure;
               this.setState({addedtocart:this.state.data.filter(x=>x.configure)},()=>{
                sessionStorage.setItem("addedToCart",JSON.stringify(this.state.data.filter(x=>x.configure)));
               });
              
            }
        }
    }
    componentDidMount(){
      this.setState({filteredData:this.state.data});
      this.setState({addedtocart:sessionStorage.getItem("addedToCart")!=null?JSON.parse(sessionStorage.getItem("addedToCart")):''});
    }
    globalSearch = (event) => {
      let  searchInput  = event.target.value;
      let filteredDataCourses = this.state.data.filter(value => {
        return (
          value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.author.toLowerCase().includes(searchInput.toLowerCase())         
        );
      });
    
      this.setState({filteredData:filteredDataCourses})
    
    };
      render() {
        const  {filteredData} = this.state;
        return (
          <div className="wrapper">
            <div className="header">
              {this.state.addedtocart.length>0?
              <div className="float-right cart">{this.state.addedtocart.length}</div>:""
              }
              <img className="imageClass" src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v1.png" 
              data-tip data-for='happyFace'>
              </img>

              
            
            <ReactTooltip  multiline={true} place="left" type="success" effect="solid" id='happyFace'>
              {this.state.addedtocart && this.state.addedtocart.map(x=>
              {
              return (<div key={x.name}>{x.name}</div>)
              }
               )}
              </ReactTooltip>
            <div>

              <img className="search" src={searchIcon}>
              </img> 
            <input type="text" placeholder="Search Course" onChange={this.globalSearch}>

            </input>

            </div>
            </div>
            <ReactTable
              data={filteredData}
              
          columns= {[
            {
              Header: '',
              id: 'image',
              accessor: d => d.image,
              Cell:(props=>(
  <div>
    <img className="width-50" src={props.original.image}></img>
    </div>
  
              )),
              filterable:false
            },
            {
            Header: 'Name',
            accessor: 'name'
          }, {
            Header: 'Description',
            id: 'description',
            accessor: d => d.description
          }
          , {
            Header: 'Author',
            id: 'author',
            accessor: d => d.author
          }
          , {
            Header: 'Publish Date',
            id: 'publishDate',
            accessor: d => d.publishDate
          }
          , {
            Header: 'Duration',
            id: 'duration',
            accessor: d => d.duration
          }
          , {
            Header: '',
            filterable:false,
            Cell: (props => (props.original.configure==false ? 
              <button className="tableDeleteButton button" onClick={this.ConfigureCourse}>Add</button> : 
              <button className="tableDeleteButton button" onClick={this.UnConfigureCourse}>Remove</button>))
            }        
        ]}        
              defaultPageSize={5}
              className="-highlight"
              sorted={this.state.sorted}
          page={this.state.page}
          expanded={this.state.expanded}
          resized={this.state.resized}
          getTrProps={this.onRowClick}
          onSortedChange={sorted => this.setState({ sorted })}
          onPageChange={page => this.setState({ page })}
          onPageSizeChange={(pageSize, page) =>
            this.setState({ page, pageSize })}
          onExpandedChange={expanded => this.setState({ expanded })}
          onResizedChange={resized => this.setState({ resized })}
            />
{this.state.show && !this.state.LoggedIn && (
<Modal handleClose={this.hideModal}>
  
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header text-center">
        <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
        </div>
      <div className="modal-body mx-3">
        <div className="md-form mb-5">
        <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Your email</label>
          <input id="defaultForm-email" type="email" name="UserName" className="form-control validate"></input>
        </div>

        <div className="md-form mb-4">
        <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Your password</label>
          <input id="defaultForm-pass" type="password" name="Password" className="form-control validate"></input>
          
        </div>

      </div>
      <div className="modal-footer d-flex justify-content-center">
        <button className="button" onClick={this.createNotification('success')}>Submit</button>
      </div>
    </div>
  </div>

  <NotificationContainer/>
   
   </Modal>


)}
           </div>
        );
      }


}
export default CourseList;
